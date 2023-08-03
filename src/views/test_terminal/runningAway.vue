<template>
  <div class="runningAway">
    <runAway1 :color="'red'" :background="'red'" class="runAway1">
      <template #default>
        <span>{{ name }}</span>
      </template>
    </runAway1>
    <runAway2 :color="'red'" :background="'red'" class="runAway2">
      <template #default="scoped">
        <span>{{ name }}</span>
        <span>{{ scoped.tip }}</span>
      </template>
    </runAway2>
  </div>
</template>

<script>
import runAway1 from '@/view/test_terminal/case/runAway/runningAway1.vue'
import runAway2 from '@/view/test_terminal/case/runAway/runningAway2.vue'
export default {
  name: 'runningAway',
  components: {
    runAway1,
    runAway2
  },
  data () {
    return {
      name: '这是向下传三十多w微服务饿巍峨额威风'
    }
  },
  created () { }

}

</script>
<style scoped lang="less">
.runningAway {
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.runAway1 {
  width: 60vw;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
.runAway2 {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  // width: 60vw;
  // padding: 10px;
}
</style>
