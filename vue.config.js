module.exports = {
  assetsDir: "assets",
  baseUrl: undefined,
  outputDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined,

  pwa: {
    name: "Idle Frenzy"
  },

  lintOnSave: undefined,

  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  }
};
