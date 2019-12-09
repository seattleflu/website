/* This is the Webpack configuration to bundle our React "subapps".
 *
 * Babel transpiling configuration is in .babelrc with some directory-specific
 * additions below embedded in the Webpack config.
 */

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const production = env === "production";

  /* Enable hot reloading in development.  This works in tandem with the
   * server-side middleware in app.js which rebuilds the bundles on the fly.
   */
  const devPlugins = production
    ? []
    : [new webpack.HotModuleReplacementPlugin()];

  const devSource = production
    ? []
    : ["webpack-hot-middleware/client?reload=true"];

  /* These are all our React "subapps" which each have their own route/[name].js
   * and EJS template under views/[name].js.  They are transpiled by Babel and
   * bundled by Webpack and can use standard ES6 features not supported by NodeJS
   * or some older browsers (polyfills are used).
   *
   * Each entrypoint gets it own bundle in dist/[name]-bundle.js.
   */
  const entrypoints = {
    current: ['./current/src/index.js', ...devSource],
    enroll: ['./enroll/src/index.js', ...devSource],
    results: ['./results/src/index.js', ...devSource],
    science: ['./science/src/index.js', ...devSource],
  };

  return {
    mode: production ? "production" : "development",
    entry: entrypoints,
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist',
    },
    module: {
      rules: [
        /* Source in our React subapps use native ES6 module syntax and get
         * file-scoped, usage-dependent core-js prefills for ES6 via
         * @babel/preset-env.
         */
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: Object.keys(entrypoints).map(app => path.resolve(__dirname, app)),
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: 3 }]
              ],
            }
          }
        },

        /* Source common to our NodeJS server and our React subapps (e.g.
         * services/contentful.js) use CommonJS module syntax and can only use
         * language syntax supported by NodeJS.
         */
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: [
            path.resolve(__dirname, 'routes'),
            path.resolve(__dirname, 'services'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { modules: 'commonjs' }]
              ]
            }
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
        { test: /\.geojson$/, use: 'json-loader' },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...devPlugins,
    ]
  }
};
