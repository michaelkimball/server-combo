var server = require('../server');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var passport = require('passport');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var config = require('./config'); // get our config file
var hbs = require('express-hbs');
var Instructor = require('./models/instructor');
var io = server.io;

var mainRouter = express.Router();
var apiRouter = express.Router();

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

// =======================
// configuration =========
// =======================
mongoose.connect(config.database); // connect to database
mainRouter.set('superSecret', config.secret); // secret variable

mainRouter.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/MadCap_Server/views/layouts/default.hbs',
    partialsDir: __dirname + '/MadCap_Server/views/partials',
    layoutsDir: __dirname + '/MadCap_Server/views/layouts'
}));

mainRouter.set('view engine', 'hbs');
mainRouter.set('views', path.join(__dirname, '/MadCap_Server/views'));
mainRouter.use(bodyParser.urlencoded({
    extended: true
}));

mainRouter.use(session({secret: 'secretSecrets', resave: false, saveUninitialized: false}));

// use morgan to log requests to the console
mainRouter.use(morgan('dev'));

// Use express static for images, css, and js files
//mainRouter.use('/static', express.static('public'));
mainRouter.use('/public', express.static('public'));

// login page 
mainRouter.get('/login', function(req, res) {
    res.render('pages/login');
});

// register page 
mainRouter.get('/register', function(req, res) {
    res.render('pages/register');
});

// register page 
mainRouter.get('/home', function(req, res) {
    res.render('pages/home');
});

mainRouter.get('/behaviors', function(req, res){
    res.render('pages/behaviors');
});

mainRouter.get('/behaviorForm', function(req, res){
    res.render('pages/behaviorForm');
});

// classes page 
mainRouter.get('/classes', function(req, res) {
    res.render('pages/classes');
});

// classForm page
mainRouter.get('/classForm', function(req, res) {
    res.render('pages/classForm');
});

// classRoom page
mainRouter.get('/classRoom', function(req, res) {
    res.render('pages/classRoom');
});

// students page
mainRouter.get('/students', function(req, res) {
    res.render('pages/students');
});

// students page
mainRouter.get('/studentForm', function(req, res) {
    res.render('pages/studentForm');
});

// guardians page
mainRouter.get('/guardians', function(req, res) {
    res.render('pages/guardians');
});

// guardians page
mainRouter.get('/guardianForm', function(req, res) {
    res.render('pages/guardianForm');
});

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

mainRouter.route('/authenticate')
    .post(AuthController.authenticateInstructor);

mainRouter.post('/authenticate/device', AuthController.authenticateParent);

apiRouter.get('/session', function(req, res) { res.json(req.session); });


apiRouter.use(function(req, res, next) {
    AuthController.authentication(req, res, next);
});

mainRouter.use('/api', apiRouter);

mainRouter.get('/', function(req, res) {
    res.render('pages/login');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('message', function(message){
		console.log(message.text);
		this.broadcast.emit("message", message);
	});
});

exports.router = mainRouter;