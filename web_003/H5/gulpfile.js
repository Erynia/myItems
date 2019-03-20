const [
    gulp,
    gulpsass,
    gulpcleancss,
    gulprename,
	gulphtmlmin,
	gulpuglify,
	gulpbabel,
	gulpconcat,
	gulpwebserver,
] = [
    require("gulp"),
    require("gulp-sass"),
    require("gulp-clean-css"),
    require("gulp-rename"),
	require("gulp-htmlmin"),
	require("gulp-uglify"),
	require("gulp-babel"),
	require("gulp-concat"),
	require("gulp-webserver")
];


gulp.task("devHtml",() => {
	return gulp.src("./src/**/*.html")
	.pipe(gulphtmlmin({
		coolapse
	}))
})

gulp.task("devCss",() => {
    return gulp.src("./src/scss/!(common)*.scss")
    .pipe(gulpsass())
    .pipe(gulpcleancss())
    .pipe(gulprename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("./src/css"))
})

gulp.task("devJs",() => {
	return gulp.src("./src/scripts/!(libs)**.*.js")
	.pipe(gulpbabel({
		presets: "es2015"
	}))
	.pipe(gulpconcat("all.js"))
	.pipe(gulpuglify())
	.pipe(gulprename({
		suffix: ".min"
	}))
	.pipe(gulp.dest("./src/scripts/"))
})
gulp.task("webserver",() => {
	return gulp.src("./src")
	.pipe(gulpwebserver({
		port:8989,
		livereload: true,
		proxies: [
			{source:"/api/default",target:"http://localhost:3000/default"}
		]
	}))
})


gulp.task("watchFile",() => {
    let fileAry = [
        "./src/scss/*.scss"
    ]
    let taskAry = [
        "devCss"
    ]
    gulp.watch(fileAry,gulp.series(taskAry))
})
//=> 开发环境
gulp.task("dev",gulp.series("webserver","watchFile"));\

gulp.task("default",gulp.series("webserver","watchFile"))