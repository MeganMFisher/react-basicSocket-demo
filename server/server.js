
const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io')(server),
      cors = require('cors'),
      bodyParser = require('body-parser')

var port = 3011;

app.use(cors());

app.use(bodyParser.json())

io.on('connection', function (socket) {
  socket.on('to:server', function (data) {
    io.emit('from:server', data)
  });
});

server.listen(port, function() {  //must listen on server not app!
  console.log("Started server on port", port);
});