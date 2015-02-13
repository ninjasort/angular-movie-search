'use strict';

/**
 * About Controller
 */
angular.module('movieSearch.controllers')
    .controller('DetailsCtrl', function($scope, $state, $stateParams, Search) {

        $(function() {
            $('#detail-modal').openModal();
        });

        if (!Search.query) {
            $state.go('search');
        }

        $scope.detail = Search.results.filter(function(movie) {
            return movie.slug === $stateParams.slug;
        })[0];

    });