<template>
  <div class="file" ref="domm">
      <download-excel
        class="export-excel-wrapper"
        :data="json_data"
        :fields="json_fields"
        type="xls"
        worksheet="My Worksheet"
        name="用户信息"
        :before-generate = "startDownload"
      :before-finish   = "finishDownload"
      >
        <el-button>导出EXCEL->JsonExcel</el-button>
      </download-excel>
    

  </div>
</template>

<script>
export default {
  computed:{
  },
  data() {
    return {
      json_fields: {
        年龄: {
          field: "age",
          //自定义回调函数
          callback: value => {
            return `${value} 岁`;
          }
        }, 
        姓名: "info.name", //支持嵌套属性
        密码: {
          field: "info.phone",
          //自定义回调函数
          callback: value => {
            return `+86 ${value}`;
          }
        },
        性别:'sex',//常规字段

      },
      json_data: [
        {
          age: 22,
          info: {
            name: "张三",
            phone: 12222222222
          },
          sex: "男"
        },
        {
          age: 23,
          info: {
            name: "李四",
            phone: 13333333333
          },
          sex: "女"
        }
      ]

    }
  },
  created() {
    
  },
  methods: {
    //JsonExcel 导出
    async fetchData(){
      // const response = await axios.get('https://holidayapi.com/v1/holidays?key=a4b2083b-1577-4acd-9408-6e529996b129&country=US&year=2017&month=09');
      // console.log(response);
      setTimeout(()=>{
        console.log('??????');
      },3000)
      return this.json_data
    },
    //JsonExcel 导出前
    startDownload(){
        alert('show loading');
    },
    //JsonExcel 导出成功
    finishDownload(){
        alert('hide loading');
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
}
</style>