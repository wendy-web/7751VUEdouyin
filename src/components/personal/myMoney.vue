<template>
    <div class="perback">
        <div class="topBanner">
            <div class="top_titke">
                <button v-if="$route.meta.isBack" @click="back" class="back">
                <span></span>
                    &#x3000;&#x3000;
                </button>
                我的钱包
            </div>
            <p class="money">{{num}}</p>
            <div class="f-flex f-jc-sb">
                <!-- <router-link to='/transferAccount' tag='div' class="sel_bnt">转账</router-link> -->
                <router-link to='/recharge' tag='div' class="sel_bnt">充值</router-link>

                <router-link :to="{name: 'withdraw',query: {id : num}}" tag='div' class="sel_bnt">提现</router-link>
            </div>
        </div>
        <div class="bannerCon">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                v-if="shide"
            >
                <div class="listText">
                    <p>金钱/手续费</p>
                    <p>状态</p>
                    <p>日期</p>
                </div>
                <div v-for="(item, index) in list" :key="index" class="listText">
                    <p>{{item.money}} / {{item.deductionmoney}}</p>
                    <p v-if="item.status == -1">拒绝</p>
                    <p v-if="item.status == 0">申请中</p>
                    <p v-if="item.status == 1">通过</p>
                    <p>{{item.createtime}}</p>
                </div>
            </van-list>
            <div class="empty_box" v-else>
                <div class="listText">
                    <p>金钱/手续费</p>
                    <p>状态</p>
                    <p>日期</p>
                </div>
                还没有数据哦！
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 0,
            page: 1,
            list: [],
            shide: true,//是否有数据
            loading: false,
            finished: false
            
        }
    },
    mounted() {
        this.gataData()
    },
    created() {
    },
    methods: {
        gataData(){
            var that = this;
            this.$api.Post("my_wallet",{page: this.page}).then(res => {
                console.log(res)
                if (res.status == 1) {
                    that.num = res.result.credit2
                    if(res.result.log.length <= 0){
                        that.shide = false
                        return
                    } else{
                        that.list = res.result.log
                    }
                }
            });
        },
        onLoad(){
            console.log('加载....')
            var that = this;
            setTimeout(function(){
                if (that.list.length >= 10) {
                    that.page++;
                    that.getLoadlist();
                } else {
                    that.finished = true;
                    that.loading = false;
                }
            }, 1000)
        },
        getLoadlist(){
            var that = this;
            that.finished = true;
            that.loading = false;
            this.$api.Post("my_wallet", { page : that.page}).then(res => {
                if (res.status == 1) {
                    // 数据全部加载完成
                    if (res.result.game_log.length <= 0) {
                        that.finished = true;
                        return;
                    } else {
                        var array = res.result.game_log
                        that.list = that.list.concat(array);
                        that.finished = false
                        that.loading = false
                    }
                }
            });
        },
        back() {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="less" scoped>
*{margin:0px;padding:0px}
.perback{
    background-color: #fff !important;
    color: #000;
}
.topBanner{
    background: #21B36C;
    color: #fff;
    text-align: center;
    .top_titke{
        width: 100%;
        font-size: 16px;
        z-index: 11;
        text-align: center;
        line-height: 1.2rem;
        position: relative;
        .back {
            position: absolute;
            left: 0;
            background: transparent;
            border: none;
            outline: none;
            font-size: 16px;
            height: 1.2rem;
            padding: 0 20px;
            span {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-width: 2px 0 0 2px;
            border-style: solid;
            border-color: #494949;
            transform: rotate(-45deg);
            }
        }
    }
    .money{
        line-height: 3.5rem;
        font-size: 40px;
    }
    div{
        .sel_bnt{
            width: 50%;
            margin: 10px 0 20px;
            line-height: 15px;
        }
        .sel_bnt:first-child{
            border-right: 1px solid #fff;
        }
    }
}
.bannerCon{
    width: 100%;
}
.listText{
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-bottom: 1px solid #ddd;
    line-height: 1rem;
}
.listText p:nth-child(1){
    width: 30%;
}
.listText p:nth-child(2){
    width: 20%;
}
.listText p:nth-child(3){
    width: 50%;
}
</style>
