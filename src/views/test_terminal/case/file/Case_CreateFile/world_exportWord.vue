<template>
  <div class="threeLevelMain">
    <!-- 底部按钮容器 -->
    <div class="botmBtnContainer">
      <el-button @click="exportWord" size="small" type="primary"
        >导出word</el-button
      >
    </div>
  </div>
</template>

<script>
// -- 安装 docxtemplater
// npm install docxtemplater pizzip  --save
// -- 安装 jszip-utils
// npm install jszip-utils --save 
// -- 安装 jszip
// npm install jszip --save
// -- 安装 FileSaver
// npm install file-saver --save
// -- 引入处理图片的插件1
// npm install docxtemplater-image-module-free --save
// -- 引入处理图片的插件2
// npm install angular-expressions --save

import { exportWord, getBase64Sync } from '@/utils/exportBriefDataDocx'
export default {
  name: "world_exportWord",
  data () {
    return {

      // 表格信息
      tableData: [
        {
          number: 1, // 序号
          name: "设备1", // 设备名称
          num: 1, // 数量
          salePrice: 10, // 销售单价
          saleTotal: 10, // 销售合计
          remark: "啦啦啦" // 备注
        },
        {
          number: 2, // 序号
          name: "设备2", // 设备名称
          num: 2, // 数量
          salePrice: 20, // 销售单价
          saleTotal: 40, // 销售合计
          remark: "啦啦啦" // 备注
        },
        {
          number: 3, // 序号
          name: "设备3", // 设备名称
          num: 3, // 数量
          salePrice: 30, // 销售单价
          saleTotal: 90, // 销售合计
          remark: "啦啦啦" // 备注
        }
      ],
      //图片信息
      imglist: [
        {
          imgUrl: "https://img2.baidu.com/it/u=2709954499,581919391&fm=253&fmt=auto&app=138&f=JPEG?w=468&h=518"
        },
        {
          imgUrl: "https://img0.baidu.com/it/u=1462004956,1440895436&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=353"
        }
      ],
      //传入模板数据
      docxData: {}
    }
  },
  created () {

  },
  methods: {
    // 导出docx
    async exportWord () {
      for (let i in this.imglist) {
        this.imglist[i].imgUrl = await getBase64Sync(this.imglist[i].imgUrl)
      }
      let data = {
        year: 2021,
        month: 9,
        tableData: this.tableData,
        imglist: this.imglist
      }
      let imgSize = {
        //控制导出的word图片大小
        imgurl: [200, 200],
      }
      exportWord("static/test.docx", data, "/房屋出租审批表.docx", imgSize)
    }
  }
};
</script>

<style lang="scss" scoped>
.file {
  .home {
    height: 100%;
    background-color: rgb(128, 126, 126);
  }
}
</style>