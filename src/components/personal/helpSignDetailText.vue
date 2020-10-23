<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <h3 class="title">{{data.article_title}}</h3>
            <p class="infoText">
                {{data.resp_desc}}
            </p>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            category_id: 0,//当前分类的id
            data: {}
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
            this.$api.Post("wenzhang_xiangqing",{
                article_id: that.category_id
            }).then(res => {
                console.log(res)
                if (res.status == 1) {
                    that.data = res.result.article
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
    .title{
        text-align: center;
        line-height: 1.5rem;
    }
    .infoText{
        padding: 0.1rem;
        text-indent: 10px;
    }
}
</style>
