<template>
    <div class="main-page">
      <audio :src="songInfo.url" id="music" autoplay="autoplay"></audio>
      <div
        class="background-flitter"
        :style="`background-image: url(${songInfo.cover})`"
      ></div>
      <div class="play-mini">
        <div class="progress-bar" @click="handleProgressClick" ref="track">
          <div
            class="progress-box"
            :style="{ width: audioProgressPercent }"
          ></div>
        </div>
        <div class="songInfo">
          <img class="poster" :src="songInfo.cover" alt="" />
          <!-- 歌名、歌手名 -->
          <div class="info">
            <p style="font-weight: 600; color: #fff;">{{ songInfo.name }}</p>
            <p style="font-size: 14px; color: #fff">{{ songInfo.artistsName }}</p>
          </div>
        </div>
        <div class="controls">
          <!-- 上一首提示 -->
          <Tooltip content="上一首" theme="light" :delay="1500">
            <a href="javascript:;">
              <Icon
                type="md-skip-backward"
                @click="skipBack"
                size="26"
                color="white"
              />
            </a>
          </Tooltip>
          <!-- 播放暂停 -->
          <Tooltip content="播放暂停" theme="light" :delay="1500">
            <img
              @click="playMusic"
              class="status"
              v-show="!playing"
              src="@/assets/imgs/bzzr.png"
              alt=""
            />
            <img
              class="status"
              @click="playMusic"
              v-show="playing"
              src="@/assets/imgs/bdly.png"
              alt=""
            />
          </Tooltip>
          <!-- 下一首提示 -->
          <Tooltip content="下一首" theme="light" :delay="1500">
            <a href="javascript:;">
              <Icon
                type="md-skip-forward"
                @click="skipForward"
                size="26"
                color="white"
              />
            </a>
          </Tooltip>
        </div>
        <div class="right-botton">
          <div class="text-div"></div>
          <!-- 音量 -->
          <a href="javascript:;">
            <Icon
              :type="volumeType"
              size="26"
              color="white"
              @click="volumeChange"
            />
          </a>
          <div class="text-div"></div>
          <Slider
            style="width: 80px; z-index: 99999"
            @on-input="changeVolum"
            v-model="volume"
          ></Slider>
          <div class="text-div"></div>
          <div class="text-div"></div>
          <div class="text-div"></div>
          <!-- 歌曲播放类型 -->
          <Tooltip :content="showPlayType" theme="light" :delay="1500">
            <a href="javascript:;">
              <Icon
                :custom="playStatus"
                @click="playTypeChange"
                size="26"
                color="white"
              />
            </a>
          </Tooltip>
          <div class="text-div"></div>
          <div class="text-div"></div>
          <div class="playlist">
            <!-- 播放列表 -->
            <Tooltip content="列表" theme="light" :delay="1500">
              <a href="javascript:;">
                <Icon
                  custom="iconfont icon-bofangqi-xuanji"
                  @click="drawer = true"
                  size="36"
                  color="white"
                />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
      <div class="song-cover-lyric">
        <div class="disc-continer">
          <div class="poster" ref="rotate">
            <img :src="songInfo.cover" alt="" />
          </div>
          <div class="song-name">{{ songInfo.name }}</div>
          <div class="song-artistsName">{{ songInfo.artistsName }}</div>
        </div>
        <div class="lyric">
          <mscroll
            ref="lyric"
            :color="color"
            :colorLight="colorLight"
            :lineHeight="lineHeight"
            :paddingTop="paddingTop"
            :fontSize="fontSize"
            :lyricIndex="lyricIndex"
            :lyricsList="lyricInfo"
          ></mscroll>
        </div>
      </div>
      <Drawer
        title="播放列表"
        placement="left"
        width="320"
        :closable="false"
        v-model="drawer"
      >
        <div class="list-container">
          <div
            class="songInfo"
            v-for="(item, index) in songList"
            :key="index"
            @click="PlayListMusic(index)"
          >
            <img :src="item.cover" alt="" />
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistsName }}</div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
</template>
<script>
//import { showMessage } from "../../publicMethod/publicMethods"
import Mscroll from "./lyricScroll.vue"
import commonJs from "../../../utils/timeConversion"

import axios from "axios"
export default {
  data() {
    return {
      volumeNum: 80, //暂存的音量
      volumeStatus: true, //音量图标的变化
      volumeType: "md-volume-up", //音量图标
      playStatus: "iconfont icon-xunhuanbofang", //播放类型图标
      playing: false,
      drawer: false,
      playIndex: 0,
      songInfo: {},
      songList: [],
      volume: 80, // 音量
      lyricInfo: [],
      playType: 1, // 播放类型：1-列表循环，2-随机播放，3-单曲循环
      showPlayType: "列表循环",
      audioProgress: 0,
      thumbTranslateX: 0,
      lyricIndex: 0,
      color: "#fff", //歌词默认颜色
      colorLight: "#40ce8f", //歌词高亮色
      fontSize: "16px", //歌词字体大小
      lineHeight: "42", //每段行高
      paddingTop: "300px", //高亮歌词部分居中
    };
  },
  created() {},
  components: {
    Mscroll,
  },
  computed: {
    audioProgressPercent() {
      return `${this.audioProgress * 100}%`;
    },
  },
  mounted() {
    const music = document.getElementById("music");
    if (this.$route.query.play) {
      this.ClickPlay();
    } else {
    this.GetSongList();
    }
  
    if (this.playing) {
      // 播放中,点击则为暂停
      this.playing = false;
      this.$refs.rotate.style.animationPlayState = "paused";
      music.pause();
    } else {
      // 暂停中,点击则为播放
      this.playing = true;
      this.$refs.rotate.style.animationPlayState = "running";
      music.play();
    }
  },
  methods: {
    //音量变化
    volumeChange() {
      if (this.volumeStatus) {
        this.volumeStatus = false;
        this.volumeNum = this.volume;
        this.volume = 0;
        this.volumeType = "md-volume-off";
      } else {
        this.volumeStatus = true;
        this.volume = this.volumeNum;
        this.volumeType = "md-volume-up";
      }
    },
    //歌曲播放类型变化
    playTypeChange() {
      if (this.playType == 1) {
        this.playType = 2;
        this.showPlayType = "随机播放";
        this.playStatus = "iconfont icon-suijibofang";
        return;
      }
      if (this.playType == 2) {
        this.playType = 3;
        this.showPlayType = "单曲循环";
        this.playStatus = "iconfont icon-danquxunhuan";
        return;
      }
      if (this.playType == 3) {
        this.playType = 1;
        this.showPlayType = "列表循环";
        this.playStatus = "iconfont icon-xunhuanbofang";
        return;
      }
    },
    ClickPlay() {
      this.audioInit();
      this.getMusicList(this.songInfo.id);
      this.$refs.rotate.style.animationPlayState = "running";
      this.playing = true;
      setTimeout(() => {
        music.play();
      }, 100);
    },
    GetSongList() {
      axios.get("/musicController/getMusicList").then(this.GetSongListInfo);
    },
    GetSongListInfo(res) {
      let myList;
      if (res.code == "0000") {
        myList = res.data;
      } else {
        console.log("没查到数据");
        myList = [
          {
            artistsName: "房东的猫",
            cover:
              "@/assets/imgs/testMusic/1.jpg",
            id: 1857630559,
            name: "New Boy",
            url: "@/assets/imgs/music/踏山河(DJ版) - 无忧",
            lyric:
              "\n[00:25.075]\n[00:25.189]是的我看见到处是阳光\n[00:29.156]快乐在城市上空飘扬\n[00:32.773]新世界来得像梦一样\n[00:36.689]让我暖洋洋\n[00:40.122]你的老怀表还在转吗\n[00:43.822]你的旧皮鞋还能穿吗\n[00:47.506]这儿有一支未来牌香烟\n[00:51.479]你不想尝尝吗\n[00:54.512]明天一早 我猜阳光会好\n[01:02.679]我要把自己打扫\n[01:05.896]把破旧的全部卖掉\n[01:09.212]哦这样多好 快来吧奔腾电脑\n[01:17.329]就让它们代替我来思考\n[01:27.229]穿新衣吧 剪新发型呀\n[01:31.347]轻松一下Windows98\n[01:35.048]打扮漂亮 18岁是天堂\n[01:39.064]我们的生活甜得像糖\n[01:42.431]穿新衣吧 剪新发型呀\n[01:46.098]轻松一下Windows98\n[01:49.914]以后的路不再会有痛苦\n[01:53.948]我们的未来该有多酷\n[02:12.481]是的我看见到处是阳光\n[02:16.164]快乐在城市上空飘扬\n[02:19.847]新世界来的像梦一样\n[02:23.748]让我暖洋洋\n[02:27.164]你的老怀表还在转吗\n[02:30.815]你的旧皮鞋还能穿吗\n[02:34.614]这儿有一支未来牌香烟\n[02:38.448]你不想尝尝吗\n[02:41.548]明天一早我猜阳光会好\n[02:49.898]我要把自己打扫\n[02:53.564]把破旧的全部卖掉\n[02:56.198]哦这样多好 快来吧奔腾电脑\n[03:04.598]就让它们代替我来思考\n[03:11.081]\n[03:11.414]穿新衣吧剪新发型呀\n[03:14.698]轻松一下Windows98\n[03:18.264]打扮漂亮18岁是天堂\n[03:22.481]我们的生活甜得像糖\n[03:25.964]穿新衣吧剪新发型呀\n[03:29.515]轻松一下Windows98\n[03:33.264]以后的路不再会有痛苦\n[03:37.681]我们的未来该有多酷",
          },
        ];
      }
      this.songList = myList;
      this.songInfo = this.songList[0];
      this.getMusicList(this.songInfo.id); //通过正在播放的歌曲id获取歌曲播放的URL歌词信息
      this.audioInit();
    },
    audioInit() {
      let that = this;
      let progressL = this.$refs.track.offsetWidth; // 进度条总长
      music.addEventListener("timeupdate", () => {
        // 当前播放时间
        let compareTime = music.currentTime;
        for (let i = 0; i < that.lyricInfo.length; i++) {
          if (compareTime > parseInt(that.lyricInfo[i].time)) {
            const index = that.lyricInfo[i].index;
            if (i === parseInt(index)) {
              that.lyricIndex = i;
            }
          }
        }
        that.currentTime = commonJs.TimeToString(music.currentTime);
        that.audioProgress = music.currentTime / music.duration;
        that.thumbTranslateX = (that.audioProgress * progressL).toFixed(3);
      });
      music.addEventListener("ended", () => {
        switch (parseInt(that.playType)) {
          case 1: // 列表循环
            that.playIndex =
              that.playIndex + 1 >= that.songList.length
                ? 0
                : that.playIndex + 1;
            break;
          case 2: // 随机播放
            that.playIndex = Math.floor(Math.random() * that.songList.length);
            break;
          case 3: // 单曲循环
            break;
        }
        that.songInfo = that.songList[that.playIndex];
        this.getMusicList(that.songInfo.id);
        setTimeout(() => {
          this.$refs.rotate.style.animationPlayState = "running";
          music.play();
        }, 200);
      });
    },
    //播放与暂停
    playMusic() {
      if (this.playing) {
        // 播放中,点击则为暂停
        this.playing = false;
        this.$refs.rotate.style.animationPlayState = "paused";
        music.pause();
      } else {
        // 暂停中,点击则为播放
        this.playing = true;
        this.$refs.rotate.style.animationPlayState = "running";
        music.play();
      }
    },
    PlayListMusic(index) {
      this.playIndex = index;
      this.songInfo = this.songList[this.playIndex];
      this.getMusicList(this.songInfo.id);
      this.playing = true;
      this.drawer = false;
      setTimeout(() => {
        this.$refs.rotate.style.animationPlayState = "running";
        music.play();
      }, 200);
    },
    //点击进度条
    handleProgressClick(event) {
      let progressL = this.$refs.track.offsetWidth; // 进度条总长
      let clickX = event.offsetX;
      let time = (clickX / progressL).toFixed(2);
      this.setProgress(time);
    },
    setProgress(x) {
      music.currentTime = music.duration * x;
    },
    // 上一首
    skipBack() {
      this.skipFn("skipBack");
    },
    // 下一首
    skipForward() {
      this.skipFn("skipForward");
    },
    //上下首封装
    skipFn(type) {
      switch (parseInt(this.playType)) {
        case 2: // 随机播放
          this.playIndex = Math.floor(Math.random() * this.songList.length);
          break;
        default:
          if (type == "skipBack") {
            this.playIndex - 1 >= 0 ? this.playIndex-- : 0;
          } else {
            this.playIndex =
              this.playIndex + 1 >= this.songList.length
                ? this.songList.length - 1
                : this.playIndex + 1;
          }
          break;
      }
      this.songInfo = this.songList[this.playIndex];
      this.getMusicList(this.songInfo.id);
      this.playing = true;
      setTimeout(() => {
        this.$refs.rotate.style.animationPlayState = "running";
        music.play();
      }, 200);
    },
    //调节音量
    changeVolum(c) {
      music.volume = c / 100;
      if (music.volume == 0) {
        this.volumeType = "md-volume-off";
      } else {
        this.volumeType = "md-volume-up";
      }
    },
    //获取歌曲播放的URL信息
    getMusicList(id) {
      let that = this;
      axios.get("/musicController/getMusicURLInfo/" + id).then(function (res) {
        switch (res.code) {
          case "0000":
            that.songInfo.url = res.data.url;
            that.GetLyricList(res.data.lyric);
            break;
          case "1111":
            // showMessage("warning", res.message);
            break;
        }
      });
    },
    GetLyricList(lrc) {
      let lyricsObjArr = [];
      const regNewLine = /\n/;
      const lineArr = lrc.split(regNewLine); // 每行歌词的数组
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
      lineArr.forEach((item) => {
        if (item === "") return;
        const obj = {};
        const time = item.match(regTime);
  
        obj.lyric =
          item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
        obj.time = time
          ? commonJs.TimeToSeconds(time[0].slice(1, time[0].length - 1))
          : 0;
        obj.uid = Math.random().toString().slice(-6);
        if (obj.lyric === "") {
          console.log("这一行没有歌词");
        } else {
          lyricsObjArr.push(obj);
        }
      });
      this.lyricInfo = lyricsObjArr.map((item, index) => {
        item.index = index;
        return {
          ...item,
        };
      });
    },
  },
};
</script>
   
<style lang="scss" scoped>
.main-page {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(15, 15, 15, 0.4);
  overflow: hidden;
  .background-flitter {
    position: absolute;
    z-index: 0;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: 50%;
    filter: blur(8px);
    // margin: -20px;
    opacity: 0.7;
    overflow: hidden;
    box-sizing: border-box;
  }
  .play-mini {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 72px;
    // background: #fff;
    display: flex;
    align-items: center;
    padding: 6px 0;
    box-sizing: border-box;
    z-index: 10;
    .songInfo {
      min-width: 360px;
      max-width: 480px;
      position: relative;
      padding: 0 18px;
      box-sizing: border-box;
      display: flex;
      .poster {
        width: 52px;
        height: 52px;
        border-radius: 5px;
        margin-top: 4px;
        margin-right: 20px;
      }
      .info {
        min-width: 280px;
        height: 100%;
        line-height: 30px;
        font-size: 16px;
      }
    }
    .controls {
      width: 280px;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
      .status {
        width: 40px;
        height: 40px;
        margin-left: 36px;
        margin-right: 36px;
        cursor: pointer;
      }
    }
    .progress-bar {
      position: absolute;
      z-index: 10;
      top: -5px;
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      .progress-box {
        height: 100%;
        background: #40ce8f;
        position: relative;
      }
    }
    .right-botton {
      position: relative;
      width: 420px;
      height: 100%;
      display: flex;
      align-items: center;
      .text-div {
        color: #fff;
        height: 100%;
        line-height: 60px;
        margin-left: 5px;
        margin-right: 5px;
      }
      .playlist {
        position: absolute;
        right: 0px;
      }
      a {
        color: #333;
      }
    }
  }
  .song-cover-lyric {
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 72px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;
    .disc-continer {
      width: 50%;
      height: 100%;
      position: relative;
      .poster {
        position: relative;
        width: 280px;
        height: 280px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        left: 50%;
        top: 100px;
        margin-left: -140px;
        box-shadow: 0 0 0 12px rgba(255, 255, 255, 0.4);
        animation: animations1 12s linear infinite forwards;
        animation-play-state: paused;
        overflow: hidden;
        margin-bottom: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .song-name {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 32px;
        font-weight: 600;
        color: #fff;
        line-height: 40px;
      }
      .song-artistsName {
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        line-height: 40px;
        margin-top: 24px;
      }
      @keyframes animations1 {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    .lyric {
      width: 50%;
      height: 600px;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
<style lang="scss">
.ivu-drawer-body {
  .list-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    .songInfo {
      width: 100%;
      height: 42px;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      cursor: pointer;
      img {
        width: 36px;
        height: 36px;
        border-radius: 5px;
        margin-right: 12px;
      }
      .info {
        position: relative;
        width: 240px;
        height: 36px;
        line-height: 18px;
        .name {
          width: 100%;
          height: 18px;
          font-size: 14px;
          font-weight: 600;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 18px;
        }
        .singer {
          width: 100%;
          height: 18px;
          font-size: 12px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 18px;
        }
      }
    }
  }
}
</style>

  