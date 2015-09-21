/**
 * Search Controller
 */
var SearchCtrl = ($rootScope, $scope, Search) => {
    // set up watchers
    $scope.$watch(() => {
        return Search.results;
    }, (val) => {
        if (val) {
            $scope.results = val;
        }
    });
    $scope.$watch(() => {
        return Search.query;
    }, (val) => {
        if (!val) {
            $scope.query = Search.query;
            $scope.results = [];
        }
    });
    $scope.$watch(() => {
        return Search.isLoading;
    }, (val) => {
        $scope.isLoading = Search.isLoading;
    });
    $scope.$watch(() => {
        return Search.error;
    }, (val) => {
        $scope.error = Search.error;
    });
};

SearchCtrl.$inject = ['$rootScope', '$scope', 'Search'];

export default SearchCtrl;
