<!--
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 16:38:19
 * @FilePath: \technical-tool\src\views\HomeTest.vue
-->
<template>
  <div class="hello">
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
        path: '/echarsType '
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
