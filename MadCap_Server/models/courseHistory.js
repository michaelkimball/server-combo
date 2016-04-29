//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var CourseHistorySchema = new mongoose.Schema({

	student_id: String,
	course_id: String,
	quarter: String

});

//Export the model=
module.exports = mongoose.model('CourseHistory', CourseHistorySchema);