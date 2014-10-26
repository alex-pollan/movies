'use strict';

angular.module('myApp.viewDetails', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details/:movieId', {
            templateUrl: 'viewDetails/view2.html',
            controller: 'ViewDetailsCtrl'
        });
    }])
    .controller('ViewDetailsCtrl', [
        '$scope',
        '$routeParams',
        'TMDbService',
        'TMDbConfigService',
        function ($scope, $routeParams, TMDbService, TMDbConfigService) {
            $scope.movieId = $routeParams.movieId;
            $scope.configService = TMDbConfigService;
    
            TMDbService.movie.get({verb: $scope.movieId}, function (data) {
                $scope.movie = data;
            });
        }]);