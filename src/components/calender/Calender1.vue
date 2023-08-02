<template>
  <div class="Calender1">
    <div class="calendar-wrap">
      <el-calendar v-model="value" :first-day-of-week="7">
        <template slot="dateCell" slot-scope="{date,data }">
          <div
            v-if="dateArr.includes(data.day)"
            v-popover:popover
            class="sign"
            @click="viewDayWork(date,data)"
          >
            <div class="tip">
              <div>
                {{ data.day.split("-").slice(2).join() }}
              </div>
              <div @click="viewDayWork(date,data)">
                已签到
              </div>
            </div>
            <!-- <div>
              <img class="bg" src="../../../../assets/images/logo.png" alt="">
            </div> -->
          </div>
          <div
            v-else
            v-popover:popover
            class="unsign"
          >
            <div>
              <div>
                {{ data.day.split("-").slice(2).join() }}
              </div>
              <div v-if="(new Date(data.day).setHours(0, 0, 0, 0)-new Date().setHours(0, 0, 0, 0))=== 0" @click="viewDayWork(date,data)">
                签到
              </div>
              <div v-if="new Date(data.day).setHours(0, 0, 0, 0)<new Date().setHours(0, 0, 0, 0)" @click="viewDayWork(date,data)">
                补签
              </div>
            </div>
          </div>
        </template>
      </el-calendar>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Calender1',
  data() {
    return {
      value: new Date(),
      dateArr: ['2022-08-31', '2022-09-02', '2022-09-03']
    }
  },
  computed: {
    nowDate() {
      const nowTime = new Date()
      const str = nowTime.toLocaleDateString().replace(new RegExp('/', 'g'), '-')

      return str + ' 08:00:00'
    }
  },
  methods: {
    viewDayWork(date, data) {
      if (this.dateArr.includes(data.day)) {
        alert('请勿重复签到')
        return
      }
      this.dateArr.push(data.day)
      console.log('苏联空军大家来看', data.day.split('-').slice(2), date, data)
    }
  }
}
</script>
<style scoped lang="scss">
.Calender1 {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.Calender1 ::v-deep .el-calendar-table .el-calendar-day{
  text-align: center;
}
.Calender1 ::v-deep .el-calendar-table thead th:before{
    content: '星期';
}

//这是日历中的周六与周天样式
.calendar-wrap ::v-deep  .el-calendar-table tr td:first-child,
.calendar-wrap ::v-deep .el-calendar-table tr td:last-child{
    background-color: #f9f8fe;
    color: #f37b66;
}
//这是日历中的右边的按钮
.Calender1 ::v-deep .el-calendar__button-group .el-button{
    border-radius: 15px;
    background-color: #f8b991;
    color: white;
}
//这是日历中的星期
.Calender1 ::v-deep .el-calendar-table thead th {
  background-color: #87acfd;
  // border-radius: 15px;
  color: white;
}
.sign{
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;

    position: relative;
  .bg{
    z-index: 1;
    width: 80%;
    position: absolute;
  }
  .tip{
    z-index: 10;
    position: absolute;
    color: red;
  }
}
</style>
