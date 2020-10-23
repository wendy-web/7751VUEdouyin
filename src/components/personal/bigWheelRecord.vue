<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                v-if="shide"
            >
                <div v-for="(item, index) in list" :key="index" class="listRecod">
                    <div class="flex">
                        <P class="resume">{{item.resume}}</P>
                        <p>{{item.addtime}}</p>
                    </div>
                    <div class="flex">
                        <p>余额奖励：<span class="resume">￥{{item.credit}}</span></p>
                        <p style="margin-right:10px">任务数量：{{item.rw_num}}</p>
                    </div>
                </div>
            </van-list>
            <div class="empty_box" v-else>还没有数据哦！</div>
        </div>
    </div>
</template>
<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            loading: false,
            finished: false,
            list: [],
            page: 1,
            shide: true
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.getList()
    },
    created() {
    },
    methods: {
        
        getList(){
            var that = this;
            this.$api.Post("gamelog", { page : that.page}).then(res => {
                if (res.status == 1) {
                    console.log(res)
                    // 数据全部加载完成
                    if (res.result.game_log.length <= 0) {
                        that.shide = false;
                        return;
                    } else {
                        that.list = res.result.game_log;
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
            this.$api.Post("gamelog", { page : that.page}).then(res => {
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
.infoBox{
    padding: 10px;
    div{
        
        .flex{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }
        div{
            .resume{
                font-size: 16px;
                color:red;
            }
        }
    }
}
.listRecod{
    border-bottom: 1px solid #e8e6e6;
    margin-bottom: 0.3rem;
}
.infoBox>div:last-child{
    border: none;
}
</style>
