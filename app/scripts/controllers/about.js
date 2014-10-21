'use strict';

/**
 * @ngdoc function
 * @name fuelAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fuelAppApp
 */
angular.module('fuelAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
