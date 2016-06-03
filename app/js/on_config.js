function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider.state('Player', {
    url: '/',
    templateUrl: 'home.html',
    title: 'Player'
  });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
