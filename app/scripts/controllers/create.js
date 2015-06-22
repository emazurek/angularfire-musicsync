'use strict';
/**
 * @ngdoc function
 * @name musicsyncApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('musicsyncApp')
  .controller('CreateCtrl', function($scope, Ref, $firebaseArray, $timeout) {
    $scope.model = $firebaseArray(Ref);   
    console.log($scope.model);
    $scope.model.$loaded().catch(alert);

    /* BELOW IS CODE */
    $scope.newSong = {};
    $scope.addSong = function(newSong) {
          if( newSong ) {
            // push a message to the end of the array
            $scope.model.songs.push({
              "title": $scope.newSong.title
            });
          }
        };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
