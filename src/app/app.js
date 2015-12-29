/**
 * Movie Search
 */

import angular from 'angular';
import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-local-storage';
import './app.config';

angular.module('movieSearch', [
  'ui.router',
  'ngSanitize',
  'LocalStorageModule',
  'movieSearch.config',
  'movieSearch.services',
  'movieSearch.components'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  'localStorageServiceProvider',
  function ($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    
    localStorageServiceProvider.setPrefix('AMS');
    
    $stateProvider
      .state('app', {
        abstract: true,
        url: '',
        template: '<app></app>'
      })
      /**
       * Movie Search
       */
      .state('app.search', {
        url: '/',
        template: '<search is-loading="app.isLoading" results="app.results"></search>'
      })
      /**
       * Movie Details
       */
      .state('app.search.details', {
        url: '/details/:id',
        template: '<info on-add-item-to-watchlist="app.onAddItemToWatchlist(item)"></info>',
        resolve: {
          details: [
            '$stateParams',
            'Search', 
            function ($stateParams, Search) {
              return Search.fetchDetails($stateParams.id);
            }
          ]
        }
      })
      /**
       * Movie Watch List
       */
      .state('app.watchlist', {
        url: '/watchlist',
        template: '<watch-list on-clear-watch="app.onClearWatch(id)" watchlist="app.watchlist"></watch-list>',
        resolve: {
          watchlist: [
            'Search',
            function (Search) {
              return Search.watchlist();
            }
          ]
        }
      });

    $urlRouterProvider.otherwise('/');

  }
]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['movieSearch']);
});