<template>
  <div class="f">
    <div class="away" :style="`color:${color}`">
      <div
        :style="`background: linear-gradient(to right, transparent,${background});`"
      ></div>
      <div
        :style="`background: linear-gradient(to right, transparent,${background});`"
      ></div>
      <div
        :style="`background: linear-gradient(to right, transparent,${background});`"
      ></div>
      <div
        :style="`background: linear-gradient(to right, transparent,${background});`"
      ></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'runningAway1',
  props: {
    color: {
      type: String,
      default: () => ''
    },
    background: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {

    }
  },
  created () {
  }

}

</script>
<style scoped lang="less">
.f {
  .away {
    // width: 100vw;
    // height: 40px;
    color: #25684c;
    // font-size: 20px;
    position: absolute;
    // top: 40%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // align-items: center;
    // display: flex;
    // justify-content: center;
    padding: 10px;
    overflow: hidden;
  }
  .away :nth-child(1) {
    background: linear-gradient(to right, transparent, #0ff);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    animation: run1 1s linear infinite;
  }
  .away :nth-child(2) {
    background: linear-gradient(to bottom, transparent, #0ff);
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    animation: run2 1s linear infinite;
    animation-delay: 0.5s;
  }
  .away :nth-child(3) {
    background: linear-gradient(to left, transparent, #0ff);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    animation: run3 1s linear infinite;
    animation-delay: 1s;
  }
  .away :nth-child(4) {
    background: linear-gradient(to left, transparent, #0ff);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 100%;
    animation: run4 1s linear infinite;
    animation-delay: 1.5s;
  }
  @keyframes run1 {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @keyframes run2 {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  @keyframes run3 {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes run4 {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
}
</style>
