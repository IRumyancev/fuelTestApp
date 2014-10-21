'use strict';

/* Services */

var fuelServices = angular.module('fuelServices', ['ngResource']);

fuelServices.factory('Trip', ['$resource', '$http',
  function($resource){
    return $resource('trips/:tripId.json', {}, {
      query: {
          method:'GET',
          params:{tripId:'trips'},
          //transformResponse: function (data) {return angular.fromJson(data).list},
          isArray:true}
    });
  }]);