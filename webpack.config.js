const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const CompressionPlugin = require("compression-webpack-plugin");
process.env.NODE_ENV = (process.env.NODE_ENV || '').trim()
const IS_PROD = process.env.NODE_ENV === 'production'

const _ROOT_URL_ = (IS_PROD ? '/ui' : '') + '/subagent';

const _ASSET_PATH_ = _ROOT_URL_ + '/src/'; //путь к ресурсам относительно домена (пример: http://localhost{ASSET_PATH}image.jpg)
const _ROOT_URL_API_ = _ROOT_URL_ + '/api';

module.exports = {
    entry: [
        './App/Index.jsx',
        //'webpack-dev-server/client?http://localhost:3000',
    ],
    output: {
        path: __dirname + '/Build/',
        filename: '[name].js?v=[hash]',
        publicPath: _ASSET_PATH_
    },
    watch: !IS_PROD,

    devtool: IS_PROD ? null : "cheap-inline-module-source-map",

    plugins: [

        new HtmlWebpackPlugin({
            title: 'КуфсеФззКувгсещк',
            template: __dirname + '/Templates/Index.html',
            favicon: __dirname + '/App/Img/favicon.ico',
            filename: 'index.html',
        }),
        new Webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'Promise': 'bluebird',
        }),
        new CleanWebpackPlugin(['Build'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),

        new Webpack.DefinePlugin({
            _ROOT_URL_: JSON.stringify(_ROOT_URL_),
            _ROOT_URL_API_: JSON.stringify(_ROOT_URL_API_),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),

        !IS_PROD ? null : new Webpack.optimize.DedupePlugin(),
        !IS_PROD ? null : new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$/,
        //     //threshold: 10240,
        //     minRatio: 0.8
        // })
    ].filter(x => !!x),

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                        'transform-object-assign',
                        //'es6-promise',
                        [ 'babel-root-import', { 'rootPathSuffix': 'App' } ] //позволяет указывать абсолютные пути при импорте модулей с префиксом '~'
                    ]
                }
            },

            { test: /\.(css|scss|less)$/, loader: "style-loader!css-loader!less-loader" },

            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.(eot|png|ico|gif)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            //{ test: /\.(jpe?g|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
    }
}