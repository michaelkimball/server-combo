//Load Model
var Course = require('../models/course');

//Endpoint post
exports.postCourse = function(req, res, done){
	//New Course
	console.log('Adding Course to database');

	var course = new Course({
		instructor_id: req.body.instructor_id,
		grade_level: req.body.grade_level,
		description: req.body.description,
		name: req.body.name
	});

	course.save(function(err){
		if(err){
			console.log('Adding Course Failed');
			res.send(err);
		}
		else{
			console.log('Course Added!');
			res.send('Course Added');
		}
	});
};

exports.getCourse= function(req, res){
	Course.findOne({ '_id' : req.params._id}, function(err, course){
		if(err) res.send(err);

		console.log("Finding course: " + req.params._id);
		console.log(JSON.stringify(course, null, 2));

		//success
		res.json(course);
	});
};

exports.getInstructorCourses = function(req, res){
	Course.find({ 'instructor_id': req.params.instructor_id }, function(err, courses){
		if(err) res.send(err);

		console.log("Finding courses: " + req.params.instructor_id);
		console.log(JSON.stringify(courses, null, 2));

		//success
		res.json(courses);
	})
};