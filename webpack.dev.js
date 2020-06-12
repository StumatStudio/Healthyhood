const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  entry: './client/index.js',
  output: {
    filename: "[name].[contentHash]-bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html"
    })
  ],
  module: {
    rules: [
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});
