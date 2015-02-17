'use strict';

/**
 * Details Controller
 */
var DetailsCtrl = ($scope, $state, $stateParams, Search) => {

    $(() => {
        $('#detail-modal').openModal();
    });

    if (!Search.query) {
        $state.go('search');
    }

    $scope.detail = Search.results.filter((movie) => {
        return movie.slug === $stateParams.slug;
    })[0];
    
};

DetailsCtrl.$inject = ['$scope', '$state', '$stateParams', 'Search'];

export default DetailsCtrl;