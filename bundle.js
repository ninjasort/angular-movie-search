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


var movieSearch = "movieSearch";
var config = function ($stateProvider, $urlRouterProvider) {
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

config.$inject = ["$stateProvider", "$urlRouterProvider"];

angular.module(movieSearch, ["ui.router", "ngSanitize", services, controllers, directives]).config(config);

module.exports = movieSearch;

},{"./app.config":2}],4:[function(require,module,exports){
"use strict";

/**
 * Details Controller
 */
var DetailsCtrl = function ($scope, $state, $stateParams, Search) {
    $(function () {
        $("#detail-modal").openModal();
    });

    if (!Search.query) {
        $state.go("search");
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

        searchMovies: function searchMovies(query) {},

        handleInput: function handleInput(val) {
            this.query = val;

            // if (val) {
            //     this.searchMovies(val).then(function(res) {
            //         this.isLoading = false;
            //         this.results = [];
            //         if (res.data.length) {
            //             self.results.concat(res.data);
            //         } else {
            //             var result = '';
            //             try {
            //                 res.data.slug = res.data.Title.toLowerCase().split(' ').join('-');
            //                 result = res.data;
            //             } catch (e) {
            //                 if (res.data.Error) {
            //                     result = {error: res.data.Error};
            //                 }
            //             }
            //             self.results.push(result);
            //         }
            //     });
            // }
        }
    };
};

Search.$inject = ["$q", "$rootScope", "$sanitize", "$timeout", "$http", "config"];

module.exports = Search;
// var encodedQuery = $sanitize(query);

// this.isLoading = true;

// return $http({
//     url: config.api.url,
//     params: {
//         t: encodedQuery,
//         r: 'json'
//     },
//     method: 'GET',
//     cache: true
// });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2FtZXJvbmpyb2UvRHJvcGJveC9fcHJvamVjdHMvbW92aWUtc2VhcmNoL2FwcC9zY3JpcHRzL2luaXQuanMiLCIvVXNlcnMvY2FtZXJvbmpyb2UvRHJvcGJveC9fcHJvamVjdHMvbW92aWUtc2VhcmNoL2FwcC9zY3JpcHRzL2FwcC5jb25maWcuanMiLCIvVXNlcnMvY2FtZXJvbmpyb2UvRHJvcGJveC9fcHJvamVjdHMvbW92aWUtc2VhcmNoL2FwcC9zY3JpcHRzL2FwcC5qcyIsIi9Vc2Vycy9jYW1lcm9uanJvZS9Ecm9wYm94L19wcm9qZWN0cy9tb3ZpZS1zZWFyY2gvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvZGV0YWlscy5qcyIsIi9Vc2Vycy9jYW1lcm9uanJvZS9Ecm9wYm94L19wcm9qZWN0cy9tb3ZpZS1zZWFyY2gvYXBwL3NjcmlwdHMvY29udHJvbGxlcnMvc2VhcmNoLmpzIiwiL1VzZXJzL2NhbWVyb25qcm9lL0Ryb3Bib3gvX3Byb2plY3RzL21vdmllLXNlYXJjaC9hcHAvc2NyaXB0cy9kaXJlY3RpdmVzL3NlYXJjaC1pbnB1dC5qcyIsIi9Vc2Vycy9jYW1lcm9uanJvZS9Ecm9wYm94L19wcm9qZWN0cy9tb3ZpZS1zZWFyY2gvYXBwL3NjcmlwdHMvc2VydmljZXMvc2VhcmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7O0lBS04sV0FBVywyQkFBTSxPQUFPOztBQUUvQixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZO0FBQzFDLFNBQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztDQUM1QyxDQUFDLENBQUM7OztBQ1RILFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7SUFTTixNQUFNLDJC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USxDQUFDLENBQUM7O2lCQUVuRSxNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBJbml0XG4gKi9cbmltcG9ydCBtb3ZpZVNlYXJjaCBmcm9tICcuL2FwcCc7XG5cbmFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLmJvb3RzdHJhcChkb2N1bWVudCwgW21vdmllU2VhcmNoXSk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogU2VydmljZXNcbiAqL1xuaW1wb3J0IFNlYXJjaCBmcm9tICcuL3NlcnZpY2VzL3NlYXJjaCc7XG5cbi8qKlxuICogQ29udHJvbGxlcnNcbiAqL1xuaW1wb3J0IERldGFpbHNDdHJsIGZyb20gJy4vY29udHJvbGxlcnMvZGV0YWlscyc7XG5pbXBvcnQgU2VhcmNoQ3RybCBmcm9tICcuL2NvbnRyb2xsZXJzL3NlYXJjaCc7XG5cbi8qKlxuICogRGlyZWN0aXZlc1xuICovXG5pbXBvcnQgU2VhcmNoSW5wdXQgZnJvbSAnLi9kaXJlY3RpdmVzL3NlYXJjaC1pbnB1dCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTW9kdWxlIFJlZ2lzdHJhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG52YXIgY29uZmlnID0gJ21vdmllU2VhcmNoLmNvbmZpZyc7XG52YXIgc2VydmljZXMgPSAnbW92aWVTZWFyY2guc2VydmljZXMnO1xudmFyIGNvbnRyb2xsZXJzID0gJ21vdmllU2VhcmNoLmNvbnRyb2xsZXJzJztcbnZhciBkaXJlY3RpdmVzID0gJ21vdmllU2VhcmNoLmRpcmVjdGl2ZXMnO1xuXG4vKipcbiAqIENvbmZpZ1xuICovXG5hbmd1bGFyLm1vZHVsZShjb25maWcsIFtdKVxuICAuY29uc3RhbnQoJ2NvbmZpZycsIHtcbiAgICBhcGk6IHtcbiAgICAgIHVybDogJ2h0dHA6Ly93d3cub21kYmFwaS5jb20nXG4gICAgfVxuICB9KTtcblxuLyoqXG4gKiBTZXJ2aWNlc1xuICovXG5hbmd1bGFyLm1vZHVsZShzZXJ2aWNlcywgW10pXG4gIC5mYWN0b3J5KCdTZWFyY2gnLCBTZWFyY2gpO1xuXG4vKipcbiAqIENvbnRyb2xsZXJzXG4gKi9cbmFuZ3VsYXIubW9kdWxlKGNvbnRyb2xsZXJzLCBbXSlcbiAgLmNvbnRyb2xsZXIoJ0RldGFpbHNDdHJsJywgRGV0YWlsc0N0cmwpXG4gIC5jb250cm9sbGVyKCdTZWFyY2hDdHJsJywgU2VhcmNoQ3RybCk7XG5cbi8qKlxuICogRGlyZWN0aXZlc1xuICovXG5hbmd1bGFyLm1vZHVsZShkaXJlY3RpdmVzLCBbXSlcbiAgLmRpcmVjdGl2ZSgnc2VhcmNoSW5wdXQnLCBTZWFyY2hJbnB1dCk7XG5cbmV4cG9ydCB7IHNlcnZpY2VzLCBjb250cm9sbGVycywgZGlyZWN0aXZlcyB9OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb3ZpZSBTZWFyY2hcbiAqL1xuXG5pbXBvcnQge3NlcnZpY2VzLCBjb250cm9sbGVycywgZGlyZWN0aXZlc30gZnJvbSAnLi9hcHAuY29uZmlnJztcblxudmFyIG1vdmllU2VhcmNoID0gJ21vdmllU2VhcmNoJztcbnZhciBjb25maWcgPSAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlYXJjaCBhIE1vdmllXG4gICAgICAgICAqL1xuICAgICAgICAuc3RhdGUoJ3NlYXJjaCcsIHtcbiAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9zZWFyY2gtcmVzdWx0cy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdTZWFyY2hDdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAvKipcbiAgICAgICAgICogVmlldyBNb3ZpZSBEZXRhaWxzXG4gICAgICAgICAqL1xuICAgICAgICAuc3RhdGUoJ2RldGFpbHMnLCB7XG4gICAgICAgICAgICB1cmw6ICcvZGV0YWlscy86c2x1ZycsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2RldGFpbHMuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGV0YWlsc0N0cmwnXG4gICAgICAgIH0pO1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufTtcblxuY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG5hbmd1bGFyLm1vZHVsZShtb3ZpZVNlYXJjaCwgW1xuICAgICd1aS5yb3V0ZXInLFxuICAgICduZ1Nhbml0aXplJyxcbiAgICBzZXJ2aWNlcyxcbiAgICBjb250cm9sbGVycyxcbiAgICBkaXJlY3RpdmVzXG5dKS5jb25maWcoY29uZmlnKTtcblxuZXhwb3J0IGRlZmF1bHQgbW92aWVTZWFyY2g7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGFpbHMgQ29udHJvbGxlclxuICovXG52YXIgRGV0YWlsc0N0cmwgPSAoJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgU2VhcmNoKSA9PiB7XG5cbiAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjZGV0YWlsLW1vZGFsJykub3Blbk1vZGFsKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIVNlYXJjaC5xdWVyeSkge1xuICAgICAgICAkc3RhdGUuZ28oJ3NlYXJjaCcpO1xuICAgIH1cblxuICAgICRzY29wZS5kZXRhaWwgPSBTZWFyY2gucmVzdWx0cy5maWx0ZXIoZnVuY3Rpb24obW92aWUpIHtcbiAgICAgICAgcmV0dXJuIG1vdmllLnNsdWcgPT09ICRzdGF0ZVBhcmFtcy5zbHVnO1xuICAgIH0pWzBdO1xuICAgIFxufTtcblxuRGV0YWlsc0N0cmwuJGluamVjdCA9IFsnJHNjb3BlJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLCAnU2VhcmNoJ107XG5cbmV4cG9ydCBkZWZhdWx0IERldGFpbHNDdHJsOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTZWFyY2ggQ29udHJvbGxlclxuICovXG52YXIgU2VhcmNoQ3RybCA9ICgkcm9vdFNjb3BlLCAkc2NvcGUsIFNlYXJjaCkgPT4ge1xuICAgIC8vIHNldCB1cCB3YXRjaGVyc1xuICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBTZWFyY2gucmVzdWx0cztcbiAgICB9LCBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSB2YWw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gU2VhcmNoLnF1ZXJ5O1xuICAgIH0sIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAoIXZhbCkge1xuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBbXTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBTZWFyY2guaXNMb2FkaW5nO1xuICAgIH0sIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAkc2NvcGUuaXNMb2FkaW5nID0gU2VhcmNoLmlzTG9hZGluZztcbiAgICB9KTtcbn07XG5cblNlYXJjaEN0cmwuJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc2NvcGUnLCAnU2VhcmNoJ107XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEN0cmw7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNlYXJjaCBJbnB1dFxuICovXG52YXIgU2VhcmNoSW5wdXQgPSAoU2VhcmNoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICB0ZW1wbGF0ZTogW1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJzZWFyY2gtaW5wdXRcIj4nLFxuICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBuZy1tb2RlbD1cInF1ZXJ5XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIGEgbW92aWUuLi5cIj48L2lucHV0PicsXG4gICAgICAgICAgICAgICAgJzxpIG5nLWNsaWNrPVwicmVzZXRRdWVyeSgpXCIgbmctc2hvdz1cInF1ZXJ5Lmxlbmd0aFwiIGNsYXNzPVwibWRpLW5hdmlnYXRpb24tY2xvc2VcIj48L2k+JyxcbiAgICAgICAgICAgICc8L2Rpdj4nXG4gICAgICAgIF0uam9pbignJyksXG5cbiAgICAgICAgbGluayhzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbC5iaW5kKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICBTZWFyY2guaGFuZGxlSW5wdXQoc2NvcGUucXVlcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzY29wZS5yZXNldFF1ZXJ5ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIFNlYXJjaC5xdWVyeSA9ICcnO1xuICAgICAgICAgICAgICAgIHNjb3BlLnF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblNlYXJjaElucHV0LiRpbmplY3QgPSBbJ1NlYXJjaCddO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hJbnB1dDsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2VhcmNoXG4gKi9cblxudmFyIFNlYXJjaCA9ICgkcSwgJHJvb3RTY29wZSwgJHNhbml0aXplLCAkdGltZW91dCwgJGh0dHAsIGNvbmZpZykgPT4ge1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgcmVzdWx0czogW10sXG5cbiAgICAgICAgcXVlcnk6ICcnLFxuXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG5cbiAgICAgICAgc2VhcmNoTW92aWVzKHF1ZXJ5KSB7XG4gICAgICAgICAgICAvLyB2YXIgZW5jb2RlZFF1ZXJ5ID0gJHNhbml0aXplKHF1ZXJ5KTtcblxuICAgICAgICAgICAgLy8gdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgLy8gICAgIHVybDogY29uZmlnLmFwaS51cmwsXG4gICAgICAgICAgICAvLyAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHQ6IGVuY29kZWRRdWVyeSxcbiAgICAgICAgICAgIC8vICAgICAgICAgcjogJ2pzb24nXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgLy8gICAgIGNhY2hlOiB0cnVlXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVJbnB1dCh2YWwpIHtcblxuICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHZhbDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gaWYgKHZhbCkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMuc2VhcmNoTW92aWVzKHZhbCkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5yZXN1bHRzID0gW107XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmIChyZXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGYucmVzdWx0cy5jb25jYXQocmVzLmRhdGEpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICByZXMuZGF0YS5zbHVnID0gcmVzLmRhdGEuVGl0bGUudG9Mb3dlckNhc2UoKS5zcGxpdCgnICcpLmpvaW4oJy0nKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpZiAocmVzLmRhdGEuRXJyb3IpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0ge2Vycm9yOiByZXMuZGF0YS5FcnJvcn07XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2VsZi5yZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cblNlYXJjaC4kaW5qZWN0ID0gWyckcScsICckcm9vdFNjb3BlJywgJyRzYW5pdGl6ZScsICckdGltZW91dCcsICckaHR0cCcsICdjb25maWcnXTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoOyJdfQ==
