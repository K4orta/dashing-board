console.log('it works!');

var app = angular.module('dashboard', []);

var DashCtrl = function($scope, $http) {
	$scope.modules = ["a", "b", "c"];
	$scope.weather = {};
	$http.get('/weather').then(function(resp){
		$scope.weather = resp.data;
	});
};

app.filter('moment', function() {
	return function(input) {
		return moment(input * 1000).format('llll');
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