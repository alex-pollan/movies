angular.module('movieApi', ['ngResource'])
    .factory("MovieService", ['$resource', function ($resource) {
        "use strict";
        
        return $resource('http://www.omdbapi.com/?t=:searchText', {}, {
            query: {method : 'GET', params: {searchText : ''}, isArray : false}
        });
    }])
    .factory("TMDbService", ["$resource", function ($resource) {
        "use strict";

        var baseUrl = "https://api.themoviedb.org/3/movie/:verb?api_key=cbe280eff6a3307d0c9c27e0d9f1a0b3";
        
        return $resource(baseUrl, {}, {
            query: {method : 'GET', params: {verb: "popular"}, isArray : true}
        });
    }]);

