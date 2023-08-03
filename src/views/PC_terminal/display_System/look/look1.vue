<template>
  <div class="test">
      <el-checkbox-group class="my_el-checkbox-group" v-model="checkList">
        <div v-for="item in list" :key="item.id">
          <el-checkbox  @change="changes"  :label="item.title" />
          <div v-if="item.show">
            <el-radio-group v-model="item.radio.radioValue"  class="ml-4">
              <el-radio v-for="post in item.radio.radioList"  :key="post" :label="post" size="large">{{post}}</el-radio>
            </el-radio-group>
            <div class="text">
              <div class="my_label">查勤情况</div>
                <el-input
                  v-model="item.textarea"
                  :rows="5"
                  type="textarea"
                  placeholder="Please input"
                />
            </div>
          </div>
        </div>
      </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'test',
  data(){
    return{
      list: [
        {
        id: 1,
        title: 'A',
        show: false,
        radio: {
          radioValue: '',
          radioList: [ '单选1','单选2']
        },
        textarea: ''
        },
        {
        id: 2,
        title: 'B',
        show: false,
        radio: {
          radioValue: '',
          radioList: [ '单选1','单选2']
        },
        textarea: ''
        },
        {
        id: 3,
        title: 'C',
        show: false,
        radio: {
          radioValue: '',
          radioList: [ '单选1','单选2']
        },
        textarea: ''
        }
      ],
      checkList: []
    }
  },
  created(){

  },

  methods:{
    changes() {
      this.list.forEach(v => {
        if(this.checkList.includes(v.title)) {
        v.show = true
        } else{
        v.show = false
        }
      })
      
    }
  }
}
</script>

<style scoped>
 .my_el-checkbox-group {
  display: flex;
  flex-direction: column;
  font-size: 16px;

  
  
 }
 .text {
   display: flex;
  }
  .my_label {
   width: 100px;
  }
  .el-checkbox {
   display: block;
  }
</style>
