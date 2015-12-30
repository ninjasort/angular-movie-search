/**
 * Info
 */
export default {
  isolate: false,
  bindings: {
    'isOpen': '=',
    'closeState': '@',
    'details': '=item',
    'addItemToWatchlist': '&onAddItemToWatchlist'
  },
  templateUrl: 'views/_info.tpl.html',
  controller: [
    '$scope',
    '$state',
    '$stateParams',
    'App',
    function ($scope, $state, $stateParams, App) {

      this.toggleModal = (val) => {
        if (val) {
          $('#detail-modal').openModal({
            complete: () => {
              this.isOpen = false;
              if (this.closeState) {
                $state.go(this.closeState);
              }
              $scope.$apply();
            }
          });
        }
      }


      $scope.$watch(angular.bind(this, function () {
        return this.isOpen;
      }), this.toggleModal.bind(this));

    }
  ]
}
