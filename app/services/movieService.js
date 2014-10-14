angular.module('movieApi', ['ngRoute']).service("movieService",
    function ($http) {
        "use strict";
    
        return {
            search: function (searchText) {
                return $http.get("http://www.omdbapi.com/?t=" + searchText).then(function (response) {
                    var movies = [ response.data.data ];
                    return movies;
                });
            }
        };
    });