(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/**
 * Init
 */

var movieSearch = _interopRequire(require("./app"));

angular.element(document).ready(function () {
  angular.bootstrap(document, [movieSearch]);
});

},{"./app":3}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// ------------------------------------------------
// Imports
// ------------------------------------------------

/**
 * Services
 */
var Search = _interopRequire(require("./services/search"));

/**
 * Controllers
 */
var DetailsCtrl = _interopRequire(require("./controllers/details"));

var SearchCtrl = _interopRequire(require("./controllers/search"));

/**
 * Directives
 */
var SearchInput = _interopRequire(require("./directives/search-input"));

// ------------------------------------------------
// Module Registration
// ------------------------------------------------
var config = "movieSearch.config";
var services = "movieSearch.services";
var controllers = "movieSearch.controllers";
var directives = "movieSearch.directives";

/**
 * Config
 */
angular.module(config, []).constant("config", {
  api: {
    url: "http://www.omdbapi.com"
  }
});

/**
 * Services
 */
angular.module(services, []).factory("Search", Search);

/**
 * Controllers
 */
angular.module(controllers, []).controller("DetailsCtrl", DetailsCtrl).controller("SearchCtrl", SearchCtrl);

/**
 * Directives
 */
angular.module(directives, []).directive("searchInput", SearchInput);

exports.services = services;
exports.controllers = controllers;
exports.directives = directives;
exports.config = config;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./controllers/details":4,"./controllers/search":5,"./directives/search-input":6,"./services/search":7}],3:[function(require,module,exports){
"use strict";

/**
 * Movie Search
 */

var _appConfig = require("./app.config");

var services = _appConfig.services;
var controllers = _appConfig.controllers;
var directives = _appConfig.directives;
var config = _appConfig.config;


var movieSearch = "movieSearch";
var appConfig = function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    /**
     * Search a Movie
     */
    .state("search", {
        url: "/",
        templateUrl: "views/search-results.html",
        controller: "SearchCtrl"
    })
    /**
     * View Movie Details
     */
    .state("details", {
        url: "/details/:slug",
        templateUrl: "views/details.html",
        controller: "DetailsCtrl"
    });

    $urlRouterProvider.otherwise("/");
};

appConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

angular.module(movieSearch, ["ui.router", "ngSanitize", config, services, controllers, directives]).config(appConfig);

module.exports = movieSearch;

},{"./app.config":2}],4:[function(require,module,exports){
"use strict";

/**
 * Details Controller
 */
var DetailsCtrl = function ($scope, $state, $stateParams, Search) {
  function goHome() {
    $state.go("search");
  }

  $(function () {
    var modalOptions = {
      complete: function () {
        goHome();
      }
    };

    $("#detail-modal").openModal(modalOptions);
  });

  if (!Search.query) {
    goHome();
  }

  $scope.detail = Search.results.filter(function (movie) {
    return movie.slug === $stateParams.slug;
  })[0];
};

DetailsCtrl.$inject = ["$scope", "$state", "$stateParams", "Search"];

module.exports = DetailsCtrl;

},{}],5:[function(require,module,exports){
"use strict";

/**
 * Search Controller
 */
var SearchCtrl = function ($rootScope, $scope, Search) {
    // set up watchers
    $scope.$watch(function () {
        return Search.results;
    }, function (val) {
        if (val) {
            $scope.results = val;
        }
    });
    $scope.$watch(function () {
        return Search.query;
    }, function (val) {
        if (!val) {
            $scope.results = [];
        }
    });
    $scope.$watch(function () {
        return Search.isLoading;
    }, function (val) {
        $scope.isLoading = Search.isLoading;
    });
};

SearchCtrl.$inject = ["$rootScope", "$scope", "Search"];

module.exports = SearchCtrl;

},{}],6:[function(require,module,exports){
"use strict";

/**
 * Search Input
 */
var SearchInput = function (Search) {
    return {
        restrict: "E",
        scope: {},
        template: ["<div class=\"search-input\">", "<input type=\"text\" ng-model=\"query\" placeholder=\"Search for a movie...\"></input>", "<i ng-click=\"resetQuery()\" ng-show=\"query.length\" class=\"mdi-navigation-close\"></i>", "</div>"].join(""),

        link: function link(scope, el, attrs) {
            el.bind("keydown", function (e) {
                if (e.keyCode === 13) {
                    Search.handleInput(scope.query);
                }
            });

            scope.resetQuery = function () {
                Search.query = "";
                scope.query = "";
            };
        }
    };
};

SearchInput.$inject = ["Search"];

module.exports = SearchInput;

},{}],7:[function(require,module,exports){
"use strict";

/**
 * Search
 */

var Search = function ($q, $rootScope, $sanitize, $timeout, $http, config) {
    return {

        results: [],

        query: "",

        isLoading: false,

        searchMovies: function searchMovies(query) {
            var encodedQuery = $sanitize(query);

            this.isLoading = true;

            return $http({
                url: config.api.url,
                params: {
                    t: encodedQuery,
                    r: "json"
                },
                method: "GET",
                cache: true
            });
        },

        handleInput: function handleInput(val) {
            var _this = this;


            this.query = val;

            if (val) {
                this.searchMovies(val).then(function (res) {
                    _this.isLoading = false;
                    _this.results = [];

                    if (res.data.length) {
                        _this.results.concat(res.data);
                    } else {
                        var result = "";
                        try {
                            res.data.slug = res.data.Title.toLowerCase().split(" ").join("-");
                            result = res.data;
                        } catch (e) {
                            if (res.data.Error) {
                                result = { error: res.data.Error };
                            }
                        }
                        _this.results.push(result);
                    }
                });
            }
        }
    };
};

Search.$inject = ["$q", "$rootScope", "$sanitize", "$timeout", "$http", "config"];

module.exports = Search;

},{}]},{},[1]);
