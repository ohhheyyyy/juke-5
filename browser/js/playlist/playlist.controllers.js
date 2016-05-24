'use strict';

// Create-playlist view

juke.controller('PlaylistFormCtrl', function ($scope, $state, PlaylistFactory) {

  $scope.createPlaylist = function () {
    $scope.hasSubmitted = true;
    PlaylistFactory
    .create($scope.newPlaylist)
    .then(function (playlist) {
      $state.go('playlist', {playlistId: playlist.id});
    })
    .catch(function (err) {
      $scope.hasSubmitted = false;
      $scope.serverError = err.message || 'Something went wrong!';
    });
  };

});

// All-playlists sidebar

juke.controller('PlaylistsCtrl', function ($scope, PlaylistFactory) {

  PlaylistFactory.fetchAll()
  .then(function (playlists) {
    $scope.playlists = playlists;
  });

});

// Single-playlist view

juke.controller('PlaylistCtrl', function ($scope, thePlaylist, PlaylistFactory, PlayerFactory) {

  $scope.playlist = thePlaylist;

  $scope.addSong = function (song) {
    return PlaylistFactory.addSong($scope.playlist.id, song)
    .then(function (addedSong) {
      $scope.playlist.songs.push(addedSong);
      return addedSong;
    });
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

});
