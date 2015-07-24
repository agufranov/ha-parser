fs = require 'fs'
path = require 'path'

module.exports = class FsStorage
  _dir: 'storage'

  _filename: 'db.json'

  save: (items) ->
    fs.mkdirSync @_dir unless fs.existsSync @_dir
    fs.writeFileSync path.join(@_dir, @_filename), JSON.stringify items
