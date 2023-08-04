<!--
 * @Author: xueml
 * @Date: 2023-08-02 17:11:23
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 15:38:45
 * @FilePath: \technical-tool\src\views\test_terminal\imgRotate.vue
-->
<template>
  <div>
    <div class="woodfish">
      <img
        src="@/assets/2.png"
        alt=""
        class="img1 img1jumping"
        @click="justWoodfish"
      />
      <img
        src="@/assets/1.png"
        alt=""
        class="img2 img2jumping"
        @click="justWoodfish"
        id="just2"
      />
    </div>
    <div>
      <audio controls ref="audio1" class="aud">
        <source src="@/assets/music/木鱼.mp3" />
      </audio>
      <audio controls ref="audio" class="aud">
        <source src="https://clemmensen.top/static/muyu.mp3" />
      </audio>
      <a download="https://clemmensen.top/static/muyu.mp3"></a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {

  },

  methods: {
    justWoodfish () {
      this.playMuyu()
    },
    playMuyu () {
      this.$refs.audio.play()
    }
  }
}
</script>

<style scoped>
.img1 {
  scale: 0.7;
  position: absolute;
  top: 11vh;
  left: 10vw;
  transform: rotate(121deg);
}

.img1jumping {
  animation: jumping1 0.5s linear infinite;
}
@keyframes jumping1 {
  25% {
    transform: rotate(77deg);
  }
  75% {
    transform: rotate(121deg);
  }
}
.img2 {
  scale: 0.5;
  position: absolute;
  top: 19vh;
  left: 0vw;
}
.img2jumping {
  animation: jumping2 0.5s linear infinite;
}
@keyframes jumping2 {
  25% {
    scale: 0.49;
  }
  75% {
    scale: 0.5;
  }
}
</style>
