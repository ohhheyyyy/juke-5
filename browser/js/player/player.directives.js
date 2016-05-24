juke.directive('player', function(PlayerFactory) {
    return {
        restrict: 'E', // the 'E' is for 'element'
        templateUrl: '/js/player/templates/player.html',
        link: function(scope, element, attributes) {
            angular.extend(scope, PlayerFactory); // copy props from param2 to param1

            scope.toggle = function() {
                if (PlayerFactory.isPlaying()) PlayerFactory.pause();
                else PlayerFactory.resume();
            };

            scope.getPercent = function() {
                return PlayerFactory.getProgress() * 100;
            };
        }
    };
});
