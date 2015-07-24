fs = require 'fs'
yaml = require 'js-yaml'
Q = require 'q'
request = require 'request'

module.exports = class Requester
  constructor: () ->
    @_settings = yaml.load fs.readFileSync 'requester.yml'

    @_types =
      0: 'komnata'
      1: '1komn'
      2: '2komn'
      3: '3komn'
      4: '4komn'

    @_headers =
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      'Accept-Encoding': 'gzip, deflate, sdch'
      'Accept-Language': 'en-US,en;q=0.8'
      'Cache-Control': 'max-age=0'
      'Connection': 'keep-alive'
      'Cookie': "session=#{@_settings.session}"
      'Host': 'hren-agentam.com'
      'Referer': 'http://hren-agentam.com'
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/43.0.2357.130 Chrome/43.0.2357.130 Safari/537.36'

  _request: (url) ->
    Q.promise (resolve, reject, notify) =>
      request
        url: url
        method: 'GET'
        headers: @_headers
        gzip: true
        , (error, response, body) =>
          if error
            reject error
          else
            resolve body

  getPage: (n, type) ->
    type = @_types[type]
    throw new Error "Invalid type" if not type
    url = "#{@_settings.baseUrl}/base/hrenagentam/#{type}/0/0/#{if n > 0 then n * 10 else ''}"
    console.log "Request to #{url}"
    @_request url
