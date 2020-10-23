<template>
  <div class="bje">
    <div>
      <van-nav-bar
        title="余额提现"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="f-flex f-jc-sb with-m">
      <span>可提现金额：￥{{money}}</span>
      <a href="#"  @click="alltx">全部提现</a>
    </div>
    <div class="with-num p20">
      <p>提现金额</p>
      <p class="f-flex">
        <span>￥</span>
        <input type="number" v-model="withdraw_money" />
      </p>
    </div>
    <p class="division"></p>
    <div class="with-type">
      <p>提现方式</p>
      <p class="f-flex f-jc-sb">
            <span><img src="../../assets/zfb.png" alt="">提现到支付宝</span>
             <el-radio v-model="radio" label="1"></el-radio>
        </p>
      <p class="f-flex f-jc-sb">
        <span><img src="../../assets/bank.png" alt="" />提现到银行卡</span>
        <el-radio v-model="radio" label="2"></el-radio>
      </p>
      <!-- 支付宝 -->
      <div v-if="radio == 1">
        <p>
          <van-field
            v-model="zfbamont.realname"
            placeholder="请输入姓名"
            label="姓名"
          />
        </p>
        <p>
          <van-field
            v-model="zfbamont.alipay"
            placeholder="支付宝账号"
            label="支付宝账号"
          />
        </p>
        <p>
          <van-field
            v-model="zfbamont.alipay1"
            placeholder="支付宝账号"
            label="确定账号"
          />
        </p>
      </div>
      <!-- 银行卡 -->
      <div v-else>
        <p>
          <van-field
            v-model="yhkamount.realname"
            placeholder="请输入姓名"
            label="姓名"
          />
        </p>
        <p class="selectBack">
          <van-field
            v-model="yhkamount.bankname"
            placeholder="选择银行"
            label="银行"
            disabled
            @click="openSelect"
          />
        </p>
        <p>
          <van-field
            v-model="yhkamount.bankcard"
            placeholder="请输入银行卡号"
            label="银行卡号"
          />
        </p>
        <p>
          <van-field
            v-model="yhkamount.bankcard1"
            placeholder="请确认银行卡号"
            label="确认卡号"
          />
        </p>
      </div>
    </div>
    <div class="with-btn">
      <el-button type="primary" @click="withdrae">提现</el-button>
    </div>
    <!-- 银行卡的选择 -->
    <div class="banksel" v-if="show"> 
        <van-picker
            title="选择银行卡"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
        />
    </div>
  </div>
</template>

<script>
import { Picker } from 'vant'
import { Toast } from 'vant';
export default {
  data() {
    return {
      radio: "1",
      money:this.$route.query.id,
      show: false,
      columns: [],
      nowBank: '',
      withdraw_money: '',
      // 支付宝
      zfbamont:{
        money: '',
        type: 2,
        realname: '',
        alipay: '',
        alipay1: ''
      },
      // 银行卡
      yhkamount: {
        money: '',
        type: 3,
        realname: "",
        bankname: "",
        bankcard: "",
        bankcard1: ""
      }
    };
  },
  created () {
    this.gataBAck()
  },
  methods: {
    openSelect(){
      this.show = true
    },
    gataBAck(){
      var that = this
      this.$api.Post("typebank").then(res => {
          if (res.status == 1) {
              var bankLis = res.result.bankname;
              that.yhkamount.bankname = bankLis[0].bankname
              for(var i = 0; i<bankLis.length;i++){
                  that.columns.push(bankLis[i].bankname)
              }
          }
      })
    },
    onConfirm(value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.show = false
      this.yhkamount.bankname = value
    },
    onChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      this.show = false
      Toast('取消');
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    //提现
    withdrae() {
      var that = this;
      that.zfbamont.money = that.withdraw_money
      that.yhkamount.money = that.withdraw_money
      // 支付宝
      if(this.radio == 1){
        if (this.zfbamont.realname == "") {
          this.$toast("请输入支付宝姓名");
          return;
        }
        if (this.zfbamont.alipay == "") {
          this.$toast("请输入支付宝账号");
          return;
        }
        if (this.zfbamont.alipay1 == "") {
          this.$toast("请再次输入支付宝账号");
          return;
        }
        if (this.zfbamont.alipay != this.zfbamont.alipay1) {
          this.$toast("两次输入支付宝不一致");
          return;
        }
        this.$api.Post("withdraw", this.zfbamont).then(res => {
          if (res.status == 1) {
            this.$toast(res.result.message);
            this.$router.go(-1);
          } else{
            this.$toast(res.result.message);

          }
        });
      } else{
        //银行卡
        if (this.yhkamount.realname == "") {
          this.$toast("请输入姓名");
          return;
        }
        if (this.yhkamount.bankcard == "") {
          this.$toast("请输入支付宝账号");
          return;
        }
        if (this.yhkamount.bankcard1 == "") {
          this.$toast("请再次输入银行卡账号");
          return;
        }
        if (this.yhkamount.bankcard != this.yhkamount.bankcard1) {
          this.$toast("两次输入银行卡账号不一致");
          return;
        }
        this.$api.Post("withdraw", this.yhkamount).then(res => {
          if (res.status == 1) {
            this.$toast(res.result.message);
            this.$router.go(-1);
          } else{
            this.$toast(res.result.message);

          }
        });
      }
    },
    //全部提现
    alltx(){
        this.withdraw_money = this.money
    }
  }
};
</script>

<style lang="less">
.with-m {
  background: #f3f3f3;
  padding: 15px;
  a {
    color: #ff5555;
  }
}
.with-num {
  > p:nth-child(2) {
    margin-top: 10px;
    color: #000;
    border-bottom: 1px solid #000;
    span {
      font-weight: 700;
      font-size: 28px;
    }
    input {
      font-size: 28px;
      font-weight: 700;
      width: 80%;
    }
  }
}
.division {
  background: #f3f3f3;
  padding: 10px;
}
.with-type {
  > p {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
  }
  >div{
    > p {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      position: relative;
    }
  }
  img {
    width: 30px;
    margin-right: 10px;
  }
}
.bje .el-radio__label {
  opacity: 0;
}
.bje .el-radio__inner {
  width: 20px !important;
  height: 20px !important;
}
.bje .el-radio__inner::after {
  width: 8px !important;
  height: 8px !important;
}
.bje .van-cell {
  padding: 0 !important;
  font-size: 16px !important;
}
.with-btn {
  padding: 20px;
  button {
    width: 100%;
    background: #DADEEA!important;
    color: #000!important;
    border-color: #DADEEA!important;
  }
}
.el-radio__input.is-checked .el-radio__inner{
  background: #DADEEA!important;
  color: #000!important;
  border-color: #DADEEA!important;
}
.selectBack::before{
  content: " ";
  display: inline-block;
  -webkit-transform: rotate(225deg);
  -ms-transform: rotate(225deg);
  transform: rotate(225deg);
  height: 10px;
  width: 10px;
  border-width: 0 0 2px 2px;
  border-color: #666;
  border-style: solid;
  position: absolute;
  right: 15px;
  top: 40%;
  z-index: 9;
  margin-left: 20px;
}
.banksel{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.48);
    z-index: 999;
    .van-picker{
        position: absolute;
        width: 100%;
        bottom: 0;
        animation: bott 0.3s;
        // transition: all 0.2s;
    }
}
@keyframes bott{
    from{bottom: -50%;}
	to{bottom: 0;}
}
</style>
