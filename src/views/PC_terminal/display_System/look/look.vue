<template>
  <div class="test" ref="tt" id="box">
    <div class="title" v-show="titleStatus">这是标题</div>
    
    <h1>{{ msg }}</h1>
    <img src="@/assets/imgs/bg/bg2.jpeg" alt="">
    <img src="@/assets/imgs/bg/bg3.jpeg" alt="">
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: '这是预览页',
      windowH:"",
      windowW:"",
      oldScroll:-1,
      //标题栏展示
      titleStatus:true,
      // 
      otherList:[
        "网站：give me hope",
        "硕鼠视频下载",
        "鸠摩搜书",
        "colorHub",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      video:[
        "江南丧尸",
        "破碎人生",
        "少年派的奇幻漂流",
        "狮子王",
        "遗愿清单",
        "爆裂鼓手",
        "白日梦想家",
        "体能之巅",
        "登录之日",
        "东游",
        "安娜",
        "极限杀手",
        "赴汤蹈火",
        "边境杀手",
        "猎凶风河谷",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      musicList:[
        "wake",
        "cath my breath",
        "love story",
        "free loop",
        "stay",
        "stitches",
        "closer",
        "the way i still love ",
        "keep bleeding",
        "风崔雨",
        "归途有风",
        //日语
        "吃醋",
        "绊",
        "朗朗晴天",
        "谢谢",
        "心理作用",
        "大概",
        "若能绽放光芒",
        "反语",
      ]
    }
  },
  created(){
    // this.windowH=document.body.scrollHeight 
    // this.windowW=document.body.scrollWidth 
    // // document.getElementsByClassName("test").style=`background-size:${this.windowH}px ${this.windowW}px;`
    // console.log("北京",this.windowH,this.windowW)
    // console.log("北京",document.getElementsByClassName("test"))

    // this.addBackground()
    // window.onscroll=this.titleTab()
    
  },
  mounted() {
    document.addEventListener("scroll",this.titleTab)
    
    // var box = document.getElementById('box');
    // this.addEvent(box, 'mousewheel', this.onMouseWheel);
    // this.addEvent(box, 'DOMMouseScroll', this.onMouseWheel);

  },
  methods:{
    addBackground(){
      console.log("北京",document.body.style)
      // document.body.style=""
    },
    addEvent(obj, xEvent, fn) {
      if (obj.attachEvent) {
          obj.attachEvent('on' + xEvent, fn);
      } else {
          obj.addEventListener(xEvent, fn, false);
      }
    },
    onMouseWheel(ev) {/*当鼠标滚轮事件发生时，执行一些操作*/
      
      var ev = ev || window.event;
      var down = true; // 定义一个标志，当滚轮向下滚时，执行一些操作
      down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
      if (down) {
          console.log('鼠标滚轮向下---------')
          // this.titleStatus=false
      } else {
        // this.titleStatus=true
          console.log('鼠标滚轮向上++++++++++')
      }
      if (ev.preventDefault) {/*FF 和 Chrome*/
          ev.preventDefault();// 阻止默认事件
      }
      return false;
    },
    //根据用户浏览页面判断标题栏隐藏显示
    titleTab(){
      console.log("////////////////////////////////////////////////////");
      //判断是在上画还是下滑
      var scrollTop = document.documentElement.scrollTop ||document.body.scrollTop
      //下滑
      if(this.oldScroll===scrollTop){
        console.log("向下滑动",this.oldScroll,scrollTop)
        // this.titleStatus=true
      }
      //下滑
      if(this.oldScroll<scrollTop){
        console.log("向下滑动",this.oldScroll,scrollTop)
        // this.titleStatus=false
      }else if(this.oldScroll>scrollTop){//上滑
        // this.titleStatus=true
        console.log("向上滑动",this.oldScroll,scrollTop)
      }

      window.scroll(0,scrollTop);
      this.oldScroll=scrollTop
      console.log("残数",scrollTop)

      // var popup = this.$refs.tt;

      // // console.log("获取可视区宽高", popup.getBoundingClientRect().top);
      // console.log("////////////////////////////////////////////////////");
      // // console.log("可视高度", popup.getBoundingClientRect().height);

      // // console.log("获取可视区宽高", document.documentElement.clientHeight);

      // // console.log("获取滚动条距离", document.body.scrollTop);

      // // console.log("获取可视区宽高1", window.scrollY);

      // // console.log("获取可视区宽高", document.documentElement.clientHeight);

      // //页面总高度
      // let pageHeght = popup.getBoundingClientRect().height - 120;
      // console.log("页面总高度", pageHeght);
      // //屏幕总高度
      // let WHeight = window.innerHeight;
      // console.log("屏幕总高度", WHeight);
      // //当前高度
      // let ele =  window.scrollY + WHeight;
      // console.log("当前高度", ele);
      // console.log("水水水",ele >= pageHeght);
      

    }
  }
}
</script>

<style lang="scss" scoped>
.test{
  width: 100%;
  // height: 864px;
  background: url(../../../assets/imgs/bg/bg1.jpeg);
  /* background-size:1536px 864px ; */
  background-repeat:no-repeat;
  .title{
    width: 100vw;
    height: 60px;
    line-height: 60px;
    background-color: #A4CAB6;
    background-color:transparent;//背景色透明
    position: sticky;
    top: 0;
    left: 0;
  }
}
img{
  /* width: 100%; */
  /* height: 100%; */
}
</style>
