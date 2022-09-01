const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./webpack.config.base");

const CONFIG = merge(baseConfig, {
  devServer: {
    port: 5004,
    host: "0.0.0.0",
  },

  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        loader: [
          "vue-style-loader",
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: {
              includePaths: [path.join(__dirname, "../")],
              sourceMap: true,
              data: `
                @import "~/scss/_variable.scss";
              `,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
});

module.exports = CONFIG;
