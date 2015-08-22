var passport = require('passport');

exports.setup = function (app) {
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {successRedirect: '/'}));

  app.get('/', function(req, res) {
    res.write(JSON.stringify(req.user));
    res.end(req.isAuthenticated() ? 'authenticated' : 'not authed');
  });
};