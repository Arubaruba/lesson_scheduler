var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('../config.json');
var redis = require('./databases').redis;

var strategies = {
  facebook: {
    config: {
      clientID: config['facebook_app_id'],
      clientSecret: config['facebook_app_secret'],
      callbackURL: 'http://127.0.0.1:8080/auth/facebook/callback',
      enableProof: false
    },
    onLogin: function (token, tokenSecret, profile, done) {
      // Write the user's profile data to redis every time they login
      var user = profile._json;
      user.id = 'facebook:' + profile.id;

      redis.hmset('user:' + user.id, user, function (err) {
        done(err, user);
      });
    }
  }
};

function serializeUser(user, done) {
  done(null, user.id);
}

function deserializeUser(id, done) {
  redis.hgetall('user:' + id, function (err, user) {
    done(err, user);
  });
}

exports.setup = function (app) {

  app.use(session({
    store: new RedisStore({client: redis}),
    secret: config['session_secret']
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(serializeUser);

  passport.deserializeUser(deserializeUser);

  passport.use(new FacebookStrategy(strategies.facebook.config, strategies.facebook.onLogin));
};

exports.serializeUser = serializeUser; // exported for tests
exports.deserializeUser = deserializeUser; // exported for tests
exports.strategies = strategies; // exported for tests
