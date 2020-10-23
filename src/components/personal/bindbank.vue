<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="iunfoBox">
           <p class="promptMess">您的银行卡信息</p>
           <ul class="wrapp">
               <li>
                   <p>银行名称:</p>
                   <p>{{nowBank}}</p>
                   <div class="selBank" @click="showPopup">快速选择</div>
               </li> 
               <li>
                   <p>银行卡号:</p>
                   <input type="number" placeholder="请输入银行卡号" v-model="bank">
               </li>
               <li>
                   <p>开户人:</p>
                   <input type="text" placeholder="请输入开户人名称" v-model="khname">
               </li>
               <li>
                   <p>备注信息:</p>
                   <textarea name="messCon" id="messCon" placeholder="备注信息" v-model="remark"></textarea>
               </li>
           </ul>
           <p class="prompttext">温馨提示：您好，为保证会员提现流畅，系统暂不支持农村信用社，农村商业银行，建议您绑定常用4大银行或其它银行，谢谢！</p>

           <div class="set_btn" @click="setting">设置信息</div>

           <div class="banksel" v-if="show">
                <van-picker
                    title="标题"
                    show-toolbar
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                    @change="onChange"
                />
           </div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
import { Toast } from 'vant';
export default {
    data() {
        return {
            mobile:'136****',
            columns: [],
            show:false,
            nowBank: '',
            bank:'',
            khname:'',
            remark:''
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.main()
        this.gataData()
    },
    created() {
    },
    methods: {
        gataData(){
            this.$api.Post("my_list").then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.nowBank = res.result.my_list.bankname
                    this.khname = res.result.my_list.khname
                    this.bank = res.result.my_list.bank

                }
            })
        },
        main() {
            var that = this
            this.$api.Post("typebank").then(res => {
                if (res.status == 1) {
                    var bankLis = res.result.bankname;
                    that.nowBank = bankLis[0].bankname
                    for(var i = 0; i<bankLis.length;i++){
                        that.columns.push(bankLis[i].bankname)
                    }
                }
            })
        },
        setting() {
            if(this.bank==''){
                this.$toast('请输入银行卡号')
                return;
            }
            if(this.khname==''){
                this.$toast('请输入开户人姓名')
                return;
            }
            this.$api.Post("paybinding",{
                status: 'bank',
                bank: this.bank,
                bankname: this.nowBank,
                khname: this.khname,
                remark: this.remark
            }).then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.$toast(res.result.message)
                    this.$router.go(-1)
                }
            })
        },
        onConfirm(value, index) {
            this.nowBank = value
            this.show = false;
            console.log(this.nowBank)
        },
        onChange(picker, value, index) {
            // Toast(`当前值：${value}, 当前索引：${index}`);
        },
        onCancel() {
            Toast('取消');
            this.show = false;
        },
        showPopup() {
            this.show = true;
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
.prompttext{
    padding: 0 0.4rem;
    font-size: 12px;
    color: #000;
    margin-top: 10px;
}
.banksel{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.48);
    z-index: 999;
    .van-picker{
        position: absolute;
        width: 100%;
        bottom: 0;
        animation: bott 0.3s;
        // transition: all 0.2s;
    }
}
@keyframes bott{
    from{bottom: -50%;}
	to{bottom: 0;}
}
.wrapp{
    padding: 0 0.5rem;
    font-size: 16px;
    li{
        display: flex;
        align-items: flex-start;
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        position: relative;
        >p:nth-child(1){
            width: 2rem;
            margin-right: 5px;
        }
        >p:nth-child(2){
            flex: 1;
        }
        input{
            flex: 1;
        }
        #messCon{
            flex: 1;
            line-height: 0.6rem;
            border: none;
            resize: none;
            display: flex;
            height: 2rem;
            border: 1px solid #ddd;
            padding: 5px;
            box-sizing: border-box;
        }
        .selBank{
            position: absolute;
            right: 0;
            font-size: 14px;
            color: gray;
            border-radius: 3px;
            border:1px solid #ddd;
            padding: 2px 5px;
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
