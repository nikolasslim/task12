const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.common");

module.exports = (env) =>
    merge(common(env), {
        mode: "development",
        devtool: "cheap-module-source-map",
        output: {
            publicPath: "/"
        },
        devServer: {
            static: {
                directory: "./dist"
            },
            historyApiFallback: true,
            hot: true,
            port: 3000,
            open: true,
            proxy: [
                {
                    context: ['/api'],
                    target: 'https://codelang.vercel.app',
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: {
                        '^/api': '/api'
                    }
                }
            ]
        },
        plugins: [new ReactRefreshWebpackPlugin()]
    });
