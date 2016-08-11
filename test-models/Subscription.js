var mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Subscription = new Schema({
		subscriptionType		: { type: String },
		subscriptionLength		: { type: Number, min: 1, default: 1 },
		address			 		: ObjectId,
		creationDate			: Date
});

Subscription = mongoose.model('Subscription', Subscription);

module.exports = { Subscription: Subscription };
