<template>
  <div class="Turntable1">
    <LuckyWheel
      ref="myLucky"
      width="350px"
      height="350px"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      @start="startCallback"
      @end="endCallback"
    />
  </div>
</template>

<script>
export default {
  name: 'TurntableType1',
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
  data () {
    return {
      cont: this.num,
      blocks: [
        {
          padding: '20px',
          imgs: [{
            src: require('../../assets/imgs/turntable/yq3.png'),
            width: '100%',
            height: '100%',
            rotate: true
          }]
        },
        {
          padding: '20px',
          imgs: [{
            top: '-30px',
            left: '-5px',
            src: require('../../assets/imgs/turntable/yq8.png'),
            width: '115%',
            height: '110%',
            rotate: true
          }]
        },
        { padding: '2px', background: '#F3F58A' },
        // { padding: '10px', background: '#F24A82' },
        { padding: '2px', background: '#FB0355' }
      ],
      prizes: [
        {
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
        },
        {
          range: 10, fonts: [{ text: '牛奶', top: '10%' }], imgs: [// 奖品图片
            {
              src: require('../../assets/imgs/bdly.png'), // 图片地址
              top: '30px', // 图片位置
              width: '40px', // 图片宽度
              height: '40px' // 图片高度
            }
          ], background: '#f0c0a6'
        },
        {
          range: 10, fonts: [{ text: '飞机', top: '10%' }], imgs: [// 奖品图片
            {
              src: require('../../assets/imgs/bdly.png'), // 图片地址
              top: '30px', // 图片位置
              width: '40px', // 图片宽度
              height: '40px' // 图片高度
            }
          ], background: '#eeacac'
        },
        {
          range: 60, fonts: [{ text: '谢谢惠顾', top: '10%' }], imgs: [// 奖品图片
            {
              src: require('../../assets/imgs/bdly.png'), // 图片地址
              top: '30px', // 图片位置
              width: '40px', // 图片宽度
              height: '40px' // 图片高度
            }
          ], background: '#f0c0a6'
        },
        {
          range: 10, fonts: [{ text: '一箱鸡蛋', top: '10%' }], imgs: [// 奖品图片
            {
              src: require('../../assets/imgs/bdly.png'), // 图片地址
              top: '30px', // 图片位置
              width: '40px', // 图片宽度
              height: '40px' // 图片高度
            }
          ], background: '#eeacac'
        },
        {
          range: 100, fonts: [{ text: '100亿', top: '10%' }], imgs: [// 奖品图片
            {
              src: require('../../assets/imgs/bdly.png'), // 图片地址
              top: '30px', // 图片位置
              width: '40px', // 图片宽度
              height: '40px' // 图片高度
            }
          ], background: '#edb38a'
        }
      ],
      buttons: [
        // { radius: '40%', background: '#617df2' },
        // { radius: '35%', background: '#afc8ff' },
        // { radius: '35%', background: '#afc8ff' },
        {
          radius: '30%', background: '#869cfa',
          imgs: [{
            src: require('../../assets/imgs/turntable/t1.png'),
            width: '100%',
            top: '-150%'
          }]
        },
        {
          radius: '25%',
          fonts: [{ text: '开始\n抽奖', top: '-20px' }]
        }
      ],
      addObj: {
        range: 11, // 中奖概率
        fonts: [// 奖品文字
          {
            text: '史莱克', // 文字内容
            top: '10%' // 文字位置
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
        background: '' // 扇形背景颜色
      }
    }
  },
  computed: {
    prizes1 () {
      const arr = []
      let obj = {}
      console.log('有没有拿到值', this.textList)
      this.textList.forEach(item => {
        obj = JSON.parse(JSON.stringify(this.addObj))
        // { ...this.addObj }
        obj.fonts[0].text = item.label
        obj.imgs[0].src = item.icon
        obj.background = item.color
        arr.push(obj)
        obj = {}
      })
      console.log('拿到值', arr)
      return arr
    }
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback () {
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
        // const index = 2
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop()
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback (prize) {
      console.log('抽奖结束会触发end回调', this.cont, prize)
      // this.prizes.push(this.addObj)
      this.$emit('endback', { num: this.cont, msg: prize.fonts[0].text })
    }
  }
}
</script>

<style scoped lang="scss">
.Turntable1 {
  width: 100%;
  height: 100%;
  color: rgb(255, 196, 206);
}
</style>

