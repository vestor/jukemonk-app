function ListenerDirective() {

  return {
    restrict: 'E',
    templateUrl: 'directives/listener.html',
    controller: 'ListenerCtrl'
  };
}

export default {
  name: 'listenerDirective',
  fn: ListenerDirective
};
