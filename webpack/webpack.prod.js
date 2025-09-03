const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.common");

module.exports = (env) =>
    merge(common(env), {
        mode: "production",
        devtool: "source-map",
        output: {
            publicPath: "/"
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css"
            }),
            ...(env.analyze ? [new BundleAnalyzerPlugin()] : [])
        ],
        optimization: {
            splitChunks: {
                chunks: "all"
            },
            runtimeChunk: "single"
        }
    });
