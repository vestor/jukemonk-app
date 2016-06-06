function SearchresultDirective($rootScope, PlayerService) {

  'ngInject';
  return {
    restrict: 'EA',
    templateUrl: 'directives/searchresult.html',
    scope: {
      result : '='
    },
    link: function(scope) {
      scope.playMe = function(video){
        console.log('Trying to play the video : ' + video.id);
        $rootScope.currentlyPlaying = {id : video.id, thumbnailUrl: video.thumbnailUrl};
        PlayerService.broadcastPlay({videoId : video.id, playerId : $rootScope.playerId, thumbnailUrl: video.thumbnailUrl});
      };

      scope.queueMe = function(video){
        console.log('Trying to queue the video : ' + video.id);
      };

    }
  };
}

export default {
  name: 'searchresultDirective',
  fn: SearchresultDirective
};
