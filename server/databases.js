var redis = require('redis');
var postgres = require('pg');
var config = require('../config.json');

// TODO see: http://stackoverflow.com/questions/20175806/before-and-after-hooks-for-a-request-in-express-to-be-executed-before-any-req-a
// to create a client for every request and close it before it ends

exports.redis = redis.createClient({auth_pass: config['redis_pass']});
