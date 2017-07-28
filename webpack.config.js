const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './bin'),
        filename: 'app.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader']
        }]
    }
}