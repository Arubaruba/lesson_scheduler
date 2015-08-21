var express = require('express');
var app = express();

var routes = require('./routes.js');

// Define routes in router
routes.setup(app);

// Start the server
var port = 8080;
app.listen(port);
console.log('Server started on port %d', port);

exports.app = app;