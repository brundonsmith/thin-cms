
var path = require('path');
var mongoose = require('mongoose');
var requireDir = require('require-dir');

/*
function checkForMissingParameter( req, res, paramName ) {
	if(typeof req.body[paramName] === 'undefined') {
		return { error: 'Required parameter "' + paramName + '" not found'};
	} else {
		return undefined;
	}
}
*/


module.exports = {
	create: function( req, res ) {

		// TODO: validation

		// create model
		if(typeof mongooseConnections[req.sessionID].models[req.params.modelName] === 'undefined') {
			mongooseConnections[req.sessionID].models[req.params.modelName] = mongooseConnections[req.sessionID].connection.model(req.params.modelName, mongooseSchemas[req.params.modelName]);
		}

		var newObject = new mongooseConnections[req.sessionID].models[req.params.modelName]();
		newObject.save(function (err) {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(newObject);
			}
		});
	},

	read: function( req, res ) {

		// TODO: validation

		// create model
		if(typeof mongooseConnections[req.sessionID].models[req.params.modelName] === 'undefined') {
			mongooseConnections[req.sessionID].models[req.params.modelName] = mongooseConnections[req.sessionID].connection.model(req.params.modelName, mongooseSchemas[req.params.modelName]);
		}

		mongooseConnections[req.sessionID].models[req.params.modelName].findOne(
			{ _id: mongoose.Types.ObjectId(req.params.objectId) },
			function(err, result) {
				if(err) {
					res.status(500).send(err);
				} else {
					res.json(result);
				}
			}
		);
	},

	/*
		{
			objectId: '',
			modelName: ''
		}
	*/
	update: function( req, res ) {

		// TODO: validation

		// create model
		if(typeof mongooseConnections[req.sessionID].models[req.params.modelName] === 'undefined') {
			mongooseConnections[req.sessionID].models[req.params.modelName] = mongooseConnections[req.sessionID].connection.model(req.params.modelName, mongooseSchemas[req.params.modelName]);
		}

		mongooseConnections[req.sessionID].models[req.params.modelName].update(
			{ _id: mongoose.Types.ObjectId(req.params.objectId) },
			{ $set: req.body },
			function(err, result) {
				if(err) {
					res.status(500).send(err);
				} else {
					res.send();
				}
			}
		);
	},

	/*
		{
			objectId: '',
			modelName: ''
		}
	*/
	delete: function( req, res ) {
		/*
		var errorMessage = undefined;
		errorMessage = checkForMissingParameter(req, res, 'objectId');
		hasError = hasError || checkForMissingParameter(req, res, 'objectId');

		if(hasError) {
			return;
		}
		*/

		// TODO: validation

		// create model
		if(typeof mongooseConnections[req.sessionID].models[req.params.modelName] === 'undefined') {
			mongooseConnections[req.sessionID].models[req.params.modelName] = mongooseConnections[req.sessionID].connection.model(req.params.modelName, mongooseSchemas[req.params.modelName]);
		}

		mongooseConnections[req.sessionID].models[req.params.modelName].remove(
			{ _id: mongoose.Types.ObjectId(req.params.objectId) },
			function(err, result){
				if(err) {
					res.status(500).send(err);
				} else {
					res.send();
				}
			}
		);
	},

	readSchema: function( req, res ) {

		// create model
		if(typeof mongooseConnections[req.sessionID].models[req.params.modelName] === 'undefined') {
			mongooseConnections[req.sessionID].models[req.params.modelName] = mongooseConnections[req.sessionID].connection.model(req.params.modelName, mongooseSchemas[req.params.modelName]);
		}

		res.json(mongooseConnections[req.sessionID].models[req.params.modelName].schema)
	}
};
