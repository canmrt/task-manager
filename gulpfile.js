var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    buffer = require('vinyl-buffer'),
    less = require('gulp-less'),
    inject = require('gulp-inject'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    del = require('del'),
    mainBowerFiles = require('main-bower-files'),
    templateCache = require('gulp-angular-templatecache'),
    path = require('path'),
    fs = require('fs'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');

var c = {
  dist: 'dist',
  tmp : 'tmp',
  src : 'src',
  app : 'app',
  bower: 'bower_components',
  assets: 'assets',
  vendor : 'vendor',
  main: 'index.js',
  deps: 'vendor.js',
  production: false
}

gulp.task('default', function () {
  c.production = true;
  return runSequence('build');
})

gulp.task('build', function () {
  return runSequence('clean', ['browserify', 'vendor', 'template', 'static', 'assets', 'less']);
})


gulp.task('clean', function(){
  return del([c.tmp, c.dist]);
});

// gulp.task('transpile', function(){
//   return gulp.src([c.src + '/**/*.js'])
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(gulp.dest(c.tmp));
// });

// gulp.task('bundle', function(){
//   return  browserify([path.join(c.tmp, c.app, c.main)]).bundle()
//     .pipe(source(c.main))
//     .pipe(buffer())
//     .pipe(gulpif(c.production, uglify({ mangle : false })))
//     .pipe(rename(c.main))
//     .pipe(gulpif(c.production, gulp.dest(path.join(c.dist, c.app))))
//     .pipe(gulpif(!c.production, gulp.dest(path.join(c.tmp, c.app))))
// })

gulp.task('browserify', function () {
  // var bundler = !c.production ? watchify(browserify(path.join(c.src, c.app, c.main))) : browserify(path.join(c.src, c.app, c.main));
  return browserify(path.join(c.src, c.app, c.main))
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source(c.main))
    .pipe(buffer())
    .pipe(gulpif(c.production, uglify({ mangle : false })))
    .pipe(rename(c.main))
    .pipe(gulpif(c.production, gulp.dest(path.join(c.dist, c.app))))
    .pipe(gulpif(!c.production, gulp.dest(path.join(c.tmp, c.app))))
})

gulp.task('vendor', function(){
   return gulp.src(mainBowerFiles())
   .pipe(concat(c.deps))
   .pipe(gulpif(c.production, uglify()))
   .pipe(gulpif(c.production, gulp.dest(path.join(c.dist, c.vendor))))
   .pipe(gulpif(!c.production, gulp.dest(path.join(c.tmp, c.vendor))))
})

gulp.task('template', function () {
  var options = {
    standalone : true
  }
  return gulp.src([c.src + '/**/*.html', '!' + c.src + '/index.html'])
    .pipe(templateCache(options))
    .pipe(gulpif(c.production, uglify()))
    .pipe(gulpif(c.production, gulp.dest(path.join(c.dist, c.app))))
    .pipe(gulpif(!c.production, gulp.dest(path.join(c.tmp, c.app))))
});

gulp.task('static', function () {
  var filter = [
    path.join(c.src, 'index.html'),
    path.join(c.src, 'favicon.ico')
  ]
  return gulp.src(filter)
    .pipe(gulpif(c.production, gulp.dest(c.dist)))
    .pipe(gulpif(!c.production, gulp.dest(c.tmp)))
});

gulp.task('assets', function () {
  var filter = [
    path.join(c.src, c.assets, '*')
  ]
  return gulp.src(filter)
    .pipe(gulpif(c.production, gulp.dest(path.join(c.dist, c.assets))))
    .pipe(gulpif(!c.production, gulp.dest(path.join(c.tmp, c.assets))))
});

gulp.task('less', function () {
  var mainLessFile = 'index.less';
  var injectionOptions = {
      starttag: '/* inject:imports */',
      endtag:   '/* endinject */',
      transform: function (filepath) {
          return '@import ".' + filepath + '";';
      }
  }
  var filter = [
    path.join(c.src, '**/*.less'),
    '!' + path.join(c.src, c.app, mainLessFile)
  ]  
  return gulp.src(path.join(c.src, c.app, mainLessFile))
    .pipe(inject(gulp.src(filter, {read: false}), injectionOptions))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulpif(c.production, gulp.dest(path.join(c.dist, c.app))))
    .pipe(gulpif(!c.production, gulp.dest(path.join(c.tmp, c.app))))
})

gulp.task('serve:dist', ['default'], function() {
    browserSync.init({
        server: {
            baseDir: c.dist
        }
    });
});

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: c.tmp
        }
    });
    // JS
    gulp.watch(c.src + "/**/*.js", ['browserify']);
    // Bower
    gulp.watch(c.bower + "/**/*.js", ['vendor']);
    // Template
    gulp.watch([c.src + '/**/*.html', '!' + c.src + '/index.html'], ['template']);
    // Static
    gulp.watch([c.src + '/index.html'], ['static']);
    // Assets
    gulp.watch(path.join(c.src, c.assets, '*'), ['assets']);
    // Less
    gulp.watch(path.join(c.src, '/**/*.less'), ['less']);
    // RELOAD
    gulp.watch(c.tmp + "/**/*").on('change', browserSync.reload);
});