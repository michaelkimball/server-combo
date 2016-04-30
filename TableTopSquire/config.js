var mongoose = require('mongoose');
var database = 'mongodb://localhost:27017/tabletopsquire';
var connection = mongoose.createConnection(database);
module.exports = {
    'secret': 'com.tabletopsquire.app',
    'mongoose': connection,
    'Schema': mongoose.Schema
};