//Load Packages
var mongoose = require('mongoose');

//Define Schema
var SubjectSchema = new mongoose.Schema({

	description: String,
	name: String
});

//Export the model=
module.exports = mongoose.model('Subject', SubjectSchema);