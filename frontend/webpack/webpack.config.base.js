const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Webpackbar = require("webpackbar");
if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: path.join(__dirname, "./../.env.dev") });
} else {
  require("dotenv").config({ path: path.join(__dirname, "./../.env.prod") });
}

const CONFIG = {
  entry: {
    main: "./src/main.ts",
  },
  stats: {
    maxModules: 0,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "~": path.resolve("src"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.END_POINT": JSON.stringify(process.env.END_POINT),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "./../src/assets"),
        to: path.join(__dirname, "./../dist/assets"),
      },
    ]),
    new Webpackbar(),
  ],
};

module.exports = CONFIG;
