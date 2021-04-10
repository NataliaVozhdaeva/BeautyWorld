const{src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename'); 

function browsersync(){
	browserSync.init({
	  server:'src/',
	  notify:false,	
	});
}

//Задача компиляции sass в css
function buildSass(){
	return src('src/scss/**/*.scss')
	 .pipe(sourcemaps.init())
	  .pipe(sass())
	  .on('error', sass.logError)
	  .pipe( 
	    postcss([
	      autoprefixer({
		  //grid:true,
		  overrideBrowserslist:['last 2 versions'],
	      }), 
	      cssnano()
	    ]))
	  .pipe(sourcemaps.write('.')) 
	  .pipe(dest('dist/css'))
	  .pipe(dest('src/css'))
	  .pipe(browserSync.stream())
};

function buildJs() {
  return src('src/js/index.js')
    .pipe(webpackStream(require('./webpack.config')))
    .pipe(rename('main.min.js'))
    .pipe(dest('src/js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

function html(){
	return src('src/**/*.html')
	  .pipe(dest('dist/'))
	  .pipe(browserSync.stream())
};

function serve(){
	watch(['src/js/**/*.js', '!src/js/**/*.min.js'], buildJs);
	watch('src/scss/**/*.scss', buildSass);
	watch('src/**/*.html', html);
}

//exports.serve = serve;
//exports.buildSass = buildSass;

function copy(){
	return src(['src/img/**/*.*', 'src/css/**/*.css'],{
		base:'src/',
	}).pipe(dest('dist'));
}

function cleanDist(){
	return del('dist/**/*', {force:true});
}

exports.build = series(cleanDist, buildSass, buildJs, html, copy);
exports.default = series([buildSass, buildJs], parallel(browsersync, serve));
