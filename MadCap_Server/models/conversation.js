var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({

	instructor_id : String,
	sexy_guardian_id: String,
	instructor_msg: [String],
	guardian_msg: [String],
});

module.exports = mongoose.model('Conversation', ConversationSchema)