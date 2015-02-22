!function e(t,r,n){function i(c,s){if(!r[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(o)return o(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var l=r[c]={exports:{}};t[c][0].call(l.exports,function(e){var r=t[c][1][e];return i(r?r:e)},l,l.exports,e,t,r,n)}return r[c].exports}for(var o="function"==typeof require&&require,c=0;c<n.length;c++)i(n[c]);return i}({1:[function(e){"use strict";var t=function(e){return e&&e.__esModule?e["default"]:e},r=t(e("./app"));angular.element(document).ready(function(){angular.bootstrap(document,[r])})},{"./app":3}],2:[function(e,t,r){"use strict";var n=function(e){return e&&e.__esModule?e["default"]:e},i=n(e("./services/search")),o=n(e("./controllers/details")),c=n(e("./controllers/search")),s=n(e("./directives/search-input")),a="movieSearch.config",u="movieSearch.services",l="movieSearch.controllers",f="movieSearch.directives";angular.module(a,[]).constant("config",{api:{url:"http://api.rottentomatoes.com/api/public/v1.0/movies.json",key:"vdm7ddbykynptbk84gtsq7s2"}}),angular.module(u,[]).factory("Search",i),angular.module(l,[]).controller("DetailsCtrl",o).controller("SearchCtrl",c),angular.module(f,[]).directive("searchInput",s),r.services=u,r.controllers=l,r.directives=f,r.config=a,Object.defineProperty(r,"__esModule",{value:!0})},{"./controllers/details":4,"./controllers/search":5,"./directives/search-input":6,"./services/search":7}],3:[function(e,t){"use strict";var r=e("./app.config"),n=r.services,i=r.controllers,o=r.directives,c=r.config,s="movieSearch",a=function(e,t){e.state("search",{url:"/",templateUrl:"views/search-results.html",controller:"SearchCtrl"}).state("details",{url:"/details/:slug",templateUrl:"views/details.html",controller:"DetailsCtrl"}),t.otherwise("/")};a.$inject=["$stateProvider","$urlRouterProvider"],angular.module(s,["ui.router","ngSanitize",c,n,i,o]).config(a),t.exports=s},{"./app.config":2}],4:[function(e,t){"use strict";var r=function(e,t,r,n){function i(){t.go("search")}function o(){var e=n.results.filter(function(e){return e.slug===r.slug})[0];return n.fetchMovieDetails(e.id)}$(function(){var e={complete:function(){i()}};$("#detail-modal").openModal(e)}),n.query||i(),o().then(function(t){e.detail=t.data})};r.$inject=["$scope","$state","$stateParams","Search"],t.exports=r},{}],5:[function(e,t){"use strict";var r=function(e,t,r){t.$watch(function(){return r.results},function(e){e&&(t.results=e)}),t.$watch(function(){return r.query},function(e){e||(t.results=[])}),t.$watch(function(){return r.isLoading},function(){t.isLoading=r.isLoading})};r.$inject=["$rootScope","$scope","Search"],t.exports=r},{}],6:[function(e,t){"use strict";var r=function(e){return{restrict:"E",scope:{},template:['<div class="search-input">','<input type="text" ng-model="query" placeholder="Search for a movie..."></input>','<i ng-click="resetQuery()" ng-show="query.length" class="mdi-navigation-close"></i>',"</div>"].join(""),link:function(t,r){r.bind("keydown",function(r){13===r.keyCode&&e.handleInput(t.query)}),t.resetQuery=function(){e.query="",t.query=""}}}};r.$inject=["Search"],t.exports=r},{}],7:[function(e,t){"use strict";var r=function(e,t,r,n,i,o){return{results:[],query:"",isLoading:!1,fetchMovieDetails:function(e){{var t=o.api.url;t.split(".json").splice(1,0,e).join("")}return i.get(detailsUrl,{params:{apikey:o.api.key},cache:!0})},searchMovies:function(e){var t=r(e);return this.isLoading=!0,i({url:o.api.url,params:{q:t,apikey:o.api.key,page_limit:3},method:"GET",cache:!0})},handleInput:function(e){var t=this;this.query=e,e&&this.searchMovies(e).then(function(e){t.isLoading=!1,t.results=[],e.data.length&&t.results.concat(e.data.movies)})}}};r.$inject=["$q","$rootScope","$sanitize","$timeout","$http","config"],t.exports=r},{}]},{},[1]);