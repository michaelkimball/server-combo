//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var TopicHistorySchema = new mongoose.Schema({

	student_id: String,
	topic_id: String,
	week: Number,
	rating: Number

});

//Export the model=
module.exports = mongoose.model('TopicHistory', TopicHistorySchema);