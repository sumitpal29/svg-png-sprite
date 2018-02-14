var basePaths = {
	dest: 'build/',
	src: 'src/',
};
var paths = {
	images: {
		src: basePaths.src + 'img/',
		dest: basePaths.dest + 'img/'
	},
	sprite: {
		src: basePaths.src + 'img/*',
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

var $ = {
	gutil: require('gulp-util'),
	svgSprite: require('gulp-svg-sprite'),
    size: require('gulp-size'),
    toPng: require('gulp-svg2png'),
    filter: require('gulp-filter')
};

// var changeEvent = function(evt) {
// 	$.gutil.log('File', $.gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', $.gutil.colors.magenta(evt.type));
// };

gulp.task('default', function () {
    return gulp.src(paths.sprite.src)
		.pipe($.svgSprite({
			shape: {
				spacing: {
					padding: 10
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

// gulp.task('watch', function(){
// 	gulp.watch(paths.sprite.src, ['sprite']).on('change', function(evt) {
// 		changeEvent(evt);
// 	});
// });

//gulp.task('default', ['sprite']);