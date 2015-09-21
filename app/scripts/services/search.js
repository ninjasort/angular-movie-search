/**
 * Search
 */
var Search = ($q, $rootScope, $sanitize, $timeout, $http, config) => {
    return {

        results: [],

        query: '',

        isLoading: false,

        fetchMovieDetails(id) {
            return $http({
                url: [config.api.url, id].join('/'),
                cache: true
            });
        },

        searchMovies(query) {
            var encodedQuery = $sanitize(query);

            this.isLoading = true;

            return $http({
                url: config.api.url,
                params: {
                    q: encodedQuery,
                    page_limit: 1
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
                    this.error = '';
                    
                    if (res.data.length) {
                        this.results.concat(res.data.movies);
                    } else if (res.data.movies && res.data.movies.length){
                        this.results = res.data.movies;
                    } else {
                        this.error = res.data.error || 'No movies found.';
                    }
                });
            }
        }
    };
};

Search.$inject = ['$q', '$rootScope', '$sanitize', '$timeout', '$http', 'config'];

export default Search;