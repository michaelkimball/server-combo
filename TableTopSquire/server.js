var server = require('../server');
var express = require('express');
var mainRouter = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var characterController = require('./controllers/characterSheet');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var io = server.io;

var router = express.Router();
var tts = require('./tabletop');

mongoose.connect('mongodb://localhost:27017/tabletopsquire');

mainRouter.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/TableTopSquire/views/layouts/default.hbs',
    partialsDir: __dirname + '/TableTopSquire/views/partials',
    layoutsDir: __dirname + '/TableTopSquire/views/layouts'
}));
mainRouter.set('view engine', 'hbs');
mainRouter.set('views', path.join(__dirname, '/TableTopSquire/views'));
mainRouter.use(bodyParser.urlencoded({
    extended: true
}));

mainRouter.use(session({
    secret: 'com.tabletopsquire.app',
    saveUninitialized: true,
    resave: true
}));

mainRouter.use(passport.initialize());

mainRouter.use('/public', express.static('public'));

mainRouter.get('/', function(req, res){
    res.render('pages/home');
});

router.route('/characters')
    .post(authController.isAuthenticated, characterController.postCharacters)
    .get(authController.isAuthenticated, characterController.getCharacters);

router.route('/character/:character_id')
    .get(authController.isAuthenticated, characterController.getCharacter)
    .put(authController.isAuthenticated, characterController.putCharacter)
    .delete(authController.isAuthenticated, characterController.deleteCharacter);

router.route('/users')
    .post(userController.postUsers);

router.route('/user')
    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);    

router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)
    .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);

mainRouter.use('/api', router);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('join', function(player) {
        console.log("join?");
        tts.initGame(io, socket, player);
    });
});

exports.router = mainRouter;
