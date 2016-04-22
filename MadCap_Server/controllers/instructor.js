//Load Models
var Instructor = require("../models/instructor");

//Create endpoint for /api/user for Post

exports.postInstructor = function(req, res, done){

	//create new Instructor instance
	console.log('Trying to add Instructor to database');

	var instructor = new Instructor({
		first: req.body.first,
		last: req.body.last,
		email: req.body.email,
		password: req.body.password
	});

	//Save Instructor
	instructor.save(function(err){
		if(err){
			console.log('Add instructor failed, Email Taken' + err);
			res.send('Email Taken');
		}
		else{
			console.log('Success! Instructor added');
			res.send('Thanks for Registering');
		}
	});
};

exports.getInstructor = function(req, res){
	res.send('Authenticated');
};

exports.getInstructorNow = function(req, res){
	Instructor.findOne({ 'email' : req.params.email}, function(err, instructor){
		if(err) res.send(err);

		console.log("Finding course: " + req.params.email);
		console.log(JSON.stringify(instructor, null, 2));

		//success
		res.json(instructor);
	});
};