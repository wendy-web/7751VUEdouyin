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
                <router-link tag='div' class="list" :to="{name: 'helpSignDetailText', query:{id:item.id}}" v-for="(item,index) in list" :key="index">
                    <p>{{item.article_title}}</p>
                    <span class="right_icon"></span>
                </router-link>
             </van-list>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            category_id: 0,//当前分类的id
            page: 1,
            list: [],
            loading: false,
            finished: false,
            shide:true,
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.category_id = this.$route.query.id
        this.gataLis()
    },
    methods: {
        gataLis(){
            var that = this;
            this.$api.Post("help_center",{
                category_id: that.category_id,
                page: that.page
            }).then(res => {
                console.log(res)
                if (res.status == 1) {
                   if(res.result.articles <= 0){
                       that.shide = false
                       return;
                   } else {
                       that.list = res.result.articles
                   }
                } else{
                    this.$toast(res.result.message);
                }
            });
        },
        onLoad(){
            var that = this;
            setTimeout(function(){
                if (that.list.length >= 1) {
                    that.page++;
                    that.getLoadlist();
                if (that.list.length <= 0) {
                    that.finished = true;
                }
                } else {
                    that.loading = false;
                }
            }, 1000)
        },
        getLoadlist(){
            var that = this;
            that.finished = true;//加载完成，不再触发加载事件
            that.loading = false;//在遍历数组，不 让多次触发加载事件
            this.$api.Post("help_center",{
                category_id: that.category_id,
                page: that.page
            }).then(res => {
                console.log(res)
                if (res.status == 1) {
                   if(res.result.articles.length <= 0){
                       that.finished = true;
                       return;
                   } else {
                       var array = res.result.articles
                       that.list = that.list.concat(array);
                       that.finished = false
                       that.loading = false
                   }
                } else{
                    this.$toast(res.result.message);
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
    width: 100%;
    .list{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
        p{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            flex: 1;
            line-height: 1.5rem;
            text-align: left;
        }
        span{
            display: inline-block;
            transform: rotate(225deg);
            height: 0.2rem;
            width: 0.2rem;
            border-width: 0 0 0.06rem 0.06rem;
            border-color: #666;
            border-style: solid;
            position: relative;
            right: 0.133333rem;
            margin-left: 0.533333rem;
        }
    }
}
</style>
