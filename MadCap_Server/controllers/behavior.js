//Load Model
var Behavior = require("../models/behavior");

exports.postBehavior = function(req, res, done){
	console.log('Adding Behavior');

	var behavior = new Behavior({
		grade_level: req.body.grade_level,
		name: req.body.name
	});

	//save
	behavior.save(function(err){
		if(err) res.send(err);

		res.send("Behavior added");
	});
};

exports.getBehavior = function(req, res){
	behavior.findOne({'_id': req.params._id }, function(err, behavior){
		if(err) res.send(err);

		console.log("Finding behavior " + req.params._id);
		console.log(JSON.stringify(behavior, null, 2));

		res.json(behavior);
	});
};
