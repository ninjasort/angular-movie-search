'use strict';
/**
 * Search Controller
 */
angular.module('movieSearch.controllers', [])
    .controller('SearchCtrl', function($rootScope, $scope, Search) {
        // set up watchers
        $scope.$watch(function() {
            return Search.results;
        }, function(val) {
            if (val) {
                $scope.results = val;
            }
        });
        $scope.$watch(function() {
            return Search.query;
        }, function(val) {
            if (!val) {
                $scope.results = [];
            }
        });
        $scope.$watch(function() {
            return Search.isLoading;
        }, function(val) {
            $scope.isLoading = Search.isLoading;
        });
    });