'use strict';//严格模式
angular.module('adlock').config(['$stateProvider','$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
        $urlRouterProvider
            .otherwise('/static/signin');
        $stateProvider
            .state('static', {
                url: '/static',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('static.signin', {
                url: '/signin',
                templateUrl: 'app/html/page_signin.html',
                /*                resolve: {
                 deps: ['uiLoad',
                 function( uiLoad ){
                 return uiLoad.load('app/js/adlock/user/login.js');
                 }]
                 }*/
                controller: 'LoginController',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load('app/js/adlock/user/login.js');
                        }]
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/html/app_dashboard_v1.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function( $ocLazyLoad ){
                            return $ocLazyLoad.load(['app/js/adlock/chart.js']);
                        }]
                }
            })
    }
]);