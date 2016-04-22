//Load Models
var Student = require("../models/student");

exports.postStudent = function(req, res, done){
	console.log('Adding Student');

	var student = new Student({
		first: req.body.first,
		last: req.body.last,
		sexy_guardian_id: req.body.sexy_guardian_id,
		is_student_of_week: req.body.is_student_of_week
	});

	//Save
	student.save(function(err){
		if(err) res.send(err);

		res.send("Student added");
	});
};

exports.getStudent = function(req, res){
	Student.find({'sexy_guardian_id': req.params.sexy_guardian_id}, function(err, student){
		if(err) res.send(err);

		console.log("Finding student: " + req.params.sexy_guardian_id);
		console.log(JSON.stringify(student, null, 2));

		//success
		res.json(student);
	});
};
