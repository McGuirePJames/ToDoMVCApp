const webpack = require('webpack');
const Pkg = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
require("babel-polyfill");
require('file-loader')
const env = process.env.NODE_ENV
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    plugins: [
        new UglifyJsPlugin(),
        require('autoprefixer'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ],
    entry: {
        Common: ["babel-polyfill",'../ToDoMVCApp/Scripts/Common/Common.tsx','../ToDoMVCApp/Stylesheets/Common/_Common.scss'],
        LoginBundle: ["babel-polyfill", '../ToDoMVCApp/Scripts/Entries/Login/Index.tsx', '../ToDoMVCApp/Stylesheets/Login/_Login.scss'],
        SignUpBundle: ["babel-polyfill", '../ToDoMVCApp/Scripts/Entries/SignUp/SignUpIndex.tsx', '../ToDoMVCApp/Stylesheets/SignUp/_SignUp.scss']
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/wwwroot/bundles/',
        jsonpFunction: 'webpackJsonp'
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, exclude: /node_modules/, use: { loader: "ts-loader" } },
            { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/, options: { "presets": ["react"] } },
            { test: /\.(sa|sc|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
            { test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)$/, use: ['file-loader', { loader: 'image-webpack-loader', options: { bypassOnDebug: true, disable: true } }] }
        ]
    }
}