function YoutubeDirective() {

  return {
    restrict: 'E',
    template: '<div></div>',
    controller: 'YoutubeCtrl',
    
  };
}

export default {
  name: 'youtubeDirective',
  fn: YoutubeDirective
};
