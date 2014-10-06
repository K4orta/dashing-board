var app = angular.module('dashboard', []);

var pickModules = function($scope) {
	
}; 

var DashCtrl = function($scope, $http, $interval) {
	$scope.show = {
		transit: true,
		weather: true
	};

	$interval(function() {
		if(new moment().hour() > 15) {
			$scope.show.transit = false;
		}
	}, 60000);
	// console.l
};

app.filter('moment', function() {
	return function(input) {
		return moment(input * 1000).format('ddd');
	}
});

app.filter('trunk', function() {
	return function(input) {
		return Math.round(input);
	}
});

app.filter('weatherIcon', function() {
	var weatherIcons = {
		'partly-cloudy-day': 'day-cloudy',
		'partly-cloudy-night': 'night-cloudy',
		'clear-night': 'night-clear',
		'clear-day': 'day-sunny',
		'fog': 'fog',
		'rain': 'rain',
		'cloudy': 'cloudy',
		'wind': 'cloudy-gusts'
	};
	return function(input) {
		if(weatherIcons[input]){
			return 'wi-' + weatherIcons[input];
		} 
		return input;
	};
});

app.directive('lunch', ['$interval', '$http', function($interval, $http) {
	return {
		templateUrl: 'views/lunch.html',
		scope: {},
		controller: function($scope) {
			$http.get('/lunch/5').then(function(resp) {
				var out = [];
				// TODO: Move this parsing logic to the backend
				var $dates = $(resp.data).find('.otg-market-data-events-pagination');
				$dates.each(function() {
					var day = {};
					day.date = $.trim($(this).text());
					day.vendors = [];
					var $vendors = $(this).find('+ div').find('.otg-markets-data-vendor-name');
					$vendors.each(function() {
						day.vendors.push($(this).text());
					});
					out.push(day);
				});
				$scope.lunch = out;
			});

		},
		restrict: 'E'
	};
}]);

app.directive('weather', ['$interval', '$http', function($interval, $http) {
	return {
		templateUrl: 'views/weather.html',
		scope: {},
		className: 'weather-containter',
		controller: function($scope) {
			$http.get('/weather').then(function(resp) {
				$scope.weather = resp.data;
			});

			$interval(function() {
				$http.get('/weather').then(function(resp) {
					$scope.weather = resp.data;
				});
			}, 300000);
		},
		restrict: 'E'
	};
}]);

app.directive('clock', ['$interval', function($interval) {
	return {
		templateUrl: 'views/clock.html',
		scope: {},
		controller: function($scope) {
			$interval(function() {
				$scope.currentTime = moment(new Date().getTime());
			}, 1000);
		},
		link: function(scope, element) {
			scope.currentTime = moment(new Date().getTime());
		},
		restrict: 'E'
	}
}]);

app.directive('livevideo', ['$interval', function($interval) {
	var videos = {
		'hummingBirds': 13340773,
		'kelpForest': 9948292,
		'openOcean': 9600798,
		'space': 17074538
	};

	var randomVideo = function($sce) {
		var videoIds =  _.values(videos);
		var randomVideo = videoIds[_.random(videoIds.length-1)];
		return $sce.trustAsResourceUrl('http://www.ustream.tv/embed/' + randomVideo + '?v=3&wmode=direct&controls=false&autoplay=true');
	};

	var minutesBeforeRefresh = 30;

	return {
		templateUrl: 'views/livevideo.html',
		scope: {},
		controller: function($scope, $sce) {
			$scope.currentVideo = randomVideo($sce);

			$interval(function() {
				$scope.currentVideo = randomVideo($sce);
			}, minutesBeforeRefresh * 1000 * 60);
		},
		restrict: 'E'
	}
}]);

app.directive('transit', ['$interval', '$http', function($interval, $http) {
	var sortRoutes = function(directions) {
		if (directions[0].name == "SF Airport" || directions[0].name == "Inbound") {
			directions = directions.reverse();
		}
		directions.forEach(function(direction) {
			direction.routes = _.sortBy(direction.routes, function(route) {
				if (route.departures) {
					return route.departures[0];
				}
				return Math.Infinity; 
			});
		});
		return directions;
	};
	return {
		templateUrl: 'views/transit-stop.html',
		scope: {
			transitProvider: '@provider' 
		},
		controller: function($scope) {
			$scope.transitName = $scope.transitProvider.toUpperCase();
			$scope.chopMuniName = function(name) {
				return _.last(name.split("-"));
			};

			$scope.routeIcon = function(route) {
				return "/images/muni/" + route.code + ".svg";
			};

			$scope.bartRouteClass = function(route) {
				return "bart-" + route.code;
			};

			$http.get('/transit/' + $scope.transitProvider.toLowerCase()).then(function(resp) {
				$scope.transit = sortRoutes(resp.data);
			});

			$interval(function() {
				$http.get('/transit/' + $scope.transitProvider.toLowerCase()).then(function(resp) {
					$scope.transit = sortRoutes(resp.data);
				});
			}, 60000);
		},
		restrict: 'E'
	};
}]);
