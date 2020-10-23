<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <!-- 信用指标 -->
           <div class="credit" id="myChart">
               <chart :options="orgOptions" :auto-resize="true"></chart>
           </div>

           <div class="detail">
               <p>信用说明</p>
               <router-link to='/minCreditRecord' tag='p'
               class="record">记录<span></span></router-link>
           </div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            orgOptions: {},
            num: 0
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.gataData()
    },
    methods: {
        gataData(){
            this.$api.Post("my_credit").then(res => {
                if (res.status == 1) {
                    this.num = res.result.credit1
                    this.orgOptions = {
                        tooltip: {
                            formatter: '{a} <br/>{b} : {c}%'
                        },
                        toolbox: {
                            feature: {
                                // restore: {},
                                // saveAsImage: {}
                            }
                        },
                        series: [
                            {
                                name: '信用指标',
                                type: 'gauge',
                                detail: {formatter: '{value}'},
                                data: [{value: this.num, name: '信用指标'}]
                            }
                        ]
                    };
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
.credit{
    width: 100%;
    height: 9rem;
}
.echarts{
    width: 100%!important;
    height: 100%!important;
}
.detail{
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
    .record{
        color: gray;
        span::before{
            content: " ";
            display: inline-block;
            -webkit-transform: rotate(225deg);
            -ms-transform: rotate(225deg);
            transform: rotate(225deg);
            height: 8px;
            width: 8px;
            border-width: 0 0 2px 2px;
            border-color: gray;
            border-style: solid;
            position: relative;
            right: 5px;
            margin-left: 5px;
        }
    }
}
</style>
