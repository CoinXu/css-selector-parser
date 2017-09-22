/**
 * @Author sugo.io<asd>
 * @Date 17-9-22
 */

const path = require('path')
const pkg = require('./package.json')
const webpack = require('webpack')

module.exports = {
  entry: {
    parser: path.join(process.cwd(), './src/index.js')
  },
  output: {
    path: path.join(process.cwd(), './dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '\'' + process.env.NODE_ENV + '\'',
        'VERSION': '\'' + pkg.version + '\''
      }
    })
  ]
}
