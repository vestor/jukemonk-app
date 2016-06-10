function PlayerCtrl($log, $scope,  $rootScope, PlayerService) {
  'ngInject';

  //TODO This needs to be populated according to the authenticated user's id.

  $log.log('Player Controller initialized');

  $rootScope.listenerCount = function(){
    return  PlayerService.getListenerCount();
  }

  $rootScope.$on('player-position', function(ev, args) {
    var obj = $rootScope.currentlyPlaying;
    obj['playerId'] =  $rootScope.playerId;
    obj['position'] = args.seconds
    obj['playing'] = !args.stopped
    PlayerService.broadcastPlay(obj);
  });

}

export default {
  name: 'PlayerCtrl',
  fn: PlayerCtrl
};
