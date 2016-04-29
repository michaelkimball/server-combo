//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var StudentSchema = new mongoose.Schema({

	first: String,
	last: String,
	sexy_guardian_id: String,
	is_student_of_week: Boolean

});

//Export the model=
module.exports = mongoose.model('Student', StudentSchema);