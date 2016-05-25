juke.directive('albumList', function(PlayerFactory, theAlbum, allAlbums) {
    return {
        scope: {
            artist: '=',
            album: '='
        },
        restrict: 'E', // the 'E' is for 'element'
        templateUrl: '/js/album/templates/{{album}}',
        link: function(scope, element, attributes) {
            scope.album = theAlbum;
            scope.albums = allAlbums;

            scope.toggle = function(song) {
                if (song !== PlayerFactory.getCurrentSong()) {
                    PlayerFactory.start(song, scope.album.songs);
                } else if (PlayerFactory.isPlaying()) {
                    PlayerFactory.pause();
                } else {
                    PlayerFactory.resume();
                }
            };

            scope.getCurrentSong = function() {
                return PlayerFactory.getCurrentSong();
            };

            scope.isPlaying = function(song) {
                return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
            };
        }
    };
});
