function PlayerService($log, $rootScope, SocketService) {
  'ngInject';

  $rootScope.playerId = Math.floor((Math.random() * 10) + 1)+'';
  $rootScope.currentlyPlaying = {};
  const service = {};
  var ps = this;
  ps.listenerCount = 0;

  $rootScope.listenerCount = function(){
    return  PlayerService.getListenerCount();
  }

  $rootScope.$on('player-position', function(ev, args) {
    var obj = $rootScope.currentlyPlaying;
    obj['playerId'] =  $rootScope.playerId;
    obj['position'] = args.seconds
    obj['playing'] = !args.stopped || args.stopped == undefined
    obj['type'] = !args.stopped || args.stopped == undefined ? 'PLAYING' : 'STOPPED';
    service.broadcastPlay(obj);
  });



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

  service.broadcastSeek = function(video) {
    console.log('Emitting see',video);

  }

  service.broadcastStop = function(video) {
    video['playing'] = false;
    video['type'] = 'STOPPED';
    service.broadcastPlay(video);
  };


  return service;

}

export default {
  name: 'PlayerService',
  fn: PlayerService
};
