gulp = require 'gulp'
coffee = require 'gulp-coffee'
watch = require 'gulp-watch'
nodemon = require 'gulp-nodemon'

gulp.task 'default', ['watch', 'nodemon']

gulp.task 'watch', ->
  gulp.src 'src/**/*.coffee'
    .pipe watch 'src/**/*.coffee'
    .pipe coffee()
    .pipe gulp.dest 'build'

gulp.task 'nodemon', ->
  nodemon
    script: 'build/app.js'
