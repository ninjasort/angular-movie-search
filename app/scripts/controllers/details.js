/**
 * Details Controller
 */
var DetailsCtrl = ($scope, $state, $stateParams, Search) => {

    function goHome() {
        $state.go('search');
    }

    // check query
    if (!$stateParams.id) {
        goHome();
    }

    // set up modal
    $(() => {
        let modalOptions = {
            complete: () => {
                goHome();
            }
        };

        /**
         * Get movie details
         */
        Search.fetchMovieDetails($stateParams.id).then(function(res) {
            $scope.detail = res.data;
            $('#detail-modal').openModal(modalOptions);
        });
    });

};

DetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'Search'];

export default DetailsCtrl;
