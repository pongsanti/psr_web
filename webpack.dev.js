const merge = require('webpack-merge');
const Webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'cheap-eval-source-map',
  devServer: {
    hot: true,
    historyApiFallback: {
      index: '/'
    },
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin()
  ]
});