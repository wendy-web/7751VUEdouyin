<template>
  <div class="perback">
    <!-- 用户信息 -->
    <div class="top">
      <div class="top-box f-flex f-jc-sb">
        <!-- 个人信息 -->
         <router-link to="/setting" tag="div" class="new_mess">
            <img src="@/assets/img/icon/5@2x.png" alt />
         </router-link>
         <p>直属上级：136*****120</p>
        <!-- 设置 -->
         <div tag="div" class="new_set" @click="edit">
           <img src="@/assets/img/icon/6@2x.png" alt />
         </div>
      </div>
      <!-- 用戶信息 -->
      <div class="info">
        <img class="user_img" src="" alt />
        <div>
            <div class="mobile">
              13602818121
              <span>普通会员</span>
            </div>
            <div class="invite-code">
              邀请码：2255
              <span>复制</span>
            </div>
        </div>
      </div>
      <!-- 账户金额 -->
      <div class="labance_box">
        <div class="labance_left ">
          <div class="labance_title">金币</div>
          <div class="labance_num">
            ￥<span class="big_num">{{gold?gold:0}}</span>
          </div>
        </div>
        <div class="labance_right">
          <router-link to="/withdraw" tag="div" class="labance_btn">钱包</router-link>
        </div>
      </div>
    </div>


    <div class="personaltitle">
      <div class="f-flex f-jc-sb">
        <div class="f-flex">
          <div>
            <img :src="user.avatar" alt />
          </div>
          <div>
            <p>{{ user.mobile }}</p>
            <p>{{ user.nickname }}</p>
          </div>
        </div>
        <div class="f-flex">
          <i @click="edit" class="el-icon-edit-outline"></i>
          <!-- <i class="el-icon-setting"></i> -->
        </div>
      </div>
      <div>
        <div class="f-flex f-jc-sb">
          <p>
            账号余额：
            <span>{{ user.credit2 }}</span>
          </p>
          <p>
            <el-button type="primary" @click="recharge">充值</el-button>
            <el-button type="primary" @click="withdraw">提现</el-button>
          </p>
        </div>
        <div>
          <ul class="f-flex" @click="selection(5)">
            <li>
              <p>{{user.task}}</p>
              <p>任务奖励</p>
            </li>
            <li>
              <p>{{user.task_comm}}</p>
              <p>任务分佣</p>
            </li>
            <li>
              <p>{{user.meal}}</p>
              <p>套餐提成</p>
            </li>
            <li>
              <p>{{user.all_money}}</p>
              <p>今日收益</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="p20">
      <!-- 任务 -->
      <div class="persoaltask f-flex">
        <div @click="mytask(0)">
          <p>普通任务</p>
           <p>{{user.task_count_task}}  / {{user.task_count}} </p>
          
          <p>今日已做/可做任务</p>
        </div>
        <div @click="mytask(1)">
          <p>巨星任务</p>
         <p>{{user.task_count_task1}} / {{user.task_count1}}</p>
          <p>今日已做/可做任务</p>
        </div>
        <div @click="mytask(2)">
          <p>淘宝任务</p>
         <p>{{user.task_count_task2}} / {{user.task_count2}}</p>
          <p>今日已做/可做任务</p>
        </div>
      </div>
      <!-- 待付款 -->
      <!-- <div class="personalorder">
        <ul class="f-flex">
          <li>
            <p>
              <van-icon name="paid" />
            </p>
            <p>待付款</p>
          </li>
          <li>
            <p>
              <van-icon name="send-gift-o" />
            </p>
            <p>待发货</p>
          </li>
          <li>
            <p>
              <van-icon name="tosend" />
            </p>
            <p>待收货</p>
          </li>
          <li>
            <p>
              <van-icon name="sign" />
            </p>
            <p>已完成</p>
          </li>
          <li>
            <p>
              <van-icon name="orders-o" />
            </p>
            <p>我的订单</p>
          </li>
        </ul>
      </div> -->
    </div>
    <!-- 更多功能 -->
    <div class="more">
      <!-- <div class="f-flex f-jc-sb" @click="selection(1)">
        <p class="f-flex">
          <van-icon name="point-gift" />
          <span>我的店铺</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div> -->
      <div class="f-flex f-jc-sb " @click="selection(2)">
        <p class="f-flex">
          <van-icon name="add-square" />
          <span>发布任务</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb" @click="selection(3)">
        <p class="f-flex">
          <van-icon name="column" />
          <span>任务管理</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb" @click="selection(4)">
        <p class="f-flex">
          <van-icon name="balance-list" />
          <span>提现记录</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb" @click="selection(5)">
        <p class="f-flex">
          <van-icon name="gold-coin" />
          <span>资金明细</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb" @click="selection(6)">
        <p class="f-flex">
          <van-icon name="invition" />
          <span>我的邀请码</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div class="f-flex f-jc-sb" @click="selection(7)">
        <p class="f-flex">
          <van-icon name="friends" />
          <span>我的团队</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
        <!-- <div class="f-flex f-jc-sb" @click="selection(8)">
        <p class="f-flex">
         <van-icon name="medal" />
          <span>中奖记录</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
        <div class="f-flex f-jc-sb" @click="selection(9)">
        <p class="f-flex">
          <van-icon name="cart-circle" />
          <span>团购记录</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
        <div class="f-flex f-jc-sb" @click="selection(10)">
        <p class="f-flex">
         <van-icon name="photograph" />
          <span>我的晒单</span>
        </p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div> -->
    </div>
    <div class="exit">
      <el-button type="primary" @click="exit">退出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      host:process.env.NODE_ENV=='development'?'http://7428.chac.xyz':`${location.protocol}//${location.host}`

    };
  },
  mounted() {
    this.getinfo();
    this.level()
  },
  methods: {
    getinfo() {
      this.$api.Post("getinfo").then(res => {
        if (res.status == 1) {
          this.user = res.result.list;
        }
      });
    },
    //编辑
    edit(){
        location.href=`${this.host}/app/index.php?i=4&c=entry&do=profile&m=weliam_indiana`
    },
   
    level(){
       this.$api.Post('level').then(res=>{
         
       })
    },

    mytask(e) {
      this.$router.push({ name: "mytask",query:{grade:e} });
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
    //提现
    withdraw(){
       this.$router.push({name:'withdraw',query:{money:this.user.credit2}})
    },
    //充值
    recharge(){
       this.$router.push({name:'recharge'})
    },
    //退出登录
    exit() {
      this.$api.Post('logout').then(res=>{
        this.delCookie('openid')
       this.$router.push({path:'/'})
      })
      
    },
    delCookie(c_name) {
        this.setCookie(c_name, "", -1);
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
.top{
  position: relative;
  padding: 10px;
  padding-bottom: 0;
  background: url(../../assets/img/bg.png) no-repeat;
  background-size: 100% 100%;
  color: #000;
}
.top-box {}
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
  padding: 5px 10px 5px;
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


.personaltitle {
  position: relative;
  border-radius: 0 0 10% 10%;
  background: #57a1ec;
  //   border-radius: 0 0 30px 30px;
  padding: 20px 20px 0 20px;
  overflow: hidden;
  > div:nth-child(1) {
    color: #fff;
    > div:nth-child(1) {
      //头像及账号
      line-height: 28px;
      img {
        width: 60px;
        margin-right: 15px;
      }
    }
    > div:nth-child(2) {
      font-size: 26px;
      padding-top: 15px;
      > i:nth-child(2) {
        margin-left: 25px;
      }
    }
  }
  > div:nth-child(2) {
    margin-top: 20px;
    background: #ffffff;
    padding: 15px;
    border-radius: 8px 8px 0 0;
    > div:nth-child(1) {
      > p:nth-child(1) {
        span {
          color: #57a1ec;
          font-weight: 700;
          font-size: 20px;
        }
      }
      button {
        padding: 10px 10px;
      }
    }
    > div:nth-child(2) {
      margin-top: 15px;
      li {
        width: 25%;
        text-align: center;
        > p:nth-child(1) {
          font-weight: 700;
          color: #c98954;
          font-size: 20px;
          margin-bottom: 8px;
          white-space: nowrap;
        }
      }
    }
  }
}
.persoaltask {
  background: #ffffff;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  line-height: 30px;
  padding: 15px 0;
  > div {
    width: 50%;
    text-align: center;
    border-right: 1px solid #ccc;
    > p:nth-child(2) {
      font-weight: 700;
      font-size: 22px;
    }
  }
  > div:last-child {
    border-right: none;
  }
}
.personalorder {
  margin-top: 20px;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
  background: #ffffff;

  li {
    width: 20%;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    i {
      font-size: 30px;
    }
  }
}
.more {
  > div {
    margin-bottom: 10px;
    // border-bottom: 1px solid #ccc;
    padding: 15px 20px;
    font-size: 0;
    background: #ffffff;
    span {
      display: inline-block;
      font-size: 16px;
    }
    i {
      font-size: 22px;
      margin-right: 10px;
    }
  }
}
.perback {
  background: #f2f2f2;
}
.exit {
  button {
    width: 100%;
  }
}
</style>
