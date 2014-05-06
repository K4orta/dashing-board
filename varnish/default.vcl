backend default {
	.host = "127.0.0.1";
	.port = "8080";
}

probe dash_probe {
	.url = "/systems/ping";
	.timeout = 2s;
	.interval = 60s;
	.window = 3;
	.threshold = 1;
}

backend dashboard {
	.host = "127.0.0.1";
	.port = "3000";
	.probe = dash_probe;
}

probe sick_probe {
	.url = "/systems/fakeping";
	.interval = 1d;
	.initial = 0;
	.expected_response = 777;
}

backend sick_city {
	.host = "127.0.0.1";
	.port = "9393";
	.probe = sick_probe;
}

sub vcl_recv {
	# Health check for varnish itself
	if (req.url == "/ping") {
		error 600 "OK";
	}

	# Grace period.
	set req.grace = 11h;

	set req.backend = dashboard;

  # Strip Cookie header
  unset req.http.Cookie;

  # Last request must have been 500 if req.restarts > 0
  if(req.restarts != 0){
    set req.backend = sick_city;
  }
}

sub vcl_pipe {
  # Note that only the first request to the backend will have
  # X-Forwarded-For set.  If you use X-Forwarded-For and want to
  # have it set for all requests, make sure to have:
  # set bereq.http.connection = "close";
  # here.  It is not set by default as it might break some broken web
  # applications, like IIS with NTLM authentication.

  return (pipe);
}

sub vcl_fetch {
  # Strip Cookie header
  unset beresp.http.Set-Cookie;

  # Keep object in cache up to 12 hours after expiration
  # This will give us 12 hours to fix the origin servers if they go down.
  # This setting must be >= req.grace in vcl_recv.
  set beresp.grace = 12h;

  # Cache errors for a second, ignoring what the origin server may have
  # said about the cacheability of the response. If the origin said the
  # error is cacheable for several minutes, that is too long and should
  # be overridden. If the origin said the error is not cacheable at all,
  # a bunch of clients making the same request will result in a flood of
  # requests hitting the origin. Caching the error for one second means
  # the backend will get at most one request per second for that URL.
  if (beresp.status >= 500 && beresp.status < 600) {
    # bail out before the bad response can be delivered to the user, or stored in the cache
    # restarting the request will force varnish to use the sick server
    set beresp.ttl = 1s;
    if (req.restarts == 0) {
      return(restart);
    }
  } else if (beresp.status >= 400 && beresp.status < 500) {
    set beresp.ttl = 3s;
    set beresp.grace = 0s;
  }
}

# Set a header to track a cache HIT/MISS.
sub vcl_deliver {
  if (obj.hits > 0) {
    set resp.http.X-Varnish-Cache = "HIT";
    set resp.http.X-Varnish-Hits = obj.hits;
  }
  else {
    set resp.http.X-Varnish-Cache = "MISS";
  }
  # Set a header to track the webhead.
  set resp.http.X-Varnish-IP = server.ip;
}

sub vcl_error {
  # Catch bogus error and return synthetic health check page
  if (obj.status == 600) {
    set obj.status = 200;
    synthetic "pong";
    return (deliver);
  }
}