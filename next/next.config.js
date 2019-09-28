'use strict'

const path = require('path')
const fs = require('fs')

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './static/styles/antd-custome.less'), 'utf8'))

module.exports = withLess({
  // 开起会报错
  cssModules: false,
  cssLoaderOptions: {},
  postcssLoaderOptions: {},
  lessLoaderOptions: {
    // 不开起会引起 antd：Inline JavaScript is not enabled. Is it set in your options?
    javascriptEnabled: true,
    modifyVars: themeVariables
  },
  webpack(config, { isServer, dev }) {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      /* eslint-disable no-param-reassign, consistent-return */
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals)
      ]
      /* eslint-enable no-param-reassign, consistent-return */

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    } else if (dev) {
      // 在 dev 环境下，将 MiniCssExtractPlugin 换成 style-loader，使样式修改在开发时可以热更新
      // 只是这样一开始白屏严重，需要解决
      config.module.rules.forEach((rule) => {
        if (rule.test.test('.less')) {
          /* eslint-disable no-param-reassign */
          rule.use[1] = 'style-loader'
          /* eslint-enable no-param-reassign */
        }
      })
    }

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
})
