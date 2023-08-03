<template>
  <div ref="pdf">
    <el-table :data="tableData" style="width: 700px">
      <el-table-column prop="date" label="时间" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="对我说"> </el-table-column>
    </el-table>

    <button @click="handleExport">导出</button>
  </div>
</template>
<script>
import { downloadPDF } from "@/utils/exportPdf.js"  //工具方法，导出操作
export default {
  name: "pdf_createdPdf",
  data () {
    return {

      tableData: [{
        date: '昨天',
        name: '刘德华',
        address: '你好帅'
      }, {
        date: '今天',
        name: '郭富城',
        address: '你最帅'
      }, {
        date: '明天',
        name: '张学友',
        address: '你贼帅'
      }, {
        date: '每天',
        name: '黎明',
        address: '我没你帅'
      }]
    }
  },
  methods: {
    handleExport () {
      downloadPDF(this.$refs.pdf)
    }
  }
};
</script>
  
<style lang="scss" scoped></style>