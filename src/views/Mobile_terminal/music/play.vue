<template>
    <div class="musicBg" >
       <div @click="test">查看</div>
       <div @click="playMusic">
        {{playStr}}
       </div>
       <div @click="changeMsuic('next')">
        下一曲
       </div>
       <div @click="changeMsuic('back')">
        上一曲
       </div>
       <div @click="goMsuic(10)">
        快进10S
       </div>
       <div @click="volumeMusic('+')">
        增加音量
       </div>
       <div @click="volumeMusic('-')">
        减少音量
       </div>
       
      <audio autoplay="autoplay" :src="musicInfo.url" loop ref="rotate" preload="auto"  id="music" controls duration>
          <!-- <source  type="audio/mpeg"> -->
      </audio>
      <div>
        歌名：{{ musicInfo.name }}
      </div>
      <!-- <audio :src="musicInfo.src" id="music" autoplay="autoplay"></audio> -->
      <br>
      <div >
        <template>
          <div class="block">
            <el-slider
              v-model="volume"
              vertical
              height="200px"
              label="音量调节"
              @change="changeVolume"
              >
            </el-slider>
          </div>
        </template>
      </div>
    </div>
</template>
  
<script>
  export default {
    components:{
    },
    data() {
      return {
        imgBgList:[],
        playing:true,
        playStr:'播放',
        musicUrl:[
          {id:1,url:require("@/assets/music/她的眼睛会唱歌 - 张宇佳.mp3"),name:'她的眼睛会唱歌'},
          {id:2,url:require("@/assets/music/踏山河(DJ版) - 无忧.mp3"),name:'踏山河(DJ版)'},
          {id:3,url:require("@/assets/music/我在人间凑数的日子 - 王然.mp3"),name:'我在人间凑数的日子'},
        ],
        playIndex:0,//播放id
        musicInfo:{},
        volume:100,//音量大小
      }
    },
    created() {
    },
    mounted() {
      // this.$refs.rotate.src=require('../../../assets/music/踏山河(DJ版) - 无忧.mp3')
    },
    methods: {
      test(){
        console.log("水水水",this.$refs.rotate.src)
        console.log("歌曲信息",this.musicInfo)
        console.log("当前播放时间",this.$refs.rotate.currentTime)
        console.log("歌曲时长",this.$refs.rotate.duration)
      },
       //播放与暂停
      playMusic() {

        if (this.playing) {
          // 播放中,点击则为暂停
          this.playing = false;
          this.playStr='暂停'
          this.$refs.rotate.style.animationPlayState = "paused";
          music.pause();
        } else {
          // 暂停中,点击则为播放
          this.playing = true;
          this.playStr='播放'
          this.$refs.rotate.style.animationPlayState = "running";
          music.play();
        }
      },
      //指定播放时间
      goMsuic(s){
        this.$refs.rotate.currentTime=this.$refs.rotate.currentTime+s
      },
      //调节音量
      volumeMusic(volume){
        if(volume=='+'){
          this.$refs.rotate.volume=this.$refs.rotate.volume+0.1
        }else if(volume=='-'){
          this.$refs.rotate.volume=this.$refs.rotate.volume-0.1
        }
        
      },
      //切换歌曲
      changeMsuic(tab){
        if(tab=='next'){
          this.playIndex=this.playIndex<this.musicUrl.length-1?this.playIndex+1:0
        }else if(tab=='back'){
          this.playIndex=this.playIndex>0?this.playIndex-1:this.musicUrl.length-1
        }
        this.musicInfo=this.musicUrl[this.playIndex]
        setTimeout(() => {
          this.$refs.rotate.style.animationPlayState = "running";
          music.play();
        }, 200);
        
      },
      //调节音量
      changeVolume(num){
        this.$refs.rotate.volume=num/100
      }

    }
  }
</script>
  
<style lang="scss" scoped>
  .musicBg {
    
  }
</style>