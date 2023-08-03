<template>
    <div class="musicBg" >
       
        <div class="img">
            <img src="@/assets/imgs/testMusic/mobile/10.jpg" alt="" />
        </div>
        <div class="imgbg"></div>
    </div>
</template>
  
<script>
  export default {
    components:{
    },
    data() {
      return {
        imgBgList:[]
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
  
<style lang="scss" scoped>
  .musicBg {
    .img{
        width: 100%;
        img{
          border-radius: 20px;
            width: 100%;
        }
    }
    .imgbg{
        background-color: rgba($color: #cbcbcb, $alpha: 0.6);
        width: 100%;
        height: 100%;
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;
    }
  }
</style>