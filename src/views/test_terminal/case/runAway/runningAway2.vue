<template>
  <div class="y">
    <div
      class="box marquee-line"
      :style="`color:${color};background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, ${background} 100%),linear-gradient(0deg, ${background} 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, ${background} 100%),linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, ${background} 100%);`"
    >
      <div class="text">
        <slot :tip="tip"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'runningAway2',
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
      tip: '1'
    }
  },
  created () { }

}

</script>
<style scoped lang="less">
.y {
  // width: 100vw;
  // height: 40px;
  .box {
    // width: 100px;
    // height: 40px;
    color: #25684c;
    // font-size: 20px;
    // position: absolute;
    // top: 60%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    box-shadow: 0 0 3px 0ff;
    // color: #0ff;
  }
  .text {
    margin: 10px;
  }
  .marquee-line {
    background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #0ff 100%),
      linear-gradient(0deg, #0ff 0%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, #0ff 100%),
      linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #0ff 100%);
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    background-size: 100px 1.5px, 1.5px 100px, 100px 1.5px, 1.5px 100px;
    background-position: -30px 1px, 100px -100px,
      calc(100% + 100px) calc(100% - 1px), 1px 0px;
    animation: moveLine 1.5s infinite linear;
    padding: 1px;
    background-clip: content-box;
    align-items: center;
    // display: flex;
    justify-content: center;
  }

  @keyframes moveLine {
    0% {
      background-position: -100px 1px, calc(100% - 1px) -100px,
        calc(100% + 100px) calc(100% - 1px), 1px 0px;
    }

    25% {
      background-position: 100% 1px, calc(100% - 1px) -100px,
        calc(100% + 100px) calc(100% - 1px), 1px -200px;
    }

    50% {
      background-position: calc(100% + 100px) 1px, calc(100% - 1px) 100%,
        calc(100% + 100px) calc(100% - 1px), -100px -100px;
    }

    75% {
      background-position: calc(100% + 100px) 1px,
        calc(100% - 1px) calc(100% + 400px), 0px calc(100% - 1px),
        1px calc(100% + 100px);
    }

    100% {
      background-position: calc(100% + 100px) 1px,
        calc(100% - 1px) calc(100% + 100px), calc(100% - 300px) calc(100% - 1px),
        1px 0px;
    }
  }
}
</style>
