Q = require 'q'
R = require 'ramda'
fs = require 'fs'

module.exports = class Dumper
  constructor: (@_requester, @_provider, @_parser, @_storage) ->

  getAndSave: (page, type) ->
    console.log "getAndSave(#{page}, #{type}) started..."
    @_requester.getPage page, type
      .then (body) =>
        console.log "getAndSave(#{page}, #{type}) done!"
        @_provider.save page, type, body

  savePagesOfType: (type) ->
    @getAndSave 0, type
      .then =>
        @_provider.load 0, type
      .then (body) =>
        @_parser.parsePageCount body
      .then (pageCount) =>
        console.log 'Page count: ', pageCount
        promiseGenerators = [0..pageCount].map (page) =>
          =>
            @getAndSave page, type

        PromiseHelper.executePromisesConsecutiveAndWithTimeout promiseGenerators, -> console.log 'resolve callback', arguments
      .fail =>
        console.log 'spot fail', arguments

  dumpType: (type) ->
    @_provider.loadAllOfType type
      .then (bodies) =>
        Q.all(bodies.map (body) => @_parser.parsePage(body, type))
      .then (chunks) =>
        parsedType = R.mergeAll chunks
        @_storage.save parsedType

