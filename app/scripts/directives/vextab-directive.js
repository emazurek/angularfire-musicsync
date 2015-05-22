'use strict';

/**
 * @ngdoc directive
 * @name musicsyncApp.directive:notes
 * @description
 * # notes
 */
angular.module('musicsyncApp')
.directive('vextab', function($compile){
 
    return{
        //note, WARNING with E (Element) it breaks the placement of the player
        restrict: 'AE',  
        //restrict: 'C',
        link: function(scope, element, attrs){
                try {
                  scope.model.$loaded().then(function() {new Vex.Flow.TabDiv(element);});
                }
                catch (e) {
                  console.log("Error: ", e);
                }
        }
    }
  })
  ;