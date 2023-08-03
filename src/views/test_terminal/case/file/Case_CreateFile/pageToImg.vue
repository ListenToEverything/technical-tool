<template>
  <div class="ReservedSucceed">
    <div id="ReservedSucceed" @click="imgBox=false">
        <div class="content" v-for="item in strList" :key="item.label">
          <p class="hide">{{item.str}}</p>
        </div>
    </div>
    <el-button type="primary" @click="imgBox=true" >网页生成图片</el-button>
    <div class="imgBox" v-show="imgBox">
      <div class="img">
        <img :src="fileId" alt="">
      </div>
      <div class="box">
        <a class="down" href download="图片名字">请长按保存图片</a>
      </div>
    </div>
    
  </div>
</template>

<script>
import html2canvas from 'html2canvas'

export default {
  data() {
    return {
      fileId:"",
      imgurl: null,
      imgBox: false,
      strList:[
        {str:"要永远坚信这一点：一切都会变的，无论受多大创伤心情多么沉重，一贫如洗也好，都要坚持住。太阳落了还会升起，不幸的日子总会有尽头，过去是这样，将来也是这样。早安!",label:"1"},
        {str:"这是他的似水流年，不是我的。岁月如流，就如月在当空，照着我们每一个人，但是每个人的生活都不一样。",label:"2"},
        {str:"流水是白云的影子，月亮是太阳的影子，黑夜是白天的影子，痛苦是爱的影子。不求你做我的影子，甘愿我做你的影子。",label:"3"},
        {str:"花开一季，人活一世，只有时光安然无恙。那些转正确的弯，那些流下的泪水，那些滴下的汗水，不论好坏，终究成全了现在的自己。",label:"4"},
        {str:"人生没有假设，当下即是全部。人生的幸与不幸，关键看你面向哪里。幸福如阳光，不幸是阴影，有阳光就必然有阴影。人生一边是永无止境的追求，一边是平淡如水的流年。不是每一次追求都能成功，不是每一次付出都有收获。",label:"5"},
        {str:"在沧海桑田，我们就是那起舞的蝴蝶，无论今天怎样，明天我还会在这里，路过我曾经去过的地方，探索我未实现的未来，哪怕是蝴蝶飞不过沧海。",label:"6"},
        {str:"从容来去，坦然今生。无论生命给了我们什么，是雨露的滋润，还是阳光的照射，是狂风的吹拂，还是暴雨的敲打，我们都从容地接受，欣然地释放着生命的繁丽。如果遇到的是伤痛，我们就要学会坚忍，并因此练就释怀生命起落的本能。如果遇到的是快乐，我们就幸福地绽开笑容，并把快乐传播。如果遇到的是黑夜，我们就和星星、月亮一起迎接每一个黎明的到来；如果遇到的是白昼，我们就尽情地去欣赏鲜花的绽放、鸟儿的歌唱、蝶儿的轻舞，去拥抱这个美丽而充满生机的世界。",label:"7"},

      ]
    };
  },
  created() {
  },
  mounted() {
    //将网页生成图片
    this.htmlTocanvas();
  },
  methods: {
     //获取截图
     getBase64(fileId) {
      this.fileId = fileId
    },
    //页面生成图片(基础版)
    htmlTocanvas() {
      const that = this;
      html2canvas(document.getElementById("ReservedSucceed")).then(
        async function(canvas) {
        // 第一种方法,生成base64
        // let str = canvas.toDataURL("image/png").split(",")[1];
        
        that.getBase64(canvas.toDataURL("image/png"));
        // 第二种方法,直接下载
        // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        // document
        //   .querySelector(".down")
        //   .setAttribute("href", canvas.toDataURL());
        // 第三种方法,生成的图片的url
        // var imgurl = canvas
        //   .toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        // window.location.href = imgurl; // 下载图片
        }
        
      )
    },
    //页面生成图片(进阶版)
    htmlTocanvas1() {
      //解决生成的网页图片不清晰------预防,暂未出现
      const that = this;
      //创建一个新的canvas

      var canvas2 = document.createElement("canvas");
      // let _canvas = document.querySelector('div');
      let _canvas = document.getElementById("ReservedSucceed");

      var w = parseInt(window.getComputedStyle(_canvas).width);
      var h = parseInt(window.getComputedStyle(_canvas).height);
      //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      canvas2.width = w * 3;
      canvas2.height = h * 3;
      canvas2.style.width = w + "px";
      canvas2.style.height = h + "px";
      //可以按照自己的需求，对context的参数修改,translate指的是偏移量
      //  var context = canvas.getContext("2d");
      //  context.translate(0,0);
      var context = canvas2.getContext("2d");

      html2canvas(document.getElementById("ReservedSucceed"), {
        canvas: canvas2
      }).then(async function(canvas) {
        // 第一种方法,生成base64
        // let str = canvas.toDataURL("image/png").split(",")[1];
        
        that.getBase64(canvas.toDataURL("image/png"));
        // 第二种方法,直接下载
        // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        // document
        //   .querySelector(".down")
        //   .setAttribute("href", canvas.toDataURL());
        // 第三种方法,生成的图片的url
        // var imgurl = canvas
        //   .toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        // window.location.href = imgurl; // 下载图片
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.ReservedSucceed {
  background-color: white;
  .hide {
    text-indent: 1em;
  }
  .imgBox {
    position: fixed;
    top: 15%;
    left: 25%;
    width: 50%;
    // height: 70%;
    background-color: rgb(232, 236, 232);
    z-index: 6;
    border-radius: 20px;
    padding: 5px;
    .img {
      padding: 10px;
      img {
        width: 100%;
        // height: 100%;
      }
    }
    .box {
      text-align: center;
      margin: 10px 0;
    }
  }
  
}
</style>