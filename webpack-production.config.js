'use strict';

let ETP = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let path = require('path');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    './app/script/main.js'
  ],
  output: {
    filename: './script/bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html'
      },
      {
        test: /\.(scss|css)$/,
        loader: ETP.extract(
          'style',
          'css!postcss!sass')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'file?name=assets/[name].[ext]'
      },
      {
        test: /\.(jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\.*$|$)/,
        loader: 'file?name=assets/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    new ETP('./styles/style.css'),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'app/*.html'))
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: true,
      minify: {
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        decodeEntities: true,
        collapseWhitespace: false,
        useShortDoctype: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'app/manifest.json', to: 'manifest.json'
      },
      {
        from: 'app/service-worker.js', to: 'service-worker.js'
      }
    ])
  ]
};
