var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    publicPath: './',
    path: './dist',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
    ]
  },
  // .vue的配置。需要单独出来配置
  vue: {
    loaders: {
      css: 'css',
      js: 'babel'
    }
  },
  // 转化成es5的语法
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },

  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: './src/index.html'},
      {
        from: 'src/static/',
        to: 'static',
      },
    ], {
      copyUnmodified: false
    })
  ],
  externals: {},
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/some/path*': {
        target: 'https://localhost:9999',
        secure: false,
        bypass: function (req, res, proxyOptions) {
          console.log(req.url);
          return "/test/test.json";
        }
      }
    }
  }
};
