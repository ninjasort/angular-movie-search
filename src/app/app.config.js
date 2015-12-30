// Dependencies
// -------------------------------------------------
import angular from 'angular';

// Services
// -------------------------------------------------
import AppService from './services/app';

// Components
// -------------------------------------------------
// views
import App from './components/app';
import Search from './components/search';
// widgets
import SearchInput from './components/search-input';
import SearchResults from './components/search-results';
import Info from './components/info';
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
  .factory('App', AppService);

/**
 * Directives
 */
angular.module('movieSearch.components', [])
  .component('app', App)
  .component('searchInput', SearchInput)
  .component('info', Info)
  .component('search', Search)
  .component('searchResults', SearchResults)
  .component('watchList', WatchList);