const { join } = require('path')

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const size = require('gulp-size')
const purifyCSS = require('gulp-purifycss')

const crius = require('../manifest')
const params = require('../params')
const pathExists = require('../utils/doesPathExist')
const errorHandler = require('../utils/errorHandler')

const auxSizeReport = msg =>
  size({ showFiles: true, showTotal: false, title: msg })

const distPath = crius.config.paths.dist

gulp.task('purify', done => {
  const stylesDir = join(distPath, crius.resources.styles.directory)

  if (!pathExists(stylesDir)) {
    throw new Error('Styles distribution directory not found.')
  }

  // Let's get all assets with purify:true
  const cssPaths = Object.entries(crius.resources.styles.assets)
    .filter(([name, asset]) => asset.purify)
    .map(([name, asset]) => join(stylesDir, name))

  const processDir = process.cwd()
  const globsToParse = [
    join(processDir, distPath, '**', '*.html'),
    join(processDir, distPath, '**', '*.js'),
  ]

  if (!cssPaths.length) {
    console.log(
      "No css files found with 'purify': true. Define it on the 'crius.json'"
    )
    return done()
  }

  return gulp
    .src(cssPaths, { base: './' })
    .pipe(plumber({ errorHandler }))
    .pipe(auxSizeReport('Before purifyCSS:'))
    .pipe(
      purifyCSS(globsToParse, {
        minify: !params.debug,
        whitelist: ['js-*', 'wp-*', 'is-*', 'align-*', 'admin-bar*'],
      })
    )
    .pipe(auxSizeReport('After purifyCSS:'))
    .pipe(gulp.dest('./'))
    .on('end', done)
    .on('error', done)
})
