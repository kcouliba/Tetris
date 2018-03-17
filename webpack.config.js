const webpack = require('webpack')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const stylesExtract = ExtractTextWebpackPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader', 'postcss-loader'],
})
const defaultPlugins = [
  new ExtractTextWebpackPlugin('[contentHash].css'),
  new HtmlWebpackPlugin({
    // icon source http://www.iconarchive.com/show/cold-fusion-hd-icons-by-chrisbanks2/tetris-icon.html
    favicon: './assets/icons/fav-icon.png',
    template: './index-template.html'
  }),
]
const prodPlugins = [
  new OptimizeCSSAssetsPlugin(),
  new CleanWebpackPlugin(['dist'], {})
]

const isProdEnv = ({ production }) => production

module.exports = env => {
  const IS_PROD = isProdEnv(env)
  const plugins = IS_PROD ? [...defaultPlugins, ...prodPlugins] : defaultPlugins

  return {
    mode: IS_PROD ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].min.js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: IS_PROD ? stylesExtract : ['css-hot-loader'].concat(stylesExtract),
        }
      ]
    },
    plugins,
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      historyApiFallback: true,
      inline: true,
      open: true,
      hot: false
    },
    devtool: IS_PROD ? false : 'eval-source-map',
    optimization: {
      minimize: IS_PROD ? true : false,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
  }
}