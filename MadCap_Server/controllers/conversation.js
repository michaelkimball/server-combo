var Conversation = require("../models/conversation");

var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000);


io.on('connection', function(socket){
	console.log('a user connected');
  	socket.broadcast.emit('user connectedsssss');


  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
   });

  	socket.on('message', function(socket){
			console.log('FINALLY');
			io.emit('FINALLY');
		});

  	socket.on('disconnect', function(socket){
	console.log('a user disconnected');
	socket.emit('user disconnected');


	});
});
