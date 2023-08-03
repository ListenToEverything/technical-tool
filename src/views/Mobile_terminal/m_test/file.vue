<!--
 * @Author: xueml
 * @Date: 2023-08-03 09:06:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-03 13:14:43
 * @FilePath: \technical-tool\src\views\Mobile_terminal\m_test\file.vue
-->
<template>
  <div class="file" ref="domm">
    <div>
      {{ "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate) }}
    </div>
    <h1>excel生成文件</h1>
    <div>
      <h4>JsonExcel</h4>
      <Json-Excel></Json-Excel>
      <h4>Export2Excel</h4>
      <Export2Excel></Export2Excel>
    </div>
    <h1>Word生成文件</h1>
    <div>
      <h4>导出word模板</h4>
      <export-Word></export-Word>
      <h4>将当前页面生成word文件</h4>
      <createdWord></createdWord>
    </div>

    <h1>PDF生成文件</h1>
    <div>
      <h4>将当前页面生成PDF文件</h4>
      <createdPdf></createdPdf>
    </div>
  </div>
</template>

<script>
import JsonExcel from '../../test/case/file/Case_CreateFile/Excel_Export2Excel.vue'
import Export2Excel from '../../test/case/file/Case_CreateFile/Excel_JsonExcel.vue'
import exportWord from '../../test/case/file/Case_CreateFile/world_exportWord.vue'
import createdWord from '../../test/case/file/Case_CreateFile/world_createdWord.vue'
import createdPdf from '../../test/case/file/Case_CreateFile/pdf_createdPdf.vue'


export default {
  components: { JsonExcel, Export2Excel, exportWord, createdWord, createdPdf },
  computed: {
  },
  data () {
    return {
      rate: 5,
      dataList: [], // 列表数据
      arrstr: "",

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.file {
  height: 100%;
  background-color: white;
  // color: rgba(255,255,255,1);
}
</style>