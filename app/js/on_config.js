function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider.state('Player', {
    url: '/player',
    templateUrl: 'player.html',
    title: 'Player'
  }).state('Listener', {
    url: '/listener',
    templateUrl: 'listener.html',
    title: 'Listener'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
