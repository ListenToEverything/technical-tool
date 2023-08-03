<template>
  <div class="rap">
    <div ref="chart" style="height: 500px"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

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

          var data = []
          for (let i = 0; i < 10; ++i) {
            data.push(Math.round(Math.random() * 200))
          }

          const option = {
            xAxis: {
              max: 'dataMax'
            },
            yAxis: {
              type: 'category',
              data: ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'K', 'P', 'Q'],
              inverse: true,
              animationDuration: 300,
              animationDurationUpdate: 300
              // max: 2 // only the largest 3 bars will be displayed
            },
            series: [
              {
                realtimeSort: true,
                name: 'X',
                type: 'bar',
                data: data,
                label: {
                  show: true,
                  position: 'right',
                  valueAnimation: true
                }
              }
            ],
            legend: {
              show: true
            },
            animationDuration: 3000,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
          }

          setInterval(function () {
            var data = option.series[0].data
            for (var i = 0; i < data.length; ++i) {
              if (Math.random() > 0.9) {
                data[i] += Math.round(Math.random() * 2000)
              } else {
                data[i] += Math.round(Math.random() * 200)
              }
            }
            myChart.setOption(option)
          }, 3000)

          myChart.setOption(option)
          window.addEventListener('resize', function () {
            myChart.resize()
          })
        }
      })
    },
    update () {
      // var data = option.series[0].data
      // for (var i = 0; i < data.length; ++i) {
      //   if (Math.random() > 0.9) {
      //     data[i] += Math.round(Math.random() * 2000)
      //   } else {
      //     data[i] += Math.round(Math.random() * 200)
      //   }
      // }
      // myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
</style>
