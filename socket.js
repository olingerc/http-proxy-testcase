'use strict';

var io = require('socket.io').listen(5500);

var bioinf = io
.of('/bioinf')
.on('connection', function (socket) {
  socket.emit('monitor', { hello: 'world' });
});