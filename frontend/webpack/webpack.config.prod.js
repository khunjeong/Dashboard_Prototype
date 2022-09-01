const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const baseConfig = require("./webpack.config.base");

const CONFIG = merge(baseConfig, {
  mode: "production",
  output: {
    filename: "[name].[hash].js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
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
