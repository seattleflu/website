const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

const ENV = {
  CONTENTFUL_ACCESS_TOKEN: JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN),
  CONTENTFUL_SPACE: JSON.stringify(process.env.CONTENTFUL_SPACE),
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/science-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
      },
      { test: /\.css$/, use: 'css-loader' },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new webpack.DefinePlugin({ 'process.env': ENV })
  ]
}
