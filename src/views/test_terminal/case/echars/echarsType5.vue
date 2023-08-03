<template>
  <div class="rap">
    <div ref="chart" style="height: 700px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: ['#3c90ff', '#fff225', '#24ffdf', '#ff9c3c', '#7536ff'],
      indicator: [
        {
          text: '文明村',
          min: 0,
          max: 100
        },
        {
          text: '卫生村',
          min: 0,
          max: 100
        },
        {
          text: '森林村庄',
          min: 0,
          max: 100
        },
        {
          text: '全面小康',
          min: 0,
          max: 100
        },
        {
          text: '景区村庄',
          min: 0,
          max: 100
        }
      ],
      Data: [80, 61, 70, 86, 77]
    }
  },
  created () {

  },
  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.$nextTick(() => {
        const chart = this.$refs.chart
        if (chart) {
          const myChart = this.$echarts.init(chart, 'dark')

          const option = {
            backgroundColor: '#0E1327',
            polar: {
              center: ['50%', '50%'],
              radius: '60%'
            },
            radar: {
              shape: 'circle',
              center: ['50%', '50%'],
              radius: '60%',
              indicator: this.indicator,
              axisName: {
                color: '#b7e9fd',
                fontSize: 24,
                padding: -10
              },
              nameGap: 45,
              splitNumber: 4,
              splitArea: {
                // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: true,
                areaStyle: {
                  // 分隔区域的样式设置。
                  color: ['rgba(27, 50, 66, 0.4)']
                }
              },
              axisLine: {
                // 指向外圈文本的分隔线样式
                lineStyle: {
                  color: '#5aa3d0'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(99,192,251,0.2)', // 分隔线颜色
                  width: 2 // 分隔线线宽
                }
              }
            },
            angleAxis: {
              type: 'category',
              data: name,
              minInterval: 1,
              boundaryGap: false,
              clockwise: false,
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false
              },
              splitLine: {
                show: false
              }
            },
            radiusAxis: {
              min: 0,
              max: 100,
              interval: 25,
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                // 指向外圈文本的分隔线样式
                lineStyle: {
                  color: '#5aa3d0'
                }
              },
              axisLabel: {
                fontSize: 12,
                color: '#5aa3d0',
                align: 'left',
                margin: -5
              }
            },
            series: [
              this.setgauge(0),
              this.setgauge(1),
              this.setgauge(2),
              this.setgauge(3),
              this.setgauge(4),
              {
                type: 'radar',
                silent: true,
                lineStyle: {
                  color: '#66ffff'
                },
                areaStyle: {
                  color: 'rgba(102, 255, 255, 0.31)'
                },
                data: this.setData()
              },
              {
                type: 'scatter',
                coordinateSystem: 'polar',
                symbolSize: 20,
                data: this.setSpot()
              }
            ]
          }

          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }
      })
    },
    setData () {
      return [
        {
          value: this.Data,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#4BFFFC',
                shadowColor: '#4BFFFC',
                shadowBlur: 5
              },
              shadowColor: '#4BFFFC',
              shadowBlur: 5
            }
          },
          areaStyle: {
            normal: {
              // 单项区域填充样式
              color: {
                type: 'radial',
                x: 0.5, // 右
                y: 0.5, // 下
                r: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: '#4BFFFC'
                  },
                  {
                    offset: 0,
                    color: 'rgba(0,0,0,0)'
                  }
                ],
                globalCoord: false
              },
              opacity: 0.8 // 区域透明度
            }
          }
        }
      ]
    },

    setgauge (i) {
      return {
        type: 'gauge',
        detail: false,
        splitNumber: 10, // 刻度数量
        radius: '80%', // 图表尺寸
        center: ['50%', '50%'],
        startAngle: 90 + 72 * i + 18, // 开始刻度的角度
        endAngle: 90 + 72 * (i + 1) - 18, // 结束刻度的角度
        axisLine: {
          show: false
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#66ccff',
            width: 1
          },
          length: 6,
          splitNumber: 1
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      }
    },
    setSpot () {
      var scatterData = []
      this.Data.map((o, i) => {
        scatterData.push({
          value: [o, i],
          itemStyle: {
            normal: {
              color: this.color[i],
              borderColor: '#fff',
              borderWidth: 1,
              shadowColor: this.color[i],
              shadowBlur: 8
            }
          }
        })
      })
      return scatterData
    }
  }
}
</script>

<style scoped>
</style>
