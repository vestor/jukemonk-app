function YoutubeCtrl($scope, $window) {
  'ngInject';

  console.log('Youtube Player Controller was initalized');
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  $window.onYoutubeIframeAPIReady = function() {
    console.log('Youtube API has been successfully loaded, now we can play videos');
  };

}

export default {
  name: 'YoutubeCtrl',
  fn: YoutubeCtrl
};
