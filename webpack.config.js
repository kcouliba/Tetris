const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProdEnv = env => !!(env && env.production)

module.exports = env => {
  const IS_PROD = isProdEnv(env)

  return {
    mode: IS_PROD ? 'production' : 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
    },
    devtool: IS_PROD ? false : 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      historyApiFallback: true,
      inline: true,
      open: true,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        // icon source http://www.iconarchive.com/show/cold-fusion-hd-icons-by-chrisbanks2/tetris-icon.html
        favicon: './assets/icons/favicon.png',
        template: './index-template.html',
        title: IS_PROD ? 'tetris' : 'tetris - development',
      }),
      ...(IS_PROD ? [] : [new CleanWebpackPlugin()]),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },
    optimization: {
      minimize: IS_PROD,
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  }
}
