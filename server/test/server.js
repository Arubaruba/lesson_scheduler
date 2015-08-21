var assert = require('assert');
var supertest = require('supertest');

describe('Server', function() {

  var app;

  it('starts', function () {
    // Synchronously start the server
    app = require('../server.js').app;
  });

  it('accepts connections', function (done) {
    supertest(app).get('/test').expect(200, done);
  });
});
