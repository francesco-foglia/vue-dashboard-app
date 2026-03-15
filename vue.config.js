const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new Dotenv(),
      // Vue 3 feature flags to optimize tree-shaking and remove console warnings.
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ]
  }
})
