var async = require('async');
var assert = require('assert');
var auth = require('../auth');

describe('Auth', function () {
  it('can serialize and deserialize facebook users', function (done) {
    var profile = {
      id: 9000000000,
      _json: {id: 9000000000, name: 'Andy'}
    };

    // Add the user to the database
    auth.strategies.facebook.onLogin(null, null, profile, function (err, user) {
      async.waterfall([
        // Save the user id server side on redis (done by redis connector - we just give it the user id)
        function (callback) {
          auth.serializeUser(user, callback);
        },
        // Get user data from user id
        function (serializedUser, callback) {
          auth.deserializeUser(serializedUser, callback);
        }
        // Make sure we serialized and deserialized the user without losing any data
      ], function (err, deserializedUser) {
        assert.deepEqual(deserializedUser, user);
        done();
      });
    });
  });
});
