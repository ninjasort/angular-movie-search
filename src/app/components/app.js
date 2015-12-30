/**
 * App
 */
export default {
  bindings: {},
  templateUrl: 'views/_app.tpl.html',
  controller: [
    '$state',
    'App',
    function ($state, App) {

      angular.extend(this, App);

      this.onAddItemToWatchlist = (item) => {
        this.watchlist(item);
      }

      this.onClearWatch = (id) => {
        this.clearWatch(id);
      }

      this.onShowDetails = (item) => {
        this.showDetails(item);
      }

    }
  ]
}