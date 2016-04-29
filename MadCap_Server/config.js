var mongoose = require('mongoose');
var database = 'mongodb://localhost:27017/madcap';
var connection = mongoose.createConnection(database);
module.exports = {
    'secret': 'supersecretsecretsforthemadcappers',
    'mongoose': connection,
    'Schema': mongoose.Schema
};