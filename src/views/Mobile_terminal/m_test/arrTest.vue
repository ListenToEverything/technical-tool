<template>
  <div class="ReservedSucceed" ref="domm">
    <p @click="arrFor">数组循环</p>
    <p @click="arrtest">数组去重</p>

    <p @click="test">数组比大小</p>
      
    <p @click="cloneTest">...展开运算符</p>

    <p >仓库数据管理</p>

    <div>
      <p>{{ $store.state.name }}</p>
      <p>{{ $store.state.sex }}</p>
      <p>{{ $store.state.age }}</p><br>
      <p>{{ name }}{{ sex }}{{ age }}</p>
    </div>

    <p>计数器{{ count }}</p><br>
    <button @click="addAcunt">+1</button><button @click="reduceAcunt">-1</button>

    <div>
      <p>{{ $store.getters.getInfo }}</p>
      {{ getInfo }}
    </div>

    <div>
      {{"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate)}}
    </div>

    

  </div>
</template>

<script>
import { mapActions,mapGetters,mapMutations, mapState } from "vuex";
export default {
  computed:{
    ...mapState(["name","sex","age","count"]),
    ...mapGetters(["getInfo"])
  },
  data() {
    return {
      rate:5,
      dataList: [], // 列表数据
      arrstr:""
    }
  },
  created() {
    
  },
  methods: {
   
    // Actions 操作
    ...mapActions(["asyncAddCount","asyncReduce"]),
    //Mutatoins 操作
    ...mapMutations(["addCount","reduce"]),
    //计数器 +
    addAcunt(){
      //Mutatoins 第一种
      // this.$store.commit("addCount",1)
      //Mutatoins 第二种
      // this.addCount(1)
      //Actions 第一种
      // this.$store.dispatch("asyncAddCount",10)
      //Actions 第二种
      this.asyncAddCount(5)
    },
    //计数器 -
    reduceAcunt(){
      //Mutatoins 第一种
      // this.$store.commit("reduce")
      //Mutatoins 第二种
      // this.reduce()
      //Actions 第一种
      // this.$store.dispatch("asyncReduce")
      //Actions 第二种
      this.asyncReduce()
    },
    //数组循环
    arrFor(){
      let arr = [1,2,3];

      // let tt= arr.filter(function(i){

      // return i > 1;

      // })


      let tt = arr.some(function(i){

      return i > 1;

      })
      let ad = arr.reduce(function(i,j){

      return i + j;

      })
      console.log("结果",tt,ad)
    },
    //数组去重
    arrtest(){
      //利用set() 对象去重，然后利用Array.from复制到数组中
      const arr = [1, 2, 2, 'abc', 'abc', true, true, false, false, undefined, undefined, NaN, NaN]

      //一行代码去重
      console.log("一行代码去重",[...new Set(arr)])



      // debugger
      // var newArr=Array.from(new Set(arr)) 

      // console.log("结果",new Set() ,new Array(),newArr)
      // console.clear()
      //利用两层循环，然后用splice截取出来
      // let len = arr.length
      // for (let i = 0; i < len; i++) {
      //   for (let j = i + 1; j < len; j++) {
      //     if (arr[i] === arr[j]) {
      //       arr.splice(j, 1)
      //       len-- // 减少循环次数提高性能
      //       j-- // 保证j的值自加后不变
      //     }
      //   }
      // }
      // arr.forEach((i,index)=>{
      //   arr.map((m,mndex)=>{
      //     if(index!==mndex&&i===m){
      //       arr.splice(index, 1)
      //     }
      //   })
      // })
      // console.log("结果1",arr)
      // 利用数组的indexOf,includes方法
      // var newArr=[]
      // arr.forEach(i=>{
      //   if(newArr.indexOf(i)===-1){
      //     newArr.push(i)
      //   }
      // })
      // console.log("结果2",newArr)
      // var newArr=[]
      // arr.forEach(i=>{
      //   if(!newArr.includes(i)){
      //     newArr.push(i)
      //   }
      // })
      // console.log("结果3",newArr)
      
      // var newArr=arr.filter((i,index)=>{
      //   return arr.indexOf(i)===index
      // })
      // console.log("结果4",newArr)

      // 利用map,或者对象的唯一性
      const map=new Map()
      var newArr=[]
      arr.forEach(i=>{
        if(!map.has(i)){
          map.set(i,true)
          newArr.push(i)
        }
      })
      console.log("结果5",newArr)

      var newArr=[]
      const obj={}
      arr.forEach(i=>{
        if(!obj[i]){
          obj[i]=true
          newArr.push(i)
        }
      })
      console.log("结果6",newArr)
    },
    //更改this 指向
    test(){
      var arr = [1, 66, 3, 99, 4];
      var arr1 = ['red', 'pink'];
      let str="dfghjkltyui"
      
      console.log("测试",...str)

      // var max = Math.max.apply(null, arr); // 在这里无需改变this指向，但是最好不要写null，在严格模式下会有问题，所以还是指向Math数学对象
      var max = Math.max.apply(Math, arr);
      var min = Math.min.apply(Math, arr);

      // var max = Math.max( ...arr);
      // var min = Math.min( ...arr);

      console.log(max,min)
    },
    //展开运算符处理深拷贝
    cloneTest(){
      let obj={
        name:"jekon",
        sex:"男",
        age:19,
        arr:[1,3.3,4,5,6]
      }
      console.log("原始",obj)

      let obj1={...obj}
      obj1.arr[1]="玉虚"
      console.log("玉虚",obj1)

      let obj2={...obj,arr:[...obj.arr]}
      obj2.arr[2]="太上"
      console.log("太上",obj2)
    },
    
    
  }
}
</script>

<style lang="scss" scoped>
.ReservedSucceed {
  height: 100%;
  background-color: white;
  // color: rgba(255,255,255,1);
  
}
</style>