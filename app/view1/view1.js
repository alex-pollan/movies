'use strict';

angular.module('myApp.view1', ['ngRoute', 'movieApi'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .controller('View1Ctrl', [
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

            $scope.resolveBackdropImageUrl = function (file) {
                if (!imagesConfig) {
                    return;
                }
                return imagesConfig.base_url + "/" + imagesConfig.backdrop_sizes[0] + "/" + file;
            };
            
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
                    
            TMDbConfigService.get({verb: ""}, function (data) {
                imagesConfig = data.images;
            });
            
            
            moveToPage(1);
        }]);