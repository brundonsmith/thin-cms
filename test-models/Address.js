var mongoose = require('mongoose');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Address = new Schema({
		name					: { type: String },
		addressLine1			: { type: String },
		AddressLine2			: { type: String },
		city					: { type: String },
		state					: { type: String },
		zip						: { type: String },
		phoneNumber			 	: { type: String }
});

Address = mongoose.model('Address', Address);

module.exports = { Address: Address };
