'use strict';
angular.module('movieSearch.components', [])
    .directive('searchInput', function(Search) {
        return {
            restrict: 'E',
            scope: {},
            template: [
                '<div class="search-input">',
                '<input type="text" ng-model="query" placeholder="Search for a movie..."></input>',
                '<i ng-click="resetQuery()" ng-show="query.length" class="mdi-navigation-close"></i>',
                '</div>'
            ].join(''),
            link: function(scope, el, attrs) {
                el.bind('keydown', function(e) {
                    if (e.keyCode === 13) {
                        Search.handleInput(scope.query);
                    }
                });
                scope.resetQuery = function() {
                    Search.query = '';
                    scope.query = '';
                };
            }
        };
    });