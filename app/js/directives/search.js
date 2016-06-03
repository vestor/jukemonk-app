function SearchDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/search.html',
    controller: 'SearchCtrl'
  };
}

export default {
  name: 'searchDirective',
  fn: SearchDirective
};
