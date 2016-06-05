function YoutubeDirective($log,$window, $rootScope, $interval) {
  'ngInject';
  return {
    restrict: 'E',

    scope: {
      height: '@',
      width: '@',
      videoid: '='
    },

    template: '<div></div>',

    link: function(scope, element) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;

      $window.onYouTubeIframeAPIReady = function() {

        player = new YT.Player(element.children()[0], {
          playerVars: {
            autoplay: 1,
            html5: 1,
            modesbranding: 0,
            'iv_load_policy' : 3,
            showinfo: 1,
            controls: 1,
            events:{
              'onStateChange': onPlayerStateChange
            }
          },

          height: scope.height,
          width: scope.width,
          videoId: scope.videoid,

        });
      }


      scope.$watch('height + width', function(newValue, oldValue) {
        if (newValue == oldValue) {
          return;
        }

        player.setSize(scope.width, scope.height);

      });

      scope.$watch('videoid', function(newValue, oldValue) {
        $log.log(newValue);
        $log.log(oldValue);
        if (newValue == oldValue || !newValue || newValue == -1) {
          return;
        }

        player.cueVideoById(scope.videoid);
        player.playVideo();
        broadCast = $interval(function () {
          $rootScope.$broadcast('player-position',{seconds: player.getCurrentTime()});
        }, 1000);


      });

      $window.onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
          $log.log('Playback has stopped');
          $interval.cancel(broadCast);
        }
      };

      
    }
  };
}

export default {
  name: 'youtubeDirective',
  fn: YoutubeDirective
};
