<template>
  <div class="camera_outer">
    <div @click="moveToCameraAVG()" v-cloak>
      <img v-if="imginfo !== ''" :src="imginfo" />
      <div class="warm_title2">点击自拍一张头像</div>
    </div>
    <video
      id="video"
      class="pic_video"
      playsinline
      autoplay
      x5-video-player-type="h5"
      style="object-fit: fill"
    ></video>
    <canvas
      id="canvas"
      class="canvas_pic"
      style="margin: 0; padding: 0"
    ></canvas>
    <div class="bottom_div">
      <div @click="captureAvg">拍照</div>
      <img src="" class="capture-btn" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      videoWidth: 300,
      videoHeight: 300,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      imginfo: null
    }
  },
  mounted () {

  },
  methods: {
    // 头像相机
    moveToCameraAVG () {
      var self = this
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      if (window.stream) {
        window.stream.getTracks().forEach(track => {
          track.stop()
        })
      }
      var constraints = window.constraints = {
        audio: false,
        video: {
          sourceId: 'default',
          facingMode: { exact: 'user' }
        }
      }
      navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
          var video = document.getElementById('video')
          try {
            window.stream = stream
            video.srcObject = stream
          } catch (error) {
            video.src = window.URL.createObjectURL(stream)
          }
          self.localMediaStream = stream
          video.play()
        })
        .catch(function (err) {
          alert(err.name + ': ' + err.message)
        })
    },
    // 停止摄像机
    stopCapture: function () {
      var video = document.getElementById('video')
      if (!video.srcObject) return
      let stream = video.srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
    },
    // 头像照片
    captureAvg () {
      var vm = this
      var video = document.getElementById('video')
      var canvas = document.getElementById('canvas')
      var ctx = canvas.getContext('2d')
      var CHeight = video.clientHeight // 获取屏幕大小让canvas自适应
      var CWidth = video.clientWidth
      canvas.width = CWidth
      canvas.height = CHeight
      if (vm.localMediaStream) {
        ctx.drawImage(video, 0, 0, CWidth, CHeight)
        var dataURL = canvas.toDataURL('image/jpeg') // dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
        vm.imginfo = dataURL
        // 停止摄像机
        video.pause()
        this.stopCapture()
      }
    },

    // 关闭摄像头
    stopNavigator () {
      this.thisVideo.srcObject.getTracks()[0].stop()
      // this.videoCamera.srcObject.getTracks()[0].stop()
    }
  }
}
</script>

  <style lang="less" scoped>
.camera_outer {
  position: relative;
  overflow: hidden;
  background-size: 100%;
  video,
  canvas,
  .tx_img {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  .btn_camera {
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }
  .bg_r_img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  .img_bg_camera {
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 300px;
      height: 300px;
    }
    .img_btn_camera {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      color: #ffffff;
      .loding_img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
