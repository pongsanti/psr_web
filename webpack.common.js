const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(['dist']),
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