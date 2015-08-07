'use strict';
/**
 * @ngdoc function
 * @name musicsyncApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('musicsyncApp')
  .controller('CreateCtrl', function($scope, $log, Ref, $firebaseObject, $timeout) {
    $scope.model = $firebaseObject(Ref);   
    $scope.model.$loaded().catch(alert);
    $log.debug($scope.model);
    $scope.newSong = {
      'title': '',
      'sections': []
    };
    
    $scope.addNode = function(nodeType, sectionNo, partNo) {
      if(nodeType === 'section') {
        $scope.newSong.sections.push({'name': '', 'length': '', 'parts': []});
      }
      else if(nodeType === 'part') {
        $scope.newSong.sections[sectionNo].parts.push({'name': '', 'instructions': []});
      }
      else if(nodeType === 'instruction') {
        $scope.newSong.sections[sectionNo].parts[partNo].instructions.push({'content': '', 'type': ''});
      }
      $log.debug($scope.newSong);
    };

    /* BELOW IS CODE */
    
    $scope.addSong = function() {
        // push a message to the end of the array
        $scope.model.songs.push($scope.newSong);
        $scope.newSong = {};
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });