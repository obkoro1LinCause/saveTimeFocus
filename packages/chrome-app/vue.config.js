const CopyWebpackPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
// const unocss = require('@unocss/webpack');

const envPath = {
  productionChrome: './config/env/.env.productionChrome',
  productionEdge: './config/env/.env.productionEdge',
  productionFireFox: './config/env/.env.productionFireFox',
  productionReleaseChrome: './config/env/.env.productionReleaseChrome',
  productionReleaseEdge: './config/env/.env.productionReleaseEdge',
  productionReleaseFireFox: './config/env/.env.productionReleaseFireFox',
  serveChrome: './config/env/.env.serveChrome',
  serveFireFox: './config/env/.env.serveFireFox',
}

const envPathName = process.env.ENV_PATH
const myEnv = dotenv.config({ path: envPath[envPathName] })
dotenvExpand.expand(myEnv)

// 多页面
const pagesObj = {}
const chromeName = ['popup', 'options']

chromeName.forEach((name) => {
  pagesObj[name] = {
    entry: `src/${name}/index.ts`,
    template: 'public/index.html',
    filename: `${name}.html`,
  }
})

// 生成manifest文件
const mode = process.env.VUE_APP_MODE.toLowerCase();

const manifest = {
  from: path.resolve('./manifest/manifest.production.json'),
  to: `${path.resolve('dist')}/manifest.json`,
}
if (mode.indexOf('firefox') >= 0) {
  manifest.from = path.resolve('./manifest/fireFox.manifest.production.json')
}

const plugins = [CopyWebpackPlugin([manifest])]

// 开发环境将热加载文件复制到dist文件夹
if (mode.indexOf('serve') >= 0) {
  plugins.push(
    CopyWebpackPlugin([
      {
        from: path.resolve('src/utils/hot-reload.js'),
        to: path.resolve('dist'),
      },
    ]),
  )
}

// 当不为serve时 压缩文件
if (process.env.NODE_ENV !== 'serve') {
  plugins.push(
    new ZipPlugin({
      path: path.resolve('dist'),
      filename: `${process.env.ZIP_NAME}-${process.env.npm_package_version}.zip`,
    }),
  )
}

// module.exports = {
  // pages: pagesObj,
  // productionSourceMap: false,
  // configureWebpack: {
  //   devtool: 'inline-source-map',
  //   entry: {
  //     content: './src/content/index.ts',
  //     background: './src/background/index.ts',
  //   },
  //   output: {
  //     filename: '[name].js',
  //   },
  //   plugins,
  //   // resolve: {
  //   //   alias: {
  //   //     'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
  //   //   }
  //   // },
  // },
  // css: {
  //   extract: {
  //     filename: 'css/[name].[hash:9].css',
  //   },
  // },

  // chainWebpack: (config) => {
  //   // 处理字体文件名，去除hash值
  //   const fontsRule = config.module.rule('fonts')
  //   config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  //   // 清除已有的所有 loader。
  //   // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  //   fontsRule.uses.clear()
  //   fontsRule
  //     .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
  //     .use('url')
  //     .loader('url-loader')
  //     .options({
  //       limit: 1000,
  //       name: 'fonts/[name].[ext]',
  //     })

  //   // 查看打包组件大小情况
  //   if (process.env.npm_config_report) {
  //     config
  //       .plugin('webpack-bundle-analyzer')
  //       .use(webpackBundleAnalyzer.BundleAnalyzerPlugin)
  //   }
  // },
// }



module.exports = function () {
  return import('@unocss/webpack').then((m) => {
    const UnoCSS = m.default
    return {
      pages: pagesObj,
      productionSourceMap: false,
      configureWebpack: {
        devtool: 'inline-source-map',
        entry: {
          content: './src/content/index.ts',
          background: './src/background/index.ts',
        },
        output: {
          filename: '[name].js',
        },
        plugins:[
          ...plugins,
          new UnoCSS(),
        ],
        // resolve: {
        //   alias: {
        //     'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
        //   }
        // },
      },
      css: {
        extract: {
          filename: 'css/[name].css',
        },
      },
    
      chainWebpack: (config) => {
        // 处理字体文件名，去除hash值
        const fontsRule = config.module.rule('fonts')
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        fontsRule.uses.clear()
        fontsRule
          .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
          .use('url')
          .loader('url-loader')
          .options({
            limit: 1000,
            name: 'fonts/[name].[ext]',
          })
    
        // 查看打包组件大小情况
        if (process.env.npm_config_report) {
          config
            .plugin('webpack-bundle-analyzer')
            .use(webpackBundleAnalyzer.BundleAnalyzerPlugin)
        }
      },
    }
  })
}