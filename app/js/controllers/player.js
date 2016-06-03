function PlayerCtrl($scope,  $rootScope) {
  'ngInject';

  //TODO This needs to be populated according to the authenticated user's id.
  $rootScope.userId = -1;
  $rootScope.currentlyPlaying = -1;

  $rootScope.videoAvailable = function() {
    return $rootScope.currentlyPlaying != -1;
  };

  $scope.playMe = function(videoId) {
    console.log('Trying to play the video : ' + videoId);
    // PlayerService.playThis({videoId : videoId, userId : $scope.userId})
    // .then(function(){
    //   console.log('Started playing video : ' + videoId);
    // })
    $rootScope.currentlyPlaying = videoId;

  };

  $scope.queueMe = function(videoId){
    console.log('Trying to queue the video : ' + videoId);
    // PlayerService.queueThis({videoId : videoId, userId: $scope.userId})
    // .then(function(){
    //   console.log('Queued this video : ' + videoId);
    // })

  };

}

export default {
  name: 'PlayerCtrl',
  fn: PlayerCtrl
};
