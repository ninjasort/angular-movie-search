'use strict';

/**
 * Movie Search
 */

import {services, controllers, directives, config} from './app.config';

var movieSearch = 'movieSearch';
var appConfig = ($stateProvider, $urlRouterProvider) => {

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
            url: '/details/:id',
            templateUrl: 'views/details.html',
            controller: 'DetailsCtrl'
        });

    $urlRouterProvider.otherwise('/');
};

appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

angular.module(movieSearch, [
    'ui.router',
    'ngSanitize',
    config,
    services,
    controllers,
    directives
]).config(appConfig);

export default movieSearch;