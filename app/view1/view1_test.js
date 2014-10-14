'use strict';

describe('myApp.view1 module', function() {

  describe('view1 controller', function(){
    var $scope;
    var viewCtrl;
    var movieService, httpBackend;

    beforeEach(module('myApp.view1'));
      
    beforeEach(inject(function(_movieService_, $httpBackend){
        movieService = _movieService_;
        httpBackend = $httpBackend;
    }));
      
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
      //spec body
      viewCtrl = $controller('View1Ctrl', {$scope: $scope});      
    }));
      
    it('should...', function() {
        expect(viewCtrl).toBeDefined();  
    });
      
    iit('should search', function() {
        expect($scope.movies).toBeNull();
        $scope.searchText = "Roma";
        $scope.search().then(function() {
            expect($scope.movies).not.toBeNull();
            expect($scope.movies.length).toEqual(1);
        });
    });
    
  });
});