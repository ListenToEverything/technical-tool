<template>
  <div class="color">
    <div class="con" v-for="(item,index) in whileList" :key="index">
      <div class="con_label">{{item.label}}</div>
      <div class="con_color" :style="'background-color:'+ item.color+';'">
      </div>

    </div>
    <div class="con" v-for="(item,index) in GList" :key="index">
      <div class="con_label">{{item.label}}</div>
      <div class="con_color" :style="'background-color:'+ item.color+';'">
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  name: 'color',
  data () {
    return {
      msg: '图书馆里系统',
      redList:[
        {colorId:"1",color:"#eeaa9c",label:"颊红"},
        {colorId:"1",color:"#f17666",label:"颊红"},
      ],
      //白色
      whileList:[
        {colorId:"1",color:"#F3F2F2",label:"精白"},
        {colorId:"1",color:"#EAECD4",label:"象牙"},
        {colorId:"1",color:"#EDEAE6",label:"鱼肚"},
        {colorId:"1",color:"#EFE8DA",label:"缟素"},
        {colorId:"1",color:"#EFEBD5",label:"乳"},
        {colorId:"1",color:"#E3EAE0",label:"荷花"},
        {colorId:"1",color:"#E8EAED",label:"浅云"},
        {colorId:"1",color:"#EAE784",label:"古"},
      ],
      //绿色
      GList:[
        {colorId:"1",color:"#A4CAB6",label:"玉簪"},
        {colorId:"1",color:"#69A794",label:"梧枝"},
        {colorId:"1",color:"#5DBE8A",label:"蔻梢"},
        {colorId:"1",color:"#41B349",label:"玉髓"},
        {colorId:"1",color:"#2C9678",label:"青矾"},
        {colorId:"1",color:"#428675",label:"亚丁"},
        {colorId:"1",color:"#248067",label:"海王"},
      ],
      colorList:[
        {colorId:"1",color:"#eeaa9c",label:"颊红"},
        {colorId:"1",color:"#eeaa9c",label:"颊红"},
      ]
    }
  },
  mounted(){
    
  },
  deleted(){
  },
  methods: {
      
  }
}
</script>

<style scoped lang="scss">
.color{
  padding: 20px;
  // display: flex;
  .con{
    display: flex;
    margin-top: 20px;
    .con_label{
      width: 60px;
      height: 60px;
      line-height: 60px;
      margin-right: 20px;
    }
    .con_color{
      width: 60px;
      height: 60px;
      border-radius: 20px;
    }
  }
}

</style>
