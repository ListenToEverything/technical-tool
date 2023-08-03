<!--
 * @Author: xueml
 * @Date: 2023-08-02 17:11:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 15:38:24
 * @FilePath: \technical-tool\src\views\test_terminal\uploadFile.vue
-->
<template>
  <div class="uploadFile">
    <h2>普通上传方法</h2>
    <p>特点：简单，无需特殊处理</p>
    <p>缺点：文件过大，上传容易出问题</p>
    <fileType1></fileType1>
    <h2>切片上传</h2>
    <p>特点：速度快</p>
    <p>缺点：某个传输失败，文件无法拼接完整</p>
    <fileType2></fileType2>
    <h2>断点续传</h2>
    <p>特点：速度快</p>
    <p>缺点：某个传输失败，文件无法拼接完整</p>
    <fileType3></fileType3>
  </div>
</template>

<script>
import fileType1 from '@/view/test_terminal/case/file/uploadFile/fileType1.vue'
import fileType2 from '@/view/test_terminal/case/file/uploadFile/fileType2.vue'
import fileType3 from '@/view/test_terminal/case/file/uploadFile/fileType3.vue'
export default {
  name: 'uploadFile',
  components: {
    fileType1,
    fileType2,
    fileType3
  },
  data () {
    return {
      name: '这是向下传三十多w微服务饿巍峨额威风'
    }
  },
  created () { }

}

</script>
<style scoped lang="less">
.uploadFile {
  width: 100vw;
  height: 100vh;
}
</style>
