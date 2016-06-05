function YoutubeService($log ,$http, AppSettings) {
  'ngInject';

  const service = {};
  var urlToHit = AppSettings.youtube.url;

  //This function transforms a youtube item element
  service.transform = function(element) {
    var newObj = {};
    var thumbnailUrl = element.snippet.thumbnails.default.url;
    var title = element.snippet.title;
    var id = element.id.videoId;
    newObj.thumbnailUrl = thumbnailUrl;
    newObj.title = title;
    newObj.id = id;
    return newObj;
  };

  service.get = function(term) {

    var paramObj = {'part': 'snippet', 'q': term, 'key' : AppSettings.youtube.key, 'type' : 'video'}
    return new Promise((resolve, reject) => {
      $http.get(urlToHit, {params : paramObj}).success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  service.loadMore = function(pageToken) {
    var paramObj = {'part': 'snippet', 'key' : AppSettings.youtube.key, 'pageToken' : pageToken, 'type' : 'video'}
    return new Promise((resolve, reject) => {
      $http.get(urlToHit, {params : paramObj}).success((data) => {
        resolve(data);
      }).error((err, status) => {
        reject(err, status);
      });
    });
  };

  return service;

}

export default {
  name: 'YoutubeService',
  fn: YoutubeService
};
