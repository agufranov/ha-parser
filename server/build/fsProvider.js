(function() {
  var FsProvider, Q, R, fs, path;

  fs = require('fs');

  path = require('path');

  Q = require('q');

  R = require('ramda');

  module.exports = FsProvider = (function() {
    function FsProvider() {}

    FsProvider.prototype._dir = 'save';

    FsProvider.prototype._filename = function(page, type) {
      return type + "_" + page + ".html";
    };

    FsProvider.prototype.save = function(page, type, body) {
      return Q.promise((function(_this) {
        return function(resolve, reject, notify) {
          var filename;
          if (!fs.existsSync(_this._dir)) {
            fs.mkdirSync(_this._dir);
          }
          filename = _this._filename(page, type);
          return fs.writeFile(path.join(_this._dir, filename), body, function(err) {
            if (err) {
              return reject(["Save error [" + page + "]", err]);
            } else {
              return resolve();
            }
          });
        };
      })(this));
    };

    FsProvider.prototype._loadFile = function(filename) {
      return Q.promise((function(_this) {
        return function(resolve, reject, notify) {
          return fs.readFile(path.join(_this._dir, filename), {
            encoding: 'utf8'
          }, function(err, data) {
            if (err) {
              return reject(["Load error [" + filename + "]", err]);
            } else {
              return resolve(data);
            }
          });
        };
      })(this));
    };

    FsProvider.prototype.load = function(page, type) {
      return this._loadFile(this._filename(page, type));
    };

    FsProvider.prototype.loadAllOfType = function(type, callback) {
      var files, filesMap, r, result;
      files = fs.readdirSync(this._dir);
      r = new RegExp(type + "_(\\d+)\\.html");
      filesMap = function(file) {
        return r.exec(file);
      };
      result = R.pipe(R.map(filesMap), R.filter(R.identity), R.map(function(e) {
        return e[0];
      }))(files);
      return Q.all(result.map((function(_this) {
        return function(filename) {
          return _this._loadFile(filename);
        };
      })(this)));
    };

    return FsProvider;

  })();

}).call(this);
