const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = () => {
  // Load environment variables from .env file
  const env = dotenv.config().parsed
  // Create process.env object to hold all environment variables to pass to webpack plugin
  const envKeys = Object.keys(env).reduce((accumulator, currentVal) => {
    accumulator['process.env'][currentVal] = JSON.stringify(env[currentVal])
    return accumulator
  }, {'process.env': {}})

  return {
    entry: './src/index.js',
    output: {
      filename: 'js/results-bundle.js'
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
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  }
}
