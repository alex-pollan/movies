'use strict';

describe('myApp.view1 module', function() {

  describe('view1 controller', function(){
    var $scope;
    var viewCtrl;

    beforeEach(
        module('myApp.view1'),
        factory('movieService', new MockMovieService())
    );
      
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
      //spec body
      viewCtrl = $controller('View1Ctrl', {$scope: $scope});      
    }));
      
    it('should...', function() {
        expect(viewCtrl).toBeDefined();  
    });
  });
});