const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, '../public'),
  //   publicPath: '/public',
  //   filename: 'enroll-bundle.js'
  // },
  output: {
    filename: 'js/enroll-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|json)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}
