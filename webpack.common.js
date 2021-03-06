const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

module.exports = {
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['react-hot-loader/webpack', 'babel-loader']
      },
      
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: 'file-loader'
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      }      

    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[id].[contenthash].css'),
    new HtmlWebpackPlugin({
      title: 'SmartTrack'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'google-open-san',
          entry: {
            path: 'http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all',
            type: 'css'
          }
        },
      ],
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }  
};