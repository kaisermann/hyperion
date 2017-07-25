# Hyperion

> A static webapp workflow forked from [Crius](https://github.com/kaisermann/crius).

With hyperion you can:
* Write HTML with [Nunjucks](https://mozilla.github.io/nunjucks/)
  * Accessible variables within Nunjucks by using the [`app.json`](https://github.com/kaisermann/hyperion/blob/master/app.json) file. To reference a variable, use `app.variable.path...`.
  * If a `NODE_ENV` is set, the script will look for a property inside [`environments`](https://github.com/kaisermann/hyperion/blob/master/app.json#L3) with the same name as the environment name to set the `app` object.
  * Create new Nunjucks context variables and filters by editing [`hyperion.js`](https://github.com/kaisermann/hyperion/blob/master/hyperion.js).
* Write CSS with Stylus
    * Build your website's grid with the RolleiFLEX flex helper framework. (stylus)
    * Use simplified media queries with rupture (stylus)
    * Responsive font-size and [other useful mixins](https://github.com/kaisermann/hyperion/blob/master/app/assets/styles/config/mixins.styl)
* Write modern Javascript
* See live changes (CSS/JS/HTML) on your project with [browserSync](https://www.browsersync.io/)
* Need to manage a new type of resource, like, let's say... sounds? Just define it in the [`crius.json`](https://github.com/kaisermann/hyperion/blob/master/crius.json) and let the magic happen!

## Requirements

* [Node.js](http://nodejs.org/) >= 6.9.x
* [Gulp](https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/) >= 4.x.x

## External links
* [Crius documentation](https://github.com/kaisermann/crius) (recommended)
