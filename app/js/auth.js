'use strict';

angular.module('adlock')
.factory('Auth', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 
function($http, $rootScope, $window, Session, AUTH_EVENTS) {
	var authService = {};
	//the login function
	authService.login = function(user, success, error) {

/*		$http.post('http://127.0.0.1:8083/web/hello',user).success(
			function(data){
				console.log("fffffffffffffff")
			}
		);*/
		var dataObj = {
			"name" : user.username,
			"location" : user.password,
			"phone" : "123456789"
		};

		var datass = {
			"username" : user.username,
			"password" : user.password
		}

/*		var response = $http.post('http://127.0.0.1:8081/SpringMVCAngularJSService/PostService', dataObj);
		response.success(function(data, status, headers, config) {
			$scope.responseData = data;
		});
		response.error(function(data, status, headers, config) {
			alert( "Exception details: " /!*+ JSON.stringify({data: data})*!/);
		});*/
		console.log(user.username);
		console.log(user.password);
/*		$http({
			url:'http://localhost:8083/SpringMVCAngularJSService/PostService',
			method : 'POST',
			data:dataObj
		}).success(function(res){

		});*/
		$http({
			url:'http://localhost:8082/web/login',
			method : 'POST',
			data:datass
		}).success(function(res){

		});
		$http.post('misc/users.json').success(function(data) {
		
		//this is my dummy technique, normally here the 
		//user is returned with his data from the db
		var users = data.users;
		if(users[user.username]){
			var loginData = users[user.username];
			//insert your custom login function here 
			if(user.username == loginData.username && user.password == loginData.username){
				//set the browser session, to avoid relogin on refresh
				$window.sessionStorage["userInfo"] = JSON.stringify(loginData);
				
				//delete password not to be seen clientside 
				delete loginData.password;
				
				//update current user into the Session service or $rootScope.currentUser
				//whatever you prefer
				Session.create(loginData);
				//or
				$rootScope.currentUser = loginData;
				
				//fire event of successful login
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				//run success function
				success(loginData);
			} else{
				//OR ELSE
				//unsuccessful login, fire login failed event for 
				//the according functions to run
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				error();
			}
		}	
		});
		
	};

	//check if the user is authenticated
	authService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	//check if the user is authorized to access the next route
	//this function can be also used on element level
	//e.g. <p ng-if="isAuthorized(authorizedRoles)">show this only to admins</p>
	authService.isAuthorized = function(authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
	      authorizedRoles = [authorizedRoles];
	    }
	    return (authService.isAuthenticated() &&
	      authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	//log out the user and broadcast the logoutSuccess event
	authService.logout = function(){
		Session.destroy();
		$window.sessionStorage.removeItem("userInfo");
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	}

	return authService;
} ]);