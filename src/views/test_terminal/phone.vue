<template>
  <div class="camera_outer">
    <div v-if="false">
      <h2>拍照自定义背景1</h2>
      <phoneBG1></phoneBG1>
    </div>
    <div v-if="false">
      <h2>拍照自定义背景-人脸</h2>
      <phoneBG2></phoneBG2>
    </div>
    <div v-if="false">
      <h2>拍照自定义背景-证件</h2>
      <phoneBG3></phoneBG3>
    </div>

    <div v-if="true">
      <h2>拍照自定义背景-人脸检测</h2>
      <phoneBG4></phoneBG4>
    </div>

    <div v-if="false">
      <h2>追踪头像</h2>
      <headSelect></headSelect>
    </div>
  </div>
</template>
<script>
import phoneBG1 from '@/view/test_terminal/case/phone/phoneBG1.vue'
import phoneBG2 from '@/view/test_terminal/case/phone/phoneBG2.vue'
import phoneBG3 from '@/view/test_terminal/case/phone/phoneBG3.vue'
import phoneBG4 from '@/view/test_terminal/case/phone/phoneBG4.vue'

import headSelect from '@/view/test_terminal/case/phone/headSelect.vue'

export default {
  name: 'imgZIP',
  components: {
    phoneBG1,
    phoneBG2,
    phoneBG3,
    phoneBG4,
    headSelect
  },
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {

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
  video {
    border: 1px solid red;
    border-radius: 50%;
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
