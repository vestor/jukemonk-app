function PlayerService($log, $rootScope, SocketService) {
  'ngInject';

  $rootScope.playerId = -1;
  $rootScope.currentlyPlaying = undefined;

  const service = {};
  var ps = this;
  ps.listenerCount = 0;

  SocketService.on('player-registered', function(data){
    $log.log('Player registration complete with room ' + data.room);
    $rootScope.room = data.room;
  });

  SocketService.on('listener-action', function(data){
    ps.listenerCount = data.count;
    $rootScope.$broadcast('listener-count',{count: ps.listenerCount});
    $log.log('Listener Count ' + ps.listenerCount);
  });

  service.getListenerCount = function(){
    return ps.listenerCount;
  }

  service.playerJoin = function(playerId){
    $log.log('Joining player with playerId ' + playerId);
    SocketService.emit('player-joined',{playerId: playerId});
  }

  service.broadcastQueue = function(videoId, playerId) {
    $log.log('Got the video id in queue as ' + videoId + playerId);
    // return {};
  };

  service.broadcastPlay = function(video) {
    console.log('Emitting play', video);
    SocketService.emit('player-video', video);
  };

  service.broadcastChange = function(video) {
    SocketService.emit('player-change', video);
  };


  return service;

}

export default {
  name: 'PlayerService',
  fn: PlayerService
};
