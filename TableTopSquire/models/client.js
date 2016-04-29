var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;


var ClientSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    id: { type: String, required: true },
    secret: { type: String, required: true },
    userId: { type: String, required: true }
});

module.exports = mongoose.model('Client', ClientSchema);