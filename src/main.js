/*
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 17:03:23
 * @FilePath: \technical-tool\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// vant
import Vant from 'vant'
import 'vant/lib/index.css'
// vconsole
import VConsole from 'vconsole'
// 滑块验证登录
import SlideVerify from 'vue-monoplasty-slide-verify'
// 转盘插件
import VueLuckyCanvas from '@lucky-canvas/vue'
// 神策埋点
import sensors from './utils/sensors.js'
// 自定义指令-埋点
import directive from './utils/directive'
// 自定义请求拦截
import server from './utils/request'
// 水波纹
import Ripple from 'vue-ripple-directive' // 自定义水波纹颜色
// 自定义工具类
import utils from './utils'

/// //////////////////////////////////////////////////////////////////////////////////
// npm install echarts --save
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, RadarChart, GaugeChart, ScatterChart, PictorialBarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  TimelineComponent,
  LegendComponent,
  PolarComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  RadarChart,
  GaugeChart,
  TimelineComponent,
  ScatterChart,
  LegendComponent,
  PolarComponent,
  PictorialBarChart
])
/// //////////////////////////////////////////////////////////////////////////////////

Vue.directive('ripple', Ripple)
Ripple.color = 'rgba(0, 0, 0, 0.2)'
window.utils = utils
// 使用echarts
Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = server
Vue.prototype.$sensors = sensors

Vue.use(VueLuckyCanvas)
Vue.use(SlideVerify)

Vue.use(Vant)
new VConsole()
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  directive,
  render: h => h(App)
}).$mount('#app')
