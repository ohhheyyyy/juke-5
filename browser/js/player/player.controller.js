'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  angular.extend($scope, PlayerFactory); // copy props from param2 to param1

  $scope.toggle = function () {
    if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
    else PlayerFactory.resume();
  };

  $scope.getPercent = function () {
    return PlayerFactory.getProgress() * 100;
  };

});
