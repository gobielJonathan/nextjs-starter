const withTM = require('next-transpile-modules')([
    'lodash-es'
])

const dev = process.env.NODE_ENV === 'development'

const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = withPlugins([
    [withTM],
    [withPWA],
], {
    images: {
        domains: [''],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    pwa: {
        dest: 'public',
        disable: dev,
    },
    webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
        if (!dev) {
            config.plugins.push(new LodashModuleReplacementPlugin({
                shorthands: true,
                collections: true,
                paths: true,
            }))

            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: false
            }))

        }
        return config
    },
})
