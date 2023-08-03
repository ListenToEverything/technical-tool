<template>
  <div class="headSelect">
    <div class="heart">
      <audio src="">
        <video id="video" class="video" playsinline autoplay muted></video>
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headSelect',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    async getUserMedia () {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#examples
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              facingMode: 'user', // 前置摄像头
              // facingMode: { exact: "environment" }，// 后置摄像头
              width: { min: 1280, max: 1920 },
              height: { min: 720, max: 1080 }
            }
          })

          return Promise.resolve(stream)
        } catch (error) {
          return Promise.reject(error)
        }
      }

      const errorMessage =
        'This browser does not support video capture, or this device does not have a camera'
      alert(errorMessage)
    },
    async openCamera (e) {
      try {
        const stream = await this.getUserMedia()
        this.video.srcObject = stream
        this.video.onloadedmetadata = async () => {
          this.video.play()
        }
      } catch (error) {
        console.log(error)
        alert('打开摄像头失败')
      }
    },
    async closeCamera () {
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/stop
      const tracks = this.video.srcObject.getTracks()

      tracks.forEach((track) => {
        track.stop()
      })

      this.video.srcObject.srcObject = null
    }

  }
}
</script>

<style scoped lang="less">
.headSelect {
  .heart {
    width: 30px;
    height: 30px;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%) rotateZ(0deg) scale(1);
    animation: leftHeartMove 0.5s linear;
    animation-fill-mode: forwards;
    z-index: 2;
  }

  @keyframes leftHeartMove {
    from {
      top: -15px;
      left: 50%;
      transform: translateX(-50%) rotateZ(0deg) scale(1);
    }

    to {
      top: 65px;
      left: -13%;
      transform: translateX(-50%) rotateZ(-15deg) scale(1.2);
    }
  }

  .video {
    width: 100%;
    height: 100%;
    transform: rotateY(180deg);
    object-fit: cover;
  }
}
</style>
