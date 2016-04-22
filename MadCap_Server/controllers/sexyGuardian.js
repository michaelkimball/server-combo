//Load Models
var SexyGuardian = require("../models/sexyGuardian");

//Create endpoint for /api/sexy_guardian for post
exports.postGuardian = function(req, res, done){
	//create new Guardian
	console.log('Trying to add Guardian to database');

	var sexyGuardian = new SexyGuardian({
		first: req.body.first,
    	last: req.body.last,
    	instructor_id: req.session.instructor_id,
    	email: req.body.email,
    	password: req.body.password
	});

	//Save guardian
	sexyGuardian.save(function(err){
		if(err){
			console.log('Add Guardian failed');
			res.send(err)
		}
		else{
			console.log('Successful adding of guardian');
			res.send('Guardian added');
		}
	});
};

exports.getGuardian = function(req, res){
	res.send('Authenticated');
};

exports.getGuardianNow = function(req, res){
	SexyGuardian.findOne({ 'email' : req.params.email}, function(err, sexyGuardian){
		if(err) res.send(err);

		console.log("Finding Guardian " + req.params.email);
		console.log(JSON.stringify(sexyGuardian, null, 2));

		//success
		res.json(sexyGuardian);

	});
};

exports.getInstructorGuardians = function(req, res){
	SexyGuardian.find({ 'instructor_id': req.session.instructor_id }, function(err, sexyGuardians){
		if(err) res.send(err);

		console.log("Finding sexyGuardians: " + req.session.instructor_id);
		console.log(JSON.stringify(sexyGuardians, null, 2));

		//success
		res.json(sexyGuardians);
	})
};
