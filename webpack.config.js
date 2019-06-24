const path = require('path')

module.exports = {
    entry: './webpack/entry.js',
    output: {
        path: path.resolve(__dirname, 'src/assets/javascript/'),
        filename: 'bundle.js',
    },
}