var mongoose = require('mongoose');
var uri = 'mongodb://localhost:27017/MYDBS';
mongoose.Promise = global.Promise;
mongoose.connect(uri);
exports = module.exports = mongoose;



var UserSchema = new mongoose.Schema({
	name: String,
	pass: String,
	salt: String,
	id: String
});

var UserDB = mongoose.model('User',UserSchema);

exports.UserDB = UserDB;



// 微信图文回复
var NewsSchema = new mongoose.Schema({
	title: String,
	description: String,
	picUrl: String,
	url: String
});

exports.News = mongoose.model('News', NewsSchema);