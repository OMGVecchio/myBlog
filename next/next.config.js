'use strict'

const path = require('path')
const glob = require('glob')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const { resolve } = path

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(css|less)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
    }, {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader']
    }, {
      test: /\.less$/,
      use: [
        'babel-loader', 'raw-loader', 'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            includePaths: [resolve(__dirname, 'static/styles'), resolve(__dirname, '../node_modules')]
              .map(d => path.join(__dirname, d))
              .map(g => glob.sync(g))
              .reduce((a, c) => a.concat(c), [])
          }
        }
      ]
    })
    if (process.env.NODE_ENV_ANALYZER === 'smplugin') {
      const smp = new SpeedMeasurePlugin()
      return smp.wrap(config)
    }
    if (process.env.NODE_ENV_ANALYZER === 'baplugin') {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        logLevel: 'info'
      }))
    }
    return config
  }
}
