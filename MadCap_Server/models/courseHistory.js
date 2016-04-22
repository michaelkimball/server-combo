//Load Packages
var mongoose = require('mongoose');

//Define Schema
var CourseHistorySchema = new mongoose.Schema({

	student_id: String,
	course_id: String,
	quarter: String

});

//Export the model=
module.exports = mongoose.model('CourseHistory', CourseHistorySchema);