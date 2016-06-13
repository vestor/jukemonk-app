function YoutubeDirective($log,$window, $rootScope, $interval, PlayerService) {
  'ngInject';
  return {
    restrict: 'E',

    scope: {
      height: '@',
      width: '@',
      isplayer: '@',
      videoid: '=',
      seekto: '='
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;


      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.setSize(scope.width, scope.height);

      });

      $rootScope.$on('start-listening', function(event,data){
        console.log(event);
        scope.videoid = data.videoId;
        scope.seekto = data.position;
        playVideo();
      });

      scope.$watch('videoid+seekto', function(newValue, oldValue) {
        $log.log(newValue);
        $log.log(oldValue);
        if (newValue == oldValue) {
          return;
        }
        playVideo();

      });

      var playVideo = function(){
        player.cueVideoById(scope.videoid);
        player.playVideo();
        if(scope.seekto){
          player.seekTo(scope.seekto, true);
        }
        if(scope.isplayer){
          scope.broadCast = $interval(function () {
            $rootScope.$broadcast('player-position',{seconds: player.getCurrentTime()});
          }, 1000);
        }
      }



      $window.onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED && scope.isplayer) {
          $log.log('Playback has stopped');
          $interval.cancel(scope.broadCast);
          $rootScope.$broadcast('player-position',{seconds: player.getCurrentTime(), stopped : true});
        }
      };

      $window.onYouTubeIframeAPIReady = function() {


        if(scope.isplayer){
          PlayerService.playerJoin($rootScope.playerId);
        }


        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 1,
            html5: 1,
            modesbranding: 0,
            'iv_load_policy' : 3,
            showinfo: 1,
            controls: 1

          },
          events:{
            'onStateChange': onPlayerStateChange
          },
          height: scope.height,
          width: scope.width,
          videoId: scope.videoid,

        });
      }



    }
  };
}

export default {
  name: 'youtubeDirective',
  fn: YoutubeDirective
};
