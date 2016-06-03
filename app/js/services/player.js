function PlayerService($log) {
  'ngInject';

  const service = {};

  service.queueThis = function(videoId) {
    $log.log('Got the video id in queue as ' + videoId);
    return {};
  };

  service.playThis = function(videoId) {
    $log.log('Got the video id in play as ' + videoId);
    return {};
  };
  return service;

}

export default {
  name: 'PlayerService',
  fn: PlayerService
};
