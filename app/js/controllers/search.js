function SearchCtrl($scope, YoutubeService) {
  'ngInject';

  //TODO Make SearchResults and DisplayResults as different classes

  $scope.searchObject = {};
  $scope.searchResult = {};
  $scope.displayResults = [];



  $scope.search = function() {
    YoutubeService.get($scope.searchObject.query).then(function(data) {
      console.log('Loaded ' + data.pageInfo.resultsPerPage + ' results from API');
      $scope.searchResult.nextPageToken = data.nextPageToken;
      $scope.displayResults = data.items.map(YoutubeService.transform);
      $scope.$apply();
    });
  };

  $scope.loadMore = function() {
    YoutubeService.loadMore($scope.searchResult.nextPageToken)
    .then(function (data) {

      console.log('Loaded ' + data.pageInfo.resultsPerPage + ' more results from API');
      $scope.displayResults = $scope.displayResults.concat(data.items.map(YoutubeService.transform));
      console.log($scope.displayResults);
      $scope.searchResult.nextPageToken = data.nextPageToken;
      $scope.$apply();
    });
  }

}

export default {
  name: 'SearchCtrl',
  fn: SearchCtrl
};
