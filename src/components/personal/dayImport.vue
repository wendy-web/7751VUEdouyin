<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="sumProfit">
            <p>自己任务收益：{{data.rw_jrmoney ? data.rw_jrmoney : 0}}元</p>
            <p>下级任务收益：{{data.xrw_jrmoney ? data.xrw_jrmoney : 0}}元</p>
            <!-- <p>下级充值收益：56元</p> -->
            <p>中奖收益：{{data.cj_jrmoney ? data.cj_jrmoney : 0}}元</p>
            <p>总收益：{{data.jrmoney ? data.jrmoney : 0}}元</p>
        </div>
        <ul class="tableList">
            <li>
                <span>数量</span>
                <span>任务</span>
                <span>下级</span>
                <span>拉人</span>
                <span>其他</span>
                <span>消费</span>
                <span>日期</span>
            </li>
            <li>
                <span>3</span>
                <span>5.4</span>
                <span>5</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
                <span>06-22</span>
            </li>
            <li>
                <p>(一天一更新)</p>
                <p>详细数据看收入记录</p>
                <p>共有1条数据(只显示最近30天记录)</p>
            </li>
        </ul>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            data:{}
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.gataData()
    },
    created() {
    },
    methods: {
        gataData(){
            var that = this;
            this.$api.Post("rijiebaobiao").then(res => {
                if (res.status == 1) {
                    that.data = res.result
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
.sumProfit{
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    border: 1px dashed #ddd;
    text-align: center;
    padding: 5px 0;
    >p:last-child{
        color: #203FBB;
    }
}
.tableList{
    width: 100%;
    li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        border-bottom: 1px solid #ddd;
        span{
            width: 14.28%;
            line-height: 1rem;
            display: inline-block;
        }
    }
    >li:last-child{
        width: 100%;
        display: inline-block;
        border: 0;
        font-size: 14px;
    }
}
</style>
