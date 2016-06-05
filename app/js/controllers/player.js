function PlayerCtrl($log, $scope,  $rootScope, PlayerService) {
  'ngInject';

  //TODO This needs to be populated according to the authenticated user's id.
  $rootScope.userId = -1;
  $rootScope.currentlyPlaying = -1;

  $rootScope.videoAvailable = function() {
    return $rootScope.currentlyPlaying != -1;
  };

  $scope.playMe = function(videoId) {
    console.log('Trying to play the video : ' + videoId);
    $rootScope.currentlyPlaying = videoId;
    PlayerService.broadcastPlay({videoId : videoId, userId : $scope.userId});

  };

  $scope.queueMe = function(videoId){
    console.log('Trying to queue the video : ' + videoId);
  };

  $rootScope.listenerCount = function(){
    return  PlayerService.getListenerCount();
  }

  $rootScope.$on('player-position', function(ev, args) {
    $log.log('Event recieved ' + ev);
    $log.log(args);    
  })

}

export default {
  name: 'PlayerCtrl',
  fn: PlayerCtrl
};
