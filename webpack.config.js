'use strict';

let ETP = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
  entry: [
    './app/script/main.js'
  ],
  output: {
    filename: './script/bundle.js',
    path: path.resolve(__dirname, './')
  },
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html'
      },
      {
        test: /\.(scss|css)$/,
        loader: ETP.extract('style-loader', 'css!postcss!sass')
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
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        loader: 'file?name=assets/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  devServer: {
    contentBase: './app'
  },
  plugins: [
    new ETP('./styles/style.css'),
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: true
    })
  ]
};
