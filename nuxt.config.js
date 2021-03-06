import colors from 'vuetify/es5/util/colors'
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    titleTemplate: '%s - CodeEdu在线教育',
    title: 'CodeEdu在线教育',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: "https://g.alicdn.com/de/prismplayer/2.9.3/aliplayer-min.js" }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.scss',
    'material-design-icons-iconfont/dist/material-design-icons.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/ant-design-vue.js',
    '@/plugins/notifier.js',
    '@/plugins/element-ui.js',
    '@/plugins/request.js',
    { src: '@/plugins/vue-editor.js', mode: "client" },
    // { src: '@/plugins/nuxt-video-player-plugin.js', ssr: false }, //vue-video-player 
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    icons: {
      iconfont: ['md', 'mdi']
    },
    theme: {
      dark: false,
      themes: {
        light: {
          background: colors.grey.lighten3,
          heading: colors.grey.darken2,
          'search-hignlight': colors.blue.lighten4,
        },
        dark: {
          'search-hignlight': colors.grey.darken2,
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.darken3,
          heading: colors.grey.lighten3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['ant-design-vue'],
    babel: {
      "plugins": [
        // 按需引入ant-design-vue
        [
          "import",
          { libraryName: "ant-design-vue", libraryDirectory: "es", style: 'css' }
        ],
        // 按需引入elementUi
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk"
          }
        ]
      ]
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 10240, // 对超过10kb的数据进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
        sourceMap: true,
        cache: true,
        parallel: true
      })
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
  },
  env: {
    baseURL: 'http://1.15.24.22:8301/', //后端服务器
    webSocket: 'ws://1.15.24.22:8301/service/websocket/',
    giteeURL: 'https://gitee.com/api/v5/repos/jzhmcoo1/code_edu_ui_new',//gitee的openAPI
    BackendGiteeURL: "https://gitee.com/api/v5/repos/paradox_hyw/febs-codebar-cloud",//后端项目
  },
  server: {
    port: 8500,
    host: "0.0.0.0"
  }
}
