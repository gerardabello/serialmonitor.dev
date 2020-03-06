const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'source-map',
  output: {
    publicPath: '/',
    chunkFilename: '[name]-[chunkhash].js',
    filename: '[hash]-[name]-entry.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      components: path.resolve('./components'),
      src: path.resolve('./src')
    }
  },

  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
  devServer: {
    disableHostCheck: true,
    compress: true
  }
}
