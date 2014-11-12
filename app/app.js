'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'myApp.viewPopular',
    'myApp.viewDetails',
    'myApp.version',
    'movieApi'
]).config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/popular'
        });
    }
]);
/*.run(function ($rootScope, $timeout, $window) {
    // This is the key to view transition happiness!
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $window.scrollTo(0, 0);
        }, 500);
    });
});*/