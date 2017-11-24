'use strict';

/**
 * @ngdoc overview
 * @name underscore
 * @description
 * A factory for underscore to be used in controllers.
 * Injected in the window object to make accessible globally
 */

var underscore = angular.module('underscore', []);
  underscore.factory('_', [function() {
    return window._;
}]);

/**
 * @ngdoc overview
 * @name weatherAppApp
 * @description
 * # weatherAppApp
 *
 * Main module of the application.
 */

angular
  .module('weatherAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
