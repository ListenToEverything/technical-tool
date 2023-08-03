
<template>
  <div>
    <input type="file" @change="uploadFile" />
  </div>
</template>

<script>

import SparkMD5 from 'spark-md5'

export default {

  data () {
    return {
      remainChunks: [], // 剩余切片
      chunkSize: 5 * 1024 * 1024, // 切片大小 5M
      uploadedChunkSize: 0,
      file: ''
    }
  },

  methods: {
    async uploadFile (e) {
      const file = e.target.files[0]
      this.file = file
      if (file.size < this.chunkSize) {
        // 简单上传
        this.sendFile(file)
      } else {
        // 断点续传
        this.sendBlob()
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
      return new Promise((resolve) => { resolve() })
      // eslint-disable-next-line max-len

      // await Http.post('/upload/fileChunk', formdata, { 'Content-Type': 'multipart/form-data' })
    },

    // 请求并发处理
    sendRequest (arr, max = 6) {
      let fetchArr = []

      let toFetch = () => {
        if (!arr.length) {
          return Promise.resolve()
        }

        const chunkItem = arr.shift()

        const it = this.sendChunk(chunkItem)

        it.then(() => {
          // 成功从任务队列中移除
          fetchArr.splice(fetchArr.indexOf(it), 1)
        }, err => {
          // 如果失败则重新放入总队列中
          arr.unshift(chunkItem)
          console.log(err)
        })

        fetchArr.push(it)

        let p = Promise.resolve()

        if (fetchArr.length >= max) {
          p = Promise.race(fetchArr)
        }

        return p.then(() => toFetch())
      }

      toFetch()
    },

    // 询问下载进度的接口
    sendBlob () {
      this.createFileMd5(this.file).then(async hash => {
        // let { data } = await this.getUploadedChunks(hash)
        // let uploaded = data.data.chunks
        console.log()

        let uploaded = []

        this.uploadedChunkSize = uploaded.length

        const chunkInfo = await this.cutBlob(this.file, hash, uploaded)

        this.remainChunks = chunkInfo.chunkArr

        this.sendRequest(this.remainChunks, 6)
      })
    }

  }
}
</script>
