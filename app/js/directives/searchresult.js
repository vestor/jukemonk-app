function SearchresultDirective($rootScope, PlayerService) {

  'ngInject';
  return {
    restrict: 'EA',
    templateUrl: 'directives/searchresult.html',
    scope: {
      result : '='
    },
    link: function(scope) {
      scope.playMe = function(videoId){
        console.log('Trying to play the video : ' + videoId);
        $rootScope.currentlyPlaying = videoId;
        PlayerService.broadcastPlay({videoId : videoId, userId : $rootScope.userId});
      };

      scope.queueMe = function(videoId){
        console.log('Trying to queue the video : ' + videoId);
      };

    }
  };
}

export default {
  name: 'searchresultDirective',
  fn: SearchresultDirective
};
