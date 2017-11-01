'use strict'

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const conf = require('./config')
const isDev = process.env.NODE_ENV === 'development' ? true : false

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [{
            test: /\.styl(us)?$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'stylus-loader']
            })
        }, {
            test: /\.css$/,
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
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.tsx?$/,
            enforce: 'pre',
            use: ['ts-loader']
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component'],
            axios: 'axios',
            ReactDOM: 'react-dom',
            ReactRouter: 'react-router'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.ejs'),
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
            this.plugin('done', (stat) => {
                console.log('已经打包完了')
            })
        }
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {

        }
    }
}

if(isDev) {
    module.exports.devServer = {
        staticOptions: {
            redirect: true
        },
        contentBase: path.join(__dirname, 'src'),
        filename: 'index.html',
        proxy: {
            '/proxy': {
                target: '',
                pathRewrite: {},
                secure: false
            }
        },
        publicPath: '/',
        headers: {},
        port: conf.port,
        host: '127.0.0.1',
        historyApiFallback: true,
        compress: true,
        stats: 'normal',
        noInfo: false,
        quiet: false,
        https: false,
        inline: true,
        setup(app) {
            app.get('/test', (req, res, next) => {
                res.json({
                    test: '自定义路由'
                })
            })
        }
    }
} else {
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
