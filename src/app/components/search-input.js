/**
 * Search Input
 */
import angular from 'angular';

export default {
  bindings: {
    'onSearch': '&',
    'onClearResults': '&'
  },
  template: [
    '<div class="search-input" ng-keydown="searchInput.handleInput($event)">',
      '<input type="text" ng-model="searchInput.query" placeholder="Search for a movie..."></input>',
      '<a href ng-click="searchInput.resetQuery()"><i ng-show="searchInput.query.length" class="mdi-navigation-close"></i></a>',
    '</div>'
  ].join(''),
  controller: [
    'Search', 
    function (Search) {

      /**
       * Handle key input
       * @param  {object} e the event
       */
      this.handleInput = (e) => {
        if (e.keyCode === 13 && this.query) {
          this.onSearch({query: this.query});
        }
      }

      this.resetQuery = () => {
        this.query = '';
        this.onClearResults();
      }

    }
  ]
};