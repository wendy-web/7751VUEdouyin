<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="iunfoBox">
            <div class="line">
                <p><img class="ingoimg" src="@/assets/img/icon/info1.png" alt="">头像</p>
                <!-- <img class="user_img"  alt=""> -->
                <router-link class="img_box" tag='div' :to="{name: 'infotouxian', query: {avatar: avatar}}">
                    <img to="/infotouxian" class="user_img" :src="avatar" tag="img" />
                    <span class="login_btn"></span>
                </router-link>
            </div>
            <div class="line">
                <p><img class="ingoimg" src="@/assets/img/icon/info2.png" alt="">我的手机号码</p>
                <p>{{mobile}}<span class="login_btn"></span></p>
            </div>
            <router-link to="/payPal" tag='div' class="line" v-if="this.displayLis.alipay == 1">
                <p><img class="ingoimg" src="@/assets/img/icon/info3.png" alt="">我的支付宝</p>
                <p>
                    ***********
                    <span class="login_btn"></span>
                </p>
            </router-link>
            <router-link class="line"  to="/wachatPal" tag='div' v-if="this.displayLis.wixin == 1">
                <p><img class="ingoimg" src="@/assets/img/icon/wechat.png" alt="">我的微信</p>
                <p>
                    ***********
                    <span class="login_btn"></span>
                </p>
            </router-link>
            <router-link to="/bindbank" class="line" tag='div' v-if="this.displayLis.yinh == 1">
                <p><img class="ingoimg" src="@/assets/img/icon/info4.png" alt="">我的银行卡</p>
                <p>
                    ***********
                    <span class="login_btn"></span>
                </p>
            </router-link>
            <router-link class="line" to="/personMess" tag='div'>
                <p><img class="ingoimg" src="@/assets/img/icon/info1.png" alt="">我的详细信息</p>
                <p><span class="login_btn"></span></p>
            </router-link>
            <van-cell class="line" @click="toggleSetPsw">
                <p><img class="ingoimg" src="@/assets/img/icon/info5.png" alt="">密码管理</p>
                <p><span class="login_btn"></span></p>
                <!-- 设置密码 -->
                <!-- <div class="setPsw"></div> -->
            </van-cell>
        </div>
        <!-- 设置密码的弹出框 -->
        <van-popup class="setPsw" v-model="setPsw" position="bottom" :style="{ height: '30%' }">
            <p><i @click="toggleSetPsw" class="iconfont">&#xe61a;</i></p>
            <input type="password" class="inpPsw" placeholder='请输入登录密码' v-model="inputPsw"/>
            <input type="button" name="" class="inpSub" value="保存" @click="savePsw">
        </van-popup>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
import { Dialog } from "vant";
export default {
    data() {
        return {
            mobile: this.$route.query.phone,
            setPsw: false,
            inputPsw: '',
            displayLis:'',
            avatar: '',//传递过来的id
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.gndisplay()
        this.gateImg()
    },
    created() {
    },
    methods: {
        gateImg(){
            var that = this
            this.$api.Post("center").then(res => {
                if (res.status == 1) {
                    this.avatar = res.result.avatar;
                }
            });
        },
        gndisplay() {
            this.$api.Post("gndisplay").then(res => {
                if (res.status == 1) {
                    this.displayLis = res.result;
                    console.log(this.displayLis)
                }
            })
        },
        toggleSetPsw() {
            this.setPsw = !this.setPsw;
            this.inputPsw = ''
        },
        savePsw(){
            var that = this
            if(this.inputPsw==''){
                this.$toast('请输入密码')
                return;
            }
            //弹窗
            Dialog.confirm({
                title: "",
                message: "确定修改密码？"
            })
            .then(() => {
                this.$api.Post("uppwd", { pwd: this.inputPsw }).then(res => {
                    if(res.status == 1){
                        this.$toast(res.result.message)
                        that.setPsw = false;
                    }
                });
            })
            .catch(() => {
            });
            
            
        }
    }
}
</script>

<style lang="less">
*{margin:0px;padding:0px}
.perback{
    background-color: #fff !important;
}
.iunfoBox {
    .line{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
        img{
            width: 0.5rem;
            padding: 15px 0.1rem;
        }
        div{
            display: flex;
            justify-content: space-between;
            align-items: center; 
        }
    }
    .line:last-child{
        position: relative;
    }
}
.login_btn::before{
    content: " ";
        display: inline-block;
        -webkit-transform: rotate(225deg);
        -ms-transform: rotate(225deg);
        transform: rotate(225deg);
        height: 10px;
        width: 10px;
        border-width: 0 0 2px 2px;
        border-color: #666;
        border-style: solid;
        position: relative;
        right: 5px;
        margin-left: 20px;
}
.setPsw{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    p{
        padding: 10px;
        text-align: right;
    }
    input{
        display: block;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 0 10px;
        box-sizing: border-box;
        line-height: 1rem;
    }
    .inpPsw{
        width: 90%;
        display: block;
        margin: 20px auto;
    }
    .inpSub{
        width: 30%;
        margin: 10px 5% 20px;
    }
}
</style>
