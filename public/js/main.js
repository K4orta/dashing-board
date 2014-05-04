var app = angular.module('dashboard', []);

var sortByTime = function(input) {
	if (input[0].directions) {
		return _.sortBy(input, function(route) {
			return route.directions[0].departures[0];
		});
	}
	return _.sortBy(_.filter(input, function(route) { return route.departures; }), function(route) {
		return route.departures[0];
	});
};

var DashCtrl = function($scope, $http) {
	// $scope.weather = {};

	// $http.get('/weather').then(function(resp) {
	// 	$scope.weather = resp.data;
	// });

	// $interval(function() {
	// 	$http.get('/weather').then(function(resp) {
	// 		$scope.weather = resp.data;
	// 	});
	// }, 300000);
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
	}
	return function(input) {
		if(weatherIcons[input]){
			return 'wi-' + weatherIcons[input];
		} 
		return input;
	}
});

app.directive('weather', ['$interval', '$http', function($interval, $http) {
	return {
		templateUrl: 'views/weather.html',
		scope: {},
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

app.directive('transit', ['$interval', '$http', function($interval, $http){
	var sortRoutes = function(directions) {
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
	}
}]);