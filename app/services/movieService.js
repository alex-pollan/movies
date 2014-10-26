AppConsts = {};
AppConsts.TMDbApiBaseUrl = "https://api.themoviedb.org/3/{0}:verb?api_key=cbe280eff6a3307d0c9c27e0d9f1a0b3";

angular.module('movieApi', ['ngResource'])
    .factory("MovieService", ['$resource', function ($resource) {
        "use strict";
        
        return $resource('http://www.omdbapi.com/?t=:searchText', {}, {
            query: {method : 'GET', params: {searchText : ''}, isArray : false}
        });
    }])
    .factory("TMDbConfigService", ["$resource", function ($resource) {
        "use strict";

        return $resource(AppConsts.TMDbApiBaseUrl.replace("{0}", "configuration"), {}, {
            query: {method : 'GET', params: {verb: ""}, isArray : true}
        });
    }])
    .factory("TMDbService", ["$resource", function ($resource) {
        "use strict";
        
        return {
            movies: $resource(AppConsts.TMDbApiBaseUrl.replace("{0}", "movie/") + "&page=:page", {}, {
                query: {method : 'GET', params: {verb: "popular", page: 0}, isArray : true}
            })
        };
    }]);

