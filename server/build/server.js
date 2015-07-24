(function() {
  var Server, express;

  express = require('express');

  module.exports = Server = (function() {
    function Server() {
      var app;
      app = express();
      app.listen(8000);
      app.use('/storage', express["static"]('storage'));
      app.use('/lib', express["static"]('client/lib'));
      app.use(express["static"]('client/build'));
    }

    return Server;

  })();

}).call(this);
