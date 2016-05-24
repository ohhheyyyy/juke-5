'use strict';

juke.factory('PlaylistFactory', function ($http, SongFactory) {

  var cachedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.fetchAll = function () {
    return $http.get('/api/playlists')
    .then(function (response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  PlaylistFactory.fetchById = function (id) {
    return $http.get('/api/playlists/' + id)
    .then(function (response) {
      return response.data;
    })
    .then(function (playlist) {
      playlist.songs = playlist.songs.map(function (song) {
        return SongFactory.convert(song, playlist.artists);
      });
      return playlist;
    });
  };

  PlaylistFactory.create = function (data) {
    return $http.post('/api/playlists', data)
    .then(function (response) {
      var playlist = response.data;
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  PlaylistFactory.addSong = function (id, songData) {
    return $http.post('/api/playlists/' + id + '/songs', {song: songData})
    .then(function (response) {
      return response.data;
    })
    .then(SongFactory.convert);
  };

  return PlaylistFactory;

});
