<template>
  <div class="music" ref="domm">
    
      <!-- <musicBg class="musicBg"></musicBg>
      <musicImg class="musicImg"></musicImg> -->
      <play></play>
  </div>
</template>

<script>
import musicBg from "./musicBg.vue"
import musicImg from "./musicImg.vue"

import play from "./play.vue"
export default {
  components:{
    musicImg,
    musicBg,
    play
  },
  data() {
    return {
      dataList: [] // 列表数据
    }
  },
  created() {
    
  },
  mounted() {
    document.addEventListener("scroll", this.scrollHandler);
  },

  methods: {
    //检测滑动
    scrollHandler() {
      var popup = this.$refs.domm;

      // console.log("获取可视区宽高", popup.getBoundingClientRect().top);
      console.log("////////////////////////////////////////////////////");
      // console.log("可视高度", popup.getBoundingClientRect().height);

      // console.log("获取可视区宽高", document.documentElement.clientHeight);

      // console.log("获取滚动条距离", document.body.scrollTop);

      // console.log("获取可视区宽高1", window.scrollY);

      // console.log("获取可视区宽高", document.documentElement.clientHeight);

      //页面总高度
      let pageHeght = popup.getBoundingClientRect().height - 120;
      console.log("页面总高度", pageHeght);
      //屏幕总高度
      let WHeight = window.innerHeight;
      console.log("屏幕总高度", WHeight);
      //当前高度
      let ele =  window.scrollY + WHeight;
      console.log("当前高度", ele);
      console.log("水水水",ele >= pageHeght);

      
    },
    
  }
}
</script>

<style lang="scss" scoped>
.music {
  height: 100%;
  // background-color: white;
  .musicBg{
    // z-index: 3;
    position: fixed;
    top: 20%;
    left: 0%;
  }
  .musicImg{
    z-index: 3;
    position: fixed;
    top: 30%;
    left: 15%;
  }
}
</style>