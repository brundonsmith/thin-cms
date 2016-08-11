var mongoose = require('mongoose');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var State = new Schema({
		name			: { type: String },
		code			: { type: String }
});

State = mongoose.model('State', State);

module.exports = { State: State };
