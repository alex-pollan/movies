'use strict';

angular.module('myApp.view1', ['ngRoute', 'movieApi'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [
    '$scope',
    'movieService',
    function($scope, movieService) {
        $scope.searchText = "";
        $scope.movies = null;

        $scope.search = function(){
            return movieService.search().then(function(movies) {
                $scope.movies = movies;
            });
        };
}]);