function PlayerService($log, $rootScope, SocketService) {
  'ngInject';
  $rootScope.userId = -1;
  $rootScope.currentlyPlaying = -1;
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

  service.playerJoin = function(userId){
    $log.log('Joining player with userId ' + userId);
    SocketService.emit('player-joined',{userId: userId});
  }

  service.broadcastQueue = function(videoId, userId) {
    $log.log('Got the video id in queue as ' + videoId + userId);
    // return {};
  };

  service.broadcastPlay = function(video) {
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
