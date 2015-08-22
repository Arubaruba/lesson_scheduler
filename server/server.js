var express = require('express');
var auth = require('./auth');
var app = express();

var routes = require('./routes');

// Configure passport
auth.setup(app);

// Define routes in router
routes.setup(app);

// Start the server
var port = 8080;
app.listen(port);
console.log('Server started on port %d', port);

exports.app = app;