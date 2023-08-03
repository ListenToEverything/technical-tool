<template>
  <div class="ReservedSucceed">
    <div @click="$router.go(-1)">返回</div>
    <van-tabs v-model="active" sticky>
      <van-tab v-for="item in tab" :title="item.label" :key="item.id">
        <div v-if="item.id==1">
          <van-uploader v-model="fileList" multiple />
        </div>
        <div v-if="item.id==2">
          <van-cell-group>
            <van-field
              v-model="username"
              error
              required
              label="诗名"
              placeholder="请输入诗名"
            />
            <van-field
              v-model="username"
              error
              required
              label="诗人"
              placeholder="请输入诗人"
            />
            <van-field
                v-model="message"
                rows="2"
                autosize
                label="诗句"
                type="textarea"
                maxlength="50"
                placeholder="请输入诗句"
                show-word-limit
              />
          </van-cell-group>
      
        </div>
        <div v-if="item.id==3">
          <van-field
            v-model="message"
            rows="2"
            autosize
            label="诗句"
            type="textarea"
            maxlength="50"
            placeholder="请输入诗句"
            show-word-limit
          />
        </div>
      </van-tab>
    </van-tabs>
    <van-button round type="info" v-ripple v-preventReClick>添加</van-button>

    
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab:[
        {id:1,label:"上传图片"},
        {id:2,label:"添加古诗词"},
        {id:3,label:"人生半句"},
      ],
      message:"",
      active:"",
      fileList: [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true },
      ],
    };
  },
  created() {
    
  },
  mounted() {
  },
  methods: {
   nextWidth(){
    this.$router.push({
      path:"/MHome/width",
      // query:{redirect:to.path}
    })

    
   }
  }
}
</script>

<style lang="scss" scoped>
.ReservedSucceed {
  height: 100%;
  background-color: white;
  
}
</style>