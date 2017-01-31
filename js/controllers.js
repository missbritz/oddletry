var searchApp = angular.module('searchApp', ['ngRoute']);

searchApp.config(['$routeProvider', function($routeProvider){

	var cpath = document.location.href;
	var userid = cpath.toString().split('/');
	var uid = (userid.length > 0) ? userid[0] : '' ;
console.log();
	$routeProvider.
		when('/users',{
			templateUrl: 'includes/all-user.html',
			controller : 'searchUser'
		}).
		when('/user-details/:userid',{
			templateUrl: 'includes/user-details.html',
			controller : 'userDetailView',
		}).
		otherwise({
			redirectTo: '/users'
		});

}]).controller('searchUser', ['$scope', '$http', function($scope, $http) {

  //Search Users
  var users = 'https://api.github.com/search/users?q=tom';
  $http.get(users).then(function(data) {

	    $scope.user = data.data.items;

  });

 //view routes
}]).controller('userDetailView', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {

	$scope.uid = $routeParams.userid;

	var owner = 'https://api.github.com/users/' + $scope.uid;
	$http.get(owner).then(function(data) {

		$scope.owner = {
							name: data.data.name,
							login: data.data.login,
							id : data.data.id,
							avatar : data.data.avatar_url,
							url : data.data.url

		}

	});

	var repo = 'https://api.github.com/users/'+ $scope.uid +'/repos';
	$http.get(repo).then(function(data) {

	    $scope.rdata = data.data;

 	});

}]);
