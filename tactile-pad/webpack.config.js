"use strict";

var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: path.join(__dirname, "sidebar"),

  entry:  {
    index: "./index.js"
  },

  output: {
    path: path.join(__dirname, "app"),
    filename: "sidebar.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["react-hot", "babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
    ],
  },

  node: {
    fs: "empty"
  },
};