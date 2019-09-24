module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/current-bundle.js'
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
      { test: /\.svg$/, use: 'svg-url-loader' },
    ]
  },
  plugins: []
}
