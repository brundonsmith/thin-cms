var mongoose = require('mongoose');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Post = new Schema({
    published     : { type: Boolean },
		title					: { type: String, stringType: 'short' },
		url         	: { type: String, stringType: 'short' },
		body        	: { type: String, stringType: 'long' }
});

Post = mongoose.model('Post', Post);

module.exports = { Post: Post };
