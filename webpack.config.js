const { resolve } = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./server/config');

module.exports = {
  node: {
    fs: 'empty',
  },

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://0.0.0.0:' + config.browserSync.port,
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './src/index.jsx',
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/', // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true, // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'), // match the output path

    publicPath: '/', // match the output `publicPath`

    host: '0.0.0.0',

    port: config.browserSync.port,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.(jpe?g|gif|svg)$/i,
        use: [
          'url-loader?name=images/[name].[ext]&limit=10000',
          'img-loader?name=images/[name].[ext]',
        ],
      },
      {
        test: /\.(png)$/i,
        use: [
          'base64-image-loader',
        ],
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    // alias: {
    //   '../osc.js': resolve(__dirname, 'node_modules/osc/src/osc.js'),
    //   'osc-browser': resolve(__dirname, 'node_modules/osc/dist/osc-browser.min.js'),
    // },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, config.copy.html.src),
        to: resolve(__dirname, config.copy.html.dest),
      },
      {
        from: resolve(__dirname, config.copy.images.src),
        to: resolve(__dirname, config.copy.images.dest),
      },
      {
        from: resolve(__dirname, config.copy.textures.src),
        to: resolve(__dirname, config.copy.textures.dest),
      },
      {
        from: resolve(__dirname, config.copy.models.src),
        to: resolve(__dirname, config.copy.models.dest),
      },
      {
        from: resolve(__dirname, config.copy.animations.src),
        to: resolve(__dirname, config.copy.animations.dest),
      },
      {
        from: resolve(__dirname, config.copy.bmfonts.src),
        to: resolve(__dirname, config.copy.bmfonts.dest),
      },
    ]),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    // new ExtractTextPlugin('styles.css')
    // export css to separate file

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      THREE: 'three',
      'window.THREE': 'three',
      TWEEN: 'tween.js',
      'window.TWEEN': 'tween.js',
      React: 'react',
      _: 'lodash',
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1, // this assumes your vendor imports exist in the node_modules directory
    }),
  ],
};
