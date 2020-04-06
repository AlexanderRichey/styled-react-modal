const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
    library: "styled-react-modal"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|build)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"]
          }
        }
      }
    ]
  },
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    "styled-components": "commonjs styled-components"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
