'use strict';

/**
 * Details Controller
 */
var DetailsCtrl = ($scope, $state, $stateParams, Search) => {

    function goHome() {
      $state.go('search');
    }

    $(() => {

        let modalOptions = {
          complete: () => {
            goHome();
          }
        };

        $('#detail-modal')
          .openModal(modalOptions);
    });

    if (!Search.query) {
        goHome();
    }

    $scope.detail = Search.results.filter((movie) => {
        return movie.slug === $stateParams.slug;
    })[0];
    
};

DetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'Search'];

export default DetailsCtrl;