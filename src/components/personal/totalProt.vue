<template>
    <div class="perback">
        <pageTop></pageTop>
        <!-- 代理报表 -->
        <div class="item0_box">
        <!-- 开始时间-结束时间 -->
            <div class="datetime_box">
                <div class="start_time" @click="starttime()">{{startdate}}</div>至
                <div class="stop_time" @click="stoptime()">{{stopdate}}</div>
                <button class="seard_btn" @click="searddata()">搜索</button>
            </div>
        </div>
        <!-- 列表 -->
        <div class="ban_box">
            <ul class="ban_ul">
                <li class="ban_li">
                    <div class="nav_text">团队余额（元）</div>
                    <div class="nav_num">￥{{data.team_money}}</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text">团流水（元）</div>
                    <div class="nav_num">￥{{data.team_turnover}}</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text">团队总充值（元）</div>
                    <div class="nav_num">￥{{data.team_chongzhi}}</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text">团队总提现（元）</div>
                    <div class="nav_num">￥{{data.team_tixian}}</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text weight_text">首充人数</div>
                    <div class="nav_num red_num">{{data.shouchong_num}}人</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text weight_text">直推人数</div>
                    <div class="nav_num red_num">{{data.zhitui_num}}人</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text weight_text">团队人数</div>
                    <div class="nav_num red_num">{{data.team_num}}人</div>
                </li>
                <li class="ban_li">
                    <div class="nav_text weight_text">新增人数</div>
                    <div class="nav_num red_num">{{data.xz_num}}人</div>
                </li>
            </ul>
            <!-- 级别 -->
            <div class="grade_box">
                <div class="tab_box">
                    <div
                        v-for="(item,index) in tablist"
                        :key="index"
                        @click="tabclick(item.type)"
                        :class="tabtype==item.type?'tab_item tabact':'tab_item'"
                    >
                        {{item.text}}
                    </div>
                </div>
                <ul class="grade_list">
                    <li v-for="(item, index) in teamList" :key="index">
                        {{ item.name }} 可用余额: <span>{{ item.credit2 }}</span> 普通
                    </li>
                </ul>
            </div>
        </div>
        <!-- 选择开始时间 -->
        <div class="time_model" v-if="startshow">
            <div class="time_content">
                <div class="date_item">
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="startclick"
                    @cancel="cancelclick"
                />
                </div>
            </div>
        </div>
        <!-- 选择结束时间 -->
        <div div class="stoptime_model" v-if="stopshow">
            <div class="time_content">
                <div class="date_item">
                <van-datetime-picker
                    v-model="stopcurrentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="stopclick"
                    @cancel="cancelclick"
                />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            data: {},
            tabtype: 1,
            tablist: [
                {
                text: "一级",
                type: 1
                },
                {
                text: "二级",
                type: 2
                },
                {
                text: "三级",
                type: 3
                }
            ],
            // 时间
            minDate: new Date(2020, 1, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(),
            startdate: '开始时间',
            startshow: false,
            stopcurrentDate: new Date(),
            stopdate: '结束时间',
            stopshow: false,
            teamList:[]
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.timeFormat(new Date());
        this.gataData()
        this.gataTeamLis()
    },
    created() {
    },
    methods: {
        gataTeamLis(){
            var that = this;
            this.$api.Post("new_team",{ type : that.tabtype}).then(res => {
                if (res.status == 1) {
                    that.teamList = res.result.list
                } else{
                    this.$toast(res.result.message);
                }
            });
        },
        gataData(){
            var that = this;
            this.$api.Post("team").then(res => {
                if (res.status == 1) {
                    that.data = res.result
                } else{
                    this.$toast(res.result.message);
                }
            });
        },
        // 搜索
        searddata(){
            var that = this;
            if(that.startdate== '开始时间'){
                this.$toast('请选择开始时间');
                return;
            }
            if(that.stopdate== '结束时间'){
                this.$toast('请选择结束时间');
                return;
            }
            this.$api.Post("team", {starttime: that.startdate,endtime: that.stopdate }).then(res => {
                if (res.status == 1) {
                    that.data = res.result
                } else{
                    this.$toast(res.result.message);
                }
            });
        },
        // 切换等级
        tabclick(type) {
            this.tabtype = type;
            this.gataTeamLis()

        },
        // 开始
        startclick(val) {
            this.startdate = this.timeFormat(this.currentDate);
            this.startshow = false;
            console.log(this.startdate)
        },
        // 结束
        stopclick(val) {
            this.stopdate = this.timeFormat(this.stopcurrentDate);
            this.stopshow = false;
        },
        timeFormat(time) {
            // 时间格式化 2019-09-08
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();
            // return year + "年" + month + "月" + day + "日";
            return year + "-" + month + "-" + day;
        },
        starttime() {
            this.startshow = true;
        },
        stoptime() {
            this.stopshow = true;
        },
        cancelclick() {
            this.startshow = false;
            this.stopshow = false;
        },
    }
}
</script>

<style lang="less" scoped>
*{margin:0px;padding:0px}
.perback{
    background-color: #fff !important;
    color: #000;
}
// 代理报表
.datetime_box {
  border-bottom: 1px solid #efefef;
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  .start_time,
  .stop_time {
    border: 1px solid #ddd;
    height: 30px;
    width:25%;
    background: #F2F2F2;
    border-radius: 20px;
    margin: 10px 5%;
    text-align: center;
    line-height: 30px;
  }
}
.seard_btn {
  background: orangered;
  color: white;
  height: 30px;
  width: 20%;
  text-align: center;
  line-height:30px;
  border-radius: 25px;
  border: none;
  position: absolute;
  right: 10px;
}
.ban_box{
    width: 100%;
    .ban_ul{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .ban_li{
            width: 50%;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            padding: 5px 10px;
            box-sizing: border-box;
            .nav_text{
                line-height: 30px;
                color: gray;
            }
            .weight_text{
                color: #000;
            }
            .nav_num{
                color: #000;
                font-weight: bold;
            }
            .red_num{
                color: red;
            }
            
        }
        .ban_li:nth-child(2n+2){
            border-right: 0;
        }
    }
}
.grade_box{
    .tab_box{
        display: flex;
        text-align: center;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
        margin-top: 0.5rem;
        .tab_item{
            width: 33.3%;
            line-height: 1rem;
            border-right: 1px solid #ddd;
        }
        .tab_item:last-child{
            border-right: 0;
        }
        .tabact{
            color: red;
            border-bottom:1px solid red;
        }
    }
    .grade_list{
        width: 100%;
        li{
            line-height: 0.8rem;
            padding: 0 5px;
            // border-bottom: 1px solid #e8e8e8;
            span{
                color: red;
            }
        }
    }
}
.time_model,
.stoptime_model {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
.time_content {
  background: white;
  height: 30%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0px;
}
.date_item {
  height: 78%;
  width: 100%;
  overflow: hidden;
}
</style>
