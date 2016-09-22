
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
    app.use(express.static( process.cwd() + '/', { maxAge: oneDay }));
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

    app.use('/api*', function(req, res, next) {
      if(typeof mongooseConnections[req.sessionID] === 'undefined' && req.originalUrl !== '/api/login') {
        res.status(401).send("Error: User is not logged in");
      } else {
        next();
      }
    });

    //************ TESTING *****************
    // Automatically log in with test credentials on every request
    /*
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");

      if(!req.sessionID || !mongooseConnections[req.sessionID]) {
        console.log('CREATING MONGOOSE CONNECT');
        var newConnection = mongoose.createConnection(app.get('dbpath'),
          {
            user:'admin2',
            pass:'pass'
          },
          function(err) {
            if(err) {
              console.log('ERROR LOGGING INTO MONGO');
            }
          }
        );

        console.log('MONGOOSE CONNECT ATTEMPT STARTED');

        newConnection.once('connected', function(){
          console.log('MONGOOSE CONNECTED');
          mongooseConnections[req.sessionID] = {
            connection: newConnection,
            models: {}
          };
        });
        newConnection.once('error', function(err){
          console.log('MONGOOSE FAILED TO CONNECT:');
          console.log(err);
        });
      }

      next();
    });
    */
    //***************************************

    // load routes
    var routes = requireDir(__dirname + '/rest-routes');

    // routes
    app.put('/api/login', function(req, res) {
    	var newConnection = mongoose.createConnection(app.get('dbpath'), {
    			user: req.body.username,
    			pass: req.body.password
    		},
    		function(err) {
    			if(err) {
    				res.status(401).send('{ "loginSuccess": "false" }');
    			}
    		}
    	);

    	newConnection.once('connected', function(){
    		mongooseConnections[req.sessionID] = {
    			connection: newConnection,
    			models: {}
    		};
    		res.send('{ "loginSuccess": "true" }');
    	});
    });
    app.put('/api/logout', function(req, res) {
    	delete mongooseConnections[req.sessionID];
    	res.send();
    });

    // data routes
    app.get('/favicon.ico', function(req, res){ res.status(204).send(); } );
    app.get('/api/collections', routes.collections.allCollections);
    app.get('/api/search/:modelName', routes.collections.search);

    app.post('/api/:modelName', routes.crud.create);
    app.get('/api/:modelName/:objectId', routes.crud.read);
    app.put('/api/:modelName/:objectId', routes.crud.update);
    app.delete('/api/:modelName/:objectId', routes.crud.delete);
    app.get('/api/:modelName', routes.crud.readSchema);

    // login screen
    app.get('/login', function(req, res) {
      res.sendFile(__dirname + '/app.html');
    });

    // all other views
    app.get('/*', function(req, res) {
      if(typeof mongooseConnections[req.sessionID] === 'undefined') {
        res.redirect('/login');
      } else {
        res.sendFile(__dirname + '/app.html');
      }
    });

    // process
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    app.listen(port);
    console.log('Thin CMS listening on port ' + port + '...');
    if(typeof schemas === 'undefined') {
      console.warn('WARNING: No mongoose schemas passed to Material CMS');
    }

  }
};

//************ TESTING *****************
// Load test models and init
/*
var State = require('./test-models/State').State;
var Address = require('./test-models/Address').Address;
var Subscription = require('./test-models/Subscription').Subscription;
var Post = require('./test-models/Post').Post;

module.exports.init('ds059375.mongolab.com:59375/crate', {
  State: State.schema,
  Address: Address.schema,
  Subscription: Subscription.schema,
  Post: Post.schema
});
*/
//***************************************
