'use strict';

adlock.factory('sessionInjector', ['$rootScope','$q'/*,'SessionService'*/,'AUTH_EVENTS','$injector', function ($rootScope,$q,/*SessionService,*/AUTH_EVENTS,$injector) {
    var sessionInjector = {
        request: function (config) {
            var url = config.url;
            if (url.indexOf('html') != -1
                || url.indexOf('js') != -1
                || url.indexOf('css') != -1
                || url.indexOf('jpg') != -1
                || url.indexOf('png') != -1) {

            } else {
                if(url.indexOf('web/login') == -1){//其他页面url访问程序
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    var stateService = $injector.get('$state');
                    stateService.go('static.signin');
                }
            }
            return config;
        },
        responseError: function (response) {
            if(response.status == '500998'){//session过期
                $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout);
            }else if(response.status == '500997'){//用户权限不够
                if(typeof  response.data.message != 'undefined' ){
                    $.xAlertSure({content:response.data.message})
                }
            }else {
                var errorInfo = response.statusText+",出错啦!错误代码:"+response.status;
                if(typeof  response.data.message != 'undefined' ){
                    errorInfo += ",错误信息:"+response.data.message;
                }
                $.xAlertSure({content:errorInfo})
            }
            return $q.reject(response);
        }
    };
    return sessionInjector;
}]);