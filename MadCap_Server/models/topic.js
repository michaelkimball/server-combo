//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var TopicSchema = new mongoose.Schema({

	subject_id: String,
	description: String,
	name: String
	//TODO: resources

});

//Export the model=
module.exports = mongoose.model('Topic', TopicSchema);