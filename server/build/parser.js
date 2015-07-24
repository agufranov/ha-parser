(function() {
  var Parser, R, cheerio;

  cheerio = require('cheerio');

  R = require('ramda');

  module.exports = Parser = (function() {
    function Parser() {}

    Parser.prototype.parsePageCount = function(body) {
      var $, href, parts;
      $ = cheerio.load(body);
      href = $('a:contains("В конец")').attr('href');
      parts = href.split('/');
      return Math.round(parts[parts.length - 1] / 10);
    };

    Parser.prototype.parsePage = function(body, type) {
      var $;
      $ = cheerio.load(body);
      return R.mergeAll($('table > tr:not(:first-child)').map(function(i, row) {
        var address, date, fields, href, id, price, station;
        fields = $('td', row).map(function(j, cell) {
          return $(cell).text();
        }).get();
        href = $('a', row).attr('href');
        id = href.split('/')[3];
        date = fields[0], station = fields[1], address = fields[2], price = fields[3];
        return R.createMapEntry(id, {
          date: date,
          station: station,
          address: address,
          price: price,
          href: href,
          type: type,
          id: id
        });
      }).get());
    };

    return Parser;

  })();

}).call(this);
