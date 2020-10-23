<template>
  <div>
      <div class="j-btm">
           <router-view />
      </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item name="index" @click="index" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="vip" @click="myvip" icon="sign">VIP</van-tabbar-item>
        <van-tabbar-item name="task" @click="mytask" icon="sign">任务</van-tabbar-item>
        <van-tabbar-item name="setmeal" @click="setmeal" icon="apps-o">套餐</van-tabbar-item>
        <!-- <van-tabbar-item name="setting" icon="gift-o" @click="yydb">商城</van-tabbar-item> -->
        <van-tabbar-item name="personal" @click="personal" icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.name
    };
  },
 watch: {
      active(val) {
      
      },
       $route(to,from){
           this.active=to.name
  }
    },
    created(){
    
    },
    methods:{
        myvip(){
            this.$router.push({name:'vip'})
        },
        mytask(){
            this.$router.push({name:'task'})
        },
        setmeal(){
            this.$router.push({name:'setmeal'})
        },
        index(){
            this.$router.push({name:'index'})
        },
        personal(){
            this.$router.push({name:'personal'})
        },
        yydb(){
             let islogin=this.getCookie3("openid") || false;
             if(islogin!=false){
                location.href='http://7428.chac.xyz/app/index.php?i=4&c=entry&do=index&m=weliam_indiana'
             }else{
                this.$router.push({name:'/'})
             }
           
        },

           getCookie3(name){
        //可以搜索RegExp和match进行学习
        var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    },
    
};
</script>

<style lang="less">
.van-tabbar-item__icon{
    font-size: 30px;
}
.van-tabbar{
    // height: 70px;
    // border-top: 2px solid #ccc;
}
.j-btm{
    margin-bottom: 80px;
}
</style>