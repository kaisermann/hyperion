const lazypipe = require('lazypipe')
const gulpIf = require('gulp-if')
const nunjucksRender = require('gulp-nunjucks-render')
const htmlmin = require('gulp-htmlmin')

const crius = require('../manifest.js')
const hyperion = require('../../hyperion.js')

module.exports = {
  pipelines: {
    each: asset => {
      return lazypipe()
        .pipe(() =>
          gulpIf(
            '*.njk',
            nunjucksRender({
              path: crius.config.paths.source,
              manageEnv: function (environment) {
                const filters = hyperion.getFilters()
                Object.keys(filters).forEach(key =>
                  environment.addFilter(key, filters[key])
                )
              },
              data: hyperion.getData(),
            })
          )
        )
        .pipe(() =>
          gulpIf(
            file =>
              !crius.params.debug && file.path.split('.').pop() === 'html',
            htmlmin({
              collapseWhitespace: true,
              minifyCSS: true,
              minifyJS: {
                compress: {
                  drop_console: true,
                },
              },
              processConditionalComments: true,
              removeComments: true,
              removeEmptyAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
            })
          )
        )
    },
  },
}
