'use strict';

/**
 * Movie Search
 */
angular.module('movieSearch', [
    'ui.router',
    'ngSanitize',
    'movieSearch.config',
    'movieSearch.services',
    'movieSearch.controllers',
    'movieSearch.components'
])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            /**
             * Search a Movie
             */
            .state('search', {
                url: '/',
                templateUrl: 'views/search-results.html',
                controller: 'SearchCtrl'
            })
            /**
             * View Movie Details
             */
            .state('details', {
                url: '/details/:slug',
                templateUrl: 'views/details.html',
                controller: 'DetailsCtrl'
            })

        $urlRouterProvider.otherwise('/');

    });