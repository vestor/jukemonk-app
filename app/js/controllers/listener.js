function ListenerCtrl($log, $scope,  $rootScope, ListenerService) {
  'ngInject';


  $log.log('Registering the listener');
  ListenerService.registerListener();
}

export default {
  name: 'ListenerCtrl',
  fn: ListenerCtrl
};
