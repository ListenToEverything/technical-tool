<template>
  <div class="lookHome">
    <h1>{{ msg }}</h1>
    <div id="he-plugin-simple"></div>
  </div>
</template>

<script>
export default {
  name: 'lookHome',
  data () {
    return {
      msg: '天气预览'
    }
  },
  mounted(){
    window.WIDGET = {
      "CONFIG": {
        "modules": "01234",
        "background": "1",
        "tmpColor": "FFFFFF",//温度文字颜色
        "tmpSize": "16",//温度文字大小
        "cityColor": "FFFFFF",//城市名文字颜色
        "citySize": "16",//城市名文字大小
        "aqiColor": "FFFFFF",
        "aqiSize": "16",
        "weatherIconSize": "24",
        "alertIconSize": "18",
        "padding": "10px 10px 10px 10px",
        "shadow": "0",
        "language": "auto",
        "fixed": "false",
        "vertical": "top",
        "horizontal": "left",
        "key": "61fe0f8e6447416bb9f290e0a67d1025"
      }
    }
    let script=document.createElement('script')
    script.typ='text/javascript'
    script.src='https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
    document.getElementsByTagName('head')[0].appendChild(script)
    console.log("飒飒",document.getElementsByTagName('head'))
  }
  
}
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
