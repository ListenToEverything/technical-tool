<!--
 * @Author: xueml
 * @Date: 2023-06-29 15:03:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-06-29 17:29:53
 * @FilePath: \vueproject-master\src\views\system\user copy.vue
-->

<template>
  <div>
    <!--列表-->
    <el-table
      size="small"
      @selection-change="selectChange"
      @select-all="selectAll"
      :data="dataSource"
      highlight-current-row
      v-loading="loading"
      element-loading-text="拼命加载中"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in columns"
        :type="item.type"
        :key="index"
        :align="item.align ? item.align : 'center'"
        sortable
        :prop="item.prop"
        :label="item.title"
        :width="item.width"
      >
        <template v-if="item.scopedSlots">
          <slot :name="item.scopedSlots" :record="item" :index="index"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 表格列配置
// const columns = [
//   {
//     type: 'selection',//选择框 selection多选 null隐藏多选
//     width: 50,
//   },
//   {
//     title: '公司',//表头名称
//     prop: 'deptName',//字段名
//     width: 120, //宽度
//     align: 'center',//  left/center/right
//   },
//   {
//     title: '操作',
//     scopedSlots: 'action',//solt名
//     width: 120
//   }
// ]

export default {
  props: {
    columns: {//表格列配置
      type: Array,
      default: []
    },
    dataSource: {//数据源
      type: Array,
      default: []
    },
    loading: {//是显示加载
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
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

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 当选择项发生变化时会触发该事件
    selectChange (selection) {
      this.$emit('selectChange', selection)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll (selection) {
      this.$emit('selectAll', selection)
    }
  }
}
</script>

<style scoped>
</style>

 