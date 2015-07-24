(function() {
  var Dumper, Q, R, fs;

  Q = require('q');

  R = require('ramda');

  fs = require('fs');

  module.exports = Dumper = (function() {
    function Dumper(_requester, _provider, _parser, _storage) {
      this._requester = _requester;
      this._provider = _provider;
      this._parser = _parser;
      this._storage = _storage;
    }

    Dumper.prototype.getAndSave = function(page, type) {
      console.log("getAndSave(" + page + ", " + type + ") started...");
      return this._requester.getPage(page, type).then((function(_this) {
        return function(body) {
          console.log("getAndSave(" + page + ", " + type + ") done!");
          return _this._provider.save(page, type, body);
        };
      })(this));
    };

    Dumper.prototype.savePagesOfType = function(type) {
      return this.getAndSave(0, type).then((function(_this) {
        return function() {
          return _this._provider.load(0, type);
        };
      })(this)).then((function(_this) {
        return function(body) {
          return _this._parser.parsePageCount(body);
        };
      })(this)).then((function(_this) {
        return function(pageCount) {
          var i, promiseGenerators, results;
          console.log('Page count: ', pageCount);
          promiseGenerators = (function() {
            results = [];
            for (var i = 0; 0 <= pageCount ? i <= pageCount : i >= pageCount; 0 <= pageCount ? i++ : i--){ results.push(i); }
            return results;
          }).apply(this).map(function(page) {
            return function() {
              return _this.getAndSave(page, type);
            };
          });
          return PromiseHelper.executePromisesConsecutiveAndWithTimeout(promiseGenerators, function() {
            return console.log('resolve callback', arguments);
          });
        };
      })(this)).fail((function(_this) {
        return function() {
          return console.log('spot fail', arguments);
        };
      })(this));
    };

    Dumper.prototype.dumpType = function(type) {
      return this._provider.loadAllOfType(type).then((function(_this) {
        return function(bodies) {
          return Q.all(bodies.map(function(body) {
            return _this._parser.parsePage(body, type);
          }));
        };
      })(this)).then((function(_this) {
        return function(chunks) {
          var parsedType;
          parsedType = R.mergeAll(chunks);
          return _this._storage.save(parsedType);
        };
      })(this));
    };

    return Dumper;

  })();

}).call(this);
