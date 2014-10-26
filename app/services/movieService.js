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
        
        var imagesConfig,
            getBackdropImageUrl = function (file) {
                if (!imagesConfig) {
                    return;
                }
                return imagesConfig.base_url + "/" + imagesConfig.backdrop_sizes[0] + "/" + file;
            },
            getPosterImageUrl = function (file) {
                if (!imagesConfig) {
                    return;
                }
                return imagesConfig.base_url + "/" + imagesConfig.poster_sizes[2] + "/" + file;
            },
            res = $resource(AppConsts.TMDbApiBaseUrl.replace("{0}", "configuration"), {}, {
                query: {method : 'GET', params: {verb: ""}, isArray : true}
            });
        
        res.get({verb: ""}, function (data) {
            imagesConfig = data.images;
        });
        
        return {
            getBackdropImageUrl: getBackdropImageUrl,
            getPosterImageUrl: getPosterImageUrl
        };
    }])
    .factory("TMDbService", ["$resource", function ($resource) {
        "use strict";
        
        return {
            movies: $resource(AppConsts.TMDbApiBaseUrl.replace("{0}", "movie/") + "&page=:page", {}, {
                query: {method : 'GET', params: {verb: "popular", page: 0}, isArray : true}
            }),
            movie: $resource(AppConsts.TMDbApiBaseUrl.replace("{0}", "movie/"), {}, {
                query: {method : 'GET', params: {verb: ""}, isArray : true}
            })
        };
    }]);

