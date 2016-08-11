
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
	allCollections: function( req, res ) {
		var collections = [];
		for(var modelName in mongooseSchemas) {
			collections.push(modelName);
		}

		res.json(collections);
	},

	search: function( req, res ) {

		// TODO: validation

		// create model
		if(typeof mongooseConnections[req.sessionID].models[req.query.modelName] === 'undefined') {
			mongooseConnections[req.sessionID].models[req.query.modelName] = mongooseConnections[req.sessionID].connection.model(req.query.modelName, mongooseSchemas[req.query.modelName]);
		}

		var findArgs = {};
		if(req.query.searchString) {
			console.log(JSON.stringify({ $regex: '.*' + req.query.searchString + '.*', $options: 'im' }));
			findArgs.$text = { $regex: '.*' + req.query.searchString + '.*', $options: 'im' };//$search : '^' + req.query.searchString + '$' };

		}
		var query = mongooseConnections[req.sessionID].models[req.query.modelName].find(findArgs);

		if(req.query.sortField) {
			var sortObj = {};
			sortObj[req.query.sortField] = (req.query.sortDirection ? req.query.sortDirection : 1);
			query.sort(sortObj);
		}

		query.exec(function(err, result) {
			if(err) {
				res.status(500).send(err);
			} else {
				res.json(result);
			}
		});
	}
};
