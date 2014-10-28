angular.module('myApp')
    .directive("mvLoadOnScroll", ['$window', '$timeout', function ($window, $timeout) {
        "use strict";

        return {
            restrict: 'ACE',
            link: function (scope, element, attr) {
                var top = angular.element($window)[0].screenTop,
                    origHeight = angular.element($window)[0].screen.height,
                    height = (origHeight * 0.7);

                // bind the digest cycle to be triggered by the scroll event
                // when it exceeds a threshold
                angular.element($window).bind('scroll', function () {
                    if (angular.element($window)[0].pageYOffset >= (height)) {

                        // show the spinner when triggered
                        //scope.spinner.hide = !scope.spinner.hide;

                        angular.element($window)[0].requestAnimationFrame(function () {
                            // invoke the function passed into the 'whenScrolled' attribute
                            scope.$apply(attr.mvLoadOnScroll);

                            // increment the threshold
                            height += (origHeight * 1.5);
                        });
                    }
                });
            }

        };
    }]);
