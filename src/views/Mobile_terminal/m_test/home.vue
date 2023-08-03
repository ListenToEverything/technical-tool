<template>
  <div class="ReservedSucceed" ref="domm">
    <p @click="test()">测试</p>
    <p @click="arrTest()">数组测试</p>
      <p @click="nextWidth()">查看天气</p>
      <p @click="nextfloatball()">拖曳</p>
      <p @click="nextInputText()">添加古诗词</p>
      <p @click="nextCalender()">签到</p>
      <p @click="nextTurntable()">转盘</p>
      <p @click="nextCheckPhone()">全屏查看手机状态</p>

      <!-- <div v-for="e in 100 " :key="e">
        <div>{{ e }}</div>
      </div> -->
    <slider></slider>
    
  </div>
</template>

<script>
import slider from "../../../components/slider.vue"
export default {
  components:{
    slider
  },
  data() {
    return {
      dataList: [], // 列表数据
      arrstr:""
    }
  },
  created() {
    
  },
  mounted() {
    document.addEventListener("scroll", this.scrollHandler);
  },

  methods: {
    //数组
    arrTest(){
      let arr = [1,2,3];

      // let tt= arr.filter(function(i){

      // return i > 1;

      // })


      let tt = arr.some(function(i){

      return i > 1;

      })
      let ad = arr.reduce(function(i,j){

      return i + j;

      })
      console.log("结果",tt,ad)
    },
    //测试
    test(){
      const arr=[5,[[4,3],2,1]]
      this.arrfor(arr)
      console.log("计算公式",this.arrstr )
      console.log("第一种",eval(this.arrstr) )
      console.log("第二种",this.evil(this.arrstr) )
      
    },
    //循环取值
    arrfor(arr){
      this.arrstr=this.arrstr?(this.arrstr.charAt(this.arrstr.length - 1)=='('?this.arrstr+"(":this.arrstr+"-("):"("
      arr.forEach(i=>{
        if(i.constructor==Array){
          this.arrfor(i)
        }else{
          this.arrstr= this.arrstr.charAt(this.arrstr.length - 1)=='('?this.arrstr+i:this.arrstr+"-"+i
        }
        console.log(i)
      })
      this.arrstr=this.arrstr+")"

    },
    //计算表达式的值
    evil(fn) {
        var Fn = Function;  //一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)();
    },
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
    //转盘
    nextTurntable(){
      this.$router.push({
        path:"/MHome/turntable",
        // query:{redirect:to.path}
      })
    },
    //签到
    nextCalender(){
      this.$router.push({
        path:"/MHome/calender",
        // query:{redirect:to.path}
      })
    },
    //查看天气
    nextWidth(){
      this.$router.push({
        path:"/MHome/width",
        // query:{redirect:to.path}
      })
    },
    //拖曳
    nextfloatball(){
      this.$router.push({
        path:"/MHome/floatball",
        // query:{redirect:to.path}
      })
    },
    //添加古诗词
    nextInputText(){
      // this.$router.push({
      //   path:"/MHome/inputText",
      //   // query:{redirect:to.path}
      // })
      this.$router.replace(
        "/MHome/inputText"
      )
    },
    // 全屏查看手机状态
    nextCheckPhone(){
      this.$router.push({
        path:"/MHome/checkPhon",
        // query:{redirect:to.path}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ReservedSucceed {
  height: 100%;
  background-color: white;
  // color: rgba(255,255,255,1);
  
}
</style>