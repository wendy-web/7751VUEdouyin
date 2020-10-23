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
                <div class="list_wr" v-for="(item, index) in  list" :key="index">
                    <img :src="item.img" alt="" @click="bigImg(item.img)">
                        <div>
                            <p>信用分: <span>{{item.credit}}</span></p>
                            <p>时间: <span>{{item.addtime }}</span></p>
                            <p>详情: <span>{{item.kcyy}}</span></p>
                        </div>
                </div>
            </van-list>
        </div>
        <!-- :showIndex="false"不展示页码 -->
        <van-image-preview v-model="showImg" :images="images" @change="onChange" :showIndex="false">
            <template v-slot:index >第{{ index }}页</template>
        </van-image-preview>


    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            page: 1,
            list:[],
            shide: true,
            loading: false,
            finished: false,
            showImg: false,
            images: []
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
        onChange(index){
            this.index = index + 1;
        },
        bigImg(img){
            this.images[0] = img
            this.showImg = true
        },
        getList(){
            var that = this;
            this.$api.Post("my_credit", { page : that.page}).then(res => {
                if (res.status == 1) {
                    console.log(res)
                    // 数据全部加载完成
                    if (res.result.log.length <= 0) {
                        that.shide = false;
                        return;
                    } else {
                        that.list = res.result.log;
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
            this.$api.Post("my_credit", { page : that.page}).then(res => {
                if (res.status == 1) {
                    // 数据全部加载完成
                    if (res.result.log.length <= 0) {
                        that.finished = true;
                        return;
                    } else {
                        var array = res.result.log
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
.van-image-preview{
    background: #000;
}
.infoBox{
    padding: 0.1rem;
    .list_wr{
        width: 100%;
        display: flex;
        border-bottom: 1px solid rgb(230, 229, 229);
        img{
            width: 2rem;
            height: 2rem;
            background: gray;
            margin-right: 10px;
        }
        div{
            flex: 1;
            p{
                line-height: 0.7rem;
            }
        }
    }
}
</style>
