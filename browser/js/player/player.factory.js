'use strict';

juke.factory('PlayerFactory', function ($rootScope) {

  // state

  var playing = false,
      currentSong = null,
      currentList = [],
      progress = 0;

  // initialize the audio element

  var audio = document.createElement('audio');

  // define the factory value

  var player = {};

  player.pause = function () {
    audio.pause();
    playing = false;
  };

  player.resume = function () {
    audio.play();
    playing = true;
  };

  player.start = function (song, list) {
    player.pause();
    audio.src = song.audioUrl;
    audio.load();
    currentSong = song;
    currentList = list;
    player.resume();
  };

  player.isPlaying = function () {
    return playing;
  };

  player.getCurrentSong = function () {
    return currentSong;
  };

  function mod (num, m) { return ((num % m) + m) % m; };

  function skip (interval) {
    var index = currentList.indexOf(currentSong);
    index = mod(index + interval, currentList.length);
    player.start(currentList[index], currentList);
  }

  player.next = function () {
    skip(1);
  };

  player.previous = function () {
    skip(-1);
  };

  player.getProgress = function () {
    return progress;
  };

  // audio event listening

  audio.addEventListener('ended', function () {
    player.next();
    $rootScope.$evalAsync();
  });

  audio.addEventListener('timeupdate', function () {
    progress = audio.currentTime / audio.duration;
    $rootScope.$evalAsync();
  });

  // return factory value

  return player;

});
