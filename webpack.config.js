const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  const isProduction = env && env.NODE_ENV === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, isProduction ? "dist" : "debug"),
      filename: "[name].[contenthash].js",
      publicPath: "/"
    },

    devtool: isProduction ? "none" : "source-map",

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
    },

    module: {
      rules: [
        {
          test: /\.(s?)css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.ts(x?)$/,
          exclude: [/node_modules/],
          use: [{ loader: "ts-loader" }]
        },
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{ loader: "source-map-loader" }]
        },
        {
          test: /\.(png|jpe?g|gif|svg|)$/i,
          use: [
            {
              loader: "file-loader",
              options: { name: "images/[contenthash].[ext]" }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: require("html-webpack-template"),
        appMountId: "app",
        title: "New Ts-React Project",
        meta: [
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
          }
        ],
        links: ["https://fonts.googleapis.com/css?family=Lato"]
      })
    ],
    optimization: {
      moduleIds: "hashed",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "all",
            name: "vendor"
          }
        }
      }
    },
    devServer: {
      contentBase: path.join(__dirname, "debug"),
      headers: {
        "Cached-Control": "no-cache"
      },
      historyApiFallback: true,
      compress: true,
      port: 8080
    }
  };
};
