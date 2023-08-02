<template>
  <div class="Turntable3">
    <LuckyGrid
      ref="myLucky"
      width="300px"
      height="300px"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      :default-style="defaultStyle"
      @start="startCallback"
      @end="endCallback"
    />
  </div>
</template>

<script>
export default {
  name: 'Turntable3',
  props: {
    textList: {
      type: Array,
      default: null
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      cont: this.num,
      blocks: [
        { padding: '3px', background: '#2F686B' },
        { padding: '3px', background: '#285659' },
        { padding: '10px', background: '#1D4648' },
        { padding: '10px', background: '#476D74' }
      ],
      prizes: [
        { x: 0, y: 0, fonts: [{ text: '0', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdly.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 1, y: 0, fonts: [{ text: '1', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdly.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 2, y: 0, fonts: [{ text: '2', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdly.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 2, y: 1, fonts: [{ text: '3', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bxmcjs.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 2, y: 2, fonts: [{ text: '4', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bxmcjsh.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 1, y: 2, fonts: [{ text: '5', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bxmcjstl.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 0, y: 2, fonts: [{ text: '6', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdly.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: 0, y: 1, fonts: [{ text: '7', top: '65%' }], background: '#3C6168', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdlytl.png'), // 图片地址
            top: '15%', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] }
      ],
      buttons: [
        {
          x: 1, y: 1,
          background: '#F9DC93',
          borderRadius: '22px'
        },
        {
          x: 1.1, y: 1.1,
          col: 0.8,
          row: 0.8,
          background: '#FFFCBB',
          fonts: [{ text: '开始', top: '35%' }]
        }],
      defaultStyle: {
        background: '#FFFCBB'
      },
      addObj: {
        range: 11, // 中奖概率
        fonts: [// 奖品文字
          {
            text: '电脑', // 文字内容
            top: '10%', // 文字位置
            fontColor: '', // 字体颜色
            fontSize: '', // 字体大小
            fontStyle: '', // 字体样式
            fontWeight: '', // 字体粗细
            lineHeight: '', // 字体行高
            wordWrap: '', // 文字自动换行
            lengthLimit: '', // 换行宽度范围
            lineClamp: '' // 文本溢出隐藏
          }
        ],
        imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdly.png'), // 图片地址
            top: '30px', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ],
        background: '#eeacac' // 扇形背景颜色
      }
    }
  },
  computed: {
    prizes1() {
      const arr = []
      console.log('有没有拿到值', this.textList)
      if (this.textList.length > 0) {
        for (let i = 0; i < this.textList.length; i++) {
          console.log('的方式发送', arr)
          arr[i] = JSON.parse(JSON.stringify(this.prizes1[i]))
          arr[i].background = this.textList[i].color
          arr[i].imgs[0].src = this.textList[i].icon
          arr[i].fonts[0].text = this.textList[i].label
        }
      }
      console.log('拿到值', arr)
      return arr
    }
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback() {
      if (this.cont === 0) {
        this.$message.warning('请增加抽奖次数')
        return
      }
      this.cont--
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        // const index = 0
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop()
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      console.log(prize)
      this.$emit('endback', { num: this.cont, msg: prize.fonts[0].text })
    }
  }
}
</script>

<style scoped lang="scss">
  .Turntable3{
    width: 100%;
    height: 100%;
    // padding: 10px;
    position: relative;

  }

</style>

