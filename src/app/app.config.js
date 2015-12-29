import angular from 'angular';
import SearchService from './services/search';
import App from './components/app';
import SearchInput from './components/search-input';
import Info from './components/info';
import Search from './components/search';
import WatchList from './components/watch-list';

/**
 * Config
 */
angular.module('movieSearch.config', [])
  .constant('config', {
    api: {
      url: 'http://velocitycoding-api.herokuapp.com/movies'
    }
  });

/**
 * Services
 */
angular.module('movieSearch.services', [])
  .factory('Search', SearchService);

/**
 * Directives
 */
angular.module('movieSearch.components', [])
  .component('app', App)
  .component('searchInput', SearchInput)
  .component('info', Info)
  .component('search', Search)
  .component('watchList', WatchList);