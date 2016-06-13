function ListenerService($log, $rootScope, SocketService) {
  'ngInject';
  const service = {};

  $rootScope.currentlyListening = {};
  $rootScope.lplayerId = '-1';
  $rootScope.listenerId = '-1';

  service.registerListener = function(){
    $log.log('Registering listener with listenerId ' + $rootScope.listenerId);
    SocketService.emit('listener-register',{listenerId: $rootScope.listenerId});
  };

  service.joinListener = function(lplayerId){
    $log.log('Listener ' + $rootScope.listenerId + ' started listening to ' + lplayerId);
    SocketService.emit('listener-join',{playerId: lplayerId, listenerId: $rootScope.listenerId});
    $rootScope.lplayerId = lplayerId;
  };

  SocketService.on('player-list', function(data){
    $log.log('Recieved a list of players from server',data);
    $rootScope.$broadcast('player-list',data);
    var myData = data[$rootScope.currentlyListening.playerId];
    var currentState = $rootScope.currentlyListening;
    if(currentState.playerId && myData && myData.videoId && myData.videoId != currentState.videoId) {
      currentState = myData;
      $rootScope.$broadcast('start-listening',$rootScope.currentlyListening);
    }
  });

  SocketService.on('player-stat', function(data){
    $rootScope.currentlyListening = data;
    console.log('Data inside currently playing',$rootScope.currentlyListening);
    $rootScope.$broadcast('start-listening',data);
  });

  return service;

}

export default {
  name: 'ListenerService',
  fn: ListenerService
};
