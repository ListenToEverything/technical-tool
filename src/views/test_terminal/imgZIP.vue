<!--
 * @Author: xueml
 * @Date: 2023-08-02 17:11:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 15:35:53
 * @FilePath: \technical-tool\src\views\test_terminal\imgZIP.vue
-->
<template>
  <div class="imgZIP">
    <h2>压缩方法1</h2>
    <p>特点：可以自由控制压缩大小</p>
    <p>缺点：压缩时间过长</p>
    <zip1></zip1>
    <h2>压缩方法2</h2>
    <p>特点：速度快</p>
    <p>缺点：对于过宽的图片压缩效果不太好</p>
    <zip2></zip2>
  </div>
</template>

<script>
import zip1 from '@/view/test_terminal/case/file/imgZip/imgZIP1.vue'
import zip2 from '@/view/test_terminal/case/file/imgZip/imgZIP2.vue'
export default {
  name: 'imgZIP',
  components: {
    zip1,
    zip2
  },
  data () {
    return {
      srcUrl: ''
    }
  },
  created () { },
  methods: {
  }

}

</script>
<style scoped lang="less">
.imgZIP {
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
}
</style>
