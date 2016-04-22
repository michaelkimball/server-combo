var Subject = require("../models/subject");

exports.postSubject = function(req, res, done){
	console.log('Adding subject');

	var subject = new Subject({

		description: req.body.description,
		name: req.body.name
	});

	//Save Instructor
	subject.save(function(err){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log('Success! Subject added');
			res.send('Subject added');
		}
	});

};

exports.getSubject = function(req, res){
	Subject.findOne({ '_id' : req.params._id}, function(err, subject){
		if(err) res.send(err);

		console.log("Finding course: " + req.params._id);
		console.log(JSON.stringify(subject, null, 2));

		//success
		res.json(subject);
	});
};