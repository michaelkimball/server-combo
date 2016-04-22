var express = require('express');
var app = express();
var port = process.env.PORT || 80; // used to create, sign, and verify tokens
var server = app.listen(port);
var io = require('socket.io')(server);

exports = {
    app: app,
    io: io
};