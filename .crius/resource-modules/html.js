const fs = require('fs')
const {join} = require('path')
const lazypipe = require('lazypipe')
const gulpIf = require('gulp-if')
const nunjucksRender = require('gulp-nunjucks-render')
const htmlmin = require('gulp-htmlmin')

const crius = require('../manifest.js')

module.exports = {
  pipelines: {
    each: asset => {
      const tmpAppData = JSON.parse(
        fs.readFileSync(join(process.cwd(), 'app.json'), 'utf8')
      )
      return lazypipe()
        .pipe(() =>
          gulpIf(
            '*.njk',
            nunjucksRender({
              path: crius.config.paths.source,
              manageEnv: function (environment) {
                environment.addFilter('padNumber', function (num) {
                  return num < 10 ? '0' + num : num
                })
              },
              data: {
                app: (() =>
                  (process.env.NODE_ENV &&
                    tmpAppData.environments[process.env.NODE_ENV]
                    ? Object.assign(
                        tmpAppData,
                        tmpAppData.environments[process.env.NODE_ENV]
                      )
                    : tmpAppData))(),
              },
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
