const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' });
}

module.exports = env => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  return {
    entry: ['babel-polyfill', './frontend/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.SPOTIFY_CLIENT_ID': JSON.stringify(
          process.env.SPOTIFY_CLIENT_ID
        ),
        'process.env.SPOTIFY_CLIENT_SECRET': JSON.stringify(
          process.env.SPOTIFY_CLIENT_SECRET
        ),
        'process.env.SPOTIFY_REDIRECT_URI': JSON.stringify(
          process.env.SPOTIFY_REDIRECT_URI
        ),
        'process.env.MONGO_URI': JSON.stringify(process.env.MONGO_URI),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        )
      })
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
      proxy: {
        '/api': isProduction
          ? {
              target: 'http://localhost:3000',
              pathRewrite: {
                '^/api': ''
              }
            }
          : {
              target: 'https://festivus-music.herokuapp.com',
              pathRewrite: {
                '^/api': ''
              }
            }
      }
    }
  };
};
