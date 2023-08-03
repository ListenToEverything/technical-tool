<!--
 * @Author: xueml
 * @Date: 2023-08-03 09:06:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 15:37:56
 * @FilePath: \technical-tool\src\views\test_terminal\turntable.vue
-->
<template>
  <div class="Turntable">
    <div class="turntable">
      <div v-if="showTurntable === '0'">
        <Turntable1 :text-list="children" :num="num" @endback="endback" />
      </div>
      <div v-if="showTurntable === '1'">
        <Turntable2 :text-list="children" :num="num" @endback="endback" />
      </div>
      <div v-if="showTurntable === '2'">
        <Turntable3 :text-list="children" :num="num" @endback="endback" />
      </div>
    </div>
    <div>
      <div>抽取到的奖品为：{{ msg }}</div>
      <div>剩余抽奖次数：{{ num }}</div>
    </div>
  </div>
</template>

<script>
import Turntable1 from '@/view/test_terminal/case/turntable/Turntable1.vue'
import Turntable2 from '@/view/test_terminal/case/turntable/Turntable2.vue'
import Turntable3 from '@/view/test_terminal/case/turntable/Turntable3.vue'
export default {
  name: 'TurntableCase',
  components: {
    Turntable1,
    Turntable2,
    Turntable3,
  },
  data () {
    return {
      showTurntable: "1",
      children: {
        text: ''
      },
      num: 5,
      msg: ''
    }
  },
  methods: {
    endback (item) {
      this.num = item.num
      this.msg = item.msg
    }
  }
}
</script>

<style scoped lang="scss">
.Turntable {
  width: 100%;
  height: 100%;

  .turntable {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

