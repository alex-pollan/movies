'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'myApp.viewPopular',
    'myApp.viewDetails',
    'myApp.version',
    'movieApi'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/popular'});
}]);

