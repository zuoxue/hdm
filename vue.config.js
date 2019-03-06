// const url = 'http://192.168.2.75:9999' //server
// const url = 'http://192.168.2.150:9999' //jsd
const url = 'http://192.168.2.193:9999' //zhous
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    })
  },
  transpileDependencies: ['avue-plugin-transfer', 'avue-plugin-ueditor'],
  // 配置转发代理
  devServer: {
    proxy: {
      '/auth': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/code': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/code': '/code'
        }
      },
      '/gen': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/gen': '/gen'
        }
      },
      '/daemon': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/daemon': '/daemon'
        }
      },
      '/tx': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/tx': '/tx'
        }
      },
      '/act': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/act': '/act'
        },
      },
      '/urs': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/urs': '/urs'
        }
      },
      '/ram': {
        target: url,
        ws: true,
        pathRewrite: {
          '^/ram': '/ram'
        }
      },
    }
  }
}
