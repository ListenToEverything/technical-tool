<!--
 * @Author: xueml
 * @Date: 2023-05-28 09:55:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 17:07:36
 * @FilePath: \technical-tool\src\views\test_terminal\echarsType.vue
-->
<template>
  <div class="echars">
    <!-- <div>
      <div @click="screen">部分全屏</div>
      <div @click="fullScreen">沉浸式全屏</div>
      <div @click="exitFullscreen">退出全屏</div>
    </div> -->

    <div class="con">
      <div>
        <echarsType1></echarsType1>
      </div>
      <div>
        <echarsType2></echarsType2>
      </div>
      <div>
        <echarsType3></echarsType3>
      </div>
      <div>
        <echarsType4></echarsType4>
      </div>
      <div>
        <echarsType5></echarsType5>
      </div>
      <div>
        <echarsType6></echarsType6>
      </div>
    </div>
  </div>
</template>

<script>
import echarsType1 from '@/views/test_terminal/case/echars/echarsType1.vue'
import echarsType2 from '@/views/test_terminal/case/echars/echarsType2.vue'
import echarsType3 from '@/views/test_terminal/case/echars/echarsType3.vue'
import echarsType4 from '@/views/test_terminal/case/echars/echarsType4.vue'
import echarsType5 from '@/views/test_terminal/case/echars/echarsType5.vue'
import echarsType6 from '@/views/test_terminal/case/echars/echarsType6.vue'


export default {
  name: 'echarsType',
  components: {
    echarsType1,
    echarsType2,
    echarsType3,
    echarsType4,
    echarsType5,
    echarsType6
  },
  data () {
    return {
    }
  },
  mounted () {
    // 初始化自适应  ----在刚显示的时候就开始适配一次
    // this.handleScreenAuto()
    // 绑定自适应函数   ---防止浏览器栏变化后不再适配
    // window.onresize = () => this.handleScreenAuto()
  },
  deleted () {
    window.onresize = null
  },
  methods: {
    // 数据大屏自适应函数
    handleScreenAuto () {
      const designDraftWidth = 1920// 设计稿的宽度
      const designDraftHeight = 960// 设计稿的高度
      // 根据屏幕的变化适配的比例
      const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight
        ? (document.documentElement.clientWidth / designDraftWidth)
        : (document.documentElement.clientHeight / designDraftHeight)
      // 缩放比例
      document.querySelector('#con').style.transform = `scale(${scale}) translate(-50%)`
    }

  }
}
</script>

<style scoped lang="less">
.echars {
  background-color: black;
  height: 100vh;
  width: 100vw;
  .con {
    display: grid;
    grid-auto-flow: row dense;
  }
}
</style>
