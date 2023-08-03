<template>
  <div class="rap">
    <div ref="chart" style="height: 500px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 图表标题
      chart_title: '',
      // 图表X轴数据
      Xdata: ['库房1', '库房2', '库房3', '库房4', '库房5', '库房6', '库房7', '库房8', '库房9', '库房10', '库房11', '库房12', '库房13', '库房14', '库房15'],
      // 图表项目
      fp_key: ['出库', '入库'],
      fp_bar_postion: ['left', 'left', 'left', 'left', 'right', 'right', 'right', 'right'],
      fp_coler: [''],
      lineColor: 'rgba(40,158,255,0.2)',
      colors: [
        {
          borderColor: 'rgba(2, 201, 254,1)',
          start: 'rgba(2, 201, 254,0.8)',
          end: 'rgba(17, 107, 243, 0.3)'
        },
        {
          borderColor: 'rgba(0,222,255,1)',
          start: 'rgba(205, 178, 73,0.3)',
          end: 'rgba(252,205,20,0.8)'
        }
      ],
      // 图表项目数据
      LF_val: {
        0: [80, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 302, 352, 163],
        1: [389, 259, 262, 324, 232, 176, 196, 214, 133, 370, 268, 360, 395, 352, 163],
        2: [111, 315, 139, 375, 204, 352, 163, 258, 385, 209, 209, 243, 352, 352, 163],
        3: [227, 210, 328, 292, 241, 110, 130, 185, 392, 392, 153, 187, 200, 352, 163],
        4: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 350, 352, 163],
        5: [280, 128, 255, 254, 313, 143, 360, 343, 338, 163, 333, 317, 302, 352, 163],
        6: [121, 388, 233, 309, 133, 308, 297, 283, 349, 273, 229, 238, 291, 352, 163],
        7: [200, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 350, 352, 163],
        8: [380, 129, 173, 101, 310, 393, 386, 296, 366, 268, 208, 149, 239, 352, 163],
        9: [363, 396, 388, 108, 325, 120, 180, 292, 200, 309, 223, 236, 271, 352, 163],
        10: [300, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 350, 352, 163],
        11: [100, 350, 300, 250, 200, 150, 100, 150, 200, 250, 300, 350, 350, 352, 163]
      },
      diskData: [
        {
          name: '来访',
          value: 1,
          children: [
            {
              name: '来访1',
              value: 1
            },
            {
              name: '来访2',
              value: 1
            },
            {
              name: '来访3',
              value: 1
            },
            {
              name: '来访4',
              value: 1
            },
            {
              name: '来访5',
              value: 1
            }
          ]
        },
        {
          name: '推送',
          value: 1,
          children: [
            {
              name: '推送1',
              value: 1
            },
            {
              name: '推送2',
              value: 1
            },
            {
              name: '推送3',
              value: 1
            },
            {
              name: '推送4',
              value: 1
            },
            {
              name: '推送5',
              value: 1
            },
            {
              name: '推送6',
              value: 1
            }
          ]
        },
        {
          name: '来访',
          value: 1,
          children: [
            {
              name: '来访1',
              value: 1
            },
            {
              name: '来访2',
              value: 1
            },
            {
              name: '来访3',
              value: 1
            },
            {
              name: '来访4',
              value: 1
            },
            {
              name: '来访5',
              value: 1
            }
          ]
        }
      ],

      TS_val: {
        0: [80, 128, 255, 254, 313, 263, 302, 372, 163, 258, 385, 209, 209, 352, 163],
        1: [20, 350, 300, 250, 200, 400, 350, 300, 250, 258, 385, 209, 209, 352, 163],
        2: [30, 129, 173, 101, 310, 356, 239, 208, 330, 258, 385, 209, 209, 352, 163],
        3: [33, 396, 388, 108, 325, 209, 271, 215, 216, 258, 385, 209, 209, 352, 163],
        4: [30, 350, 300, 250, 200, 400, 350, 300, 250, 258, 385, 209, 209, 352, 163],
        5: [10, 350, 300, 250, 200, 400, 350, 300, 250, 258, 385, 209, 209, 352, 163],
        6: [80, 128, 255, 254, 313, 263, 302, 372, 163, 258, 385, 209, 209, 352, 163],
        7: [89, 259, 262, 324, 232, 185, 392, 392, 153, 258, 385, 209, 209, 352, 163],
        8: [11, 315, 139, 375, 204, 204, 352, 163, 258, 258, 385, 209, 209, 352, 163],
        9: [27, 210, 328, 292, 241, 150, 200, 250, 300, 258, 385, 209, 209, 352, 163],
        10: [10, 350, 300, 250, 200, 400, 350, 300, 250, 258, 385, 209, 209, 352, 163],
        11: [20, 128, 255, 254, 313, 263, 302, 372, 163, 258, 385, 209, 209, 352, 163]
      },
      // 图表月份
      timeLineData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      option: {

      }
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
            baseOption: {

              timeline: {
                show: true,
                axisType: 'category',
                tooltip: {
                  show: true,
                  formatter: function (params) {
                    console.log(params)
                    return params.name + '月份数据统计'
                  }
                },
                autoPlay: true,
                currentIndex: 6,
                playInterval: 3000,
                left: '3%',
                right: '3%',
                bottom: '0%',
                width: '94%',
                label: {
                  normal: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}月',
                    textStyle: {
                      color: '#fff'
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                symbolSize: 10,
                lineStyle: {
                  color: '#fff'
                },
                checkpointStyle: {
                  borderColor: '#fff',
                  borderWidth: 2
                },
                controlStyle: {
                  showNextBtn: true,
                  showPrevBtn: true,
                  normal: {
                    color: '#319af3',
                    borderColor: '#319af3'
                  },
                  emphasis: {
                    color: '#fff',
                    borderColor: '#fff'
                  }
                },
                data: []
              },
              title: {
                //   text:'',
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
                // subtext: '作者:',
              },
              legend: {
                data: this.fp_key,
                top: '0%',
                right: '5%',
                itemWidth: 12,
                itemHeight: 5,
                // itemGap: 343,
                icon: 'horizontal',
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              },
              tooltip: {
                show: true,
                trigger: 'axis',
                formatter: '{b}<br/>{a}: {c}人',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: [
                {
                  show: false,
                  left: '5%',
                  top: '10%',
                  bottom: '8%',
                  containLabel: true,
                  width: '40%'
                }, {
                  show: false,
                  left: '50%',
                  top: '15%',
                  bottom: '7%',
                  width: '0%'
                }, {
                  show: false,
                  left: '55%',
                  top: '10%',
                  bottom: '8%',
                  containLabel: true,
                  width: '40%'
                },
                {
                  gridindex: 3,
                  show: false

                }
              ],
              xAxis: [
                {

                  type: 'value',
                  triggerEvent: true,
                  inverse: true,
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  position: 'top',
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#fff',
                      fontSize: 12
                    }
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: this.lineColor
                    }
                  }
                },
                {
                  gridIndex: 1,
                  show: false
                },
                {
                  gridIndex: 2,
                  type: 'value',
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  position: 'top',
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#fff',
                      fontSize: 12
                    }
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: this.lineColor
                    }
                  }
                },
                {
                  gridIndex: 3,
                  type: 'value',
                  show: false
                }
              ],
              yAxis: [
                {
                  type: 'category',
                  inverse: true,
                  position: 'right',
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false,
                    margin: 8,
                    textStyle: {
                      color: '#fff',
                      fontSize: 12
                    }
                  },
                  data: this.Xdata
                },
                {
                  gridIndex: 1,
                  type: 'category',
                  inverse: true,
                  position: 'left',
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: true,
                    textStyle: {
                      color: '#9D9EA0',
                      fontSize: 12
                    }

                  },
                  data: this.Xdata.map(function (value) {
                    return {
                      value: value,
                      textStyle: {
                        align: 'center'
                      }
                    }
                  })
                },
                {
                  gridIndex: 2,
                  type: 'category',
                  inverse: true,
                  position: 'left',
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false,
                    textStyle: {
                      color: '#9D9EA0',
                      fontSize: 12
                    }

                  },
                  data: this.Xdata
                }, {
                  gridIndex: 3,
                  type: 'category',
                  inverse: true,
                  position: 'left',
                  axisLine: {
                    show: false
                  },
                  axisTick: {
                    show: false
                  },
                  axisLabel: {
                    show: false,
                    textStyle: {
                      color: '#9D9EA0',
                      fontSize: 12
                    }
                  },
                  data: this.Xdata
                }
              ],
              series: []
            },
            options: []

          }

          for (var i = 0; i < this.timeLineData.length; i++) {
            option.baseOption.timeline.data.push(this.timeLineData[i])
            option.options.push({
              series: [
                {
                  name: this.fp_key[0],
                  type: 'bar',
                  stack: 'one',
                  realtimeSort: false,
                  barGap: 12,
                  barWidth: 12,
                  label: {
                    normal: {
                      show: true,
                      position: 'inside',
                      textStyle: {
                        color: '#fff',

                        fontSize: 11
                      }
                    },
                    emphasis: {
                      show: true,
                      position: 'inside',
                      offset: [0, 0],
                      textStyle: {
                        color: '#fff',
                        fontSize: 12
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: this.colors[0].start
                      },
                      {
                        offset: 1,
                        color: this.colors[0].end
                      }
                      ])
                    }
                  },
                  data: this.LF_val[this.timeLineData[i]]
                },
                {
                  name: this.fp_key[1],
                  stack: 'right',
                  type: 'bar',
                  realtimeSort: true,
                  barGap: 12,
                  barWidth: 12,
                  xAxisIndex: 2,
                  yAxisIndex: 2,
                  label: {
                    normal: {
                      show: true,
                      position: 'inside',
                      textStyle: {
                        color: '#fff',
                        fontSize: 12
                      }
                    },
                    emphasis: {
                      show: true,
                      position: 'inside',
                      offset: [0, 0],
                      textStyle: {
                        color: '#fff',
                        fontSize: 12
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: this.colors[1].start
                      },
                      {
                        offset: 1,
                        color: this.colors[1].end
                      }
                      ])
                    }
                  },
                  data: this.TS_val[this.timeLineData[i]]
                }

              ]
            })
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
