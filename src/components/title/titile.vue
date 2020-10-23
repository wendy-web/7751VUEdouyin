<!--  -->
<template>
<div>
   <div class="publicnav p20">
       <p><span @click="page(index)" v-for="(item,index) in text" :key="index">{{item}} <i v-show="index!=text.length-1">/</i> </span> </p>
        <p>{{text[text.length-1]}}</p>
   </div>
</div>
</template>

<script>
export default {
    props: ['text'],
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods: {
    page(e){
        if(e==0){
            this.$router.push({name:'index'})
        }
    }
}
}
</script>
<style lang="less">
 .publicnav{
     background: #ffffff;
     border-bottom: 1px solid #e9e9e9;
     >p:nth-child(1){
       font-size: 16px;  
       i{
          margin: 0 15px;   
       }
     }
     >p:nth-child(2){
         font-size: 24px;
         margin-top: 15px;
         color: #000000;
     }
 }
</style>