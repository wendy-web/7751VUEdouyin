<template>
  <div>
    <div class="nav">
        <div class="nav_box">
          <div class="nav_item">
            <div class="nav_title">任务记录</div>
            <div class="nav_notice">本数据官方提供</div>
          </div>
          <div class="nav_item">
            <div class="nav_title num-title">{{num}}</div>
            <div class="nav_notice" style="color: #333333;text-align:right;">剩余可用次数</div>
          </div>
          <img src="../../assets/img/much-sbg.png" alt="" class="nav_sbg">
        </div>

        <ul class="list">
          <li
           v-for="(item, index) in lis"
           :key="index"
           :class="active == index? 'active' : ''"
           @click="selectLis(index)"
          >
            <div></div>{{item.text}}
          </li>
        </ul>
    </div>
    
    <div class="wrapper">
      <div
        class="meallist"
        v-for="(item, index) in setmeallist"
        :key="index"
      >
        <div class="mea_title">
          <p>抖音</p>
          <p>X</p>
        </div>
        
        <div>
          <p>{{ item.money }}元</p>
          <p>任务要求：{{item.rwsm}}</p>
          <p>任务链接：
              <!-- @click="apiLink(item.rwurl)" -->
            <!-- <span class="openLink" @click="inLink" v-if="item.status == 0">打开视频链接</span> -->
            <span
              class="openLink"
              v-if="item.status == 0"
              v-clipboard:copy="item.rwurl"
              v-clipboard:success="copySuc"
              v-clipboard:error="copyErr"
            >
                打开视频链接
            </span>
            <span class="openLink grayOpen" v-else>打开视频链接</span>
          </p>
          <p>创建：{{item.addtime}}</p>
          <p v-if="item.status > 1">审核：{{item.shtime}}</p>
          <div v-if="item.status == 0">
            <p class="addImg"  v-show="item.jietu_status == 0">
              增加任务完成截图
              <input type="file" ref='file' @change="uploadImg(index, item.id)" :data-type='item.id'>
            </p>
            <p style="color:gray"  v-show="item.jietu_status != 0">等待提交...</p>
            <button class="submitBtn" @click="Submit(item.id)"></button>
          </div>
          <div class="wait" v-if="item.status == 1">
            <img src="../../assets/img/img_icon/wait.png" alt="">
            <span>等待审核~</span>
          </div>
          <img class="icon_img" src="@/assets/img/img_icon/wait_si.png" alt="" v-if="item.status == 1">
          <img class="icon_img" src="@/assets/img/img_icon/succ_si.png" alt="" v-if="item.status == 2">
          <img class="icon_img" src="@/assets/img/img_icon/fild_si.png" alt="" v-if="item.status == 3">
        </div>
      </div>
    </div>
    <!-- 确认信息 -->
    <van-dialog v-model="xinx" show-cancel-button @confirm="confirms">
      <div class="xinx">
        <p><van-icon name="question"/> 确定购买该套餐吗？</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import CallApp from 'callapp-lib';
export default {
  data() {
    return {
      setmeallist: "",
      reward: "",
      xinx: false,
      id: "",
      lis:[
        {
          text:"进行中",
          type:0
        },
        {
          text:'审核中',
          type:1
        },
        {
          text:'已完成',
          type:2
        },
        {
          text:'已失效',
          type:3
        },
      ],
      active: 0,
      inputLis: [],
      imgObj:{},
      num: 0      
    };
  },
  mounted() {
    this.gataLis()
    // this.inLink()
  },
  methods: {
    inLink(){
      const option = {
        scheme: {
          protocol: 'snssdk1128',
        },
        intent: {
          package: 'com.ss.android.ugc.aweme',//抖音的包名
          scheme: 'snssdk1128',
        },
        // universal: {
        //   host: 'oia.zhihu.com/question/270839820/answer/477722658',
        //   pathKey: 'action',
        // },
        appstore: 'https://itunes.apple.com/cn/app/id1142110895',
        yingyongbao: '//a.app.qq.com/o/simple.jsp?pkgname=com.ss.android.ugc.aweme',
        fallback: 'https://www.douyin.com/',//抖音的下载链接
        timeout: 2000,
      };
      const lib = new CallApp(option);
      lib.open({ path: '' });
    },
    copySuc(e) {
        // this.$toast("复制成功");
        // alert("复制成功")
        var turlns = e.text
        this.apiLink(turlns)

    },
    // 复制失败
    copyErr() {
        // this.$toast("复制失败");
    },

    // 进行抖音
    apiLink(turlns){
      //Android中的使用方法如下：
      var UA = navigator.userAgent;
      var system = ""
      if (UA.match(/iPad/) || UA.match(/iPhone/) || UA.match(/iPod/)) {
        // 为ios执行
        system = "pay-douyin.snssdk.com"
      }else{
        // 为安卓执行
        system = "com.ss.android.ugc.aweme"
      }
      //同步返回结果：
      var installed = api.appInstalled({
          sync: true,
          appBundle: system
      });
      if (installed) {
          //应用已安装
          if (UA.match(/iPad/) || UA.match(/iPhone/) || UA.match(/iPod/)) {
            api.openApp({
              iosUrl: turlns
            });
          } else{
            api.openApp({
              iosUrl:"com.ss.iphone.ugc.Aweme",//ios抖音包名
              androidPkg: 'com.ss.android.ugc.aweme',
              mimeType: 'text/html',
              uri: turlns
            }, function(ret, err) {
              // if (ret) {
              //     alert(JSON.stringify(ret));
              //     // window.location.href='https://v.douyin.com/JBT1y5q/';
              // } else {
              //     alert(JSON.stringify(err));
              //     // window.location.href='https://v.douyin.com/JBT1y5q/';
              // }
          });
        }
      } else {
          //应用未安装
          // alert("未安装")
          window.location.href='https://www.douyin.com/';
      }
    },
    
    gataLis(){
      var that = this;
      this.$api.Post("renwu_log", { status: that.active}).then(res => {
        if (res.status == 1) {
          console.log(res)
          this.setmeallist = res.result.list;
        }
        // 加载之后 得到input数组
        if(that.active){
            this.$nextTick((callback)=>{
              this.inputLis = this.$refs.file
          })
        }
      });
      this.$api.Post("sumcredit").then(res => {
          if(res.status == 1){
              that.num = res.result.num ? res.result.num : 0 ;
          }
      });
    },
    // 分类的选择
    selectLis(index) {
      this.active = index
      this.gataLis()
    },
    // 上传到支付凭证
    uploadImg(index, id){
      var that = this;
      if (typeof FileReader == "undifined") {
          //判断浏览器是否支持filereader
          result.innerHTML = "<p>抱歉，你的浏览器不支持 FileReader</p>";
          return false;
      }
      var file = this.$refs.file[index].files[0];
      if (!/image\/\w+/.test(file.type)) {
          //判断获取的是否为图片文件
          alert("请确保文件为图像文件");
          return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var imgURL;
      reader.onload = e => {
          let {
              result
          } = e.target;
          // console.log(result)
          var imgLis = 'img' + index;
          that.imgObj[imgLis] = result
          this.$api.Post("addimge",{
            id: id,
            thumb: result
          }).then(res => {
            console.log(res)
            if(res.status == 1){
              this.$toast(res.result.message)
              this.$router.go(0);
            } else{
              this.$toast(res.result.message)
            }
        });
      };
    },
    // 提交任务
    Submit(id) {
      this.$api.Post("tijiao_renwu", { id: id }).then(res => {
        if (res.status == 1) {
            this.$toast(res.result.message);
            this.$router.go(0);
        } else{
          this.$toast(res.result.message);
        }
      });
    },
    confirms() {
      this.xinx=false;
      setTimeout(()=>{
         this.$api.Post("pay_setmeal", { id: this.id }).then(res => {
          if (res.status == 0) {
            this.$toast(res.result.message);
          }

          if (res.status == 1) {
      
            this.$toast('购买成功')
              this.$router.go(0);
          }
        });
      },500)
     
    }
  }
};
</script>

<style lang="less">
.j-btm>div::before{
  content: '';
  display: table;
  clear: both;
}
.openLink{
  background: #3077B4;
  color: #fff;
  border-radius: 3px;
  padding: 0 5px;
}
.grayOpen{
  background: darkgrey;
}
// 匹配记录--余额
.nav{
  position: fixed;
  top: 0px;
  width: 100%;
  background-image: linear-gradient(to bottom, #BBC4D4, #fff);
  z-index: 1;
}
.nav_box {
  padding: 0px 10px;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .nav_title {
    font-size: 25px;
    font-weight: 600;
    color:  #333333;
  }
  .nav_notice {
    font-size: 13px;
    margin-top: 15px;
    color: #666;
  }
  .num-title {
    text-align: right;
  }
  .nav_sbg{
    width: 40%;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0px;
  }
}
.list{
  width: 100%;
  height: 1.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  li{
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #ddd;
      box-sizing: border-box;
      margin-right: 5px;
    }
  }
  .active{
    div{
      background: url(../../assets/img/img_icon/active.png) no-repeat;
      background-size: 100% 100%;
      border: none;
    }
  }
}
.wrapper{
  width: 95%;
  margin: 4.5rem auto 1.5rem;
}
.mealimg {
  text-align: center;
  
  img {
    width: 200px;
  }
}
.meallist {
  border-radius: 8px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  overflow: hidden;
  .mea_title{
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    background-image: linear-gradient(to right, #DBDFEA, #CED6E1);
  }
  > div:nth-child(2) {
    padding: 0 15px;
    font-size: 14px;
    line-height: 30px;
    position: relative;
    > p:nth-child(1) {
      position: absolute;
      right: 5%;
      top: 50%;
      font-size: 25px;
      transform: translateY(-50%);
      font-weight: bold;
    }
    .addImg{
      display: inline-block;
      padding: 0 15px;
      width: auto;
      border-radius: 20px;
      color: #fff;
      background: #F14E17;
      border:1px dashed #a53610;
      line-height: 0.65rem;
      font-size: 12px;
      position: relative;
      input{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 9;
        opacity: 0;
      }
    }
    .submitBtn{
      display: block;
      width: 70%;
      height: 1rem;
      margin: 10px auto;
      background: url(../../assets/img/img_icon/subit.png) no-repeat;
      background-size: 100% 100%;
    }
    .wait{
      display: flex;
      align-items: center;
      padding: 10px 0;
      color: gray;
      img{
        width: 1.2rem;
        margin-right: 5px;
        box-sizing: border-box;
      }
    }
    .icon_img{
      position: absolute;
      top: 2%;
      right: 2%;
      width: 1.5rem;
    }
  }
  
}
.xinx {
  padding: 20px;
  i {
    color: #ffbf00;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 27px;
  }
  > p:nth-child(2) {
    width: 80%;
    margin-left: 40px;
    font-size: 14px;
  }
}
</style>
