//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;

//Define Schema
var BehaviorSchema = new mongoose.Schema({

	grade_level: Number,
	name: String

});

//Export the model=
module.exports = mongoose.model('Behavior', BehaviorSchema);