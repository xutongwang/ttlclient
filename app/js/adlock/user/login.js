'use strict';
adlock.controller('LoginController', ['$scope', '$http', '$state','$window', 'Auth', function($scope, $http, $state,$window, Auth) {
/*    $scope.adlock ={
      name:'adlock'
    };*/
    $scope.credentials = {};
    $scope.loginForm = {};
    $scope.error = false;
/*    $scope.user = {};
    $scope.authError = null;*/
    //when the form is submitted
    $scope.submit = function() {
        $scope.submitted = true;
        if (!$scope.loginForm.$invalid) {
            console.log('true');
            $scope.login($scope.credentials);
        } else {
            console.log('false');
            $scope.error = true;
            return;
        }
    };

    //Performs the login function, by sending a request to the server with the Auth service
    $scope.login = function(credentials) {
        $scope.error = false;
/*        $http({
            url:'http://localhost:8082/web/login',
            method : 'POST',
            data:credentials
        }).success(function(res){

        });*/
/*        Auth.login(credentials, function(user) {
            //success function
            //$modalInstance.close();
            //$state.go('home');
            console.log("home");
        }, function(err) {
            console.log("error");
            $scope.error = true;
        });*/
        // Try to login
        $http.post('http://localhost:8081/web/login', credentials)
            .then(function(response) {
                if ( (response.data.code == 1)&&(response.data.message == 'success')) {
                    //delete password not to be seen clientside
                    delete credentials.password;
                    $window.sessionStorage["userInfo"] = JSON.stringify(credentials);
                    $state.go('dashboard');
                    console.log((response.data.code == 1)&&(response.data.message == 'success'));
                    console.log($window.sessionStorage["userInfo"]);
                    console.log(response.data);
                    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
                }else{
                    $scope.authError = 'Email or Password not right';
                    console.log((response.data.code == 1)&&(response.data.message == 'success'));
                    console.log($window.sessionStorage["userInfo"]);
                    console.log(response.data);
                    console.log("ggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
                }
            }, function(x) {
                $scope.authError = 'Server Error';
            });
    };

    // if a session exists for current user (page was refreshed)
    // log him in again
/*    if (true) {
        //var credentials = JSON.parse($window.sessionStorage["userInfo"]);
       // $scope.login(credentials);
        console.log($window.sessionStorage["userInfo"]);
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    }*/
    if(window.localStorage){
        alert('This browser supports localStorage');
    }else{
        alert('This browser does NOT support localStorage');
    }

/*    $scope.login = function() {
        $scope.authError = null;
        // Try to login
        $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                if ( !response.data.user ) {
                    $scope.authError = 'Email or Password not right';
                }else{
                    $state.go('app.dashboard-v1');
                }
            }, function(x) {
                $scope.authError = 'Server Error';
            });
    };*/
}]);