const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssOutput = 'css/style.css';

module.exports = {
    entry: [
        "./src/app.js"
    ],
    mode: "development",
    devServer: {
        contentBase: 'dist',
        overlay: true
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js"        
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    }, 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(cssOutput),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'static/images' },
            { from: 'src/vendor', to: 'vendor' },
            { from: 'src/js', to: 'js' }
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, "../src/index.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            inject: true,
            template: path.resolve(__dirname, "../src/login.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'products.html',
            inject: true,
            template: path.resolve(__dirname, "../src/products.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'signup.html',
            inject: true,
            template: path.resolve(__dirname, "../src/signup.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'cart.html',
            inject: true,
            template: path.resolve(__dirname, "../src/cart.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'partials/header.html',
            inject: true,
            template: path.resolve(__dirname, "../src/partials/header.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'partials/footer.html',
            inject: true,
            template: path.resolve(__dirname, "../src/partials/footer.html")
        })
    ]
};