<template>
  <div>
    <div class="eye" :style="{ backgroundColor: color }">
      <div class="eyelid" :style="{ height: lidHeight + 'px' }"></div>
      <div class="pupil"></div>
    </div>

    <div @click="goImgZIP">图片上传</div>
    <div @click="goRap">rap</div>
    <div @click="goRunningAway">跑马灯</div>
    <div @click="goImgRotate">木鱼</div>
    <div @click="goUploadFile">文件上传</div>
    <div @click="goPhone">拍照</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: 'white',
      lidHeight: 20,
      blinkInterval: null,
      msg: '这个组件包含一个圆形的眼睛，一个上下运动的眼皮和一个黑色的瞳孔。在组件挂载后，我们使用`setInterval'
    }
  },
  created () {
    navigator.getBattery().then(function (battery) {
      console.log('充电')
      // 添加事件，当设备电量改变时触发
      battery.addEventListener('levelchange', function () {
        console.log('电量改变: ' + battery.level)
      })

      // 添加事件，当设备充电状态改变时触发
      battery.addEventListener('chargingchange', function () {
        console.log('充电状态改变: ' + battery.charging)
      })

      // 添加事件，当设备完全充电需要时间改变时触发
      battery.addEventListener('chargingtimechange', function () {
        console.log('完全充电需要时间: ' + battery.chargingTime)
      })

      // 添加事件，当设备完全放电需要时间改变时触发
      battery.addEventListener('dischargingtimechange', function () {
        console.log('完全放电需要时间: ' + battery.dischargingTime)
      })
    })
  },
  mounted () {
    this.blinkInterval = setInterval(() => {
      this.lidHeight = 0
      setTimeout(() => {
        this.lidHeight = 20
      }, 100)
    }, 3000)
    // 添加监听事件listenResizeFn
    window.addEventListener('resize', this.listenResizeFn)
  },
  beforeDestroy () {
    // 移除绑定的listenResizeFn事件监听
    window.removeEventListener('resize', this.listenResizeFn)
    clearInterval(this.blinkInterval)
  },

  methods: {
    goPhone () {
      this.$router.push(
        { path: '/phone' }
      )
    },
    goImgZIP () {
      this.$router.push(
        { path: '/imgZIP' }
      )
    },
    goRap () {
      this.$router.push(
        { path: '/rap' }
      )
    },
    goRunningAway () {
      this.$router.push(
        { path: '/runningAway' }
      )
    },
    goImgRotate () {
      this.$router.push(
        { path: '/imgRotate' }
      )
    },
    goUploadFile () {
      this.$router.push(
        { path: '/uploadFile' }
      )
    },
    listenResizeFn () {
      console.log('处理窗口缩放时要处理的逻辑操作！')
      console.log('当前宽度', document.body.offsetWidth)
      console.log('当前比例', parseFloat(document.body.offsetWidth / 1440).toFixed(2))
      let scal = 1
      const qwq = document.getElementById('qwq')
      scal = parseFloat(document.body.offsetWidth / 1440).toFixed(2)

      if (scal > 1) {
        scal = 1
      }
      qwq.style.transform = 'scale(' + scal + ')'
    }
  }
}
</script>

<style scoped>
.eye {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.eyelid {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  background-color: black;
  transition: height 0.1s ease-in-out;
}

.pupil {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black;
  transform: translate(-50%, -50%);
}
</style>
