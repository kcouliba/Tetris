const webpack = require('webpack')
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const stylesExtract = ExtractTextWebpackPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader', 'postcss-loader'],
})

const pathsToClean = [ 'public' ]
const cleanOptions = {}

const IS_PROD = process.env.NODE_ENV === 'production'

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: IS_PROD ? stylesExtract : ['css-hot-loader'].concat(stylesExtract)
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('[contentHash].css'),
    new HtmlWebpackPlugin({
      title: 'Tetris'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true
  },
  devtool: 'eval-source-map'
}

if (IS_PROD) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeCSSAssets(),
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  )
}

module.exports = config