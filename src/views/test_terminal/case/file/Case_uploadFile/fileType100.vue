<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
const SIZE = 10 * 1024 * 1024 // 切片大小（10MB）

export default {
  data: () => ({
    // 存放文件信息
    container: {
      file: null,
      hash: null
    },
    data: [], // 用于存放加工好的文件切片列表
    hashPercentage: 0 // 存放hash生成进度
  }),
  methods: {
    // 获取上传文件
    handleFileChange (e) {
      const [file] = e.target.files
      if (!file) {
        this.container.file = null
        return
      }
      this.container.file = file
    },

    // 生成文件切片
    createFileChunk (file, size = SIZE) {
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + size) })
        cur += size
      }
      return fileChunkList
    },

    // 生成文件hash
    calculateHash (fileChunkList) {
      return new Promise(resolve => {
        this.container.worker = new Worker('/hash.js')
        this.container.worker.postMessage({ fileChunkList })
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data
          // 可以用来显示进度条
          this.hashPercentage = percentage
          if (hash) {
            resolve(hash)
          }
        }
      })
    },

    // 切片加工（上传前预处理 为文件添加hash等）
    async handleUpload () {
      if (!this.container.file) return
      // 切片生成
      const fileChunkList = this.createFileChunk(this.container.file)
      // hash生成
      this.container.hash = await this.calculateHash(fileChunkList)
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        // 这里的hash为文件名 + 切片序号，也可以用md5对文件进行加密获取唯一hash值来代替文件名
        hash: this.container.hash + '-' + index
      }))
      await this.uploadChunks()
    },

    // 上传切片
    async uploadChunks () {
      const requestList = this.data
        // 构造formData
        .map(({ chunk, hash }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('filename', this.container.file.name)
          return { formData }
        })
        // 发送请求 上传切片
        .map(async ({ formData }) => { }
          //   uploadRequest(formData) // 这里的uploadRequest是你封装好的上传文件切片接口请求方法
        )
      await Promise.all(requestList) // 等待全部切片上传完毕
      //   await merge(this.container.file.name) // 发送请求合并文件
    }
  }
}
</script>
