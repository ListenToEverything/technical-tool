<!--
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 17:32:06
 * @FilePath: \technical-tool\src\views\test_terminal\HomeTest.vue
-->
<template>
  <div class="hello">
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goCompressImg">图片压缩</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
    <h1 @click="goEchars">echars</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeTest',
  props: {
    msg: String
  },
  methods: {
    goEchars () {
      this.$router.push({
        path: '/test/echarsType',
        // query:{redirect:to.path}
      })
    },
    goCompressImg () {
      this.$router.replace({
        path: '/test/imgZIP',
        // query:{redirect:to.path}
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1 {
  color: #42b983;
}
</style>
