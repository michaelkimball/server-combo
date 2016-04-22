//Load Packages
var mongoose = require('mongoose');

//Define Schema
var StudentSchema = new mongoose.Schema({

	first: String,
	last: String,
	sexy_guardian_id: String,
	is_student_of_week: Boolean

});

//Export the model=
module.exports = mongoose.model('Student', StudentSchema);