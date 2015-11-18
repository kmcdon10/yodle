'use strict';
window.app = angular.module('YodleApp', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// app.run is for controlling access to specific states.
app.run(function ($rootScope, $state) {
    // $stateChangeStart is an event fired when the process of changing a state begins.
    // $rootScope.$on('$stateChangeStart', function (event, toState) {
    //   $state.go(toState.name);
    // });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
        $rootScope.currentstate = toState.name;
    });
});