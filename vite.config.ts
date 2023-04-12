import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
import postcss_100vh_fix from 'postcss-100vh-fix'
import postcsspxtoviewport from 'postcss-px-to-viewport'
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: "https://cdn.bootcdn.net/ajax/libs/vue/3.2.41/vue.global.min.js",
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: "https://cdn.bootcdn.net/ajax/libs/vue-router/4.1.5/vue-router.global.prod.js",
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: "https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.11/index.iife.js",
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: "https://cdn.bootcdn.net/ajax/libs/pinia/2.0.23/pinia.iife.prod.min.js",
        },
      ],
    }),
    visualizer({ open: true }),
  ],
  base: './',
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/style/global.scss";'
      }
    },
    postcss: {
      plugins: [
        postcss_100vh_fix,
        postcsspxtoviewport({
          unitToConvert: 'px',    // 要转化的单位
          viewportWidth: 375,     // UI设计稿的宽度
          unitPrecision: 5,       // 转换后的精度，即小数点位数
          propList: ['*'],        // 指定转换的css属性的单位，*代表全副css属性的单位都进行转换
          viewportUnit: 'vw',     // 指定须要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体须要转换成的视窗单位，默认vw
          selectorBlackList: [],  // 指定不转换为视窗单位的类名，
          minPixelValue: 1,       // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true,       // 是否在媒体查问的css代码中也进行转换，默认false
          replace: true,          // 是否转换后间接更换属性值
          // exclude: [/node_modules/], // 设置疏忽文件，用正则做目录名匹配
          exclude: [],
          landscape: false        // 是否解决横屏状况
        })
      ]
    }
  },
})
