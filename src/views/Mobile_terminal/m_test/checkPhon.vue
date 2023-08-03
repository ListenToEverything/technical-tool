<template>
  <div  class="CheckPhon">
    <h1>动态电池</h1>
    <!-- :progress="60" 表示组件里面的prop中的progress赋值60，需要传多个参数即多用几个:key 例如:name="zs" :age="20" -->
    <Battery :progress="batteryNum"></Battery>

    <h1>左右滑动</h1>
    <div class="test">
      <div class="cli" v-for="i in 9" :key="i">{{ i }}</div>
    </div>
    
    <h1>文字转语音</h1>
    <textarea id="text" style="min-height: 100px;"></textarea>
    <br />
    <button id="start" @click="speak">朗读</button>
    <button id="stop">停止</button>
  </div>
</template>

<script>
import Battery from './components/battery.vue'

export default {
  name: 'checkPhon',
  components:{
    Battery
  },
  data() {
    return {
      title:"js获取当前设备的电量与网络状况",
      // 当前电量
      batteryNum:0,
      // 是否正在充电
      charging:false
    }
  },
  created(){
    //获取当前设备电量信息
    navigator.getBattery().then(this.getBattery);
    // true为连接成功
    console.log("网络状态：" + window.navigator.onLine)
    window.addEventListener("offline", function(e) {
      console.log("网络已断开")
    });

    window.addEventListener("online", function(e) {
      console.log("网络已连接")
    });
  },
  methods: {
     /**
     * @description 文字转语音方法
     * @public
     * @param { text, rate, lang, volume, pitch } object
     * @param  text 要合成的文字内容，字符串
     * @param  rate 读取文字的语速 0.1~10  正常1
     * @param  lang 读取文字时的语言
     * @param  volume  读取时声音的音量 0~1  正常1
     * @param  pitch  读取时声音的音高 0~2  正常1
     * @returns SpeechSynthesisUtterance
     */
    speak(){
      const textInput = document.getElementById('#text')
      const startBtn = document.getElementById('#start')
      const stopBtn = document.getElementById('#stop')
      const { speechSynthesis } = window
      const voice = new SpeechSynthesisUtterance()
      voice.lang = "zh-CN";
      voice.volume = 1;
      voice.rate = 1;
      voice.pitch = 1;
      startBtn.addEventListener('click', function () {
            speechSynthesis.cancel()
            voice.text = textInput.value
            speechSynthesis.speak(voice)
      })

      stopBtn.addEventListener('click', function () {
          speechSynthesis.cancel()
      })
    },
    //获取当前设备电量信息
    getBattery(battery){
      this.batteryNum=battery.level * 100
      this.charging=battery.charging
      console.log(battery)
      // 是否正在充电，yes-充电
      // console.log("是否正在充电--" + (battery.charging ? "是" : "否"));
      // 当前剩余电量
      // console.log("当前电量: " + battery.level * 100 + "%" + '--' + new Date().toLocaleTimeString());

      battery.addEventListener("chargingchange", function() {
        console.log("是否正在充电--" + (battery.charging ? "是" : "否"));
      });

      battery.addEventListener("levelchange", function() {
        console.log("当前电量: " + battery.level * 100 + "%" + '--' + new Date()
          .toLocaleTimeString());
      });
    },
  }
}
</script>

<style scoped lang="scss">
  .CheckPhon{
    width: 100%;
    height: 100%;
    .test{
      margin-top: 20px;
      height:150px;
      background: #eee;
      padding: 10px 0;

      white-space: nowrap; /* 禁止超出自动换行 */
      overflow-y:auto; /* 横向滑动 */
      .cli{
        margin-left: 7.61px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: aquamarine;
        text-align: center;
        line-height: 50px;

        display: inline-block; /*行内块元素*/
      }
      .cli:hover{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: rgb(213, 117, 240);
        text-align: center;
        line-height: 100px;
        display: inline-block; /*行内块元素*/
      }
    }
    .test::-webkit-scrollbar{
      display: none;
    }
  }

</style>

