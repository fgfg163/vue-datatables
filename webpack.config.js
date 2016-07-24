var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: './dist',
    filename: "[name].js"
  },
  module: {
    module: {
      // 加载器
      loaders: [
        {test: /\.vue$/, loader: 'vue'},
        {test: /\.js$/, loader: 'babel', exclude: /node_modules/},

        {test: /\.css$/, loader: 'style!css!autoprefixer'},
        {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
        {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
        {test: /\.(html|tpl)$/, loader: 'html-loader'},
      ]
    },
    // .vue的配置。需要单独出来配置
    vue: {
      loaders: {
        css: 'style!css!autoprefixer',
        html: 'html-loader'
      }
    },
    // 转化成es5的语法
    babel: {
      presets: ['es2015', 'stage-0'],
      plugins: ['transform-runtime']
    },
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/index.html'},
    ], {
      copyUnmodified: false
    })
  ],
  externals: {},
  devtool: 'source-map',
};
