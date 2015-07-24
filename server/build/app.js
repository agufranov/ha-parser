(function() {
  var Dumper, FsProvider, FsStorage, Parser, PromiseHelper, Requester, Server, dumper, server;

  Requester = require('./requester');

  FsProvider = require('./fsProvider');

  Parser = require('./parser');

  FsStorage = require('./fsStorage');

  PromiseHelper = require('./promiseHelper');

  Dumper = require('./dumper');

  Server = require('./server');

  dumper = new Dumper(new Requester(), new FsProvider(), new Parser(), new FsStorage());

  dumper.dumpType(1);

  server = new Server();

}).call(this);
