(function() {
  var Q, Requester, fs, request, yaml;

  fs = require('fs');

  yaml = require('js-yaml');

  Q = require('q');

  request = require('request');

  module.exports = Requester = (function() {
    function Requester() {
      this._settings = yaml.load(fs.readFileSync('requester.yml'));
      this._types = {
        0: 'komnata',
        1: '1komn',
        2: '2komn',
        3: '3komn',
        4: '4komn'
      };
      this._headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'en-US,en;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': "session=" + this._settings.session,
        'Host': 'hren-agentam.com',
        'Referer': 'http://hren-agentam.com',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/43.0.2357.130 Chrome/43.0.2357.130 Safari/537.36'
      };
    }

    Requester.prototype._request = function(url) {
      return Q.promise((function(_this) {
        return function(resolve, reject, notify) {
          return request({
            url: url,
            method: 'GET',
            headers: _this._headers,
            gzip: true
          }, function(error, response, body) {
            if (error) {
              return reject(error);
            } else {
              return resolve(body);
            }
          });
        };
      })(this));
    };

    Requester.prototype.getPage = function(n, type) {
      var url;
      type = this._types[type];
      if (!type) {
        throw new Error("Invalid type");
      }
      url = this._settings.baseUrl + "/base/hrenagentam/" + type + "/0/0/" + (n > 0 ? n * 10 : '');
      console.log("Request to " + url);
      return this._request(url);
    };

    return Requester;

  })();

}).call(this);
