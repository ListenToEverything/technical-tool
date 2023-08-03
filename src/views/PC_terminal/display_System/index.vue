<template>
  <div class="project_Home">
    <router-view :key="new Date().getTime()"/>
  </div>
</template>

<script>
export default {
  name: 'project_Home',
  data () {
    return {
      msg: '图书馆里系统'
    }
  },
  created(){
   window.addEventListener("resize",this.handResize)
  },
  beforeDestroy(){
    window.removeEventListener("resize",this.handResize)
  },
  methods:{
    handResize(){
      this.$nextTick(()=>{
        console.log("窗口发生变化了")
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
