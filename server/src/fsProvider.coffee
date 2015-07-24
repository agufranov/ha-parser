fs = require 'fs'
path = require 'path'
Q = require 'q'
R = require 'ramda'

module.exports = class FsProvider
  _dir: 'save'

  _filename: (page, type) ->
    "#{type}_#{page}.html"

  save: (page, type, body) ->
    Q.promise (resolve, reject, notify) =>
      fs.mkdirSync @_dir unless fs.existsSync @_dir
      filename = @_filename(page, type)
      fs.writeFile path.join(@_dir, filename), body, (err) =>
        if err
          reject ["Save error [#{page}]", err]
        else
          resolve()

  _loadFile: (filename) ->
    Q.promise (resolve, reject, notify) =>
      fs.readFile path.join(@_dir, filename), { encoding: 'utf8' }, (err, data) =>
        if err
          reject ["Load error [#{filename}]", err]
        else
          resolve data

  load: (page, type) ->
    @_loadFile @_filename(page, type)

  loadAllOfType: (type, callback) ->
    files = fs.readdirSync @_dir
    r = new RegExp "#{type}_(\\d+)\\.html"
    filesMap = (file) -> r.exec file
    result = R.pipe(
      R.map(filesMap),
      R.filter(R.identity),
      R.map((e) -> e[0]),
    ) files

    Q.all(result.map (filename) => @_loadFile filename)
