<template>
  <div class="Calender3">
    <!-- 年份 月份 -->
    <div v-if="false" class="month">
      <div class="month-left">
        <div @click="pickPre(currentYear, currentMonth)">上月</div>
        <div @click="pickNext(currentYear, currentMonth)">z 下月</div>
      </div>
      <div class="month-center">{{ currentYear }}年{{ currentMonth }}月</div>
      <div class="month-right">
        <div @click="weekPre">上周</div>
        <div @click="weekNext">下周</div>
      </div>
    </div>
    <div class="month">
      <div class="month-center">每日签到</div>
    </div>
    <!-- 星期 -->
    <div class="weekdays">
      <div class="week">星期一</div>
      <div class="week">星期二</div>
      <div class="week">星期三</div>
      <div class="week">星期四</div>
      <div class="week">星期五</div>
      <div class="week">星期六</div>
      <div class="week">星期日</div>
    </div>
    <!-- 日期 -->
    <div class="days">
      <div
        v-for="(day, index) in days"
        :key="index"
        class="li"
        @click="pick(day)"
      >
        <!--本月-->
        <div v-if="day.getMonth() + 1 != currentMonth" class="other-month">
          <!-- <p>{{ day.getDate() }}</p> -->
          <div v-if="!dateArr.includes(day.toLocaleDateString())">待签到</div>
          <div v-if="dateArr.includes(day.toLocaleDateString())" class="end">
            已签到
          </div>
        </div>
        <div v-else>
          <!--今天-->
          <!-- <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}=={{ day }}</span> -->
          <div
            v-if="
              new Date(day).setHours(0, 0, 0, 0) ==
              new Date().setHours(0, 0, 0, 0)
            "
            class="active"
          >
            <!-- <p>{{ day.getDate() }}</p> -->
            <div v-if="!dateArr.includes(day.toLocaleDateString())">签到</div>
            <div v-if="dateArr.includes(day.toLocaleDateString())">已签到</div>
          </div>
          <div v-else>
            <!-- <p>{{ day.getDate() }}</p> -->
            <div v-if="!dateArr.includes(day.toLocaleDateString())">待签到</div>
            <div v-if="dateArr.includes(day.toLocaleDateString())" class="end">
              已签到
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      dateArr: ['2022/08/31', '2022/09/02', '2022/9/5']
    }
  },
  mounted () {

  },
  created () {
    this.initData(null)
  },
  methods: {
    // 当前选择日期
    pick (date) {
      // alert(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
      if (new Date(date).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) {
        alert('签到时间未到')
        return
      }
      this.dateArr.push(date.toLocaleDateString())
    },
    formatDate (year, month, day) {
      const y = year
      let m = month
      if (m < 10) m = `0${m}`
      let d = day
      if (d < 10) d = `0${d}`
      return `${y}-${m}-${d}`
    },

    initData (cur) {
      let date = ''
      if (cur) {
        date = new Date(cur)
      } else {
        date = new Date()
      }
      this.currentDay = date.getDate() // 今日日期 几号
      this.currentYear = date.getFullYear() // 当前年份
      this.currentMonth = date.getMonth() + 1 // 当前月份
      this.currentWeek = date.getDay() // 1...6,0   // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str)
        d.setDate(d.getDate() - i)
        // console.log(y:" + d.getDate())
        this.days.push(d)
      }
      for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
        const d = new Date(str)
        d.setDate(d.getDate() + i)
        this.days.push(d)
      }
    },

    //  上个星期
    weekPre () {
      const d = this.days[0] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7)
      this.initData(d)
    },

    //  下个星期
    weekNext () {
      const d = this.days[6] // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7)
      this.initData(d)
    },

    // 上一個月   传入当前年份和月份
    pickPre (year, month) {
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },

    // 下一個月   传入当前年份和月份
    pickNext (year, month) {
      const d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    }

  }
}
</script>
<style lang="scss" scoped>
.Calender3 {
  height: px2rem(180);
  color: #333;
  padding: 20px;
  .month {
    font-size: px2rem(24);
    margin-top: px2rem(20);
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    .month-left {
      display: flex;
      div {
        background-color: #87acfd;
        border-radius: 15px;
        color: white;
        padding: 4px 20px;
        margin-right: 2px;
      }
    }
    .month-center {
      font-size: px2rem(24);
      text-align: center;
      font-size: 17px;
      font-weight: 700;
    }
    .month-right {
      display: flex;
      div {
        background-color: #87acfd;
        border-radius: 15px;
        color: white;
        padding: 4px 20px;
        margin-right: 2px;
      }
    }
  }
  .weekdays {
    display: flex;
    font-size: px2rem(28);
    margin-top: px2rem(20);

    .week {
      flex: 1;
      text-align: center;
      // list-style-type: none;
      color: rgb(188, 77, 8);
      background-color: rgb(248, 190, 154);
      margin-right: 2px;
      border-radius: 17px 17px 0px 0px;
      padding: 12px 0;
    }
  }

  .days {
    display: flex;

    .li {
      flex: 1;
      font-size: px2rem(30);
      text-align: center;
      margin-top: px2rem(10);
      line-height: px2rem(60);
      // list-style-type: none;
      // color: rgb(188, 77, 8);
      background-color: rgb(248, 190, 154);
      margin-right: 2px;
      border-radius: 0px 0px 17px 17px;
      padding: 12px 0;
      .active {
        display: inline-block;
        width: px2rem(60);
        height: px2rem(60);
        color: rgb(255, 255, 255);
      }

      .other-month {
        color: #e4393c;
      }
    }
  }
  .end {
    color: #a09d9d;
  }
}
</style>
