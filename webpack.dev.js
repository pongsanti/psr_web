const merge = require('webpack-merge');
const Webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
});