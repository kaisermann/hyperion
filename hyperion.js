const fs = require('fs')

module.exports = {
  // Appends new filters to nunjuck
  getFilters: () => {
    return {
      padNumber: num => (num < 10 ? '0' + num : num),
    }
  },
  // Loads 'app.json' file into the 'app' nunjuck context variable
  getData: () => {
    // Returns the nunjuck context object
    return {
      // Default 'app' object
      app: (function () {
        // Reads the 'app.json' file
        const tmpAppData = JSON.parse(fs.readFileSync('app.json', 'utf8'))

        // If NODE_ENV is set and inside the 'app.json[environments]',
        // append its variables to the 'app' object.
        if (
          process.env.NODE_ENV &&
          tmpAppData.environments[process.env.NODE_ENV]
        ) {
          return Object.assign(
            tmpAppData,
            tmpAppData.environments[process.env.NODE_ENV]
          )
        }
        // If not, just return the app object
        return tmpAppData
      })(),
    }
  },
}
