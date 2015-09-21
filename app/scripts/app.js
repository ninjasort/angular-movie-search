/**
 * Movie Search
 */

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import {
    services,
    controllers,
    directives,
    config
} from './app.config';

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
    uiRouter,
    ngSanitize,
    config,
    services,
    controllers,
    directives
]).config(appConfig);

export default movieSearch;