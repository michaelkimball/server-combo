//Load Models
var Topic = require("../models/topic");

exports.postTopic = function(req, res, done){
	console.log('Adding Topic');

	var topic = new Topic({
		subject_id: req.body.subject_id,
		description: req.body.description,
		name: req.body.name
	});

	//Save
	topic.save(function(err){
		if(err) res.send(err);

		res.send("Topic added");
	});
};

exports.getTopic = function(req, res){
	Topic.findOne({'_id': req.body._id}, function(err, topic){
		if(err) res.send(err);

		console.log("Finding Topic: " + req.body._id);
		console.log(JSON.stringify(topic, null, 2));

		//success
		res.json(topic);
	})
}