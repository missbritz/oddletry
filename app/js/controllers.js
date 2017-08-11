//Initialize NG
var searchApp = angular.module('searchApp', ['ngRoute']);

searchApp.config(['$routeProvider', function($routeProvider){

	var cpath = document.location.href;
	var userid = cpath.toString().split('/');
	var uid = (userid.length > 0) ? userid[0] : '' ;

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

  var users;
  $scope.searchIsNotEmpty = false;
  $scope.searchResult = null;
  $scope.firstLoad = true;

  $scope.getUser = function( value ){
  		$scope.firstLoad = false;
  		users = 'https://api.github.com/search/users?q='+ value; 


		if(value.length > 2){
			$http.get(users).then(function(data) {
			    $scope.user = data.data.items;
			    $scope.searchIsNotEmpty = true;
			    $scope.searchResult = null;
			});

			//Fire function when reaches 3 letters
			setTimeout( this, 600 );
			
		}else{

			if( value.length < 3 && value.length > 0 ){
				$scope.searchIsNotEmpty = false;
				$scope.searchResult = "Please enter username of at least 3 characters." ;
			}else if( value.length <= 0 ){
				$scope.searchIsNotEmpty = false ;
				$scope.searchResult = "Please enter a github user to search!";
			}

			//Give user a sec to finish
			setTimeout( this, 1000 );
		}

  };

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

		};

	});

	var repo = 'https://api.github.com/users/'+ $scope.uid +'/repos';
	$http.get(repo).then(function(data) {

	    $scope.rdata = data.data;

 	});

}]);
