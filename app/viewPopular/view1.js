'use strict';

angular.module('myApp.viewPopular', ['ngRoute', 'movieApi'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/popular', {
            templateUrl: 'viewPopular/view1.html',
            controller: 'ViewPopularCtrl'
        });
    }])
    .controller('ViewPopularCtrl', [
        '$scope',
        'TMDbConfigService',
        'TMDbService',
        function ($scope, TMDbConfigService, TMDbService) {
            var imagesConfig = null;
            var moviesRaw = null;
            
            function moveToPage(pageIndex) {
                $scope.page = pageIndex;
                
                TMDbService.movies.get({verb: "popular", page: pageIndex}, function (data) {
                    moviesRaw = data;
                    $scope.movies = data.results;
                });
            }

            $scope.searchText = "";
            $scope.movies = null;
            $scope.page = 1;
            $scope.configService = TMDbConfigService;
            
            $scope.nextPageAvail = function () {
                return moviesRaw && $scope.page < moviesRaw.total_pages;
            };
            
            $scope.prevPageAvail = function () {
                return $scope.page > 1;
            };
            
            $scope.nextPage = function () {
                if ($scope.nextPageAvail()) {
                    moveToPage($scope.page + 1);
                }
            };
            
            $scope.prevPage = function () {
                if ($scope.prevPageAvail()) {
                    moveToPage($scope.page - 1);
                }
            };                  
            
            moveToPage(1);
        }]);