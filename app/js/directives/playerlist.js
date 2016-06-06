function PlayerlistDirective($rootScope) {
  'ngInject';
  return {
    restrict: 'E',
    templateUrl: 'directives/playerlist.html',
    link: function(scope){
      $rootScope.$on('player-list', function(ev, data){
        console.log('Recieved player list in the element',data,ev);
        scope.playerList = data.list;
        scope.$apply();
      });

    }
  };
}

export default {
    name : 'playerlistDirective',
    fn: PlayerlistDirective
}
