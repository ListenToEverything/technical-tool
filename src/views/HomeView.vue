<!--
 * @Author: xueml
 * @Date: 2023-08-03 15:46:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 15:46:47
 * @FilePath: \technical-tool\src\views\HomeView.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
