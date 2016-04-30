var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;
var bcrypt = require('bcrypt-nodejs');

var SexyGuardianSchema = new mongoose.Schema({
    first: String,
    last: String,
    instructor_id: String,
    email: String,
    password: String
});

SexyGuardianSchema.pre('save', function(done){
    var SexyGuardian = this;
    //break if pass hasnt changed
    if(!SexyGuardian.isModified('password')) return done();
    //Pass Changed
    bcrypt.genSalt(5, function(err, salt){
        if(err) return done(err);
        bcrypt.hash(SexyGuardian.password, salt, null, function(err, hash){
            if(err) {
                return done(err);
            }
            SexyGuardian.password = hash;
            done();
        });
    });
});

SexyGuardianSchema.methods.verifyPassword = function(password, done){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err) return done(err);
        done(null, isMatch);
    });
};

module.exports = mongoose.model('SexyGuardian', SexyGuardianSchema);