<template>
  <div class="perback">
    <!-- 用户信息 -->
    <div class="top"> 
      <div class="top-box f-flex f-jc-sb">
        <!-- 个人信息 -->
         <div :class="[
                'new_mess',
                renwu_log > 0 ? 'animation': ''
                ]"
              @click="inInformation"
        >
            <img src="@/assets/img/icon/5@2x.png" alt />
            <div v-if="renwu_log > 0"></div>
         </div>
         <p v-if="user.agenmobile">直属上级：{{user.agenmobile}}</p>
        <!-- 设置 -->
         <router-link :to="{name: 'setting', query:{phone: user.mobile}}" tag="div" class="new_set">
           <img src="@/assets/img/icon/6@2x.png"/>
         </router-link>
      </div>
      <!-- 用戶信息 -->
      <div class="info">
        <img class="user_img" :src="user.avatar" alt />
        <div>
            <div class="mobile">
              {{ user.mobile }}
              <span>{{user.levelname}}</span>
            </div>
            <div class="invite-code">
              邀请码：{{user.code}}
              <span
                v-clipboard:copy="user.code"
                v-clipboard:success="copySuc"
                v-clipboard:error="copyErr"
              >复制</span>
            </div>
        </div>
      </div>
      <!-- 账户金额 -->
      <div class="labance_box">
        <div class="labance_left ">
          <div class="labance_title">金币</div>
          <div class="labance_num">
            ￥<span class="big_num">{{ user.credit2 }}</span>
          </div>
        </div>
        <div class="labance_right">
          <router-link to="/myMoney" tag="div" class="labance_btn">钱包</router-link>
        </div>
      </div>
    </div>
    <!-- 邀请好友与团队 -->
    <div class="tablis f-flex f-jc-sb">
      <router-link tag="div" to="/share" class="tab_icon" ></router-link>
      <router-link tag="div" to='/totalProt' class="tab_icon"></router-link>
    </div>
    <!-- 信用等级 -->
    <div class="prove">
      <p>信用等级</p>
      <p class="f-flex f-jc-sb">
        <span 
         v-for="(item,index) in provateLis"
         :key='index'
         :class="[provateIndex === index ? 'provateAct' : '']"
        >
          {{item}}
        </span>
      </p>
      <div class="intro f-flex f-jc-sb">
        <p
         v-for="(item, index) in provateLis"
         :key="index"
        >
          <span :class="['link', index <= provateIndex ? 'active' : '']"></span>
          <span :class="['link', index <= provateIndex ? 'active' : '']"></span>
          <span class="circle" v-if="index > provateIndex"></span>
          <i class="iconfont" v-if="index <= provateIndex">&#xe614;</i>
        </p>
      </div>
    </div>
    <!-- lis选项 -->
    <div class="tabList">
      <router-link class="List" tag="div"
        v-for="(item,index) in features_li"
        :key="index"
        :to="{path: item.path, query:{type: item.type}}"
      >
        <img :src="item.img" alt="">
        <p @click="exit(index)">{{item.text}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      host:process.env.NODE_ENV=='development'?'http://7428.chac.xyz':`${location.protocol}//${location.host}`,
      provateIndex: 0,
      provateLis: ['封号','限制','良好','优秀'],
      renwu_log: 0,
      startTime: 0,
      gataInforFun: '',
      features_li: [
        {
          // recharge
          path:"/setting",
          text:"个人信息",
          img:require('@/assets/img/icon/inde_01.png')
        },
        
        {
          path:"/intAccount",
          text:"帐号绑定",
          img:require('@/assets/img/icon/index_02.png')
        },
        
        {
          path:"/dayImport",
          text:"日结报表",
          img:require('@/assets/img/icon/index_03.png')
        },
        {
          path:"/inpersonRecord",
          text:"收益记录",
          img:require('@/assets/img/icon/index_04.png')
        },
        {
          path:"/share",
          text:"邀请好友",
          img:require('@/assets/img/icon/index_05.png')
        },
        {
          path:"/inpersonRecord",
          text:"充值记录",
          img:require('@/assets/img/icon/index_06.png'),
          type: 2
        },
        {
          path:"/record",
          text:"提现记录",
          img:require('@/assets/img/icon/index_07.png')
        },
        {
          path:"/steward",
          text:"云管家",
          img:require('@/assets/img/icon/index_08.png')
        },
        {
          path:"/totalProt",
          text:"团队报表",
          img:require('@/assets/img/icon/index_09.png')
        },
        {
          path:"/helpSign",
          text:"帮助中心",
          img:require('@/assets/img/icon/index_10.png')
        },
        {
          path:"/bigWheel",
          text:"大转盘",
          img:require('@/assets/img/icon/index_11.png')
        },
        {
          path:"/fashionShop",
          text:"时尚小店",
          img:require('@/assets/img/icon/index_12.png')
        },
        {
          path:"/minCredit",
          text:"我的信用",
          img:require('@/assets/img/icon/index_13.png')
        },
        {
          path:"/releaseTast",
          text:"发布任务",
          img:require('@/assets/img/icon/index_14.png')
        },
        {
          path:"/",
          text:"退出登录",
          img:require('@/assets/img/icon/index_15.png')
        },
      ],
    };
  },
  mounted() {
    var that = this;
    that.getdata()
    that.gataInforFun = setInterval(() => {
      that.startTime++;
      if(that.startTime % 30 == 0){
          this.$api.Post("center").then(res => {
            if (res.status == 1) {
              that.renwu_log = res.result.renwu_log
            }
          });
      }
    }, 1000);
  },
  methods: {
    inInformation(){
      this.$api.Post("upxiaoxin").then(res => {
        if (res.status == 1) {
            this.$router.push({ name: "information" });
        }
      });
    },
    getdata() {
      var that = this
      this.$api.Post("center").then(res => {
        if (res.status == 1) {
          this.user = res.result;
          that.renwu_log = res.result.renwu_log
          if(this.user.credit < 50){
            that.provateIndex = 0
          } else if(this.user.credit >= 50 && this.user.credit<60){
            that.provateIndex = 1
          } else if(this.user.credit >= 60 && this.user.credit<70){
            that.provateIndex = 2
          } else if(this.user.credit >= 70 ){
            that.provateIndex = 3
          }
        }
      });
    },
    // 复制成功
    copySuc() {
        this.$toast("复制成功");
    },
    // 复制失败
    copyErr() {
        this.$toast("复制失败");
    },
    //编辑
    edit(){
        location.href=`${this.host}/app/index.php?i=4&c=entry&do=profile&m=weliam_indiana`
    },
    //更多功能
    selection(e) {
      if (e == 2) {
        this.$router.push({ name: "issue" });
      }
      if (e == 3) {
        this.$router.push({ name: "manage" });
      }
      if(e==4){
        this.$router.push({ name: "record" });
      }
      if (e == 5) {
        this.$router.push({ name: "financial" });
      }
      if(e==6){
        location.href=`${this.host}/app/index.php?i=4&c=entry&method=shares&p=commission&m=sz_yi&do=plugin`
      }
      if(e==7){
        location.href=`${this.host}/app/index.php?i=4&c=entry&method=team&p=commission&m=sz_yi&do=plugin`
      }
      if(e==8){
        location.href=`${this.host}/app/index.php?i=4&c=entry&do=order_get&m=weliam_indiana`
      }
       if(e==9){
        location.href=`${this.host}/app/index.php?i=4&c=entry&do=order&m=weliam_indiana`
      }
         if(e==10){
        location.href=`${this.host}/app/index.php?i=4&c=entry&do=myshare&m=weliam_indiana`
      }
    },
    //我的钱包
    withdraw(){
       this.$router.push({name:'withdraw',query:{money:this.user.credit2}})
    },
    //充值
    recharge(){
       this.$router.push({name:'recharge'})
    },
    //退出登录
    exit(index) {
        if(index == 14){
          this.delCookie('openid')
          this.$router.push({path:'/'})
          localStorage.removeItem("index");//清楚底部导航的index索引
        }
        if (index == 3) {
          this.$router.push({path: '/inpersonRecord', query: {money: this.user.credit2}});
        }
    },
    delCookie(c_name) {
      this.setCookie(c_name, "", -1);
      console.log(c_name)
    },
    setCookie(c_name,value,expire) {
      var date=new Date()
      date.setSeconds(date.getSeconds()+expire)
      document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
    }
  },
  beforeDestroy () {
    clearInterval(this.gataInforFun)
  }
};
</script>

<style lang="less">
.top{
  position: relative;
  padding: 10px;
  padding-bottom: 0;
  background: url(../../assets/img/bg.png) no-repeat;
  background-size: 100% 100%;
  color: #000;
}
.new_mess{
  position: relative;
  >div{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
    position: absolute;
    top: 0;
    right: 0;
  }
}
.admin{
  animation: an 2.5s .15s linear infinite;
}
@keyframes an{
  10% {
    transform: rotate(15deg);
  }
  20% {
    transform: rotate(-10deg);
  }
  30% {
    transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
  }
  50%,100% {
    transform: rotate(0deg);
  }
}
.top-box img {
  height: 20px;
  width: 20px;
}
.info{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 30px 0 20px;
  img {
      width: 1.5rem;
      height: 1.5rem;
      padding: 5px;
      border-radius: 50%;
      margin: 0 10px;
      background: #ddd;
      box-sizing: border-box;
  }
}
.mobile{
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
.invite-code{
  margin-top: 10px;
}
.invite-code span,.mobile span{
    color: #fff;
    background: #A7ADB6;
    display: inline-block;
    padding: 0px 5px;
    margin-left: 10px;
    font-size: 12px;
  }
.labance_box{
  width: 90%;
  margin: 0px auto;
  color: white;
  padding: 5px 10px 10px;
  box-sizing: border-box;
  background: url(../../assets/img/personnal_bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.labance_title{
  line-height: 1rem;
}
.labance_num{
  font-size: 12px;
  .big_num{
    color: #EBD2B9;
    font-size: 20px;
  }
}
.labance_btn{
    height: 0.6rem;
    width: 1.333333rem;
    color: white;
    text-align: center;
    border-radius: 0.333333rem;
    line-height: 0.6rem;
    background: #5D646E;
    margin-right: 0.2rem;
    font-size: 0.346667rem;
}
.tablis{
  width: 100%;
  height: 1.8rem;
  margin-top: 10px;
  .tab_icon{
    width: 50%;
    height: 100%;
  }
  >.tab_icon:nth-child(1) {
    background: url(../../assets/img/invaite.png) no-repeat;
    background-size: 100% 100%;
  }
  >.tab_icon:nth-child(2) {
    background: url(../../assets/img/perform.png) no-repeat;
    background-size: 100% 100%;
  }
}
.prove{
  width: 80%;
  margin: 0 auto;
  text-align: center;
  >p:nth-child(1){
    line-height: 1rem;
  }
  >p:nth-child(2){
    font-size: 14px;
  }
  .provateAct{
    color: #01C55A;
  }
}
.intro span{
  display: inline-block;
}
.intro{
  width: 100%;
  margin: 10px 0;
  p{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .circle{
      width: 10px;
      height: 10px;
      border-radius: 50px;
      background: gray;
      margin: 0 4px;
    }
    .link{
      width: 1.05rem;
      height: 2px;
      background: gray;
    }
    .active{
      background: #01C55A;
    }
    i{
      color: #01C55A;
    }
  }
  >p:nth-child(1){
    .link{
      display: none;
    }
  }

}
.tabList{
  width: 100%;
  display: flex;
  justify-items: center;
  flex-wrap: wrap;
  text-align: center;
  border-top: 1px solid #ddd;
  margin-bottom: 1.5rem;
  .List{
    width: 33.3%;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding-top: 15px;
    img{
      width: 1rem;
    }
    p{
      line-height: 1rem;
    }
  }
  .List:nth-child(3n+3){
    border-right: none;
  }
}
</style>
