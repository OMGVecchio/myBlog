'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const conf = require('./config')
const isDev = process.env.NODE_ENV === 'development' ? true : false

module.exports = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        filename: '[name].js',
        publicPath: `http://${conf.devHost}:${conf.devPort}/`,
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [{
            test: /\.styl(us)?$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }]
            })
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: ['awesome-typescript-loader']
        }, {
            test: /\.(png|jpg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter'
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.ProvidePlugin({
            // React: 'react',
            // Component: ['react', 'Component'],
            // axios: 'axios',
            // ReactDOM: 'react-dom',
            // ReactRouter: 'react-router'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'product')
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.ejs'),
            filename: 'index.html',
            hash: false,
            favicon: false,
            minify: false,
            cache: false,
            showError: false,
            chunks: 'all',
            title: 'Blog',
            xhtml: false
        }),
        function() {
            this.plugin('done', stat => {
                console.log('已经打包完了')
            })
        }
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {

        }
    }
}

if(isDev) {
    module.exports.devtool = 'cheap-module-source-map'
    module.exports.devServer = {
        host: conf.devHost,
        port: conf.devPort,
        publicPath: '/',
        filename: 'index.html',
        historyApiFallback: true,
        compress: true,
        stats: 'normal',
        noInfo: false,
        quiet: false,
        inline: true
    }
} else {
    module.exports.output = {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    }
    module.exports.devtool = 'nosources-source-map'
    module.exports.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true
            }
        })
    ])
}
