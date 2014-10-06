'use strict';

describe('myApp.view2 module', function() {

  describe('view2 controller', function(){
    var $scope;
    var viewCtrl;

    beforeEach(module('myApp.view2'));
      
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
      //spec body
      viewCtrl = $controller('View2Ctrl', {$scope: $scope});      
    }));
      
    it('should...', function() {
        expect(viewCtrl).toBeDefined();  
    });
  });
});