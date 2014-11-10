angular.module('myApp')
    .directive("infiniteScroll", [
        '$rootScope', '$window', '$timeout',
        function ($rootScope, $window, $timeout) {
            "use strict";
            return {
                link: function (scope, elem, attrs) {
                    var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
                    $window = angular.element($window);
                    scrollDistance = 0;
                    if (attrs.infiniteScrollDistance !== null) {
                        scope.$watch(attrs.infiniteScrollDistance, function (value) {
                            scrollDistance = parseInt(value, 10);
                            return scrollDistance;
                        });
                    }
                    scrollEnabled = true;
                    checkWhenEnabled = false;
                    if (attrs.infiniteScrollDisabled !== null) {
                        scope.$watch(attrs.infiniteScrollDisabled, function (value) {
                            scrollEnabled = !value;
                            if (scrollEnabled && checkWhenEnabled) {
                                checkWhenEnabled = false;
                                return handler();
                            }
                        });
                    }
                    handler = function () {
                        var elementBottom, remaining, shouldScroll, windowBottom,
                            win = $($window),
                            el = $(elem);
                        
                        windowBottom = win.height() + win.scrollTop();
                        elementBottom = el.offset().top + el.height();
                        remaining = elementBottom - windowBottom;
                        shouldScroll = remaining <= win.height() * scrollDistance;
                        if (shouldScroll && scrollEnabled) {
                            if ($rootScope.$$phase) {
                                return scope.$eval(attrs.infiniteScroll);
                            } else {
                                return scope.$apply(attrs.infiniteScroll);
                            }
                        } else if (shouldScroll) {
                            checkWhenEnabled = true;
                            return checkWhenEnabled;
                        }
                    };
                    $window.on('scroll', handler);
                    scope.$on('$destroy', function () {
                        return $window.off('scroll', handler);
                    });
                    return $timeout((function () {
                        if (attrs.infiniteScrollImmediateCheck) {
                            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
                                return handler();
                            }
                        } else {
                            return handler();
                        }
                    }), 0);
                }
            };
        }
    ]);