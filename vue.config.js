/*
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 15:49:10
 * @FilePath: \technical-tool\vue.config.js
 */
// cnpm install compression-webpack-plugin@6.1.1 -D       gzip压缩插件，需要引入
// cnpm i image-webpack-loader@8.1.0 --save-dev           图片压缩，不需要引入
// npm i webpack-bundle-analyzer@4.7.0 --save-dev         打包分析插件
// npm i speed-measure-webpack-plugin -D                  打包时间
// npm i hard-source-webpack-plugin -D                    构建时进行缓存
// cnpm i uglifyjs-webpack-plugin -D                    引入压缩插件 但是导致项目启动的比较慢

const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 引入打包分析插件
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')/* 引入压缩插件 但是导致项目启动的比较慢 */
// const webpack = require('webpack')

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 开启gzip压缩， 按需写入
const isProduction = process.env.NODE_ENV === 'production'
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
module.exports = defineConfig({
  transpileDependencies: true,
  //
  /*
    lintOnSave
    是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `“error”` 当设置为 `“error”` 时，检查出的错误会触发编译失败。
    整个项目禁用 ESlint  设置是否在保存文件时通过 eslint- loader 在编译时检查。
  */
  lintOnSave: process.env.NODE_ENV === 'production', // 生产环境不进行eslint校验
  useLocalIp: true, // 将useLoackIp设置为true 就可以了
  https: true, // 开启https 访问
  hotOnly: false, // 热更新
  /*
    是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查
    允许外部IP访问
    */
  disableHostCheck: true, // 允许外部IP访问

  // Paths
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {}
})
module.exports = {
  devServer: { // 配置开发服务器的选项，如代理、端口等。
    port: PORT, // 端口号
    host: '0.0.0.0', // 将localhost进行替换成 0.0.0.0 使用IP访问
    open: true, // 是否自启动
    // openPage: '/different/page', // 指定deserver 编译完成后自动打开的页面.需要配合 open：true 来使用。如果Vue router 为 hash mode。应在url前面补上/#。如：openPage: '/#/about'
    // headers: { // 在所有响应中添加首部内容
    //   'X-Custom-Foo': 'bar'
    // },

    /*
     如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过vue.config.js中的devServer.proxy选项来配置。
      proxy: 目的是解决跨域，若测试环境不需要跨域，则不需要进行该配置
     */
    proxy: null // 设置代理
    // proxy: {
    //   '/api': { // 拦截以 /api 开头的url接口
    //     target: 'https://api.taobao.cn/', // 目标接口域名
    //     changeOrigin: true, // 是否跨域
    //     ws: true, // 如果要代理 websockets，配置这个参数
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     /* 标识替换
    //         原请求地址为 /api/getData 将'/api'替换''时，
    //         代理后的请求地址为： http://xxx.xxx.xxx/getData
    //         若替换为'/other',则代理后的请求地址为 http://xxx.xxx.xxx/other/getData
    //         */
    //     pathRewrite: { // 标识替换
    //       '^/api': '/' // 重写接口 后台接口指向不统一  所以指向所有/
    //       // '^/api': '/api/mock'
    //     }
    //   }
    // }

    // mock数据
    // before (app) {

    // }
  },
  /*
  如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: { rules: [], plugins: [] }
  如果这个值是一个函数，则会接收被解析的配置作为参数。
  该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack: (config) => {// 例如，通过判断运行环境，设置modeconfig.mode = 'production'
  }
  */
  configureWebpack: (config) => {
    // 生产和开发环境都有的配置
    config.devtool = 'source-map'
    // 开启缓存
    // config.plugins.push(
    //   new HardSourceWebpackPlugin()
    // )
    // 生产环境下的配置
    if (isProduction) {
      // 添加webpack插件  打包可视化分析
      config.plugins.push(
        new SpeedMeasurePlugin(), // 构建时间
        new BundleAnalyzerPlugin() // 构建体积
        // 一些依赖，咱们也许只是用到了一部分，不必所有解析，好比moment中的语言包，咱们通常只用中文包就够了，因此能够这样配置：
        // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
      )
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000, // 根据入口起点的最大体积，控制 webpack 何时生成性能提示。
        maxAssetSize: 30000000 // 根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示。
      }

      // config.plugins.push(new UglifyJsPlugin({
      //   uglifyOptions: {
      //     uglifyOptions: {
      //       compress: {
      //         drop_debugger: true,
      //         drop_console: true, // 生产环境自动删除console
      //         pure_funcs: ['console.log'] // 移除console---后加入的
      //       },
      //       warnings: false
      //     },
      //     sourceMap: false,
      //     parallel: true // 使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
      //   }
      // }))

      // 生产环境 优化打包chunk-vendors.js文件体积过大。
      Object.assign(config.optimization, {
        runtimeChunk: 'single',
        splitChunks: { // 默认的splitChunks会全部清空
          chunks: 'all',
          minSize: 20 * 1024 // chunks超过20000bit（20kb）将被单独打包
          // cacheGroups: { // 对node_modules下的库单独打包。暂时先不开启，可以看看打包体积后决定
          //   vendor: { // 默认的vendor.js
          //     test: /[\\/]node_modules[\\/]/, // 匹配映射文件
          //     name (module) {
          //       // get the name. E.g. node_modules/packageName/not/this/part.js
          //       // or node_modules/packageName
          //       const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
          //       // npm package names are URL-safe, but some servers don't like @ symbols
          //       return `npm.${packageName.replace('@', '')}`
          //     }
          //   }
          // }
        }
      })
      // 清除console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

      // 开启 gzip 压缩 文件
      // 注：生成的压缩文件以.gz为后缀，一般浏览器都已支持.gz的资源文件，在http请求的Request Headers 中能看到 Accept-Encoding:gzip。要使服务器返回.gz文件，还需要对服务器进行配置，根据Request Headers的Accept-Encoding标签进行鉴别，如果支持gzip就返回.gz文件。
      // 服务器配置参考：https://blog.csdn.net/a1983029606/article/details/115690820
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240, // 只有大小大于该值的资源会被处理
          minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
        })
      )
    }
    // 配置别名
    Object.assign(config.resolve, {
      extensions: ['.js', '.vue', '.json'], // 省略文件扩展名的，默认值是 ['.wasm', '.mjs', '.js', '.json']，可以自由配置。在resolve对象里面，跟alias同一级就行
      alias: {
        '@': path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets'),
        common: path.resolve(__dirname, './src/common'),
        components: path.resolve(__dirname, './src/components'),
        network: path.resolve(__dirname, './src/network'),
        configs: path.resolve(__dirname, './src/configs'),
        views: path.resolve(__dirname, './src/views'),
        plugins: path.resolve(__dirname, './src/plugins')
      }
    })
  },

  /*
  是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。
  允许对内部的 webpack 配置进行更细粒度的修改。
  */
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))// 设置@快捷到src目录
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))

    // 移除 preload(预载) 插件
    config.plugins.delete('preload')
    // 移除 prefetch(预取) 插件
    config.plugins.delete('prefetch')

    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })

    if (isProduction) {
      // 生产环境下---压缩图片
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true,
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.8, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
          webp: { quality: 75 }
        })
        .end()
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  /*
  publicPath: 设置公共路径，用于部署到不同的环境中。
  执行 npm run build 统一配置文件路径（本地访问dist/index.html需'./'）
  publicPath: './',
  NODE_ENV：Node.js 暴露给执行脚本的系统环境变量。通常用于确定在开发环境还是生产环境

  1.项目部署的基础路径
  2.我们默认假设你的应用将会部署在域名的根部，
  3.比如 https://www.my-app.com/
  4.如果你的应用时部署在一个子路径下，那么你需要在这里
    指定子路径。比如，如果你的应用部署在
    https://www.foobar.com/my-app/
    那么将这个值改为 `/my-app/`

  拓展：把开发服务器假设在根路径，可以直接使用一个判断
    publicPath :process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/'

  */
  publicPath: BASE_URL,

  /*
  outputDir
  将构建好的文件输出到哪里（或者说将编译的文件），
  当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
  注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  */
  outputDir: 'dist',
  /*
  assetsDir
  放置生成的静态资源 (js、css、img、fonts) 的目录。
  从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
  */
  assetsDir: 'static', //  设置静态资源目录。
  /*
  indexPath: 设置生成的 index.html 文件的路径。
  可以不设置一般会默认
  */
  /*
  indexPath
  指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  */
  // indexPath: 'index.html',

  /*
  默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
  如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为false来关闭文件名哈希。

  */
  // filenameHashing:true, // 文件命名

  productionSourceMap: false // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  /*
  作用：
  1.用于设定，是否只有*.module.[ext]结尾的文件才会被视作CSS Modules 模块。
  2.默认情况下，只有文件名中含有.modules的CSS相关文件还能使用CSS Modules。
  注意：
  1.如果我们进行了关于css.loaderOptions.css的配置。一定要在配置文件中显性的指出css.requireModuleExtension的值。也就是说，我们一定要配置css.requireModuleExtension。
  2.原来vue.config.js中配置的css.modules过时了，改为css.requireModuleExtension
  */
  // css: { // css相关配置
  //   // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中，生产环境下是 true，开发环境下是 false
  //   extract: process.env.NODE_ENV === 'production',
  //   // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
  //   sourceMap: false,
  //   // 启用 CSS modules for all css / pre-processor files.(预加载)
  //   // 因为配置了loaderOptions.css, 尽管requireModuleExtension的值为默认值，我们也需要指出
  //   requireModuleExtension: true,
  //   loaderOptions: {
  //     css: {
  //       // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
  //       // Vue CLI v3 用户可参考 css-loader v1 文档
  //       // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
  //       modules: {
  //         localIdentName: '[local]_[hash:base64:8]'
  //       }
  //     },
  //     // 这里的选项会传递给 postcss-loader
  //     postcss: {
  //       // 举例说明：动态根据UI稿移动端375px 适配最终比例大小
  //       postcssOptions: {
  //         plugins: [require('postcss-pxtorem')({
  //           rootValue: 16, // 根字体大小
  //           unitPrecision: 5,
  //           propList: ['*'],
  //           selectorBlackList: [],
  //           replace: true,
  //           mediaQuery: false,
  //           minPixelValue: 0,
  //           exclude: /node_modules/i
  //         })]
  //       }
  //     },
  //     // 给 sass-loader 传递选项
  //     sass: {
  //       // @/ 是 src/ 的别名
  //       // 所以这里假设你有 `src/variables.sass` 这个文件
  //       // 注意：在 sass-loader v7 中，这个选项名是 "data"
  //       prependData: '@import "~@/variables.sass"'
  //     },
  //     // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
  //     // 因为 `scss` 语法在内部也是由 sass-loader 处理的
  //     // 但是在配置 `data` 选项的时候
  //     // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
  //     // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
  //     scss: {
  //       prependData: '@import "~@/variables.scss";'
  //     },
  //     // 给 less-loader 传递 Less.js 相关选项
  //     less: {
  //       // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
  //       // `primary` is global variables fields name
  //       globalVars: {
  //         primary: '#fff'
  //       }
  //     }
  //   }
  // }

}
