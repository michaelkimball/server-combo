//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var BehaviorHistorySchema = new mongoose.Schema({

	student_id: String,
	behavior_id: String,
	week: Number,
	rating: Number,
	description: String

});

//Export the model=
module.exports = mongoose.model('BehaviorHistory', BehaviorHistorySchema);