var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './client/index.js',
    ],
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel?presets[]=react,presets[]=es2015']
        },
        {
            test: /\.css$/,
            loader: 'style!css!'
        }
        ]
    },
};