<template>
    <div class="perback">
        <!-- 轮播 -->
        <div>
            <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
                <van-swipe-item v-for="(item,index) in indexdata.thumb" :key="index">
                    <img :src="item.thumb" alt srcset />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 公告  -->
        <div>
            <!-- <van-notice-bar v-for="(item,index) in indexdata.notices" :text="item.title" :key="index" left-icon="volume-o" scrollable/> -->
            <van-notice-bar :text="notice" left-icon="volume-o" scrollable/>
        </div>
        <div class="profitBox">
            <div class="profitHead"> 
                <p>收益（非实时数据）</p>
            </div>
            <div class="profitCont f-flex f-wrap">
                <div class="profWuei">
                    <p>可用余额（元）</p>
                    <div class="money f-flex">{{credit2}} 元</div>
                </div>
                <div class="profWuei">
                    <p>昨日收益</p>
                    <div class="money f-flex">{{zrmoney}}</div>
                </div>
                <div class="profWuei">
                    <p>今日收益</p>
                    <div class="money f-flex">{{jrmoney}} 元</div>
                </div>
                <div class="profWuei">
                    <p>本周收益</p>
                    <div class="money f-flex">￥{{bzmoney}}</div>
                </div>
                <div class="profWuei">
                    <p>本月收益</p>
                    <div class="money f-flex">{{bymoney}}</div>
                </div>
                <div class="profWuei">
                    <p>上月收益</p>
                    <div class="money f-flex">{{symoney}} 元</div>
                </div>
                <div class="profWuei">
                    <p>总收益</p>
                    <div class="money f-flex">{{zongmoney}} 元</div>
                </div>
                <div class="profWuei">
                    <p>今日已做任务</p>
                    <div class="money f-flex">{{jrrenwu}} 次</div>
                </div>
                <div class="profWuei">
                    <p>今日剩余次数</p>
                    <div class="money f-flex">{{num}} 次</div>
                </div>
                
            </div>
        </div>
        <div class="taskBox">
           <div class="taskHead">
               <p>任务大厅</p>
           </div>
           <div class="taskCont f-flex f-wrap">
               <div class="taskWeui" v-for="(item,index) in taskList" :key="index">
                   <img :src="item.img" alt="">
               </div>
           </div>
        </div>
        <div class="userBox">
            <div class="userHead">
                <p>会员榜单</p>
            </div>
            <div class="userCont f-flex f-wrap">
                <div class="userWeui f-flex f-cente" v-for="(item,index) in phblist" :key="index">
                    <img :src="item.touxiang" alt="">
                    <p class="name">恭喜: {{item.mobile}}</p>
                    <p class="types">今日已完成{{item.num}}单获得</p>
                    <div class="money f-flex f-ver">
                        <img src="@/assets/img/zuans.png" alt="">
                        <p>{{item.money}}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 首页的弹窗公告 -->
        <div class="tcprop" v-if="tcprop">
            <div class="proBox" >
                <div class="prohead" :style="propHead"></div>
                <div class="proCnt" :style="backgroundDiv" v-html="noticeText"></div>
            </div>
            <div class="proff f-flex f-jc-c" @click="proff">
                <img src="@/assets/img/proff.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                indexdata: "",
                tasklist: [],
                page: 1,
                grade: "",
                taskList: [],
                tcprop: true,
                propHead: {
                    backgroundImage: 'url(' + require('@/assets/img/nattistop.png') + ')'
                },
                backgroundDiv: {
                    backgroundImage: 'url(' + require('@/assets/img/nattis.png') + ')'
                },
                noticeText: '',//公告弹窗的内容
                notice: '',//公告轮播
                phblist: [],
                credit2: 0,
                zrmoney:0,
                jrmoney:0,
                bzmoney: 0,
                bymoney:0,
                symoney:0,
                zongmoney:0,
                jrrenwu:0,
                num:0
                
            };
        },
        beforeCreate(){

        },
        mounted() {
            this.main();
            this.indexphb()
        },
        created() {
            // this.main();
            // this.task_list();
        },
        methods: {
            // 格式化文本
             htmlEncode(str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&amp;/g, "&");
                s = s.replace(/&lt;/g, "<");
                s = s.replace(/&gt;/g, ">");
                s = s.replace(/&nbsp;/g, " ");
                s = s.replace(/&#39;/g, "'");
                s = s.replace(/&quot;/g, '"');
                s = s.replace(/<br\/>/g, "\n");
                return s;
            },
            // /7751.iiio.top/app/index.php?i=96&c=entry&m=wx_shop&do=mobile&r=api.home
            // 轮播图的获取
             main() {
                var that = this
                this.$api.Post("home").then(res => {
                    if(res.status == 1){
                        that.indexdata = res.result;
                        that.notice = res.result.data.qdbzsm
                        that.noticeText = that.htmlEncode(res.result.data.content);
                    }
                });
            },
            indexphb(){
                var that = this
                this.$api.Post("indexphb").then(res => {
                    if(res.status == 1){
                        that.phblist = res.result.phblist
                    }
                });
                this.$api.Post("sumcredit").then(res => {
                    if(res.status == 1){
                        console.log(res.result)
                        that.credit2 = res.result.credit2 ? res.result.credit2 : 0 ;
                        that.zrmoney = res.result.zrmoney ? res.result.zrmoney : 0 ;
                        that.jrmoney = res.result.jrmoney ? res.result.jrmoney : 0 ;
                        that.bzmoney = res.result.bzmoney ? res.result.bzmoney : 0 ;
                        that.bymoney = res.result.bymoney ? res.result.bymoney : 0 ;
                        that.symoney = res.result.symoney ? res.result.symoney : 0 ;
                        that.zongmoney = res.result.zongmoney ? res.result.zongmoney : 0 ;
                        that.jrrenwu = res.result.jrrenwu ? res.result.jrrenwu : 0 ;
                        that.num = res.result.num ? res.result.num : 0 ;
                    }
                });
            },
            // 关闭公告的弹窗
            proff:function() {
                this.tcprop = false
            }
        }
    };
</script>

<style lang="less" scoped>
    *{margin:0px;padding:0px}
    .perback{
        background-color: #fff !important;
    }
    .van-swipe{
        height: 4rem;
    }
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 160px;
        text-align: center;
        //   background-color: #39a9ed;
    }

    .my-swipe img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .eilent{
        overflow:hidden; //超出文本隐藏
        white-space:nowrap; //溢出不换行
        text-overflow:ellipsis; //溢出省略号显示
    }
    .profitBox{
        width: 100%;
        height: auto;
        padding: 0 10px;
        margin: 10px 0;
        .profitHead{
            width: 100%;
            color: #999;
            font-size: 16px;
            background-color: #c4d2e4;
            padding: 10px  15px ;
        }
        .profitCont{
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 10px;
            position: relative;
            -moz-box-shadow: 0px 1px 0px 0px #e5e5e5;; 
            -webkit-box-shadow: 0px 1px 0px 0px #e5e5e5;; 
            box-shadow: 0px 2px 2px 0px #e5e5e5;;
        }
        .profitCont:before{
            content: "";
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #c4d2e4;
            position: absolute;
            top: 33.33%;
            left: 0;
            box-sizing: border-box;
        }
        .profitCont:after{
            content: "";
            width: 100%;
            height: 1px;
            border-bottom: 1px solid #c4d2e4;
            position: absolute;
            bottom: 33.33%;
            left: 0;
            box-sizing: border-box;
        }
        .profWuei{
            width: 33.33%;
            height: auto;
            border-right: 1px solid #c4d2e4;
            padding: 10px 5px;
            p{
                font-size: 14px;
            }
            .money{
                color: #f96165;
                font-size: 18px;
                p{
                    max-width: 90px;
                }
            }
        }
        .profWuei:nth-child(3n){
            border-right: 0;
        }
    }
    .taskBox{
        width: 100%;
        height: auto;
        .taskHead{
            width: 100%;
            color: #000;
            font-size: 16px;
            background-color: #c4d2e4;
            padding: 10px  15px ;
        }
        .taskCont{
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 10px;
            padding-bottom: 0;
        }
        .taskWeui{
            width: 49%;
            height: auto;
            padding-top: 35%;
            margin-bottom: 10px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .taskWeui:nth-child(2n){
            margin-left: 2%;
        }
    }
    .userBox{
        width: 100%;
        height: auto;
        .userHead{
            width: 100%;
            color: #000;
            font-size: 16px;
            background-color: #c4d2e4;
            padding: 10px  15px ;
        }
        .userCont{
            width: 100%;
            height: auto;
            background-color: #fff;
            padding: 10px;
            padding-bottom: 0;
        }
        .userWeui{
            width: 49%;
            height: auto;
            background-color: #e9e9e9;
            padding: 15px 0;
            margin-bottom: 10px;
            border-radius: 8px;
            img{
                width: 45px;
                height: 45px;
                border-radius: 50%;
                margin-bottom: 5px;
            }
            .name{
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 5px;
            }
            .types{
                color: #999;
                font-size: 15px;
                margin-bottom: 5px;
            }
            .money{
                width: auto;
                height: auto;
                background-color: #ffe83d;
                border-radius: 20px;
                padding: 5px 10px;
                img{
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    margin-bottom: 0;
                }
                p{
                    font-size: 15px;
                }
            }
        }
        .userWeui:nth-child(2n){
            margin-left: 2%;
        }
    }
    .tcprop{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        .proBox{
            width: 90%;
            height: 60%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 10%;
            left: 5%;
            .prohead{
                width: 100%;
                height: 20%;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                overflow:hidden;
            }
            .proCnt{
                width: 100%;
                height: 80%;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                overflow:hidden;
                margin-top: -1px;
                padding: 0 5%;
                padding-bottom: 5px;
                text-indent: 10px;
            }
        }
        .proff{
            width: 100%;
            height: 45px;
            position: absolute;
            top: 75%;
            left: 0;
            img{
                width: 35px;
                height: 35px;
            }
        }
    }
    
</style>
