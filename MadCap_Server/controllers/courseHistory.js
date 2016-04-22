var CourseHistory = require("../models/courseHistory");

exports.postCourseHistory = function(req, res, done){

    console.log('Adding Course History')

    var courseHistory = new CourseHistory({
        student_id: req.body.student_id,
        course_id: req.body.course_id,
        week: req.body.week,
        rating: req.body.rating,
        description: req.body.description

    });

    courseHistory.save(function(err){
        if(err) res.send(err);

        res.send('courseHistory added');
    });
};

exports.getCourseHistory = function(req, res){
    CourseHistory.find({'student_id': req.params.student_id}, function(err, courseHistory){
        if(err) res.send(err);

        console.log('find courseHistory ' + req.params.student_id);
        console.log(JSON.stringify(courseHistory, null, 2));

        res.send(courseHistory);
    });
};

exports.getCourseWeek = function(req, res){
    CourseHistory.find({'student_id': req.params.student_id, 'week': req.params.week}, function(err, courseHistoryWeek){
        if(err) res.send(err);

        console.log('find courseHistoryWeek ' + req.params.week + " for " + req.params.student_id);
        console.log(JSON.stringify(courseHistoryWeek, null, 2));

        res.send(courseHistoryWeek);
    });
};