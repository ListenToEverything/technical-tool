<template>
  <div class="Turntable2">
    <LuckyGrid
      ref="myLucky"
      width="350px"
      height="350px"
      rows="60"
      cols="60"
      :prizes="prizes"
      :blocks="blocks"
      :buttons="buttons"
      :default-style="defaultStyle"
      :active-style="activeStyle"

      @start="startCallback"
      @end="endCallback"
    />

  </div>
</template>

<script>
const z = 60 // 格子细分数
const s = 11 // 格子大小
const m = 18 // y 轴偏移量
const n = 9 // x 轴偏移量
const k = 1.4 // 按钮放大的倍数
export default {
  name: 'Turntable2',
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
        {
          padding: '5x',
          // top: '-80px',
          imgs: [{
            src: require('../../assets/imgs/turntable/yq3.png'),
            width: '100%',
            height: '100%'
          }]
        },
        { padding: '40px',
          imgs: [{
            top: '-1px',
            left: '-7px',
            src: require('../../assets/imgs/turntable/yq11.png'),
            width: '105%',
            height: '100%'
          }]
        }
        // {
        //   // padding: '2px',
        //   // top: '-80px',
        //   imgs: [{
        //     src: require('../../assets/imgs/turntable/yq14.png'),
        //     width: '102%',
        //     height: '98%'
        //   }]
        // },
        // { padding: '20px',
        //   imgs: [{
        //     top: '-20px',
        //     left: '17px',
        //     src: require('../../assets/imgs/turntable/yq13.png'),
        //     width: '105%',
        //     height: '100%'
        //   }]
        // }
        // { padding: '2px', background: '#F3F58A', borderRadius: Infinity },
        // { padding: '20px', background: 'linear-gradient(#D09B6F,#F5D5AF, #FCE5C6)', borderRadius: Infinity },
        // { padding: '2px', background: '#FB0355', borderRadius: Infinity },
        // { padding: '20px', background: 'linear-gradient(#D09B6F,#F5D5AF, #FCE5C6)', borderRadius: Infinity }
        // { padding: '10px', background: '#e9e8fe', borderRadius: Infinity }
      ],
      prizes: [
        {
          x: z / 2 - s / 2,
          y: 0,
          col: s,
          row: s,
          // fonts: [// 奖品文字
          //   {
          //     text: '电脑', // 文字内容
          //     top: '10%', // 文字位置
          //     fontColor: '', // 字体颜色
          //     fontSize: '', // 字体大小
          //     fontStyle: '', // 字体样式
          //     fontWeight: '', // 字体粗细
          //     lineHeight: '', // 字体行高
          //     wordWrap: '', // 文字自动换行
          //     lengthLimit: '', // 换行宽度范围
          //     lineClamp: '' // 文本溢出隐藏
          //   }
          // ],
          imgs: [// 奖品图片
            {
              src: require('../../assets/imgs/bdly.png'), // 图片地址
              top: '10px', // 图片位置
              width: '40px', // 图片宽度
              height: '40px' // 图片高度
            }
          ],
          background: '#F9E1EC'// 扇形背景颜色
        },
        { x: z - m - s / 2, y: n - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdlyh.png'), // 图片地址
            top: '10px', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ] },
        { x: z - n - s / 2, y: m - s / 2, col: s, row: s, range: 50, background: '#F9E1EC', imgs: [// 奖品图片
          {
            src: require('../../assets/imgs/bdlytl.png'), // 图片地址
            top: '10px', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }

        ], fonts: [{ text: '糖', fontSize: '10px', top: '10%' }] },
        { x: z - s, y: z / 2 - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '瓜子', fontSize: '10px', top: '10%' }] },
        { x: z - n - s / 2, y: z - m - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '臊子面', top: '10%' }] },
        { x: z - m - s / 2, y: z - n - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '羊肉泡馍', top: '10%' }] },
        { x: z / 2 - s / 2, y: z - s, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '辣条', top: '10%' }] },
        { x: m - s / 2, y: z - n - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '包子', top: '10%' }] },
        { x: n - s / 2, y: z - m - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '肉夹馍', top: '10%' }] },
        { x: 0, y: z / 2 - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '凉皮', top: '10%' }] },
        { x: n - s / 2, y: m - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '冰峰', top: '10%' }] },
        { x: m - s / 2, y: n - s / 2, col: s, row: s, range: 10, background: '#F9E1EC', fonts: [{ text: '油泼面', top: '10%' }] }
      ],
      buttons: [
        {
          x: z / 2 - s / 2 * (k + 1),
          y: z / 2 - s / 2 * (k + 1),
          col: s * (k + 1),
          row: s * (k + 1),
          // background: '#869cfa',
          imgs: [{
            src: require('../../assets/imgs/turntable/yq14.png'),
            width: '100%',
            height: '100%'
          }]
        },
        {
          x: (z / 2 - s / 2 * (k + 1)) + 1,
          y: z / 2 - s / 2 * (k + 1),
          col: s * (k + 1),
          row: s * (k + 1),
          imgs: [{
            src: require('../../assets/imgs/turntable/yq13.png'),
            width: '100%',
            height: '100%'
          }],
          background: '',
          fonts: [{ text: '放花灯', top: '38%' }]
        }
      ],
      defaultStyle: {
        borderRadius: Infinity
        // background: '#F9E1EC'
      },
      activeStyle: {
        background: '#F183C8'
      },
      addObj: {
        x: z / 2 - s / 2,
        y: 0,
        col: s,
        row: s,
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
            top: '10px', // 图片位置
            width: '40px', // 图片宽度
            height: '40px' // 图片高度
          }
        ],
        background: '#F9E1EC'// 扇形背景颜色
      }
    }
  },
  computed: {
    prizes1() {
      const arr = []
      console.log('有没有拿到值', this.textList)
      if (this.textList.length > 0) {
        for (let i = 0; i < this.textList.length; i++) {
          arr[i] = JSON.parse(JSON.stringify(this.prizes1[i]))
          console.log('的方式发送', arr[i], this.textList[i])
          // arr[i].fonts[0].text = this.textList[i].label
          arr[i].background = this.textList[i].color
          arr[i].imgs[0].src = this.textList[i].icon
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
  .Turntable2{
    width: 100%;
    height: 100%;
    // padding: 10px;
    position: relative;

  }

</style>

