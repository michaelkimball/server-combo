var TopicHistory = require("../models/topicHistory");

exports.postTopicHistory = function(req, res, done){

    console.log('Adding Course History')

    var topicHistory = new TopicHistory({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        week: req.body.week,
        rating: req.body.rating,
        description: req.body.description

    });

    topicHistory.save(function(err){
        if(err) res.send(err);

        res.send('topicHistory added');
    });
};

exports.getTopicHistory = function(req, res){
    TopicHistory.find({'student_id': req.params.student_id}, function(err, topicHistory){
        if(err) res.send(err);

        console.log('find topicHistory ' + req.params.student_id);
        console.log(JSON.stringify(topicHistory, null, 2));

        res.send(topicHistory);
    });
};