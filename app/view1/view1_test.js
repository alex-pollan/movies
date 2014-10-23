'use strict';

xdescribe('myApp.view1 module', function() {

  describe('view1 controller', function(){
    var $scope;
    var viewCtrl;
    var httpBackend;

    beforeEach(module('myApp.view1'));
    beforeEach(module('movieApi'));  
      
    beforeEach(inject(function($httpBackend){
       httpBackend = $httpBackend;
        
       httpBackend.expectGET('http://www.omdbapi.com/?t=Roma').respond({
            data: {Title: "Armaghedon", Year: 1994}
       });

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
        $scope.search();
        httpBackend.flush();
        expect($scope.movies).not.toBeNull();
        expect($scope.movies.length).toEqual(1);
    });
    
  });
});