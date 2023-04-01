import WebExtPlugin from "web-ext-plugin";
import * as path from "path";
import {fileURLToPath} from "url";
export default {
    mode: "development",
    entry: {
        ui: "./src/ui/index.tsx",
        extension: "./src/extension/index.js"
    },
    output: {
        path: path.join(path.dirname(fileURLToPath(import.meta.url)), "/dist"),
        filename: "[name].js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader"
            },
            {
                test: /\.svg$/,
                type: "asset/resource"
            },
        ]
    },
    experiments: {
        topLevelAwait: true,
    },
    resolve: {
        extensions: [".*", ".js", ".jsx", ".tsx", ".ts"]
    },
    plugins: [new WebExtPlugin({
        sourceDir: "../../",
        outputFilename: "../../src/dist/main.js",
    })]
}
