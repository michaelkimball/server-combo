//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var CourseSchema = new mongoose.Schema({

	instructor_id: String,
	grade_level: Number,
	description: String,
	name: String
});

//Export the model=
module.exports = mongoose.model('Course', CourseSchema);