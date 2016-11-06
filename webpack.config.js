var webpack = require('webpack');
var path = require('path');
var env = require('yargs').argv.mode;

var outputFile;

var config = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'tmp/webpack-out.js',
    library: 'wirtual', 
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(dist|node_modules|bower_components)/
      }
      /*,
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
      */
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: []
};

module.exports = config;
