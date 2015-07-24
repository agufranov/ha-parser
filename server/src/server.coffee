express = require 'express'

module.exports = class Server
  constructor: ->
    app = express()

    app.listen 8000

    app.use '/storage', express.static 'storage'
    app.use '/lib', express.static 'client/lib'
    app.use express.static 'client/build'
