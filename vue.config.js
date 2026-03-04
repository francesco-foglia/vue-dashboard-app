const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new Dotenv(),
      // Vue 3 compile-time feature flags (required by the esm-bundler build)
      // They eliminate the warning in the console and optimize tree-shaking in production
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ]
  }
})
