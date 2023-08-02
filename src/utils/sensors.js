import sensors from 'sa-sdk-javascript'

sensors.init({ // 神策系统配置
  server_url: 'http://shence.ap-ec.cn:8106/debug', // 数据接收地址
  is_track_single_page: true, // 单页应用页面浏览事件采集(url改变就触发)
  use_app_track: true,
  show_log: false, // 控制台显示数据开关
  heatmap: { // 热图设置 default开启 not_collect关闭（详细配置解释看官方文档）
    clickmap: 'default', // 点击热图，收集点击事件
    scroll_notice_map: 'default' // 视区热图，收集页面区域停留时间
  }
})

sensors.quick('autoTrack') // 首次触发页面加载事件 $pageview

const param = {
  platform_type: 'WEB', // 平台类型：App，H5，Web
  app_name: '测试管理系统', // 应用名称
  product_line: '打更人'
}
sensors.registerPage(param) // 设置公共属性
export default sensors
