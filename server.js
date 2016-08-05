var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hbs = require('express-hbs').create();
var path = require('path');

var port = process.env.PORT || 80; // used to create, sign, and verify tokens
var server = app.listen(port);
var io = require('socket.io')(server);
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/layouts/default.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));


module.exports.app = app;
module.exports.io = io;