<template>
  <div class="p20">
    <p class="logo mt2">
      <img :src="logoimg" alt />
    </p>
    <div class="memberlogin mt4">
      <p>会员登录</p>
      <p>
        <i class="el-icon-user"></i>
        <input type="text"  v-model="mobile" maxlength="11" placeholder="请输入手机号"/>
      </p>
      <p class="f-flex">
        <i class="el-icon-lock"></i>
        <input type="password" v-model="password" placeholder="请输入登录密码" />
        <span @click="forget">忘记密码</span>
      </p>
      <p>
        <el-button type="primary" @click="login">立即登录</el-button>
      </p>
      <p><span @click="goset">前往注册→</span></p>
      <p>
        <!-- <a href="https://5cando.com/jezhnk">下载APP  ></a> -->
        <a :href="link_href"> 下载APP> </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
           mobile:localStorage.getItem('mobile') || '',
           password:'',
           logoimg:'',
           link_href: ''
      }
    },
    mounted() {
      // 判断登录状态，进行页面的跳转
        let islogin=this.getCookie3("openid") || false;
        if(islogin!=false){
          this.$router.push({name:'index'})
        }
        this.logo()
    },
    methods:{
      logo(){
        this.$api.Post('logo').then(res=>{
          // console.log(res)
          this.logoimg = res.result.logo
          this.link_href = res.result.xiazai
        })
      },
      login(){
        if(this.mobile==''){
            this.$toast('请输入手机号')
            return;
        }
        if(this.password==''){
         this.$toast('请输入密码')
         return;
        }
        this.$api.Post('login',{
            mobile:this.mobile,
            password:this.password
        }).then(res=>{
          console.log(res)
            if(res.status==1){
            this.$toast('登录成功')
                //将值存到本地
                this.setCookie('openid',res.result.openid)
                this.$router.push({name:'index'})
            }else{
                   this.$toast(res.result.message)
            }
        })
      },
      //注册
      goset(){
        this.$router.push({name:'register'})
      },
     //忘记密码
     forget(){
         this.$router.push({name:'forget'})
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
      setCookie(c_name,value,expire) {
          var date=new Date()
          date.setSeconds(date.getSeconds()+expire)
          document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
      }
    }
};
</script>

<style lang="less">
.logo {
  text-align: center;
}
.logo img {
  width: 100px;
}
.memberlogin {
  color: #58a1eb;
  > p:nth-child(1) {
    font-weight: 700;
    font-size: 20px;
  }
  > p:nth-child(2) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 8px;
    margin-top: 30px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(3) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
    height: 50px;
    input {
      width: 60%;
      height: 100%;
    }
    span {
      padding: 14px 10px;
    }
  }
  > p:nth-child(4) {
    margin-top: 40px;
    button {
      width: 100%;
      border-radius: 80px;
      padding: 15px;
    }
  }
    > p:nth-child(5) {
      margin-top: 10px;
   text-align: right;
    color:#d54c4e;
    font-weight: 500;
  }
  >p:nth-child(6){
      margin-top: 30px;
      text-align: center;
      color:#d54c4e;
      font-size: 18px;
      font-weight: 700;
      i{
          padding: 0;
      }
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
a{
  color: red;
}
</style>
