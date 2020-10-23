<template>
    <div class="perback">
        <div class="head_title">
        <button v-if="$route.meta.isBack" @click="back" class="back">
          <span></span>
          &#x3000;&#x3000;
        </button>
            {{headtitle}}
        </div>
        <div class="f-flex f-jc-sb">
            <p class="selLis"
                v-for="(item, index) of selLis"
                :key="index"
                :class="active == index ? 'active':''"
                @click="selSort(index)"
            >
                {{item}}
            </p>
        </div>
        <div v-if="recharge" class="posix">
            <p class="amont">
                {{money}}元
            </p>
            <div class="replayLis">
                <div class="lis">
                    <span>名称</span>
                    <span>金钱</span>
                    <span>来自用户</span>
                    <p>创建日期</p>
                </div>
                <van-list
                    v-model="loading_sy"
                    :finished="finished_sy"
                    :finished-text= total_sy
                    @load="onLoad_sy"
                    v-if="shide_sy"
                >
                    <div class="lis" v-for="(item, index) in shouyi_list" :key="index">
                        <span>{{item.shuoming }}</span>
                        <span>{{item.money }}</span>
                        <span>{{item.nickname }}</span>
                        <p>
                            <span>{{item.addtime.split(' ')[0]}}</span>
                            <span>{{item.addtime.split(' ')[1]}}</span>
                        </p>
                    </div>
                </van-list>
                <div class="lis" v-else>还没有记录~</div>
            </div>
        </div>
        <div v-else class="posix">
            <div class="replayLis">
                <div class="lis">
                    <span>金钱</span>
                    <span>状态</span>
                    <p>创建日期</p>
                </div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :finished-text= total
                    @load="onLoad"
                    v-if="shide"
                >
                    <div class="lis" v-for="(item, index) in recharge_List" :key="index">
                        <span>￥{{item.money}}</span>
                        <span>{{item.status == 1 ? "充值成功" : '未充值'}}</span>
                        <p>
                            <span>{{item.createtime.split(' ')[0]}}</span>
                            <span>{{item.createtime.split(' ')[1]}}</span>
                        </p>
                    </div>
                </van-list>
                <div class="lis" v-else>还没有记录~</div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            headtitle: '收益记录',
            selLis: ['收入', '支出', '充值'],
            active: 0,
            recharge: true,
            shide: true,
            shide_sy: true,
            loading: false,
            loading_sy: false,
            finished: false,
            finished_sy: false,
            recharge_List: [],
            shouyi_list: [],
            page: 1,
            page_sy: 1,
            total: '',
            total_sy:'',
            type: 1,
            money: this.$route.query.money
        }
    },
    mounted() {
        // this.$router.push();
        this.gataRecharge()
        this.gataShouyi()
        if (this.$route.query.type != undefined) {
            this.selSort(this.$route.query.type)
        }

    },
    created() {
    },
    methods: {
        // 收益
        gataShouyi(){
            var that = this;
            this.$api.Post("shouyi_log", { page : that.page_sy, type: that.type}).then(res => {
                if (res.status == 1) {
                    console.log(res)
                    // 数据全部加载完成
                    if (res.result.log.length <= 0) {
                        that.shide_sy = false;
                        return;
                    } else {
                        that.shouyi_list = res.result.log;
                        that.total_sy ="共有" + res.result.total + "条记录(只显示最近七天)"
                    }
                }
            });
        },
        onLoad_sy(){
            var that = this;
            setTimeout(function(){
                if (that.shouyi_list.length >= 10) {
                    that.page_sy++;
                    that.getLoadlist_sy();
                } else {
                    that.finished_sy = true;
                    that.loading_sy = false;
                }
            }, 3000)
        },
        getLoadlist_sy(){
            var that = this;
            that.finished_sy = true;
            that.loading_sy = false;
            this.$api.Post("shouyi_log", { page : that.page_sy, type: that.type}).then(res => {
                if (res.status == 1) {
                    // 数据全部加载完成
                    if (res.result.log.length <= 0) {
                        that.finished_sy = true;
                        return;
                    } else {
                        var array = res.result.log
                        that.shouyi_list = that.shouyi_list.concat(array);
                        that.total_sy ="共有" + res.result.total + "条记录(只显示最近七天)"
                        that.finished_sy = false
                        that.loading_sy = false
                    }
                }
            });
        },
        // 获得充值记录
        gataRecharge(){
            var that = this;
            this.$api.Post("recharge_log", { page : that.page}).then(res => {
                if (res.status == 1) {
                    // 数据全部加载完成
                    if (res.result.log.length <= 0) {
                        that.shide = false;
                        return;
                    } else {
                        that.recharge_List = res.result.log;
                    }
                }
            });
        },
        onLoad(){
            var that = this;
            setTimeout(function(){
                if (that.recharge_List.length >= 10) {
                    that.page++;
                    that.getLoadlist();
                } else {
                    that.finished = true;
                    that.loading = false;
                }
            }, 3000)
        },
        getLoadlist(){
            var that = this;
            that.finished = true;
            that.loading = false;
            this.$api.Post("recharge_log", { page : that.page}).then(res => {
                if (res.status == 1) {
                    // 数据全部加载完成
                    if (res.result.log.length <= 0) {
                        that.finished = true;
                        return;
                    } else {
                        var array = res.result.log
                        that.recharge_List = that.recharge_List.concat(array);
                        that.total ="共有" + res.result.total + "条记录(只显示最近七天)"
                        that.finished = false
                        that.loading = false
                    }
                }
            });
        },




        back() {
            this.$router.go(-1);
        },
        selSort(index){
            this.active = index
            this.type = index == 0 ? 1 : 1;
            this.type = index == 1 ? 2 : 1;

            if(index == 2){
                this.recharge = false
                this.headtitle = "充值记录"
            } else{
                this.recharge = true
                this.headtitle = "收益记录";
                this.page_sy = 1
                this.shouyi_list = []
                this.gataShouyi()
            }
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
.head_title{
    position: fixed;
    width: 100%;
    background: #DADEEA;
    color: black;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    z-index: 11;
    text-align: center;
    line-height: 1.2rem;
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
.selLis{
    margin-top: 1.2rem;
    width: 33.3%;
    text-align: center;
    line-height: 1rem;
}
.active{
    color: red;
}
.amont{
    text-align: center;
    font-size: 40px;
    padding: 20px 0;
}
.recordLis{
    width: 100%;
    li{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
        span{
            width: 25%;
            display: block;
        }
    }
    >li:last-child {
        margin: 10px;
        border: 0;
    }
}
.replayLis{
     width: 100%;
    .lis{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        span{
            width: 25%;
            display: block;
        }
        >p{
            width: 48%;
            display: block;
            span{
                width: 100%;
            }
        }
    }
    .lis:last-child {
        border: 0;
        box-sizing: border-box;
    }
}
.posix{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
    overflow-y: scroll;
}
</style>
