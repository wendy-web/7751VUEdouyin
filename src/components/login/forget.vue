<template>
  <div class="p20">
    <p class="logo mt2">
      <img :src="logoimg" alt />
    </p>
    <div class="memberset1 mt4">
      <p>找回密码</p>
      <p>
        <i class="el-icon-phone"></i>
        <input
          type="text"
          v-model="zcdata.mobile"
          maxlength="11"
          placeholder="请输入手机号"
        />
      </p>
      
      <p class="f-flex">
        <i class="el-icon-orange"></i>
        <input type="text" v-model="zcdata.verifycode" placeholder="请输入验证码" />
        <el-button type="primary" @click="getcode" :disabled="iscode"
          >{{ iscode ? countdown_text : "获取验证码" }}
        </el-button>
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <input
          type="password"
          v-model="zcdata.pwd"
          placeholder="请输入新密码"
        />
      </p>
      <p>
        <i class="el-icon-lock"></i>
        <input
          type="password"
          v-model="password1"
          placeholder="请确认新密码"
        />
      </p>
      <p>
        <el-button type="primary" @click="save">保存</el-button>
      </p>
      <p>
        <el-button type="primary" @click="back">返回登录</el-button>
      </p>
      <!-- <p>下载APP ></p> -->
      <p><a href="https://fenfa666.com/s/6524">下载APP  ></a> ></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zcdata: {
        type: 1,
        mobile: "",
        pwd: "",
        verifycode: "",
      },
      password1:'',
      iscode: false,
      logoimg:'',
      countdown_text: '60秒后获取',  // 倒计时文字
    };
  },
  mounted() {
    this.logo();
  },
  methods: {
     logo(){
        this.$api.Post('logo').then(res=>{
           this.logoimg=res.result.logo
        })
      },
    back() {
      this.$router.push({ name: "login" });
    },
    // 保存
    save() {
      var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;

      if (this.zcdata.mobile == "") {
        this.$toast("请输入手机号码");
        return;
      }
      if (!isMobile.test(this.zcdata.mobile)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      if (this.zcdata.verifycode == "") {
        this.$toast("请输入验证码");
        return;
      }
      if (this.zcdata.pwd == "") {
        this.$toast("请输入新密码");
        return;
      }
      if (this.zcdata.pwd != this.password1) {
        this.$toast("两次输入密码不一致");
        return;
      }
      this.$api.Post("register", this.zcdata).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.$router.push({ name: "login" });
        }
      });
    },
    //获取验证码
    getcode() {
      var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (this.zcdata.mobile == "") {
        this.$toast("请输入手机号码");
        return;
      }
      if (!isMobile.test(this.zcdata.mobile)) {
        this.$toast("请输入正确的手机号码");
        return;
      }
      this.$api.Post("forgetcode", { mobile: this.zcdata.mobile }).then(res => {
        this.$toast(res.result.message);
        if (res.status == 1) {
          this.iscode = true;
        }
      });


      this.$api.Post('sendcode', {
          mobile: this.zcdata.mobile
      }).then(res => {
          this.$toast(res.result.message)
          if (res.status == 1) {
              this.iscode = true;
              let countdown = 60;
              let timer = setInterval(()=>{
                  countdown--;
                  if(countdown < 0){
                      clearInterval(timer)
                      this.iscode = false;
                      countdown = 60;
                      return;
                  }
                  this.countdown_text = countdown + '秒后获取';
              },1000)
          }
      })


    },
    
    
    randomColor() { //得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    },
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
.memberset1 {
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
      width: 80%;
      height: 100%;
    }
  }
  
  > p:nth-child(4) {
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
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(5) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(6) {
    background: #f7f7f7;
    //   padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    height: 50px;
    input {
      width: 80%;
      height: 100%;
    }
  }
  > p:nth-child(7) {
    margin-top: 20px;
    button {
      width: 100%;
    }
  }
  > p:nth-child(8) {
    margin-top: 10px;
    button {
      width: 100%;
    }
  }

  > p:last-child {
    margin-top: 30px;
    text-align: center;
    color: #d54c4e;
    font-size: 18px;
    font-weight: 700;
  }
  i {
    font-size: 22px;
    padding: 14px 10px;
  }
}
</style>
