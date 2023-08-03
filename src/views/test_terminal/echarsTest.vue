<template>
  <div class="rap">
    <div ref="chart" style="height: 424px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      option: {
        tooltip: {},
        gird: {
          top: 200
        },
        radar: {
          radius: '50%', // 大小
          nameGap: 10, // 图中工艺等字距离图的距离
          center: ['50%', '50%'], // 图的位置
          name: {
            textStyle: {
              color: '#666666',
              fontSize: 14
            },
            formatter: function (name) {
              return name
            }
          },
          indicator: [],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#666666',
              width: 2
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 2
              // color: '#666666' // 设置网格的颜色
            }
          }
        },
        series: [
          {
            name: '',
            type: 'radar',
            symbol: 'angle',
            itemStyle: {
              normal: {
                areaStyle: { type: 'default' }
              }
            },
            data: [
              {
                symbol: 'circle',
                symbolSize: 0,
                value: [],
                areaStyle: { color: 'rgba(64, 205, 241, 0.2)' },
                // itemStyle: {
                //   normal: {
                //     borderWidth:1,
                //     color: "RGBA(0, 34, 66, 1)",
                //     borderColor: "rgba(146, 225, 255, 1)"
                //   }
                // },
                lineStyle: {
                  color: 'blue',
                  width: 1
                }
              }
            ]
          }
        ]
      }
    }
  },
  created () {

  },
  mounted () {
    this.getEchartData1()
  },

  methods: {
    getEchartData1 () {
      this.$nextTick(() => {
        const chart = this.$refs.chart
        if (chart) {
          const myChart = this.$echarts.init(chart)
          let nameList = ['教学态度', '教学内容', '教学方式', '教学基本功', '教学效果'] // 名字
          let valueList = [85, 80, 60, 76, 85] // 分数,最大值为100

          let indicatorList = []
          nameList.map((item, index) => {
            indicatorList.push({
              name: item,
              value: valueList[index],
              max: 100
            })
          })

          const option = {
            radar: {
              // shape: 'circle',
              indicator: indicatorList,
              axisName: {
                formatter: function (value, indicator) {
                  return `{a|${value}}`
                },
                rich: {
                  a: {
                    fontSize: '14px',
                    fontFamily: ' Source Han Sans CN-Regular',
                    fontWeight: 400,
                    color: '#333333',
                    padding: [0, 8, 0, 0]
                  },
                  b: {
                    padding: [4, 8, 4, 8],
                    backgroundColor: 'rgba(229, 243, 255, 0.6500)',
                    borderRadius: 50,
                    fontFamily: 'Source Han Sans CN-Medium',
                    fontWeight: 500,
                    color: '#397EF0'
                  }
                }
              }
            },
            series: [
              {
                name: '雷达图',
                type: 'radar',
                color: 'rgba(57, 126, 240, 1)',
                label: {
                  show: false
                },
                areaStyle: {
                  color: 'rgba(170, 217, 255, 0.35)'
                },
                data: [
                  {
                    value: valueList,
                    name: 'Allocated Budget'
                  }
                ]
              }
            ]
          }
          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
