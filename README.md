<!--
 * @Author: xueml
 * @Date: 2023-07-31 16:41:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 10:15:35
 * @FilePath: \technical-tool\README.md
-->
# 技术实验基地
# technical-tool


## Project setup
```
npm install
```

### 项目启动
```
npm run serve
```

### 打包
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 安装插件
## 初始化安装打包配置
```
cnpm install compression-webpack-plugin@6.1.1 -D       gzip压缩插件，需要引入
cnpm i image-webpack-loader@8.1.0 --save-dev           图片压缩，不需要引入
npm i webpack-bundle-analyzer@4.7.0 --save-dev         打包分析插件
npm i speed-measure-webpack-plugin -D                  打包时间
npm i hard-source-webpack-plugin -D                    构建时进行缓存
cnpm i uglifyjs-webpack-plugin -D                    引入压缩插件 但是导致项目启动的比较慢
```
## 安装 axios
npm install axios


## UI安装
### ElementUI
#### Vue 2 项目，安装ElementUI
```
npm i element-ui -S

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

```
### Vant
#### Vue 3 项目，安装最新版 Vant
```
npm i vant
```
#### Vue 2 项目，安装 Vant 2
```
npm i vant@latest-v2

import Vant from 'vant'
import 'vant/lib/index.css'
```


## 补充安装 
### 神策埋点
```
cnpm install sa-sdk-javascript
```
### slide滑块验证
```
npm install vue-monoplasty-slide-verify
```
### vconsole滑块验证
```
npm install vconsole
```
### lucky-canvas转盘安装  https://100px.net/usage/vue.html
#### npm 安装
```
npm install @lucky-canvas/vue@latest

// 完整加载
import VueLuckyCanvas from '@lucky-canvas/vue'
Vue.use(VueLuckyCanvas)
```
#### yarn 安装
```
yarn add @lucky-canvas/vue@latest
```

### 页面转文件
```
npm install file-saver --save  //vue页面下载成word文档

npm install --save html2canvas  // 页面转图片
npm install jspdf --save  // 图片转pdf

-- 安装 docxtemplater
npm install docxtemplater pizzip  --save

-- 安装 jszip-utils
npm install jszip-utils --save 

-- 安装 jszip
npm install jszip --save

-- 引入处理图片的插件1
npm install docxtemplater-image-module-free --save

-- 引入处理图片的插件2
npm install angular-expressions --save
```
### vue-ripple-directive点击水波纹
```
npm install vue-ripple-directive --save
```
###  echarts 图表
```
npm install echarts
```
## md5加密
```
npm i spark-md5
```