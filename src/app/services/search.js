/**
 * Search
 */
import angular from 'angular';

export default [
  '$q',
  '$rootScope',
  '$sanitize',
  '$timeout',
  '$http',
  'localStorageService',
  'config',
  function ($q, $rootScope, $sanitize, $timeout, $http, localStorageService, config) {

    return {    
      results: [],
      query: '',
      details: null,
      watchlistItems: [],
      
      /**
       * Fetch details for a given movie
       * @param  {string} id the id of the movie
       * @return {object} a promise
       */
      fetchDetails(id) {
        return $http({
          url: [config.api.url, id].join('/'),
          cache: true
        }).then((res) => {
          return this.details = res.data;
        });
      },

      /**
       * Search for a movie
       * @param  {string} query the query
       * @return {object} a promise
       */
      search(query) {
        var encodedQuery = $sanitize(query);

        this.isLoading = true;

        return $http({
          url: config.api.url,
          params: {
            q: encodedQuery,
            page_limit: 5
          },
          method: 'GET',
          cache: true
        }).then((res) => {
          this.isLoading = false;
          this.results = [];
          this.error = '';

          if (res.data.length) {
            this.results.concat(res.data.movies);
          } else if (res.data.movies && res.data.movies.length) {
            this.results = res.data.movies;
          } else {
            this.error = res.data.error || 'No movies found.';
          }

          return res.data;        
        });
      },

      watchlist(val) {
        var dfd = $q.defer();
        if (!localStorageService.isSupported) {
          return false;
        }

        if (val) {
          localStorageService.set('watchlist', val);
          this.watchlistItems = localStorageService.get('watchlist');
        } else {
          this.watchlistItems = localStorageService.get('watchlist');
        }
        console.log(this.watchlistItems);
        dfd.resolve(this.watchlistItems);
        return dfd.promise;
      },

      clearWatch(id) {
        if (this.watchlistItems.length) {
          return this.watchlistItems = this.watchlistItems.filter((item) => {
            return item.id !== id;
          });
        }
      }

    };
  }
]
