<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <img src="@/assets/img/guanjia.png" alt=""  class="incoImg">
            <div  class="openAcom">
                <p>是否开启云管家</p>
                <van-switch v-model="checked" />
            </div>
            <div class="conte">
                <p>云管家托管声明</p>
                <p>1.云管家是自动任务托管机器人</p>
            </div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            checked: true
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
    .incoImg{
        width: 50%;
        display: block;
        margin: 10px auto;
    }
    .openAcom{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eaeaea;
        line-height: 40px;
    }
    .conte{
        color: #EEC773;
        width: 100%;
        padding: 0.1rem 0;
    }
}
.van-switch__node{
    top: -1px;
}
</style>
