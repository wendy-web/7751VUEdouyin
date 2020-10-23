<!--  -->
<template>
<div class="weblogin f-flex">
    <div>
       <p>
           <img :src="logoimg" alt="">
       </p>
       <p>账号登录</p>
        <p>
        <i class="el-icon-user"></i>
        <input type="text"  v-model="mobile"  placeholder="请输入登录账户"/>
      </p>
      <p class="f-flex">
        <i class="el-icon-lock"></i>
        <input type="password" v-model="password" placeholder="请输入登录密码" />
      </p>
      <p>
        <el-button type="primary" @click="login">立即登录</el-button>
      </p>
    </div>
</div>
</template>

<script>
export default {
data() {
return {
logoimg:'',
mobile:'',
password:''
}
},
//生命周期 - 创建完成（访问当前this实例）
created() {
  let isweb=localStorage.getItem('webopenid') || false;
  if(isweb!==false){
     this.$router.replace({name:'webindex'})
  }
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
 this.logo()
},
methods: {
     logo(){
        this.$api.Post('logo').then(res=>{
           this.logoimg=res.result.logo
        })
      }, 
      login(){
          if(this.mobile==''){
              this.$toast('请输入账户');
              return
          }
          if(this.password==''){
              this.$toast('请输入密码');
              return
          }
          this.$api.Post('login',{
              mobile:this.mobile,
              password:this.password,
              web:'pc'
          }).then(res=>{
              if(res.status==0){
                 this.$toast(res.result.message)
              }
              if(res.status==1){
                   this.$toast('登录成功')
                   localStorage.setItem('webopenid',res.result.openid)
                 this.$router.push({name:'webindex'})
              }
          })
        
      } ,
}
}
</script>
<style lang="less">
.weblogin{
    background: #1e95c9;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    justify-items: center;
    >div{
        padding: 20px;
        background: #fff;
        border-radius:4px ;
        >p:nth-child(1){
             img{
            width: 100px;
        }
          text-align: center;
        }
        >p:nth-child(2){
            font-weight: 700;
        }
        >p:nth-child(3){
            background: #f7f7f7;
            border-radius: 4px;
            height: 35px;
            margin-top: 15px;
            input{
                height: 100%;
                 width: 80%;
            }
            i{
                color: #1e95c9;
                padding: 6px 5px;      
                font-size: 20px;      
            }
        }
          >p:nth-child(4){
               margin-top: 15px;
            background: #f7f7f7;
            border-radius: 4px;
            height: 35px;
              line-height:35px ;
            input{
                height: 100%;
                width: 80%;
            }
            i{
                color: #1e95c9;
                padding: 0 5px;    
                 font-size: 20px;    
                 padding-top: 6px;
                         
            }
        }
        >p:nth-child(5){
            margin-top: 15px;
            button{
                width: 100%;
            }
        }
       
    }
}
</style>