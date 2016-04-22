var BehaviorHistory = require("../models/behaviorHistory");

exports.postBehaviorHistory = function(req, res, done){

	console.log('Adding Behavior History')

	var behaviorHistory = new BehaviorHistory({

		student_id: req.body.student_id,
		course_id: req.body.course_id,
		week: req.body.week,
		rating: req.body.rating,
		description: req.body.description

	});

	behaviorHistory.save(function(err){
		if(err) res.send(err);

		res.send('behaviorHistory added');
	});
};

exports.getBehaviorHistory = function(req, res){
	BehaviorHistory.find({'student_id': req.params.student_id}, function(err, behaviorHistory){
		if(err) res.send(err);

		console.log('find behaviorHistory ' + req.params.student_id);
		console.log(JSON.stringify(behaviorHistory, null, 2));

		res.send(behaviorHistory);
	});
};

exports.getBehaviorWeek = function(req, res){
	BehaviorHistory.find({'student_id': req.params.student_id, 'week': req.params.week}, function(err, behaviorHistoryWeek){
		if(err) res.send(err);

		console.log('find behaviorHistoryWeek ' + req.params.week + " for " + req.params.student_id);
		console.log(JSON.stringify(behaviorHistoryWeek, null, 2));

		res.send(behaviorHistoryWeek);
	});
};