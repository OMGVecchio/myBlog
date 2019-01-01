'use strict'

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const withLessExcludeAntd = require('./next-css.config')

const modifyVars = {}

// prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => {}
}

module.exports = withLessExcludeAntd({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars
  },
  webpack(config) {
    config.resolve.extensions.push('.less')
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
