const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv')

module.exports = () => {
  const result = dotenv.config({ path: __dirname + '/client/.env-local' })
  if (result.error) {
    throw result.error
  }
  const env = result.parsed
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode : 'development',
    entry: {
      index : './client/index.js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
          test: /\.(sass|scss)$/,
          use: [
              "style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader'
          ]
        }
      ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './client/index.html'
       }),
      new webpack.DefinePlugin(envKeys)
     ],
    output: {
      filename: '[name].bundle.js',
      publicPath: '/',
      path: path.resolve(__dirname, 'server/public/')
    },
  }
}