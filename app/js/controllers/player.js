function PlayerCtrl($log, $scope, $location, $rootScope, PlayerService) {
  'ngInject';

  //TODO This needs to be populated according to the authenticated user's id.

  $log.log('Player Controller initialized');
  $rootScope.$on('$locationChangeStart', function(event,newUrl,oldUrl){
    console.log('Requested reload');
    console.log(event,newUrl,oldUrl);
    PlayerService.broadcastStop($rootScope.currentlyPlaying);
  });


}

export default {
  name: 'PlayerCtrl',
  fn: PlayerCtrl
};
