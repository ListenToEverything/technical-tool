<template>
  <div class="dataView">
    
    <div id="content" style="margin:0 auto;height:500px;width:700px; background:#ccc;" >
      <div @click="screen">部分全屏</div>
      <div @click="fullScreen">沉浸式全屏</div>
      <div @click="exitFullscreen">退出全屏</div>
    </div>
      
    <div class="screen-wrapper">
        <div class="screen" id="screen">
            <div class="demo-root">
                <el-header>头部</el-header>
                <el-main>
                    <div class="demo-left"></div>
                    <div class="demo-center"></div>
                    <div class="demo-right"></div>
                </el-main>
                <el-footer>底部</el-footer>
            </div>
        </div>
        <el-footer class="large-footer"></el-footer>
        
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataView',
  data () {
    return {
      msg: '图书馆里系统'
    }
  },
  mounted(){
    //初始化自适应  ----在刚显示的时候就开始适配一次
    this.handleScreenAuto();
    //绑定自适应函数   ---防止浏览器栏变化后不再适配
    window.onresize = () => this.handleScreenAuto();

    //是否全屏
    this.isScreen()
  },
  deleted(){
    window.onresize = null;
  },
  methods: {
      //数据大屏自适应函数
      handleScreenAuto () {
          const designDraftWidth = 1920;//设计稿的宽度
          const designDraftHeight = 960;//设计稿的高度
          //根据屏幕的变化适配的比例
          const scale = document.documentElement.clientWidth / document.documentElement.clientHeight < designDraftWidth / designDraftHeight ?
              (document.documentElement.clientWidth / designDraftWidth) :
              (document.documentElement.clientHeight / designDraftHeight);
          //缩放比例
          console.log("是否",scale);
          document.querySelector('#screen').style.transform = `scale(${scale}) translate(-50%)`;
      },
      //是否全屏
      isScreen(){
        var isFull=!!(document.webkitIsFullScreen || document.mozFullScreen || 
          document.msFullscreenElement || document.fullscreenElement
        );
        console.log("是否全屏",isFull);
      },
      //部分全屏
      screen(){
        var element = document.getElementById("content"); 
        
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen; 
        if (requestMethod) { 
          requestMethod.call(element); 
        } else if (typeof window.ActiveXObject !== "undefined") { 
          var wscript = new ActiveXObject("WScript.Shell"); 
          if (wscript !== null) { 
            wscript.SendKeys("{F11}"); 
          } 
        } 

      },
      //沉浸式全屏
      fullScreen(){
        let element = document.documentElement
        // 进入全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) { // IE11
          element.msRequestFullscreen()
        }
      },
      // 退出全屏
      exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }

      }
  }
}
</script>

<style scoped lang="scss">
.dataView{
  .screen-wrapper {
    height: 100%;
    width: 100%;
    .screen {
        display: inline-block;
        width: 1920px;
        height: 960px;
        transform-origin: 0 0;
        position: absolute;
        left: 50%;
        .demo-root{
          .el-header{
                width: 1920px;
                height: 200px;
                background: rgba(53, 150, 206, 0.3);
                font-size: 40px;
                text-align: center;
                line-height: 200px;
            }
            .el-main{
                display: flex;
                height: 660px;
                div{
                    width: 640px;
                    height: 100%;
                }
                .demo-left{
                    background: rgba(206, 52, 154, 0.3);
                }
                .demo-center{
                    background: rgba(13, 30, 179, 0.3);
                }
                .demo-right{
                    background: rgba(64, 163, 6, 0.849);
                }
            }
            .el-footer{
                width: 100%;
                height: 100px;
                font-size: 40px;
                text-align: center;
                line-height: 100px;
                background: rgba(19, 211, 115, 0.3);
            }
        }
    }
}
}

</style>
