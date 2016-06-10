function PlayerlistDirective($rootScope, ListenerService) {
  'ngInject';
  return {
    restrict: 'E',
    templateUrl: 'directives/playerlist.html',
    link: function(scope){
      $rootScope.$on('player-list', function(ev, data){
        console.log('Recieved player list in the element',data,ev);
        scope.playerList = data;
        scope.$apply();
      });

      scope.startListening = function(playerId){
        console.log('Recieved player id as ',playerId);
        ListenerService.joinListener(playerId);
      }



    }
  };
}

export default {
    name : 'playerlistDirective',
    fn: PlayerlistDirective
}
