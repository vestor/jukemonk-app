import io from 'socket.io-client';

function SocketService($log,AppSettings) {
  'ngInject';
  $log.log('This is an invocation');
  var socket = io(AppSettings.socketUrl);
  socket.on('connect', function(){
    $log.log('Connection established');
    
  });


  return socket;

}

export default {
  name: 'SocketService',
  fn: SocketService
};
