
<template>
  <div>
    <input type="file" @change="uploadFile" />
  </div>
</template>

<script>

// import Http from '@/api/http.js'

import SparkMD5 from 'spark-md5'

export default {

  data () {
    return {
      remainChunks: [], // 剩余切片
      chunkSize: 5 * 1024 * 1024 // 切片大小 5M

    }
  },

  methods: {
    async uploadFile (e) {
      const file = e.target.files[0]
      if (file.size < this.chunkSize) {
        // 简单上传
        this.sendFile(file)
      } else {
        // 切片上传
        this.createFileMd5(file).then(async hash => {
          console.log('获取到hash值', e.target.files[0], this.chunkSize, hash)
          const chunkInfo = await this.cutBlob(file, hash)
          this.remainChunks = chunkInfo.chunkArr

          for (let i = 0; i < this.remainChunks.length; i++) {
            this.sendChunk(this.remainChunks[i])
            /*
            文件合并 三种方法
            1.前端发送切片完成后，发送一个合并请求，后端收到请求后，将之前上传的切片文件合并。
              特点：好处就是流程比较清晰，代价在于多发了一次请求，就是你需要去多写一个回调函数。

            2.后台记录切片文件上传数据，当后台检测到切片上传完成后，自动完成合并。
              特点：方案二比方案一少了一次请求，而且呢，逻辑也都挪到了后端去做，是一种比较好的方式。

            3.创建一个和源文件大小相同的文件，根据切片文件的起止位置直接将切片写入对应位置。
              特点：方案三比较好的，相当于直接省略了文件合并的步骤，
            */
          }
        })
      }
    },

    // 单个文件上传方法
    sendFile (file) {
      let formdata = new FormData()

      formdata.append('file', file)

      console.log('普通上传文件', formdata)

      //   Http.post('/upload/file', formdata, { 'Content-Type': 'multipart/form-data' })
    },

    // 计算文件的hash值
    createFileMd5 (file) {
      const spark = new SparkMD5.ArrayBuffer() // 文件hash处理

      return new Promise((resolve) => {
        const reader = new FileReader()

        reader.readAsArrayBuffer(file)

        reader.addEventListener('loadend', () => {
          const content = reader.result

          // 生成文件hash
          spark.append(content)

          const hash = spark.end()

          resolve(hash)
        })
      })
    },

    // 对文件进行切片
    cutBlob (file, hash) {
      const chunkArr = [] // 所有切片缓存数组

      const chunkNums = Math.ceil(file.size / this.chunkSize) // 切片总数

      return new Promise((resolve) => {
        let cur = 0

        for (let i = 0; i < chunkNums; i++) {
          console.log('每个hash值', hash)
          // 如果已上传则跳过
          let contentItem = file.slice(cur, cur + this.chunkSize)

          chunkArr.push({

            index: i,

            hash,

            total: chunkNums,

            name: file.name,

            size: file.size,

            chunk: contentItem

          })

          cur += this.chunkSize
        }

        resolve({

          chunkArr

        })
      })
    },

    // 切片上传
    async sendChunk (item) {
      let formdata = new FormData()

      formdata.append('file', new File([item.chunk], item.name))

      formdata.append('hash', item.hash)

      formdata.append('index', item.index)

      formdata.append('total', item.total)

      formdata.append('name', item.name)

      console.log('切片上传文件', item)
      // eslint-disable-next-line max-len

      // await Http.post('/upload/fileChunk', formdata, { 'Content-Type': 'multipart/form-data' })
    }

  }
}
</script>
