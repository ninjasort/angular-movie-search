'use strict';

/**
 * Search
 */

var Search = ($q, $rootScope, $sanitize, $timeout, $http, config) => {
    return {

        results: [],

        query: '',

        isLoading: false,

        fetchMovieDetails(id) {
            var moviesUrl = config.api.url;
            var detailUrl = moviesUrl.split('.json').splice(1, 0, id).join('');
            return $http.get(detailsUrl, {params: {apikey: config.api.key}, cache: true});
        },

        searchMovies(query) {
            var encodedQuery = $sanitize(query);

            this.isLoading = true;

            return $http({
                url: config.api.url,
                params: {
                    q: encodedQuery,
                    apikey: config.api.key,
                    page_limit: 3
                },
                method: 'GET',
                cache: true
            });
        },

        handleInput(val) {

            this.query = val;
            
            if (val) {
                this.searchMovies(val).then((res) => {
                    this.isLoading = false;
                    this.results = [];

                    if (res.data.length) {
                        this.results.concat(res.data.movies);
                    }
                });
            }
        }
    };
};

Search.$inject = ['$q', '$rootScope', '$sanitize', '$timeout', '$http', 'config'];

export default Search;