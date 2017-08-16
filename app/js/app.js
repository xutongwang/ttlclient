'use strict';//严格模式
var adlock = angular.module('adlock', [
    'ui.router',
    'ui.load',
    'oc.lazyLoad'
]);

adlock.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', function ($rootScope, $state, $stateParams, $window, $templateCache) {
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    // Uncomment this to disable template cache
    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
     if (typeof(toState) !== 'undefined'){
     $templateCache.remove(toState.templateUrl);
     }
     });*/

    // Scope Globals
    // -----------------------------------
    $rootScope.app = {
        name: 'Angle',
        description: 'Angular Bootstrap Admin Template',
        year: ((new Date()).getFullYear()),
        layout: {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false,
            theme: null
        },
        useFullLayout: false,
        hiddenFooter: false,
        viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
        name:     'John',
        job:      'ng-developer',
        picture:  'app/img/user/02.jpg'
    };

}]);

adlock.config([ '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        // lazy controller, directive and service
        adlock.controller = $controllerProvider.register;
        adlock.directive  = $compileProvider.directive;
        adlock.filter     = $filterProvider.register;
        adlock.factory    = $provide.factory;
        adlock.service    = $provide.service;
        adlock.constant   = $provide.constant;
        adlock.value      = $provide.value;
    }
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}])