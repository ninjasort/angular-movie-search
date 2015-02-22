'use strict';

describe('Search', function() {

    beforeEach(module('movieSearch'));

    var Search, $httpBackend;

    beforeEach(inject(function(_Search_, _$httpBackend_) {
        Search = _Search_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return a list of movies', function() {

        $httpBackend.when('GET', 'http://miniml-api.herokuapp.com/movies?page_limit=1&q=gravity')
            .respond({
                Title: 'Gravity'
            });

        Search.searchMovies('gravity')
            .then(function(res) {
                expect(res.data.Title).toBe('Gravity');
            });

        $httpBackend.flush();
    });

});