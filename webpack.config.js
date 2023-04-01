import WebExtPlugin from "web-ext-plugin";
export default {
    mode: "development",
    plugins: [new WebExtPlugin({
        sourceDir: "../../",
        outputFilename: "../../src/dist/main.js"
    })]
}
