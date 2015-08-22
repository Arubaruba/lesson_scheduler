var async = require('async');
var assert = require('assert');
var databases = require('../databases');

describe('Redis', function () {
  it('can set and get values', function () {
    async.series([
      function (callback) {
        databases.redis.set('testValue', 1, callback);
      },
      function (callback) {
        databases.redis.get('testValue', function (err, result) {
          assert.equal(result, 1);
          callback();
        });
      }
    ]);
  });
});