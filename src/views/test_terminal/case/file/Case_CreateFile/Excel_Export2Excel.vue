<template>
  <div class="file" ref="domm">
    <el-button type="primary"  @click="export2Excel()">导出Excel</el-button><br>
  </div>
</template>

<script>
export default {
  computed:{
  },
  data() {
    return {
      tableData: [
        { index: 0, username: "张三", password: 333, age: 22 },
        { index: 1, username: "李四", password: 444, age: 23 }
      ]

    }
  },
  created() {
    
  },
  methods: {
    export2Excel () {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel")
        // 设置Excel的表格第一行的标题
        const fieldName = ["索引", "用户名", "密码"];
        // 标题对应的字段
        const filterVal = ["index", "username", "password"];
        // 把data里的tableData存到list
        const data = this.tableData.map(v => filterVal.map(j => v[j]));
        // 获取时间戳给文件命名
        const fileDate = new Date().getTime()
        // 导出Excel 文件名
        export_json_to_excel(tHeader, list, '超时订单' + fileDate)
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.file {
  .home {
    height: 100%;
    background-color: rgb(128, 126, 126);
  }
}
</style>