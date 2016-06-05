function PlayerCtrl($log, $scope,  $rootScope, PlayerService) {
  'ngInject';

  //TODO This needs to be populated according to the authenticated user's id.

  $log.log('Player Controller initialized');
  $rootScope.userId = -1;
  $rootScope.currentlyPlaying = -1;


  $rootScope.listenerCount = function(){
    return  PlayerService.getListenerCount();
  }

  $rootScope.$on('player-position', function(ev, args) {    
    PlayerService.broadcastPlay({videoId : $rootScope.currentlyPlaying, userId: $rootScope.userId, position: args.seconds});
  });

}

export default {
  name: 'PlayerCtrl',
  fn: PlayerCtrl
};
