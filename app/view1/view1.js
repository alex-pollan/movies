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
    'TMDbService',
    function($scope, TMDbService) {
        $scope.searchText = "";
        $scope.movies = null;
        
        TMDbService.get({verb: "popular"}, function(data) {
            $scope.movies = data.results;
        });
}]);