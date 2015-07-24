cheerio = require 'cheerio'
R = require 'ramda'

module.exports = class Parser
  parsePageCount: (body) ->
    $ = cheerio.load body
    href = $('a:contains("В конец")').attr 'href'
    parts = href.split('/')
    Math.round(parts[parts.length - 1] / 10)

  parsePage: (body, type) ->
    $ = cheerio.load body
    R.mergeAll(
      $('table > tr:not(:first-child)')
        .map (i, row) ->
          fields = $('td', row)
              .map (j, cell) ->
                $(cell).text()
              .get()
          href = $('a', row).attr('href')
          id = href.split('/')[3]
          [date, station, address, price] = fields
          R.createMapEntry id, { date, station, address, price, href, type, id }
        .get()
    )
