var app = angular.module('dashboard', []);

var sortByTime = function(input) {
	return _.sortBy(input, function(route) {
	 	console.log(input);
	 	return 1;
	});
};

var DashCtrl = function($scope, $http, $interval) {
	$scope.modules = ["a", "b", "c"];
	$scope.weather = {};

	//Setup and update the clock
	$scope.currentTime = moment(new Date().getTime());
	$interval(function() {
		$scope.currentTime = moment(new Date().getTime());
	}, 1000);

	$scope.transit = {};
	$scope.bart = {};

	$http.get('/weather').then(function(resp) {
		$scope.weather = resp.data;
	});
	$http.get('/transit/16997').then(function(resp) {
		$scope.transit = resp.data;
	});
	$http.get('/transit/11').then(function(resp) {
		$scope.bart = resp.data;
	});

	$interval(function() {
		$http.get('/transit/16997').then(function(resp) {
			$scope.transit = resp.data;
		});
		$http.get('/transit/11').then(function(resp) {
			$scope.bart = resp.data;
		});
	}, 60000);

	$interval(function() {
		$http.get('/weather').then(function(resp) {
			$scope.weather = resp.data;
		});
	}, 300000);
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