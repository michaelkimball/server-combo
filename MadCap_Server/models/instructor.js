//Load Packages
var config = require('../config.js');
var mongoose = config.mongoose;
mongoose.Schema = config.Schema;
var bcrypt = require('bcrypt-nodejs');

//Define Schema
var InstructorSchema = new mongoose.Schema({

	first: String,
	last: String,
	email: String,
	password: String,
	bio: String
});

InstructorSchema.pre('save', function(done){
	var Instructor = this;
	//break if pass hasnt changed
	if(!Instructor.isModified('password')) return done();
	//Pass Changed
	bcrypt.genSalt(5, function(err, salt){
		if(err) return done(err);
		bcrypt.hash(Instructor.password, salt, function(err, hash){
			if(err) {
				return done(err);
			}
			Instructor.password = hash;
			done();
		});
	});
});

InstructorSchema.methods.verifyPassword = function(password, done){
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) return done(err);
		done(null, isMatch);
	});
};

//Export the model=
module.exports = mongoose.model('Instructor', InstructorSchema);