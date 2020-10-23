<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <div class="swipe_lis">
                <van-swipe class="my-swipe" :autoplay="3000" style="height: 40px;" indicator-color="white" vertical :show-indicators = false @change="onChange" :loop = true :touchable = false>
                    <van-swipe-item v-for="(item, index) in xjgamelog" :key="index">
                        <img src="@/assets/img/zuans.png" alt="">
                        <p>恭喜{{item.mobile }}中奖：{{item.shuom }}</p>
                    </van-swipe-item>
                </van-swipe>
            </div>
            
            <!-- <div class="news_box flex flex-ver flex-jcsb">
              <div class="news_msg">
                <div>
                  <swiper :options="stateOption0" class="noticeSwp stop-swiping1">
                    <swiperSlide v-for="(item,index) in roll" :key="index" class="swiperItem">
                      <img src="@/assets/img/zuans.png" />
                      <div class="div_router flex flex-ver flex-jcsb">
                        <div class="ell">{{item}}</div>
                      </div>
                    </swiperSlide>
                  </swiper>
                </div>
              </div>
            </div> -->
            <!-- 大转盘 -->
            <div class="luckyWheel">
                <div class="wheel-main">
                    <div class="wheel-pointer" @click="beginRotate()" :display="notClick"></div>
                    <div class="wheel-bg" :style="rotateStyle">
                    <div class="prize-list">
                        <div
                        class="prize-item"
                        v-for="(item,index) in prizeList"
                        :key="index"
                        :style="item.style"
                        >
                        <div class="prize-pic">
                            <img :src="item.image" />
                        </div>
                        <div class="prize-type">{{item.resume}}</div>
                        </div>
                    </div>
                    </div>
                </div>
                <button class="btn_start" @click="start_more" :display="notClick">玩十次(消耗20元)</button>
            </div>
        </div>
        <!-- 十次的弹窗 -->
        <div class="toast" v-show="isshow_ten">
        <div class="toast-container">
          <!-- <div class="close" @click="closeToast()"></div> -->
          <img :src="toastIcon" class="toast-picture" />
          <div class="toast-title toast-titles" v-for="(item,index) in total" :key="index">
            <div v-if="item.resume !=null">恭喜获得{{item.resume}}</div>
          </div>
          <div class="toast-btn">
            <div class="toast-cancel" @click="closeToast">关闭</div>
          </div>
        </div>
      </div>
      <div class="toast-mask" v-show="isshow_ten"></div>


        <!-- 成功的弹窗 -->
        <div class="toast" v-show="isshow_one">
            <div class="toast-container">
                <img :src="toastIcon" class="toast-picture" />
                <!-- <div class="close" @click="closeToast()"></div> -->
                <div class="toast-title">{{toastTitle}}</div>
                <div class="toast-btn">
                <div class="toast-cancel" @click="closeToast">关闭</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="prize"></div>
    </div>
</template>

<script>
import { Dialog } from "vant";
import pageTop from "@/router/pageTop.vue"
import { prizeList } from '../../config'
const CIRCLE_ANGLE = 360

const config = {
  // 总旋转时间
  duration: 1000,
  // 旋转圈数
  circle: 2,
  mode: 'ease-in-out'
}
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
          xjgamelog: [],//中奖纪录
          count: 10, // 剩余抽奖次数
          duration: 3000, // 转盘旋转时间
          prizeList: [], // 奖品列表
          rotateAngle: 0, // 旋转角度
          index: 0,//中奖数额
          prize: null,//弹窗的显示
          listInfo: [],//抽中十次的数组
          num: 1,//抽奖次数
          ismore: false,//是否转动多几次
          notClick: false,//
          isshow_one: false,
          isshow_ten: false,//十张的弹出
          total:[],
          // 多条公告
          swiperOptions: {
              direction: "vertical",
              speed: 400, //切换速度
              watchOverflow:false, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
              loop:false, //开启循环模式
              slidesPerView: 4,
              spaceBetween: 0,
              preventClicksPropagation: true, //阻止click冒泡。拖动Swiper时阻止click事件。
              simulateTouch: false, //鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
              autoplay: {
                delay: 800
              },
              noSwipingClass: "stop-swiping1"
          },
          stateOption0:{
              direction: "vertical",
              speed: 500, //切换速度
              watchOverflow: false, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
              loop: false, //开启循环模式
              slidesPerView: 4,
              spaceBetween: 0,
              preventClicksPropagation: true, //阻止click冒泡。拖动Swiper时阻止click事件。
              simulateTouch: false, //鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
              autoplay: {
                delay: 800
              },
              noSwipingClass: "stop-swiping1"
          },
          roll: ['45','dsgredgeg','wtwrtgwrgwrgre','rweggfvdbd','ergrgrgre','1','5','555','6','47','7','7','8'],
        };
    },
    
    created() {
        // 初始化一些值
        this.angleList = []
        // 是否正在旋转
        this.isRotating = false
        // 基本配置
        this.config = config
        // 获取奖品列表
        this.initPrizeList();
    },
    computed: {
      // 大转盘
        rotateStyle () {
        return `
            -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
            transition: transform ${this.config.duration}ms ${this.config.mode};
            -webkit-transform: rotate(${this.rotateAngle}deg);
                transform: rotate(${this.rotateAngle}deg);`
        },
        toastTitle () {
          // 6是当前中奖的id值 根据其数组的id值来判断
            return this.prize && this.prize.id != null
            ? "恭喜您，获得" +
                this.prize.resume
            : "未中奖";
        },
        toastIcon() {
          //6是当前中奖的id值 根据其数组的id值来判断
           return this.prize && this.prize.id != null
            ? require("../../assets/img/congratulation.png")
            : require("../../assets/img/sorry.png");
        }
    },
    mounted () {
      // console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(1, 1000, false)
    },
    components: {
        pageTop,
        // Swiper,
        // SwiperSlide,
        // directive
    },
    methods: {
    onChange(index) {
        if(index===3){
            index=1
        }
    },
    //抽奖10次滚动
    start_more() {
      //弹窗
      Dialog.confirm({
        title: "",
        message: "本次点击将连续抽奖十次"
      })
      .then(() => {
        // this.toastShow = true;
        this.moreRotate()
      })
      .catch(() => {
      });
    },
    // 开始抽奖
    moreRotate() {
      var that = this;
      that.notClick = true;
      that.ismore = true;
      if(that.num == 1){
        this.$api.Post("game", { type : 2}).then(res => {
            if(res.resule == 0){
              that.$toast(res.result.message)
            } else{
              that.listInfo = res.result.zhongjiang_id;
              that.index = that.listInfo[that.num]
              that.rotating();
              // that.index = res.result.zhongjiang_id[0]
            }
        });
      }else{
        that.index = that.listInfo[that.num]
        that.rotating();
      }
    },
    // 获取当前的数据
    initPrizeList() {
      this.$api.Post("gameindex").then(res => {
          if (res.status == 1) {
              this.prizeList = this.formatPrizeList(res.result.game)
              this.xjgamelog = res.result.xjgamelog
          }
      })
    },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList (list) {
      // 记录每个奖的位置
      const angleList = []
      const l = list.length
      // 计算单个奖项所占的角度
      const average = CIRCLE_ANGLE / l
      const half = average / 2
      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -((i * average) + half)
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`
        // 记录每个奖项的角度范围
        angleList.push((i * average) + half )
      })
      this.angleList = angleList
      return list
    },
    // 开始抽奖
    beginRotate() {
      var that = this;
      that.num = 1;
      that.notClick = true;
      this.$api.Post("game", { type : 1}).then(res => {
          if(res.status == 0){
            that.$toast(res.result.message)
          } else{
            // that.$toast(res.result.message)
            that.rotating();
            that.index = res.result.zhongjiang_id[0]
          }
      });
    },
    random (max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min)
    },
    rotating() {
      const { isRotating, angleList, config, rotateAngle, index } = this
      if (isRotating) return
      this.isRotating = true
      // 计算角度
      const angle = rotateAngle + config.circle * CIRCLE_ANGLE + angleList[index] - (rotateAngle % CIRCLE_ANGLE)
      this.rotateAngle = angle
      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver()
      }, config.duration + 1000)
    },
    // 展示金额的弹窗
    rotateOver () {
      this.isRotating = false
      if(this.ismore == true){//抽十次
        if (this.num < 10){
          this.prize = this.prizeList[this.index];
          if (this.prize) {
            this.total.push(this.prize);
          }
          this.num++;
          this.moreRotate();
        } else{
          this.prize = this.prizeList[this.index];
          this.total.push(this.prize);
          if(this.total[0].resume != ''){
            this.isshow_ten = true;
          } else{
            this.isshow_one = true;
          }
          console.log(this.total)
          console.log(this.total[0].resume)
          this.isRotating = false;
        }
      } else{
        this.isRotating = false;
        this.isshow_one = true;
        this.prize = this.prizeList[this.index]
        this.total.push(this.prize);
      }
      console.log(this.prize, this.index)
    },
    //关闭弹窗
    closeToast() {
      this.prize = null;
      this.isshow_one = false;
      this.isshow_ten = false;
      this.notClick = false;
      this.total = [];
      this.ismore = false;
    }
  }
}
</script>
<style lang="less" scoped>
body,html{
  overflow: hidden!important;
}
*{
  overflow: hidden;
}
// 
.noticeSwp {
    width: 100%;
    height: 300px;
    margin: 0 auto;
    // background: white;
    .swiperItem {
      display: flex;
      flex-direction: row;
      height: 100%;
      font-size: 26px;
      padding: 0px 0;
      img {
        height: 40px;
        width: 40px;
      }
    }
    .div_router {
      margin-left: 30px;
      // background-color: yellow;
      // height: 50px;
      // line-height: 50px;
      width: 100%;
      // border: 1px solid pink;
      height: 300px;
    }
  }









// 多条公告
.news_recharge {
  background-color: white;
  height: 200px;
  box-sizing: border-box;
  padding:10px;
}
.noticeSwp {
  width: 100%;
  height: 100%!important;
  margin: 0 auto;
  .swiperItem {
    display: flex;
    flex-direction: row;
    height: 30px!important;
    font-size: 14px;
    img {
      height: 20px;
      width: 20px;
      margin: 0 5px;
    }
  }
}
.ell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.news_box {
  width: calc(100%);
  // border: 1px solid red;
  padding: 0;
  position: relative;
  height: 100%;
  // border: 1px solid purple;
  overflow: hidden;
}

// 大转盘
.luckyWheel{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    background: #fff;
}
.lucky-wheel {
  width: 100%;
  background-size: 100%;
  padding-top: 20px;
}
.lucky-title {
  width: 100%;
  height: 8.125rem;

  background-size: 100%;
}
.wheel-main {
  margin: 0 auto;
  position: relative;
  width: 295px;
  height: 295px;
}
.wheel-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/draw_wheel.png") no-repeat center top;
  background-size: 100%;
  color: #fff;
}
.wheel-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 70px;
  height: 90px;
  background: url("../../assets/img/begin_btn.png") no-repeat center top;
  background-size: 100%;
  transform: translate3d(-50%, -50%, 0);
}
.wheel-bg div {
  text-align: center;
}
.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}
.prize-list .prize-item {
  position: absolute;
  width: 95px;
  height: 150px;
  top: 0;
  left: 50%;
  margin-left: -47.5px;
  transform-origin: 50% 100%;
}
.prize-pic img {
  width: 0.8rem;
  margin-top: 0.8rem;
}
.prize-count {
  font-size: 12px;
}
.prize-type {
  font-size: 12px;
}
.main {
  position: relative;
  width: 100%;
  min-height: 14.25rem;
  background: rgb(243, 109, 86);
  padding-bottom: 1.6875rem;
}
.main-bg {
  width: 100%;
  height: 6.5625rem;
  position: absolute;
  top: -3.4375rem;
  left: 0;

  background-size: 100%;
}
.bg-p {
  width: 100%;
  height: 2.95rem;
  background: rgb(252, 207, 133);
}
.content {
  position: absolute;
  top: 0.175rem;
  left: 0;
  background: rgb(243, 109, 86);
  width: 100%;
  height: 5.1875rem;
  font-size: 1.125rem;
  color: #ffeb39;
  padding-left: 6.75rem;
}
.content div {
  text-align: left;
}
.tip {
  position: relative;
  margin: 2.5rem auto 0;
  width: 17.5rem;
  border: 1px solid #fbc27f;
}
.tip-title {
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 1rem;
  color: #fccc6e;
  background: rgb(243, 109, 86);
  padding: 0.3125rem 0.625rem;
}
.tip-content {
  padding: 1.5625rem 0.625rem;
  font-size: 0.875rem;
  color: #fff8c5;
  line-height: 1.5;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 6rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -2.5rem;
  left: 55%;
  transform: translateX(-50%);
  width: 10rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 1rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-titles{
  padding: 0.1rem 0;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4rem;
  height: 1rem;
  border-radius: 1rem;
  text-align: center;
  line-height: 1rem;
  color: #fff;
}
.close {
  position: absolute;
  top: -0.9375rem;
  right: -0.9375rem;
  width: 2rem;
  height: 2rem;
  
  background-size: 100%;
}
.btn_start{
    margin: 40px 30%;
    background: #ffa501;
    background:linear-gradient(to bottom,#F4E56E,#FA8504);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
}





*{margin:0px;padding:0px}
.swipe_lis{
    padding: 10px;
    max-height: 40%;
    width: 100%;
}
.sliderLis{
    padding: 10px;
    height: 6rem;
    background: pink;
}
.van-swipe{
    overflow: visible;
}
.my-swipe .van-swipe-item {
    font-size: 20px;
    line-height: 40px;
    height: 40px!important;
}
.van-swipe-item {
    display: flex;
    align-items: center;
    line-height: 40px;
    border-bottom: 1px dashed #666;
    box-sizing: border-box;
    img{
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
    p{
        flex: 1;
        color: #000;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        text-align: left;
    }
}
.perback{
    background-color: #fff !important;
    color: #000;
}
</style>
