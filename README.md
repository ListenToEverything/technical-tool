<!--
 * @Author: xueml
 * @Date: 2023-07-31 16:41:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 10:56:41
 * @FilePath: \technical-tool\README.md
-->
# 技术实验基地
# technical-tool


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#
cnpm install compression-webpack-plugin@6.1.1 -D       gzip压缩插件，需要引入
cnpm i image-webpack-loader@8.1.0 --save-dev           图片压缩，不需要引入
npm i webpack-bundle-analyzer@4.7.0 --save-dev         打包分析插件
npm i speed-measure-webpack-plugin -D                  打包时间
npm i hard-source-webpack-plugin -D                    构建时进行缓存
cnpm i uglifyjs-webpack-plugin -D                    引入压缩插件 但是导致项目启动的比较慢
