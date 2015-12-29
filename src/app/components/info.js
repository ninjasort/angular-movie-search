/**
 * Info
 */
export default {
  bindings: {
    'onAddItemToWatchlist': '&'
  },
  templateUrl: 'views/_info.tpl.html',
  controller: [
    '$state',
    '$stateParams',
    'Search',
    function ($state, $stateParams, Search) {

      this.results = Search.results;
      this.details = Search.details;

      function _goHome() {
        $state.go('app.search');
      }

      // check query
      if (!$stateParams.id) {
        _goHome();
      }

      // set up modal
      $(() => {
        let modalOptions = {
          complete: () => {
            _goHome();
          }
        };
        $('#detail-modal').openModal(modalOptions);
      });

      this.addToWatchlist = (item) => {
        this.onAddItemToWatchlist({item: item});
      }

    }
  ]
}
