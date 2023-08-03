<template>
    <div class="musicImg" >
        <div class="img">
            <img src="@/assets/imgs/testMusic/mobile/10.jpg" alt="" />
        </div>
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
.musicImg{
  .img{
      width: 100%;
      img{
        border-radius: 50%;
        width: 80%;
        
        // display: block;
        // position: relative;
        -webkit-animation: spin 30s linear infinite;
        animation: spin 30s linear infinite;
        @-webkit-keyframes spin {
          0% {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes spin {
          0% {
            -webkit-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
      }
  }
}
  
    
</style>