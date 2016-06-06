function ListenerCtrl($log, $scope,  $rootScope, ListenerService) {
  'ngInject';


  $log.log('Registering the listener');
  ListenerService.registerListener();

  $scope.startListening = function(playerId){
    ListenerService.joinListener(playerId);
  };
}

export default {
  name: 'ListenerCtrl',
  fn: ListenerCtrl
};
