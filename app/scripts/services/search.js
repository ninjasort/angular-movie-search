'use strict';

/**
 * Search
 */

var Search = ($q, $rootScope, $sanitize, $timeout, $http, config) => {
    return {

        results: [],

        query: '',

        isLoading: false,

        searchMovies(query) {
            var encodedQuery = $sanitize(query);

            this.isLoading = true;

            return $http({
                url: config.api.url,
                params: {
                    t: encodedQuery,
                    r: 'json'
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
                        this.results.concat(res.data);
                    } else {
                        var result = '';
                        try {
                            res.data.slug = res.data.Title.toLowerCase().split(' ').join('-');
                            result = res.data;
                        } catch (e) {
                            if (res.data.Error) {
                                result = {error: res.data.Error};
                            }
                        }
                        this.results.push(result);
                    }
                });
            }
        }
    };
};

Search.$inject = ['$q', '$rootScope', '$sanitize', '$timeout', '$http', 'config'];

export default Search;