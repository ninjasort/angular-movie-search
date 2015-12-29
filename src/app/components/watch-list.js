/**
 * Watch List
 */
export default {
  bindings: {
    watchlist: '=',
    onClearWatch: '&'
  },
  templateUrl: 'views/_watch-list.tpl.html',
  controller: [
    '$state',
    '$stateParams',
    'Search',
    function ($state, $stateParams, Search) {
      
      this.clearWatch = (id) => {
        this.onClearWatch({id: id});
      }
    }
  ]
};
