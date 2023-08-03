<template>
  <div class="ReservedSucceed">
    <div id="ReservedSucceed" @click="imgBox=false">
      <div class="result-content">
        <!-- <img src="../../../assets/img/question/result.png" alt /> -->
        <div class="status">预约成功</div>
      </div>
      <!-- <DtailsList title="体检信息">
        <common :is_border="false" :isAbreast="true" :itemList="infoList"></common>
      </DtailsList>
      <DtailsList title="体检项目">
        <common :is_border="false" :isAbreast="true" :itemList="projectList"></common>
      </DtailsList>
      <DtailsList title="注意事项">
        <div class="content">
          <p>1、受检人体检时应持本人有效身份证件、一寸照片及体检通知书。</p>
          <p>2、血检项目及腹部Ｂ超者必须空腹8小时以上，抽血后须按压3分钟。</p>
          <p>3、女客户体检应在经期结束3天后进行，并请在体检当日不化妆。</p>
          <p>4、客户体检前，应注意休息，请清淡饮食，避免过度疲劳与激动，避免饮酒。</p>
          <p>5、体检时要详细告知健康状况并于《健康告知》上签字。如曾有手术或住院史者，请带好有关资料以备参考。</p>
          <p>6、完成上述体检项目，是本保险合同有效成立之必要条件之一。</p>
          <p>7、如投保过程中客户在我司指定体检医院进行体检后又发生以下情况的，体检费用将由客户承担：</p>
          <p class="hide">1） 保险公司未提出附加承保条件而客户撤件的。</p>
          <p class="hide">2） 指保险公司未提出附加承保条件或还未给出核保结论，但达到强撤条件，进行系统强撤的。</p>
          <p class="hide">3） 保单承保后操作犹豫期整单退保的。</p>
        </div>
      </DtailsList> -->
    </div>
    <!-- <Zbutton @submit="submit">我知道啦</Zbutton> -->
    <div class="imgBox" v-show="imgBox">
      <div class="img">
        <!-- <img :src="picUrl+fileId" alt /> -->
      </div>
      <div class="box">
        <!-- <button>保存图片</button> -->
        <a class="down" href download="downImg" @click="downImg">请长按保存图片</a>
      </div>
    </div>
    <div
      :class="floatballClass"
      id="floatball"
      @click="imgBox=true"
      @mousedown="down"
      @touchstart.stop="down"
      @mousemove="move"
      @touchmove.stop="move"
      @mouseup="end3"
      @touchend.stop="end3"
      :style="{top:position.y+'px', left:position.x+'px'}"
      @touchmove.prevent
    >保存图片</div>
  </div>
</template>

<script>
const infoList = [
  {
    label: '体检人姓名:',
    value: ''
  },
  {
    label: '体检机构:',
    value: ''
  },
  {
    label: '预约时间:',
    value: ''
  },
  {
    label: '医院地址:',
    value: ''
  }
]

// import DtailsList from '../components/DtailsList'
// import Zbutton from '../components/Button'
// import common from '../components/Common'
import html2canvas from 'html2canvas'
// import { MessageBox } from "mint-ui";

// 鼠标位置和div的左上角位置 差值
var dx, dy;
var screenWidth = window.screen.width;
var screenHeight = window.screen.height;
export default {
  // components: { DtailsList, Zbutton, common },
  data() {
    return {
      // picUrl: globalConfig.picUrl,
      infoList,
      projectList: [],
      fileId: null,
      imgUri: null,
      imgBox: false,
      position: {
        x: 0,
        y: 60
      },
      //定义左边依靠
      left: {
        X: 0,
        Y: null
      },
      //定义右边依靠
      right: {
        X: screenWidth,
        Y: null
      },
      //中间距离
      middle: null,
      floatballClass: "floatball-left"
    };
  },
  created() {
    // console.log("预约成功页面", this.$route.query);
    // this.needData = this.$route.query;
    // this.handPageData();
  },
  mounted() {
    // this.html2canvas();
  },
  methods: {
    //处理数据
    handPageData() {
      const obj = JSON.parse(sessionStorage.getItem('item'))
      console.log('预约成功页面处理数据', obj)
      //体检人姓名
      this.infoList[0].value = obj.physicalName
      //体检医院
      this.infoList[1].value = obj.hospitalName
      //预约时间
      this.infoList[2].value =
        obj.physicalDate.split(',')[0] +
        ' ' +
        (obj.physicalDate.split(',')[1] === 'am' ? '上午' : '下午')
      //医院地址
      this.infoList[3].value = obj.hospitalAddress
      //体检日期
      // this.infoList[4].value = obj.physicalName
      //体检项目
      this.checkItem(obj.checkItem)
      //特殊说明
      this.checkNotes = obj.checkNotes
    },
    //体检项目处理
    checkItem(str) {
      let arr = str.split('\n')
      // for (var i = 0; i < arr.length; i++) {
      //   if (arr[i] !== "") {
      //     console.log("曾代表捷克", arr[i]);
      //     this.projectList[i].label = arr[i].split("：")[0];
      //     this.projectList[i].value = arr[i].split("：")[1];
      //   }
      //   console.log("功夫白金卡", this.projectList[i]);
      // }
      arr.forEach(e => {
        if (e !== '') {
          this.projectList.push({
            label: e.split('：')[0],
            value: e.split('：')[1]
          })
        }
      })
      console.log('打印', arr)
    },
    //获取截图
    getBase64(fileId) {
      // console.log("字符串", v);
      this.fileId = fileId
      this.handlerWxShare(fileId)
    },
    //获取截图
    getImgUrl(imgUri) {
      // console.log("字符串", v);
      this.imgUri = imgUri;

      // this.handlerWxShare(fileId);
    },
    downImg() {
      window.location.href = this.imgUri; // 下载图片
    },
    //页面生成图片(基础版)
    html2canvas() {
      console.log("点击分享");
      const that = this;
      html2canvas(document.getElementById("ReservedSucceed")).then(
        async function(canvas) {
          let str = canvas.toDataURL('image/png').split(',')[1]
          let picData = await that.$store.dispatch(
            'question/UPLOADIMG_MULTIPART',
            {
              fileBase64: [str],
              fileName: '',
              filePro1: '',
              preFilePath: '',
              sourceType: '18',
              suffix: '.jpg'
            }
          )
          const { code, msg, data } = picData.packages.response
          if (code !== '0') {
            return utils.toast.toast(msg)
          }
          that.getBase64(data[0].fileId)
        }
      )
    },
    //页面生成图片(进阶版)
    html2canvas1() {
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
        // let picData = await that.$store.dispatch(
        //   "question/UPLOADIMG_MULTIPART",
        //   {
        //     fileBase64: [str],
        //     fileName: "",
        //     filePro1: "",
        //     preFilePath: "",
        //     sourceType: "18",
        //     suffix: ".jpg"
        //   }
        // );
        // const { code, msg, data } = picData.packages.response;
        // if (code !== "0") {
        //   return utils.toast.toast(msg);
        // }
        // that.getBase64(data[0].fileId);
        // 第二种方法,直接下载
        // canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
        // console.log("而已", document.querySelector(".down"));
        // document
        //   .querySelector(".down")
        //   .setAttribute("href", canvas.toDataURL());
        // 第三种方法,生成的图片的url
        // var imgUri = canvas
        //   .toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        // window.location.href = imgUri; // 下载图片
      });
    },
    // 处理微信分享事件
    async handlerWxShare(fileId) {
      // let strUrl =
      //   "https://aitest.life.cntaiping.com/aimarket/web/outsidePage/question/uat/vue.html#/layout/examination/preview?fileId=" +
      //   fileId;
      // this.imgBox = true;
      // 设置微信分享信息

      let baseUrl =
        `${window.globalConfig.host}vue.html#/layout/examination/preview?fileId=` +
        fileId
      if (window.globalConfig.env == 'pro') {
        baseUrl =
          `${window.globalConfig.host}vue.html#/layout/examination/preview?fileId=` +
          fileId
      }

      let shareObj = {
        title: '预约成功',
        desc: '在线体检预约成功',
        link: baseUrl,
        imgUrl: window.globalConfig.host + 'shareIcon/logo.jpg' // 分享图标
      }
      let url = window.location.href
      let plat = utils.common.judgePlat()
      //处理ios跳转页面 路由变化时，微信认为SPA的url是不变的bug
      if (sessionStorage.getItem('aimarket-wxconfig-url') && plat == 'ios') {
        url = sessionStorage.getItem('aimarket-wxconfig-url')
        //处理ios 第一次 从wxShare/index.html 进入vue页面 vue.html后面会自动拼接 &VNK的hash值 导致微信的jssdk锁定的url和当前url不一致，出现签名报错
      } else if (plat == 'ios') {
        sessionStorage.setItem('aimarket-wxconfig-url', url)
      }
      this.$store.dispatch('Wxconfig', { url: url }).then(res => {
        let data = res.data
        let wx = window.wx
        console.log('微信加载成功', window)
        wx.config({
          debug: false,
          appId:
            window.globalConfig.env == 'pro'
              ? 'wxc6f6d08bdbe44fe7'
              : 'wx9c132d6ff140a70c',
          timestamp: data.timestamp,
          nonceStr: data.noncestr,
          signature: data.jsApiSignature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'hideOptionMenu',
            'showOptionMenu'
          ]
        })
        console.log('组件加载成功', wx)
        wx.ready(() => {
          console.log('走到这2.1')
          //自定义菜单
          // let menuList;
          // menuList = [
          //   // "menuItem:share:appMessage", //朋友
          //   // "menuItem:share:timeline", //朋友圈
          //   "menuItem:share:QZone", //QQ空间
          //   "menuItem:share:qq", //qq
          //   "menuItem:copyUrl", //复制链接
          //   "menuItem:share:weiboApp",
          //   "menuItem:favorite", //收藏
          //   "menuItem:openWithQQBrowser", //QQ浏览器
          //   "menuItem:share:weiboApp" //微博
          // ];
          // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
          // wx.hideMenuItems({
          //   menuList
          // });
          // 自定义菜单
          // let showMenuList = [
          //   'menuItem:share:appMessage',
          //   'menuItem:share:timeline',
          // ]
          // 要显示的菜单项
          // wx.showMenuList({
          //   showMenuList
          // })
          //开始调用菜单项
          this.myWxShare(shareObj)
        })
        wx.checkJsapi(() => {
          console.log('能进checkJsapi吗?')
        })
        //微信错误
        wx.error(res => {
          console.log(JSON.stringify(res))
        })
      })
    },
    //我的微信分享
    myWxShare(shareObj) {
      wx.onMenuShareAppMessage({
        title: shareObj.title, // 分享标题
        desc: shareObj.desc, // 分享描述
        link: shareObj.link, //分享链接
        imgUrl: shareObj.imgUrl, // 分享图标
        success: function(res) {
          console.log('微信好友分享成功', res)
        },
        cancel: function(res) {
          console.log('分享失败', res)
        }
      })
      //分享朋友圈
      wx.onMenuShareTimeline({
        title: shareObj.title, // 分享标题
        desc: shareObj.desc, // 分享描述
        link: shareObj.link, //分享链接
        imgUrl: shareObj.imgUrl, // 分享图标
        success: function() {
          console.log('朋友圈分享成功')
        },
        cancel: function(res) {
          console.log('分享失败', res)
        }
      })
    },
    // 底部按钮事件
    submit() {
      //返回进入待预约栏，刷新展示所有“待预约”的数据
      const userData = JSON.parse(sessionStorage.getItem('userData'))
      this.$router.push({
        path: '/layout/examination/home',
        query: {
          ...this.needData,
          ...userData
        }
      });
    },
    // 开始移动端拖拽前
    down(event) {
      //允许模块拖动
      this.flags = true;
      var touch;
      //
      this.middle = screenWidth / 2;
      //处理停靠数据
      console.log("这是",event.touches[0])
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      console.log("鼠标点所在位置", touch.clientX, touch.clientY);
      console.log(
        "div左上角位置",
        event.target.offsetTop,
        event.target.offsetLeft
      );
      dx = touch.clientX - event.target.offsetLeft;
      dy = touch.clientY - event.target.offsetTop;
    },
    // 移动端拖拽中
    move() {

      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.floatballClass = "floatball";
        // 定位滑块的位置
        this.position.x = touch.clientX - dx;
        this.position.y = touch.clientY - dy;
        // // 限制滑块超出页面
        // console.log("屏幕大小", screenWidth, screenHeight);
        // console.log("看看", touch.clientX - dx, touch.target.clientWidth);
        if (this.position.x < 0) {
          this.position.x = 0;
        } else if (this.position.x > screenWidth - touch.target.clientWidth) {
          this.position.x = screenWidth - touch.target.clientWidth;
        }
        if (this.position.y < 0) {
          this.position.y = 0;
        } else if (this.position.y > screenHeight - touch.target.clientHeight) {
          this.position.y = screenHeight - touch.target.clientHeight;
        }
        console.log("能不能拿到", this.position.x, this.position.y);

        // console.log("史", document.addEventListener("touchmove"));
        // //阻止页面的滑动默认事件
        // document.body.addEventListener(
        //   "touchmove",
        //   function(e) {
        //     e.preventDefault();
        //   },
        //   { passive: false }
        // ); //passive 参数不能省略，用来兼容ios和android
      }
    },
    //鼠标释放时候的函数
    end3(e) {
      console.log("end", e);

      //两遍停靠---右边
      if (this.position.x >= this.middle) {
        this.position.x = screenWidth - 70;
        this.floatballClass = "floatball-right";
        //两遍停靠---左边
      } else {
        this.position.x = 0;
        this.floatballClass = "floatball-left";
      }
      this.flags = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.ReservedSucceed {
  height: 100%;
  background-color: white;
  /deep/.detail_list {
    margin-top: 0;
  }
  /deep/.submit {
    width: 90%;
    position: static;
    margin: 0px 5%;
  }
  .result-content {
    background-color: #fff;
    text-align: center;
    color: #666666;
    font-size: 15px;
    height: 100%;
    padding: 0 16px 20px;
    img {
      width: 132px;
      height: 100px;
      margin: 47px 0 24px;
    }
    .status {
      font-size: 18px;
      color: #333333;
      font-weight: 700;
    }
  }
  textarea {
    width: 100%;
    resize: none;
    background-color: white;
  }
  .content {
    p {
      line-height: 20px;
    }
    .hide {
      text-indent: 1em;
    }
  }
  .imgBox {
    position: absolute;
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
  .tipBox {
    position: fixed;
    top: 15%;
    left: 0%;
    width: 50px;
    z-index: 10;
    background-color: burlywood;
    height: 50px;
    border-radius: 50%;
  }
  .floatball {
    color: white;
    height: 60px;
    width: 60px;
    padding: 5px;
    line-height: 60px;
    z-index: 990;
    position: fixed;
    top: 0px;
    right: 0px;
    border-radius: 50%;
    background-color: rgba(80, 255, 57, 0.8);
    background-image: linear-gradient(
      to right,
      rgba(255, 0, 0, 0),
      rgba(255, 0, 0, 1)
    );
    animation: myfirst 1s;
    -webkit-animation: myfirst 1s; /* Safari and Chrome */
  }
  @keyframes myfirst {
    from {
      background-color: rgba(80, 255, 57, 0.8);
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        rgba(255, 0, 0, 1)
      );
    }
    to {
      background-color: rgba(255, 0, 0, 0.8);
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        rgb(80, 255, 57)
      );
    }
  }
  @-webkit-keyframes myfirst /* Safari and Chrome */ {
    from {
      background-color: rgba(80, 255, 57, 0.8);
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        rgba(255, 0, 0, 1)
      );
    }
    to {
      background-color: rgba(255, 0, 0, 0.8);
      background-image: linear-gradient(
        to right,
        rgba(255, 0, 0, 0),
        rgb(80, 255, 57)
      );
    }
  }
  .floatball-left {
    color: white;
    height: 20px;
    width: 60px;
    padding: 5px;
    line-height: 20px;
    z-index: 990;
    position: fixed;
    top: 0px;
    right: 0px;
    border-radius: 0 20px 20px 0;
    background-color: rgba(196, 240, 188, 0.8);
    background-image: linear-gradient(
      to right,
      rgba(177, 248, 118, 0),
      rgb(5, 255, 67)
    );
  }
  .floatball-right {
    color: white;
    height: 20px;
    width: 60px;
    line-height: 20px;
    padding: 5px;
    z-index: 990;
    position: fixed;
    top: 0px;
    right: 0px;
    border-radius: 20px 0 0 20px;
    background-color: rgba(5, 255, 67, 0.8);
    background-image: linear-gradient(
      to right,
      rgba(177, 248, 118, 0),
      rgb(196, 240, 188)
    );
  }
}
</style>