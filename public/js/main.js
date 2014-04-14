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