/**
 * Watch List
 */
export default {
  isolate: false,
  bindings: {
    watchlist: '=',
    clearWatch: '&onClearWatch',
    showDetails: '&onShowDetails'
  },
  templateUrl: 'views/_watch-list.tpl.html',
  controllerAs: 'watchList'
};