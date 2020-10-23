<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="iunfoBox">
           <p class="promptMess">您的支付信息</p> 
           <p class="messRed">微信帐号和姓名必须是真实的才可以提现</p>
           <p class="messRed">帐号错误导致提现失败概不负责</p>
           <ul class="wrapp">
               <li>
                   <p>微信帐号:</p>
                   <input type="text" placeholder="请输入微信帐号" v-model="weixin">
               </li>
               <li>
                   <p>微信姓名:</p>
                   <input type="text" placeholder="请输入微信姓名" v-model="weixinname">
               </li>
           </ul>
           <div class="set_btn" @click="setting">设置信息</div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            weixin:'',
            weixinname:''
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
            this.$api.Post("my_list").then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.weixin = res.result.my_list.weixin
                    this.weixinname = res.result.my_list.weixinname
                }
            })
        },
        setting() {
            if(this.weixin==''){
                this.$toast('请输入微信号')
                return;
            }
            if(this.weixinname==''){
                this.$toast('请输入微信名称')
                return;
            }
            this.$api.Post("paybinding",{
                status: 'weixin',
                weixin: this.weixin,
                weixinname: this.weixinname
            }).then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.$toast(res.result.message)
                    this.$router.go(-1)
                }
            })
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
.promptMess {
    width: 100%;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 0.1rem;
    background: #eee;
    font-size: 16px;
}
.messRed{
    width: 100%;
    line-height: 1rem;
    padding: 0 0.5rem;
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.wrapp{
    padding: 0 0.5rem;
    font-size: 16px;
    li{
        display: flex;
        align-items: center;
        line-height: 1.2rem;
        border-bottom: 1px solid #ddd;
        p{
            margin-right: 5px;
        }
        input{
            flex: 1;
        }
    }
}
.set_btn{
    margin: 0.5rem 0.4rem;
    color: #fff;
    background: #31364A;
    display: block;
    text-align: center;
    line-height: 0.9rem;
    border-radius: 5px;
}
    
</style>
