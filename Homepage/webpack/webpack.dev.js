const { merge } = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(commonConfig, {
  output: {
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    allowedHosts: ['all'],
    static: {
      directory: path.join(__dirname, '../public'),
    },
    open: false,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  plugins: [
    new Dotenv({
      systemvars: true,
      path: './env/.env.dev'
    })
  ]
});