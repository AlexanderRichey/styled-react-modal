import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "src/index.jsx",
  output: [
    {
      name: "styled-react-modal",
      file: "build/index.js",
      format: "umd",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "styled-components": "styled"
      }
    },
    {
      name: "styled-react-modal",
      exports: "named",
      file: "build/index.mjs",
      format: "es"
    }
  ],
  plugins: [
    resolve({
      extensions: [".jsx", ".js"],
      customResolveOptions: {
        moduleDirectories: ["node_modules"]
      }
    }),
    commonjs(),
    babel({
      babelHelpers: "runtime",
      extensions: [".jsx", ".js"],
      exclude: /(node_modules|build)/
    }),
    terser()
  ],
  external: ["react", "react-dom", "styled-components"]
};
