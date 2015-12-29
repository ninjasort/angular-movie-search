/**
 * App
 */
export default {
  bindings: {},
  templateUrl: 'views/_app.tpl.html',
  controller: [
    'Search',
    function (Search) {

      // App State
      // ----------------------------------------
      this.isLoading = false;
      this.results = Search.results;
      this.watchlist = Search.watchlistItems;

      /**
       * Search a query
       * @param  {object} query the query string
       */
      this.search = (query) => {
        this.isLoading = true;
        Search.search(query).then((data) => {
          this.isLoading = false;
          this.results = this.results.concat(data.movies);
        })
        .catch((err) => {
          this.error = err;
        });
      }

      /**
       * Clear Results
       */
      this.clearResults = () => {
        this.results = Search.results = [];
      }

      this.onAddItemToWatchlist = (item) => {
        var list = Search.watchlistItems || [];
        var added = list.concat(item);
        Search.watchlist(added);
      }

      this.onClearWatch = (id) => {
        this.watchlist = Search.clearWatch(id);
      }

    }
  ]
}