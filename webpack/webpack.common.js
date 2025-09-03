const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => ({
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].[contenthash].js",
        publicPath: "/",
        clean: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "@": path.resolve(__dirname, "../src")
        }
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: ">0.25%, not dead" }],
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ],
                        plugins: env.mode === "development" ? ["react-refresh/babel"] : []
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    env.mode === "production"
                        ? require("mini-css-extract-plugin").loader
                        : "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    env.mode === "production"
                        ? require("mini-css-extract-plugin").loader
                        : "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp|woff2?|eot|ttf|otf)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    to: ".",
                    noErrorOnMissing: true,
                    globOptions: { ignore: ["**/index.html"] }
                },
                {
                    from: "src/assets",
                    to: "assets",
                    noErrorOnMissing: true
                }
            ]
        })
    ]
});
