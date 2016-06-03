function SearchresultDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/searchresult.html',
    controller: 'PlayerCtrl',
    scope: {
      result : '='
    }
  };
}

export default {
  name: 'searchresultDirective',
  fn: SearchresultDirective
};
