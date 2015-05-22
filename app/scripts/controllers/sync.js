'use strict';
/**
 * @ngdoc function
 * @name musicsyncApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('musicsyncApp')
  .controller('SyncCtrl', function($scope, Ref, $firebaseObject, $timeout, $interval) {
    // synchronize a read-only, synchronized array of songs
    $scope.model = $firebaseObject(Ref);

    // display any errors
    $scope.model.$loaded().catch(alert);
    //$interval(callAtInterval, 5000);
    //$scope.model = {currentSong: "chiron", myPart: "master", mySection: "A"};


    function callAtInterval() {
      console.log("Interval occurred");
      if ($scope.model.currentSong == "bartholemew") {
        $scope.model.currentSong = "chiron";
      } else {
        $scope.model.currentSong = "bartholemew";
      }
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
