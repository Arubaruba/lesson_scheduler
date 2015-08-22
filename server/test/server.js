var request = require('supertest');

describe('Server', function() {

  var app;

  // Mocha runs these tests in order; the server will be started before we test it's functionality

  it('starts', function () {
    // Synchronously starts the server
    app = require('../server.js').app;
  });

  it('accepts connections', function (done) {
    app.get('/test', function (req, res) {
      res.end('ok');
    });

    request(app).get('/test').expect(200, done);
  });
});
