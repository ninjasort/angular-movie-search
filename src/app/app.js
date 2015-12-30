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
       * Movie Search View
       */
      .state('app.search', {
        url: '/',
        template: '<search></search>',
        resolve: {
          reset: [
            'App',
            function (App) {
              App.resetSearch();
              return App.watchlist();
            }
          ]
        }
      })
      /**
       * Movie Search Details
       */
      .state('app.search.details', {
        url: 'details/:id',
        template: '<info is-open="true" close-state="app.search" item="app.state.details" on-add-item-to-watchlist="app.onAddItemToWatchlist(item)"></info>',
        resolve: {
          details: [
            '$stateParams',
            'App', 
            function ($stateParams, App) {
              return App.fetchDetails($stateParams.id);
            }
          ]
        }
      })
      /**
       * Movie Watch List View
       */
      .state('app.watchlist', {
        url: '/watchlist',
        template: '<watch-list on-clear-watch="app.onClearWatch(id)" on-show-details="app.onShowDetails(item)" watchlist="app.state.watchlistItems"></watch-list>',
        resolve: {
          watchlist: [
            'App',
            function (App) {
              return App.watchlist();
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