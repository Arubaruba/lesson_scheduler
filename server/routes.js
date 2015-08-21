exports.setup = function (app, handlers) {
  app.all('/test', require('./handlers/test.js'));
};