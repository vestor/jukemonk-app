function PlayerService($log, SocketService) {
  'ngInject';
  const service = {};
  var ps = this;
  ps.listenerCount = 0;

  SocketService.on('player registered', function(data){
    $log.log('Player registration complete with room ' + data.room);
    ps.room = data.room;
  });

  SocketService.on('listener connected', function(){
    $log.log('A new listener has connected');
    ps.listenerCount++;
  });

  service.getListenerCount = function(){
    return ps.listenerCount;
  }

  service.playerJoin = function(userId){
    $log.log('Joining player with userId ' + userId);
    SocketService.emit('player joined',{userId: userId});
  }

  service.broadcastQueue = function(videoId, userId) {
    $log.log('Got the video id in queue as ' + videoId + userId);
    // return {};
  };

  service.broadcastPlay = function(videoId, userId, videoPosition) {
    $log.log('Got the video id in play as ' + videoId + userId);
    SocketService.emit('user played', { videoId: videoId, userId: userId, videoPosition: videoPosition });
  };


  return service;

}

export default {
  name: 'PlayerService',
  fn: PlayerService
};
