'use strict';

/**
 * Details Controller
 */
var DetailsCtrl = ($scope, $state, $stateParams, Search) => {

    function goHome() {
      $state.go('search');
    }

    function getMovie() {
      // get movie selected
      var selectedMovie = Search.results.filter((movie) => {
          return movie.slug === $stateParams.slug;
      })[0];
      // fetch movie details
      return Search.fetchMovieDetails(selectedMovie.id);
    }

    // set up modal
    $(() => {
        let modalOptions = {
          complete: () => {
            goHome();
          }
        };

        $('#detail-modal')
          .openModal(modalOptions);
    });

    // check query
    if (!Search.query) {
      goHome();
    }

    /**
     * Get movie details
     */
    getMovie().then(function (res) {
      $scope.detail = res.data;
    });

    
};

DetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'Search'];

export default DetailsCtrl;