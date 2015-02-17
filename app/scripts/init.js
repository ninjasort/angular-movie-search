'use strict';

/**
 * Init
 */

import movieSearch from './app';

angular.element(document).ready(function () {
  angular.bootstrap(document, [movieSearch]);
});