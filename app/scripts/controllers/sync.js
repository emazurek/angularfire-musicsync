'use strict';
/**
 * @ngdoc function
 * @name musicsyncApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('musicsyncApp')
  .controller('SyncCtrl', function($scope, Ref, $firebaseObject, $timeout, $interval, smoothScroll) {
    $scope.model = $firebaseObject(Ref);   
    console.log($scope.model);
    $scope.model.$loaded().catch(alert);

    /* BELOW IS CODE */

    var songIndex = 0;
    var uniqueSections = [];
    var sectionCount = 0;

    $scope.selectSong = function(songIndex) {
      Ref.child("current").update({"song": songIndex, "section": 0});
      sectionCount = $scope.model.songs[songIndex].sections.length;
      console.log("Section count is " + sectionCount);
      var sectionNames = _.pluck($scope.model.songs[songIndex].sections, 'name');
      uniqueSections = _.uniq(sectionNames);
    }

    var colorArray = ['bg-yellow','bg-green','bg-purple','bg-pink','bg-blue'];

    $scope.colorMap = function(sectionName) {
      var uniqueSectionIndex = _.indexOf(uniqueSections, sectionName);
      return(colorArray[uniqueSectionIndex]);
    }

    $scope.model.$loaded(function() {
      $scope.selectSong(songIndex);
    });

    $scope.callAdvancementHandler = function() {
      var nextSectionIndex = getNextIndex();
      if(nextSectionIndex < sectionCount) {
        setActive(nextSectionIndex);
        } else {
        alert("you finished the song");
        }
    }

    function setActive(nextSectionIndex) {
      Ref.child("current").update({"section": nextSectionIndex});
      var element = document.getElementById('section-'+nextSectionIndex);
      smoothScroll(element);
    }

    function getNextIndex() {
      var currentSectionIndex = $scope.model.current.section;
      var nextSectionIndex = currentSectionIndex + 1;
      return(nextSectionIndex);
    }


    //$interval(callAtInterval, 5000);

    function callAtInterval() {
      console.log('Interval occurred');
      if ($scope.model.currentSong == 'bartholemew') {
        $scope.model.currentSong = 'chiron';
      } else {
        $scope.model.currentSong = 'bartholemew';
      }
    }

    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
    }

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
