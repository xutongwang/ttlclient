/**
 * Created by wangxt on 2017/6/1.
 */
adlock.constant('USER_ROLES',{
    all : '*',
    admin : 'admin',
    editor : 'editor',
    guest : 'guest'
}).constant('AUTH_EVENTS',{
    loginSuccess : 'auth-login-success',
    loginFailed : 'auth-login-failed',
    logoutSuccess : 'auth-logout-success',
    sessionTimeout : 'auth-session-timeout',
    notAuthenticated : 'auth-not-authenticated',
    notAuthorized : 'auth-not-authorized'
})