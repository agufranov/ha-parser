gulp = require 'gulp'
coffee = require 'gulp-coffee'
watch = require 'gulp-watch'
nodemon = require 'gulp-nodemon'
jade = require 'gulp-jade'

gulp.task 'default', ['watch-server-coffee', 'watch-client-coffee', 'watch-client-jade', 'nodemon']

gulp.task 'watch-server-coffee', ->
  gulp.src 'server/src/**/*.coffee'
    .pipe watch 'server/src/**/*.coffee'
    .pipe coffee()
    .pipe gulp.dest 'server/build'

gulp.task 'watch-client-coffee', ->
  gulp.src 'client/src/**/*.coffee'
    .pipe watch 'client/src/**/*.coffee'
    .pipe coffee()
    .pipe gulp.dest 'client/build'

gulp.task 'watch-client-jade', ->
  gulp.src 'client/src/**/*.jade'
    .pipe watch 'client/src/**/*.jade'
    .pipe jade()
    .pipe gulp.dest 'client/build'

gulp.task 'nodemon', ->
  nodemon
    script: 'server/build/app.js'
