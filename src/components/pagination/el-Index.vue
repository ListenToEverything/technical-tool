<!--
 * @Author: xueml
 * @Date: 2023-06-29 16:46:29
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-06-30 10:06:53
 * @FilePath: \vueproject-master\src\components\pagination\index.vue
-->
<template>
  <div class="pagination" :style="`justify-content:${position}`">
    <!--列表-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="pagination.pageSizeOptions"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>

export default {
  props: {
    pagination: {//分页组件配置
      type: Object,
      default: {
        pageSizeOptions: [10, 20, 50, 100],
        size: '',
        pageSize: 10,
        current: 1,
        total: 0
      }
    },
    position: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      currentPage4: 4,
    }
  },
  /**
   * 数据发生改变
   */
  watch: {},

  /**
   * 创建完毕
   */
  created () {
  },

  methods: {
    //切换条数
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSizeChange', val)
    },
    //切换页数
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 10px;
  display: flex;
}
</style>

 