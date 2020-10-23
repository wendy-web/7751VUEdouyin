<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            
            
            <div class="notNum">
                <img src="@/assets/img/icon/index_02.png" alt="">
                <p>暂无商品</p>
            </div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
        }
    },
    components: {
        pageTop
    },
    mounted() {
        
    },
    created() {
    },
    methods: {
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
}
.notNum{
    margin: 0px auto;
    text-align: center;
    img{
        width: 1.3rem;
        height: 1.3rem;
        background: pink;
    }
}
</style>
