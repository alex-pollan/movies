'use strict';

angular.module('myApp.viewPopular', ['ngRoute', 'movieApi'])
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/popular', {
                templateUrl: 'viewPopular/view1.html',
                controller: 'ViewPopularCtrl'
            });
    }])
    .controller('ViewPopularCtrl', [
        '$scope',
        'TMDbConfigService',
        'TMDbService',
        //'$modal',
        function ($scope, TMDbConfigService, TMDbService/*,$modal*/) {
            //TODO: use $anchorScroll 
            //      http://stackoverflow.com/questions/14107531/retain-scroll-position-on-route-change-in-angularjs

            var imagesConfig = null,
                totalPages = 2;

            $scope.configService = TMDbConfigService;
            $scope.movies = [];
            $scope.page = 0;
            
            $scope.foundMovies = [];

            $scope.loadMoreData = function () {
                $scope.page += 1;

                if ($scope.page >= totalPages) {
                    return;
                }

                TMDbService.movies.get({
                    verb: "popular",
                    page: $scope.page
                }, function (data) {
                    totalPages = data.total_pages;
                    data.results.forEach(function (item) {
                        item.poster_path = $scope.configService.getPosterImageUrl(item.poster_path);
                        $scope.movies.push(item);
                    });
                });
            };            
            
            $scope.loadMovieDetail = function (movieId) {
                TMDbService.movie.get({
                    verb: movieId
                }, function (data) {
                    $scope.selectedMovie = data;
                });            
            };
            
            $scope.searchMovies = function() {
                $scope.foundMovies = [];
                var searchText = $scope.searchText;
                if (searchText && searchText.length > 3) {
                    TMDbService.movieSearch.get({
                        query: searchText
                        //TODO: paging
                    }, function (data) {
                        data.results.forEach(function (item) {
                            item.poster_path = $scope.configService.getPosterImageUrl(item.poster_path);
                            $scope.foundMovies.push(item);
                        });
                    });
                } 
            };
            
//            $scope.showDetails = function (movie) {
//                var modalInstance = $modal.open({
//                    templateUrl: 'movieDetails.html',
//                    controller: 'ViewDetailsCtrl',
//                    resolve: {
//                        movieId: function () {
//                            return movie.id;
//                        }
//                    }
//                });
//
//                modalInstance.result.then(function (selectedItem) {
//                    //ok
//                }, function () {
//                    //cancel
//                });
//            };


            $scope.loadMoreData();
        }]);



//angular.module('myApp.viewPopular')
//    .controller('ViewDetailsCtrl', [
//        '$scope',
//        '$modalInstance',
//        'TMDbService',
//        'TMDbConfigService',
//        'movieId',
//        function ($scope, $modalInstance, TMDbService, TMDbConfigService, movieId) {
//            $scope.movieId = movieId;
//            $scope.configService = TMDbConfigService;
//
//            TMDbService.movie.get({
//                verb: $scope.movieId
//            }, function (data) {
//                $scope.movie = data;
//            });
//        }]);