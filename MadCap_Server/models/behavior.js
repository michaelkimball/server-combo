//Load Packages
var mongoose = require('mongoose');

//Define Schema
var BehaviorSchema = new mongoose.Schema({

	grade_level: Number,
	name: String

});

//Export the model=
module.exports = mongoose.model('Behavior', BehaviorSchema);