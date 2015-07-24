(function() {
  var FsStorage, fs, path;

  fs = require('fs');

  path = require('path');

  module.exports = FsStorage = (function() {
    function FsStorage() {}

    FsStorage.prototype._dir = 'storage';

    FsStorage.prototype._filename = 'db.json';

    FsStorage.prototype.save = function(items) {
      if (!fs.existsSync(this._dir)) {
        fs.mkdirSync(this._dir);
      }
      return fs.writeFileSync(path.join(this._dir, this._filename), JSON.stringify(items));
    };

    return FsStorage;

  })();

}).call(this);
