var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;


var TokenSchema = new mongoose.Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

module.exports = mongoose.model('Token', TokenSchema);