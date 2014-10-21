'use strict';

/**
 * @ngdoc function
 * @name fuelAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fuelAppApp
 */

angular.module('fuelAppApp')
    .controller('MainCtrl', ['$scope', 'Trip', function ($scope, Trip) {

        $scope.isNewTrip = true;
        $scope.index = 0;
        $scope.listTrip = Trip.query();

        $scope.summary = new TripRecord();
        $scope.summary.setSummary($scope.listTrip);
//        $scope.$on('$viewContentLoaded', function() {$scope.summary.setSummary($scope.listTrip)});

//        angular.element(document).ready(function () {
//            $scope.summary.setSummary($scope.listTrip);
//        });


        $scope.removeTrip = function (index) {
            $scope.listTrip.splice(index, 1);
            $scope.summary.setSummary($scope.listTrip);
        };

        $scope.addTrip = function () {
            $scope.editorTitle = 'New';
            $scope.isNewTrip = true;

            $scope.isEditorVisible = true;
        };

        $scope.editTrip = function (index) {
            $scope.editorTitle = 'Edit';
            $scope.isNewTrip = false;
            $scope.index = index;
            $scope.currentTrip.getTripFromResource($scope.listTrip[index]);
            $scope.isEditorVisible = true;
        };
    }])
    .directive('popUpTrip', function(){
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'views/popUpTrip.html',
            controller: function($scope){

                $scope.editorTitle = '';
                $scope.isEditorVisible = false;
                $scope.currentTrip = new TripRecord();

                $scope.cancelTrip = function () {
                    $scope.isEditorVisible = false;
                    $scope.currentTrip.clean();
                    $scope.editorTitle = '';
                };

                $scope.applyTrip = function () {
                    if($scope.isNewTrip){
                        //$scope.currentTrip.rate = $scope.currentTrip.getRate();
                        $scope.listTrip.push({
                            'distance': $scope.currentTrip.distance,
                            'fuel': $scope.currentTrip.fuel,
                            'rate': $scope.currentTrip.getRate()
                        });
                    } else {
                        //$scope.currentTrip.rate = $scope.currentTrip.getRate();
                        $scope.listTrip.splice($scope.index, 1);
                        $scope.listTrip.splice($scope.index, 0, {
                            'distance': $scope.currentTrip.distance,
                            'fuel': $scope.currentTrip.fuel,
                            'rate': $scope.currentTrip.getRate()
                        });
                    }

                    $scope.cancelTrip();
                    $scope.summary.setSummary($scope.listTrip);
                };
            }
        };
    });

var TripRecord = function () {
    this.distance = 0;
    this.fuel = 0;
    this.rate = 0;
};

TripRecord.prototype.getRate = function () {
    return +(100*this.fuel/this.distance).toFixed(2);
};

TripRecord.prototype.clean = function () {
    this.fuel = 0;
    this.distance = 0;
    this.rate = 0;
};

TripRecord.prototype.getTripFromResource = function (resource) {
    this.distance = resource.distance;
    this.fuel = resource.fuel;
    this.rate = resource.rate;
};

TripRecord.prototype.setSummary = function (list) {
    if(list.length) {

        this.distance = 0;
        this.fuel = 0;
        this.rate = 0;

        var i = 0;
        while (i < list.length) {
            this.distance += +list[i].distance;
            this.fuel += +list[i].fuel;
            i++;
        }
        this.rate = this.getRate();
        //(100 * $scope.summary.fuel / $scope.summary.distance).toFixed(2);
    }
};
