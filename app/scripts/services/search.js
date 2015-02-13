'use strict';

angular.module('movieSearch.services', [])
    .factory('Search', function($q, $rootScope, $sanitize, $timeout, $http, config) {


        return {

            results: [],

            query: '',

            isLoading: false,

            searchMovies: function(query) {
                var encodedQuery = $sanitize(query);

                this.isLoading = true;

                return $http({
                    url: config.api.url,
                    params: {
                        t: encodedQuery,
                        r: 'json'
                    },
                    method: 'GET',
                    cache: true
                });

            },

            handleInput: function(val) {
                var self = this;

                this.query = val;

                if (val) {
                    self.searchMovies(val).then(function(res) {
                        self.isLoading = false;
                        self.results = [];
                        if (res.data.length) {
                            self.results.concat(res.data);
                        } else {
                            var result = '';
                            try {
                                res.data.slug = res.data.Title.toLowerCase().split(' ').join('-');
                                result = res.data;
                            } catch (e) {
                                if (res.data.Error) {
                                    result = {error: res.data.Error};
                                }
                            }
                            self.results.push(result);
                        }
                    });
                }

            }

        };

    });