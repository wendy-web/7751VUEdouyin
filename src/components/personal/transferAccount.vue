<template>
    <div class="perback">
        <pageTop></pageTop>
        <ul class="bannerCon">
            <li>
                <p>对方帐号</p>
                <p>金钱</p>
                <p>日期</p>
            </li>
             <li>
                <p>3232</p>
                <p>5555</p>
                <p>2020-11-11</p>
            </li>
        </ul>
        <div class="addTrans" @click="toggleSetTrans">+</div>
        <!-- 转账的弹出框 -->
        <van-popup class="setTrans" v-model="setTrans" position="bottom" :style="{ height: '40%' }">
            <p><i @click="toggleSetTrans" class="iconfont">&#xe61a;</i></p>
            <input type="password" class="inpPsw" placeholder='请输入对方帐号' v-model="inputPerId"/>
            <input type="password" class="inpPsw" placeholder='请输入转账金额' v-model="inputPerMon"/>
            <input type="button" name="" class="inpSub" value="确认转账" @click="saveTrans">
        </van-popup>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            setTrans: false,
            inputPerId: '',
            inputPerMon: ''
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
        toggleSetTrans() {
            this.setTrans = !this.setTrans;
            this.inputPerId = '';
            this.inputPerMon = ''
        },
        saveTrans() {
            console.log(this.inputPerId)
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
.bannerCon{
    width: 100%;
    li{
        display: flex;
        justify-content: center;
        text-align: center;
        border-bottom: 1px solid #ddd;
        line-height: 1rem;
        p{
            width: 33.3%;
        }
    }
}
.addTrans{
    position: fixed;
    bottom: 5%;
    right: 7%;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #21B36C;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: #fff;
}
.setTrans{
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
