const sass = require('node-sass')

module.exports = function compileSass(content, file, config) {
    return new Promise((resolve, reject) => {
        const opts = Object.assign(config, {
            file,
            data: content
        })
        sass.render(opts, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}