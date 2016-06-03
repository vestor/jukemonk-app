function SearchBarDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/searchbar.html'
  };
}

export default {
  name: 'searchbarDirective',
  fn: SearchBarDirective
};
