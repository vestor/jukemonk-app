function ListenercountDirective($rootScope, PlayerService) {
  'ngInject';
  return {
    restrict: 'E',
    template: '<span class="listener-count">{{count}}</span>',
    link: function(scope) {
      scope.count = PlayerService.getListenerCount();

      $rootScope.$on('listener-count', function(ev,data){
        console.log(ev,data);
        scope.count = data.count;
        scope.$apply();
      });
    }

  };
}

export default {
  name: 'listenerCount',
  fn: ListenercountDirective
};
