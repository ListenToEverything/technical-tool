
<template>
  <div>
    <input type="file" @change="uploadFile" />
  </div>
</template>

<script>

export default {

  methods: {

    async uploadFile (e) {
      const file = e.target.files[0]

      this.sendFile(file)
    },

    // 文件上传方法

    sendFile (file) {
      let formdata = new FormData()

      formdata.append('file', file)

      console.log('普通上传文件', formdata)

      //   Http.post('/upload/file', formdata, { 'Content-Type': 'multipart/form-data' })
    }

  }

}

</script>
