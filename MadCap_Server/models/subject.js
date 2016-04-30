//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var SubjectSchema = new mongoose.Schema({

	description: String,
	name: String
});

//Export the model=
module.exports = mongoose.model('Subject', SubjectSchema);