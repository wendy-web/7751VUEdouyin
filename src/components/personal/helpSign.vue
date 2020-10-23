<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <router-link tag='div' class="list" :to="{name: 'helpSignDetail', query:{id:item.id}}" v-for="(item,index) in list" :key="index">
                <p>{{item.category_name}}</p>
                <span class="right_icon"></span>
            </router-link>
            <!-- <router-link :to="{name:'detail',query:{id:1}}"> xxx </router-link> -->
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            list:[]
        }
    },
    components: {
        pageTop
    },
    mounted() {
       this.gataLis() 
    },
    methods: {
        gataLis(){
            var that = this;
            this.$api.Post("wenzhang_type").then(res => {
                if (res.status == 1) {
                   that.list = res.result.category
                   console.log(that.list)
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
