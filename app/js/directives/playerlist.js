function PlayerlistDirective($rootScope, ListenerService) {
  'ngInject';
  return {
    restrict: 'E',
    templateUrl: 'directives/playerlist.html',
    link: function(scope){
      $rootScope.$on('player-list', function(ev, data){
        console.log('Recieved player list in the element',data,ev);
        scope.playerList = data;
        console.log('The following error is vague, if you think its not. Email me at manish001992@gmail.com. I am still learning');
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
