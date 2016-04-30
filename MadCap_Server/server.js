var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var passport = require('passport');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config'); // get our config file
var hbs = require('express-hbs');
var Instructor = require('./models/instructor');

var app = express();

//SocketIO

//var server = app.listen(80);
//var io = require('socket.io')(server);

//Add Controllers
var InstructorController = require('./controllers/instructor');
var AuthController = require('./controllers/auth');
var CourseController = require('./controllers/course');
var SexyGuardianController = require('./controllers/sexyGuardian');
var StudentController = require('./controllers/student');
var BehaviorController = require('./controllers/behavior');
var BehaviorHistoryController = require('./controllers/behaviorHistory');
var CourseHistoryController = require('./controllers/courseHistory');
var SubjectController = require('./controllers/subject');
var TopicController = require('./controllers/topic');
var TopicHistoryController = require('./controllers/topicHistory');
//var Conversation = require('./controllers/conversation');

// =======================
// configuration =========
// =======================
//exports.start = (function() {
	var port = process.env.PORT || 80; // used to create, sign, and verify tokens
	// connect to database
	app.set('superSecret', config.secret); // secret variable

	app.engine('hbs', hbs.express4({
		defaultLayout: __dirname + '/views/layouts/default.hbs',
		partialsDir: __dirname + '/views/partials',
		layoutsDir: __dirname + '/views/layouts'
	}));
	app.set('view engine', 'hbs');
	app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'ejs');

// use body parser so we can get info from POST and/or URL parameters
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(session({secret: config.secret, resave: false, saveUninitialized: false}));

// use morgan to log requests to the console
	app.use(morgan('dev'));

// Use express static for images, css, and js files
//app.use('/static', express.static('public'));
	app.use('/public', express.static(__dirname + '/public'));

// login page
	app.get('/login', function (req, res) {
		res.render('pages/login');
	});

// register page
	app.get('/register', function (req, res) {
		res.render('pages/register');
	});

// register page
	app.get('/home', function (req, res) {
		res.render('pages/home');
	});

	app.get('/behaviors', function (req, res) {
		res.render('pages/behaviors');
	});

	app.get('/behaviorForm', function (req, res) {
		res.render('pages/behaviorForm');
	});

// classes page
	app.get('/classes', function (req, res) {
		res.render('pages/classes');
	});

// classForm page
	app.get('/classForm', function (req, res) {
		res.render('pages/classForm');
	});

// classRoom page
	app.get('/classRoom', function (req, res) {
		res.render('pages/classRoom');
	});

// students page
	app.get('/students', function (req, res) {
		res.render('pages/students');
	});

// students page
	app.get('/studentForm', function (req, res) {
		res.render('pages/studentForm');
	});

// guardians page
	app.get('/guardians', function (req, res) {
		res.render('pages/guardians');
	});

// guardians page
	app.get('/guardianForm', function (req, res) {
		res.render('pages/guardianForm');
	});

	var apiRouter = express.Router();

//Endpoint for api/Instructor
	apiRouter.route('/instructor')
		.post(InstructorController.postInstructor)
		.get(InstructorController.getInstructor); //TODO: add authentication

	apiRouter.route('/instructor/:email')
		.post(InstructorController.getInstructor);

//----------------------------------------------------------------------------

	apiRouter.route('/course')
		.post(CourseController.postCourse);

	apiRouter.route('/course/:_id')
		.get(CourseController.getCourse);
	apiRouter.route('/courses/:instructor_id')
		.get(CourseController.getInstructorCourses);

//----------------------------------------------------------------------------

	apiRouter.route('/sexyGuardian')
		.post(SexyGuardianController.postGuardian)
		.get(SexyGuardianController.getGuardian); //TODO: add authentication

	apiRouter.route('/sexyGuardian/:email')
		.get(SexyGuardianController.getGuardianNow);

	apiRouter.route('/sexyGuardians')
		.get(SexyGuardianController.getInstructorGuardians); //Added for looking up guardian by instructor

	apiRouter.route('/student')
		.post(StudentController.postStudent);

	apiRouter.route('/student/:sexy_guardian_id')
		.get(StudentController.getStudent);

	apiRouter.route('/courseHistory')
		.post(CourseHistoryController.postCourseHistory);

	apiRouter.route('/courseHistory/:student_id')
		.get(CourseHistoryController.getCourseHistory);

	apiRouter.route('/courseHistoryWeek/:student_id/:week')
		.get(CourseHistoryController.getCourseWeek);
//----------------------------------------------------------------------------
	apiRouter.route('/behavior')
		.post(BehaviorController.postBehavior);

	apiRouter.route('/behavior/:_id')
		.get(BehaviorController.getBehavior);
//----------------------------------------------------------------------------

	apiRouter.route('/behaviorHistory')
		.post(BehaviorHistoryController.postBehaviorHistory);

	apiRouter.route('/behaviorHistory/:student_id')
		.get(BehaviorHistoryController.getBehaviorHistory);

	apiRouter.route('/behaviorHistoryWeek/:student_id/:week')
		.get(BehaviorHistoryController.getBehaviorWeek);
//----------------------------------------------------------------------------

	apiRouter.route('/subject')
		.post(SubjectController.postSubject);

	apiRouter.route('/subject/:_id')
		.get(SubjectController.getSubject);

//----------------------------------------------------------------------------

	apiRouter.route('/topic')
		.post(TopicController.postTopic);

	apiRouter.route('/topic/:_id')
		.get(TopicController.getTopic);

//----------------------------------------------------------------------------

	apiRouter.route('/topicHistory')
		.post(TopicHistoryController.postTopicHistory);

	apiRouter.route('/topicHistory/:id')
		.get(TopicHistoryController.getTopicHistory);

//----------------------------------------------------------------------------

	app.route('/authenticate')
		.post(AuthController.authenticateInstructor);

	app.post('/authenticate/device', AuthController.authenticateParent);

	apiRouter.get('/session', function (req, res) {
		res.json(req.session);
	});


	apiRouter.use(function (req, res, next) {
		AuthController.authentication(req, res, next);
	});

	app.use('/api', apiRouter);

	app.get('/', function (req, res) {
		res.render('pages/login');
	});

	app.get('/ho', function (req, res) {
		res.sendFile(__dirname + '/index.html');
	});
	//return app;
//})();
exports.app = app;

//console.log("Server running at " + port);

//io.on('connection', function(socket){
//	console.log('a user connected');
//	socket.on('message', function(message){
//		console.log(message.text);
//		this.broadcast.emit("message", message);
//	});
//});