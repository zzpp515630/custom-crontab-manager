const path = require("path");

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    // overlay: {
      // warnings: false,
      // errors: false,
      // allowedHosts: "all"
    // },
    proxy: {
      "/cron": {
        target: "http://localhost:8991",
      },
    },
    port: "2333",
    open: true,
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variables/variables.scss" as *;
          @use "@/assets/styles/variables/flex.scss" as *;
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
};
