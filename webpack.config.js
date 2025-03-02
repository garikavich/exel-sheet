const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = (env, argv) => {

    const isProduction = argv.mode === 'production';
    const isDevelopment = argv.mode === 'development';
    const fileName = ext => isProduction ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

    return {
        target: 'web',
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: [
                'core-js/stable',
                'regenerator-runtime/runtime',
                './index.js'
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: fileName('js'),
            clean: true
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src/core'),
            }
        },
        devServer: {
            static: path.resolve(__dirname, 'src'),
            port: 3000,
            open: true,
            hot: true,
            watchFiles: ['src/**/*.html'],
            // watchContentBase: true,
            // watchFiles: './',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: 'body',
            }),
            new FaviconsWebpackPlugin({
                logo: './favicon.svg',
                prefix: 'icons-[hash]/',
                inject: true,
                favicons: {
                    appName: 'My App',
                    appDescription: 'My App Description',
                    developerName: '<NAME>',
                    developerURL: null,
                    background: '#fff',
                }
            }),
            new MiniCssExtractPlugin({
                filename: fileName('css'),
            })
        ],
        devtool: isDevelopment ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        },
    }
}
