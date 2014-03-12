gulp = require 'gulp'
gutil = require 'gulp-util'

coffee = require 'gulp-coffee'
plumber = require 'gulp-plumber'
connect = require 'gulp-connect'

lr = require 'tiny-lr'
livereload = require 'gulp-livereload'
server = lr()

# Livereload server.
gulp.task 'livereload', (next) ->
    server.listen 35729, (err) ->
        if err
            gutil.log(err)
        next()

# Turns .coffee files in .js
gulp.task 'coffee', ->
    gulp.src('src/*.coffee')
        .pipe(plumber())
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('addon/js/'))
        .pipe(livereload(server))

# Watchs for any changes and runs the required tasks.
gulp.task 'watch', ->
    # Watch coffee files.
    gulp.watch('src/*.coffee', ['coffee'])


# Simple test cases!
gulp.task 'connect', connect.server(
    root: ['tests/fixture']
    port: 8080
    livereload: true
)

gulp.task('default', ['livereload', 'watch', 'coffee', 'connect'])