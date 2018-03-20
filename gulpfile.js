var basePaths = {
	dest: 'build/',
	src: 'src/',
	app: 'app/'
};
var paths = {
	images: {
		src: basePaths.app + 'img/',
		dest: basePaths.dest + 'img/'
	},
	sprite: {
		src: basePaths.app + 'img/*',
		svg: 'img/sprite.svg',
		css: '../../' + basePaths.src + 'sass/src/_sprite.scss'
	},
	templates: {
		src: basePaths.src + 'template.scss'
	}
};

/*
	Let the magic begin
*/
var gulp = require('gulp');
var sass = require('gulp-sass');
var $ = {
	gutil: require('gulp-util'),
	svgSprite: require('gulp-svg-sprite'),
    size: require('gulp-size'),
    toPng: require('gulp-svg2png'),
	filter: require('gulp-filter')
};

gulp.task('sprite', function () {
    return gulp.src(paths.sprite.src)
		.pipe($.svgSprite({
			shape: {
				spacing: {
					padding: 50
				}
            },
            baseSize: 16,
            preview: {
                sprite: "index.html"
            },
            svg: {
                sprite: "svg.svg"
            },
			mode: {
				css: {
					dest: "./",
					layout: "vertical",
					sprite: paths.sprite.svg,
					bust: false,
					render: {
						scss: {
							dest: "css/_sprite.scss",
							template: "src/template.scss"
						}
                    }
				}
			},
			variables: {
				mapname: "icons"
			}
        }))
        .pipe(gulp.dest(basePaths.dest))
        .pipe($.filter("**/*.svg"))  // Filter out everything except the SVG file
        .pipe($.toPng())           // Create a PNG
        .pipe(gulp.dest(basePaths.dest));
});

gulp.task('sass', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./app/build'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sprite']);