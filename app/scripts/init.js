'use strict';

/**
 * Init
 */

import angular from 'angular';
import movieSearch from './app';

angular.element(document).ready(function () {
  angular.bootstrap(document, [movieSearch]);
});