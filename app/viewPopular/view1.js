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
            //TODO: use $anchorScroll 
            //      http://stackoverflow.com/questions/14107531/retain-scroll-position-on-route-change-in-angularjs
            
            var imagesConfig = null,
                totalPages = 2,
                configService = TMDbConfigService;
            
            $scope.movies = [];
            $scope.page = 0;
            
            $scope.loadMoreData = function () {
                $scope.page += 1;
                
                if ($scope.page >= totalPages) {
                    return;
                }

                TMDbService.movies.get({verb: "popular", page: $scope.page}, function (data) {
                    totalPages = data.total_pages;
                    data.results.forEach(function (item) {
                        item.poster_path = configService.getPosterImageUrl(item.poster_path);
                        $scope.movies.push(item);
                    });
                });
            };
                                  
            $scope.loadMoreData();
        }]);
//    .controller('ViewPopularCtrl', [
//        '$scope',
//        'TMDbConfigService',
//        'TMDbService',
//        function ($scope, TMDbConfigService, TMDbService) {
//            var imagesConfig = null,
//                moviesRaw = null;
//            
//            function moveToPage(pageIndex) {
//                $scope.page = pageIndex;
//                
//                TMDbService.movies.get({verb: "popular", page: pageIndex}, function (data) {
//                    moviesRaw = data;
//                    $scope.movies = data.results;
//                });
//            }
//
//            $scope.searchText = "";
//            $scope.movies = null;
//            $scope.page = 1;
//            $scope.configService = TMDbConfigService;
//            
//            $scope.nextPageAvail = function () {
//                return moviesRaw && $scope.page < moviesRaw.total_pages;
//            };
//            
//            $scope.prevPageAvail = function () {
//                return $scope.page > 1;
//            };
//            
//            $scope.nextPage = function () {
//                if ($scope.nextPageAvail()) {
//                    moveToPage($scope.page + 1);
//                }
//            };
//            
//            $scope.prevPage = function () {
//                if ($scope.prevPageAvail()) {
//                    moveToPage($scope.page - 1);
//                }
//            };
//            
//            moveToPage(1);
//        }]);