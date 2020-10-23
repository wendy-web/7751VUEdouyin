<template>
  <div>
    <div>
      <van-nav-bar title="套餐" />
    </div>
    <!-- 轮播 -->
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in setmeallist.advs" :key="index">
          <img :src="item.thumb" alt srcset />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <div class="mealimg">
         <img src="../../assets/logo1.png" alt />
    </div>-->
    <div class="p20">
      <div
        class="meallist"
        v-for="(item, index) in setmeallist.setmeal"
        :key="index"
      >
        <div class="f-flex f-jc-sb">
          <p>
            <img :src="item.thumb" alt />
            {{ item.setmealname }}
          </p>
          <p>
            价格：
            <span>￥{{ item.price }}</span>
          </p>
        </div>
        <div>
          <p>获赞数:{{ item.number }}</p>
          <p>悬赏金额:{{ item.money }}元</p>
          <!-- <el-button class="f-flex f-jc-sb"><span>赠送(每天6条接单任务)</span>   <el-button type="primary">购买</el-button></p> -->
          <p class="f-flex f-jc-sb">
            <span>赠送(每天{{ item.give }}条接单任务)</span>
            <el-button type="primary" @click="buy(item.id)">购买</el-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 确认信息 -->
    <van-dialog v-model="xinx" show-cancel-button @confirm="confirms">
      <div class="xinx">
        <p><van-icon name="question" /> 确定购买该套餐吗？</p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setmeallist: "",
      reward: "",
      xinx: false,
      id: ""
    };
  },
  mounted() {
    this.setmeal();
  },
  methods: {
    setmeal() {
      this.$api.Post("setmeal").then(res => {
        if (res.status == 1) {
          this.setmeallist = res.result;
        }
      });
    },
    buy(e) {
      this.xinx = true;
      this.id = e;
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
  > div:nth-child(1) {
    background: #57a1ec;
    border-radius: 8px 8px 0 0;
    padding: 12px;
    color: #fff;
    img {
      width: 40px;
      margin-right: 10px;
    }
    > p:nth-child(2) {
      padding-top: 6px;
      span {
        font-weight: 700;
        font-size: 18px;
      }
    }
  }
  > div:nth-child(2) {
    padding: 15px;
    font-weight: 700;
    line-height: 36px;
    > p:nth-child(3) {
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
