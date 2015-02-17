'use strict';

/**
 * Search Input
 */
var SearchInput = (Search) => {
    return {
        restrict: 'E',
        scope: {},
        template: [
            '<div class="search-input">',
                '<input type="text" ng-model="query" placeholder="Search for a movie..."></input>',
                '<i ng-click="resetQuery()" ng-show="query.length" class="mdi-navigation-close"></i>',
            '</div>'
        ].join(''),

        link(scope, el, attrs) {
            el.bind('keydown', (e) => {
                if (e.keyCode === 13) {
                    Search.handleInput(scope.query);
                }
            });

            scope.resetQuery = () => {
                Search.query = '';
                scope.query = '';
            };
        }
    };
};

SearchInput.$inject = ['Search'];

export default SearchInput;