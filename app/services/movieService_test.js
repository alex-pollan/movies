"use strict";

describe("movies api service", function () {
  var movieService, httpBackend;

  beforeEach(module("movieApi"));

  beforeEach(inject(function (_movieService_, $httpBackend) {
    movieService = _movieService_;
    httpBackend = $httpBackend;
  }));

  it("should search title", function () {
      
    httpBackend.whenGET("http://www.omdbapi.com/?t=Roma").respond({
        data: {Title: "Armaghedon", Year: 1994}
    });
      
    movieService.search("Roma").then(function(movies) {
      expect(movies).toEqual({ Title: "Armaghedon", Year: 1994 });
    });
      
    httpBackend.flush();
  });

});