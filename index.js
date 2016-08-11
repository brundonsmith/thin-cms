
// express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var requireDir = require('require-dir');
var path = require('path');

// start
module.exports = {
  init: function(dbUrl, schemas, port) {

    // application
    var app = express();
    var oneDay = 8.64e+7;
    app.use(express.static( __dirname + '/', { maxAge: oneDay }));

    // Use parameters
    app.set('dbpath', dbUrl);
    mongooseConnections = {};
    mongooseSchemas = (schemas || {});
    generateModel = function(schemaName, connection) {
      return connection.model('Project', mongooseSchemas[schemaName]);
    };
    port = (port || 8001);

    // body parser
    app.use(bodyParser.json());

    // sessions
    app.use(cookieParser('foo'));
    app.use(session({
      secret: 'foo',
      resave: false,
      saveUninitialized: true,
      cookie: {
    	  secure: false,
    	  httpOnly: false
      }
    }));

    //************ TESTING *****************
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");
      next();
    });
    //***************************************

    // load routes
    var routes = requireDir(__dirname + '/rest-routes');

    // routes
    app.get('/login', function(req, res) {
    	res.sendFile(__dirname + '/views/login.html');
    });
    app.post('/login', function(req, res) {
    	var newConnection = mongoose.createConnection(app.get('dbpath'), {
    			user: req.body.username,
    			pass: req.body.password
    		},
    		function(err) {
    			if(err) {
    				res.send('{"message": "error"}');
    			}
    		}
    	);

    	newConnection.once('connected', function(){
    		mongooseConnections[req.sessionID] = {
    			connection: newConnection,
    			models: {}
    		};
    		res.send('{"message": "success"}');
    	});
    });
    app.post('/logout', function(req, res) {
    	delete mongooseConnections[req.sessionID];
    	res.send();
    });

    // data routes
    app.get('/favicon.ico', function(req, res){ res.status(204).send(); } );
    app.get('/api/collections', routes.collections.allCollections);
    app.get('/api/search', routes.collections.search);

    app.post('/api/:modelName', routes.crud.create);
    app.get('/api/:modelName/:objectId', routes.crud.read);
    app.put('/api/:modelName/:objectId', routes.crud.update);
    app.delete('/api/:modelName/:objectId', routes.crud.delete);
    app.get('/api/:modelName', routes.crud.readSchema);

    app.get('/*', function(req, res) {

          //************ TESTING *****************
          var newConnection = mongoose.createConnection(app.get('dbpath'), {
              user: 'admin',
              pass: 'pass'
            },
            function(err) {
              if(err) {
                res.send('Error logging in to mongo');
              }
            }
          );

          newConnection.once('connected', function(){
            mongooseConnections[req.sessionID] = {
              connection: newConnection,
              models: {}
            };
            res.sendFile(__dirname + '/index.html');
          });
          //***************************************

      //res.sendFile(__dirname + '/index.html');
    });

    // process
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    app.listen(port);
    console.log('Material CMS listening on port ' + port + '...');
    if(typeof schemas === 'undefined') {
      console.warn('WARNING: No mongoose schemas passed to Material CMS');
    }

  }
};

//************ TESTING *****************
var State = require('./test-models/State').State;
var Address = require('./test-models/Address').Address;
var Subscription = require('./test-models/Subscription').Subscription;

module.exports.init('localhost:27017', [ State.schema, Address.schema, Subscription.schema ]);
//***************************************
