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

      /**
       * Global app state
       * @type {Object}
       */
      state: {
        results: [],
        query: '',
        details: null,
        error: null,
        watchlistItems: []
      },

      /**
       * Set the state of the app
       * @param {object} the new state
       */
      setState(state) {
        angular.extend(this.state, state);
      },
      
      /**
       * Fetch details for a given movie
       * @param  {string} id the id of the movie
       * @return {object} a promise
       */
      fetchDetails(id) {
        var dfd = $q.defer();
        var tryItem = this.getWatchlistItem(id);

        if (tryItem) {
          dfd.resolve(tryItem);
        } else {
          $http({
            url: [config.api.url, id].join('/'),
            cache: true
          }).then((res) => {
            this.state.details = res.data;
            dfd.resolve(res.data);
          })
          .catch((err) => {
            dfd.reject(err);
          })
        }

        return dfd.promise;
      },

      /**
       * Search for a movie
       * @param  {string} query the query
       * @return {object} a promise
       */
      search(query) {
        var encodedQuery = $sanitize(query);

        this.state.isLoading = true;

        return $http({
          url: config.api.url,
          params: {
            q: encodedQuery,
            page_limit: 5
          },
          method: 'GET',
          cache: true
        }).then((res) => {
          this.setState({
            isLoading: false
          });
          
          if (res.data.movies && res.data.movies.length) {
            var results = res.data.movies;
            this.refreshResults(results);
          } else {
            this.setState({
              error: res.data.error || 'No movies found'
            });
          }

          return this.state.results;
        });
      },

      /**
       * Refresh results and check watchlist items
       * Useful for appending any new state added during saving to localStorage
       * @param  {object} results the new results
       * @return {object} a state of the refreshed results
       */
      refreshResults(results) {
        var r;
        if (results) {
          r = results;
        } else {
          r = this.state.results;
        }
        var set = r.map((item, i) => {
          if (!this.state.watchlistItems) {
            this.state.watchlistItems = [];
            return item;
          }
          // check in watchlist
          for(var j = 0; j < this.state.watchlistItems.length; j++) {
            if (parseInt(this.state.watchlistItems[j].id) === parseInt(item.id)) {
              return this.state.watchlistItems[j];
            }
          }
          // return new item if not found
          return item;
        });
        this.state.results = set;
      },

      /**
       * Clear Results
       */
      resetSearch() {
        this.setState({
          query: '',
          details: null,
          results: []
        });
      },

      /** 
       * Open details modal
       * @param  {object} item the new item to show
       */
      showDetails(item) {
        this.setState({
          detailsOpen: true,
          details: item
        });
      },

      /**
       * Get the watch list item by id
       * @param  {string} id id
       * @return {object, null} a watch list item
       */
      getWatchlistItem(id) {
        if (!localStorageService.isSupported) {
          return false;
        }
        var items = localStorageService.get('watchlist');
        if (!items) {
          return false;
        }
        var selected = items.filter((item) => {
          return parseInt(item.id) === parseInt(id);
        });
        if (selected.length) {
          return this.state.details = selected[0];
        } else {
          return false;
        }
      },

      /**
       * Get or Set the watch list
       * @param  {object} val the movie item
       * @return {object} a promise with watch list items
       */
      watchlist(val) {
        var dfd = $q.defer();
        if (!localStorageService.isSupported) {
          return false;
        }

        if (val) {
          // grab the storage cache
          var items = localStorageService.get('watchlist');
          
          // check if items already exist
          if (!Array.isArray(items)) {
            items = [];
          }

          // check if it exists
          var alreadyExists = items.filter((item) => {
            return parseInt(item.id) === parseInt(val.id);
          });

          if (!alreadyExists.length) {
            // set item to added
            val.inWatchlist = true;
            // add item to watch list
            items = items.concat(val);
            // update global state
            localStorageService.set('watchlist', items);
            this.state.watchlistItems = items;
            this.refreshResults();
          }

        } else {
          this.state.watchlistItems = localStorageService.get('watchlist');
        }

        dfd.resolve(this.state.watchlistItems);
        
        return dfd.promise;
      },

      /**
       * Clear the watch list item
       * @param  {string} id the watch list item id
       * @return {object} the modified watchlist items
       */
      clearWatch(id) {
        
        if (!localStorageService.isSupported) {
          return false;
        }

        if (this.state.watchlistItems.length) {
          // filter out the cleared items
          this.state.watchlistItems = this.state.watchlistItems.filter((item) => {
            return parseInt(item.id) !== parseInt(id);
          });

          // update item storage
          localStorageService.set('watchlist', this.state.watchlistItems);

          return this.state.watchlistItems;
        }
      }

    };
  }
]
