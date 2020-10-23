<!--  -->
<template>
    <div>
        <div>
            <van-nav-bar title="充值" left-text left-arrow @click-left="onClickLeft" />
        </div>
        <div class="box f-flex flex-col flex-center">

            <img class="make-collections" :src="erm_code" alt="">
            <div class="change-code" @click="change_code">点击切换收款码</div>
            <div class="f-flex flex-ver inpBox">
                ￥
                <input type="number" placeholder="输入充值金额" class="inp" id="tai_mony" ref="test" v-model="tai_mony" />
            </div>

            <div class="upload-tip">上传支付凭证</div>
            <div class="uploadBox f-flex flex-ver">
                <label for="upload">
                    <img :src="post_imgurl" class="up_img" alt id="up_img" />

                </label>
                <input type="file" name id="upload" class="none" @change="change_img" ref="file" />

            </div>
            <button class="confirm" @click="recharge()">立即提交</button>
        </div>
        
        <div class="yes-wrapper" v-if="change_tip">
            <div class="content-wrapper">
                <div class="pay-tip">付款后请勿切换付款码</div>
                <div class="yes-btn" @click="yes_i_know">知道了</div>
            </div>
        </div>
        

    </div>
</template>

<script>
    export default {
        data() {
            return {
                inp_val: 0,
                aaaala: "",
                post_imgurl: require("@/assets/addImg.png"),
                rechanum: 0,
                erm_code: '',   // 付款码
                change_tip: false,   // 切换付款码 控制显示 提示
                playCode :1,
                tai_mony: ''
            };
        },
        created(){
            this.yes_i_know();
        },
        methods: {
            // 点击切换付款码
            change_code(){
                this.change_tip = true;
            },
            // 点击知道了
            yes_i_know() {
                this.change_tip = false
                this.$api.Post("rechargeindex").then(res => {
                    if(res.status == 0){
                        this.$toast(res.result.message)
                        return;
                    }
                    if(res.status == 1){
                        if(this.playCode == 1){
                            this.erm_code = res.result.weixin;
                            this.playCode = 2;
                        } else{
                            this.erm_code = res.result.alipay;
                            this.playCode = 1;
                        }
                    }
                });
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            toDetail() {
                this.$router.push("/my/rechargeDetail");
            },



            change_img() {
                let that = this;
                if (typeof FileReader == "undifined") {
                    //判断浏览器是否支持filereader
                    result.innerHTML = "<p>抱歉，你的浏览器不支持 FileReader</p>";
                    return false;
                }
                var file = this.$refs.file.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    //判断获取的是否为图片文件
                    alert("请确保文件为图像文件");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                var imgURL;
                reader.onload = e => {
                    let {
                        result
                    } = e.target;

                    console.log(result)
                    that.post_imgurl = result;
                    that.aaaala = result;
                    
                };
            },
            // 充值提交
            recharge() {
                var that = this;
                if (this.rechanum != 0) {
                    return;
                }
                if (!this.tai_mony) {
                    this.$toast('请输入充值金额')
                    return;
                }
                if (this.aaaala == "") {
                    this.$toast("请上传支付凭证");
                    return;
                }
                this.$api.Post('recharge', {
                    thumb : this.aaaala,   // 支付凭证base64
                    num : this.tai_mony    // 付款金额
                }).then(res => {
                    console.log(res)
                    if (res.status == 1) {
                        that.$toast(res.result.message);
                        setTimeout(()=>{
                            this.$router.go(-1)
                        }, 1000)
                    } else {
                        that.$toast(res.result.message);
                    }
                });
            },


        },

    };
</script>

<style lang="less" scoped>
    .yes-wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0,0,0,.7);
        text-align: center;
        .content-wrapper{
            border-radius: 6px;
            width: 200px;
            // height: 200px;
            background-color: #fff;
            .pay-tip{
                padding: 20px 0;
            }
            .yes-btn{
                width: 80px;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                border-radius: 6px;
                border: 1px solid #ccc;
                margin-bottom: 10px;
                font-size: 14px;
            }
        }
    }
    .change-code {
        // align-self: flex-start;
        padding: 10px 0;
    }

    .upload-tip {
        align-self: flex-start;
    }

    .page {
        min-height: 100%;
        height: auto;
    }

    .top>span {
        font-size: 14px;
        padding: 0 10px 0 0;
    }

    .box {
        width: 90%;
        border-radius: 10px;
        margin: 0px auto 15px;
        padding: 15px;
        box-sizing: border-box;
    }

    /* .box > img {
  width: 40px;
  height: 40px;
} */
    .make-collections {
        width: 200px;
        height: 200px;
    }

    .box>p {
        line-height: 30px;
        font-size: 14px;
    }

    .inpBox {
        width: 100%;
        border-bottom: 1px solid #eeeeee3a;
        padding: 10px 0;
        font-size: 20px;
    }

    .uploadBox {
        // padding: 10px 0 0;
        font-size: 15px;
    }

    .uploadBox>label {
        margin-right: 10px;
    }

    .inp {
        height: 20px;
        background: transparent;
        border: none;
        outline: none;
        margin-left: 5px;
        font-size: 16px;
        padding-top: 5px;
    }

    .confirm {
        width: 80%;
        height: 36px;
        border: none;
        border-radius: 5px;
        color: #000;
        margin-top: 20px;
        outline: none;
        background: #DADEEA;
    }

    .paySelect {
        width: 100%;
        border-radius: 10px;
        margin: 10px auto 0;
        padding: 15px 20px;
        box-sizing: border-box;
        font-size: 15px;
    }

    .select {
        width: 100%;
        border-bottom: 1px solid #eeeeee3a;
        padding: 10px 0;
    }

    .select> :first-child {
        width: 26px;
        margin-right: 10px;
    }

    .select>div {
        flex: 1;
    }

    .radio+span {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        background: #eeeeee;
        border-radius: 10px;
        margin-right: 10px;
        border: 1px solid #999;
        box-sizing: border-box;
    }

    .radio:checked+span::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #017bff;
        left: 3px;
        top: 3px;
        border-radius: 5px;
    }

    .qrCode {
        display: block;
        width: 120px;
        height: 120px;
        background: white;
        margin-top: 15px;
    }

    .plq_ul .plq_li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        list-style: none;
    }

    .plq_ul {
        width: 100%;
    }

    .up_img {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        display: block;
    }

    .uploadBox div {
        text-align: center;
        padding: 6px 0;
    }

    .plq_li button {
        background: transparent;
        width: 42px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #01cbcb;
        border-radius: 10px;
        color: #01cbcb;
    }

    .line {
        width: 100%;
        height: auto;
        border-radius: 0.266667rem;
        font-size: 15px;
        color: #000;

        span,
        input {
            width: 60%;
            background-color: rgba(0, 0, 0, 0);
            outline: none;
            border: none;
            color: black;
            text-align: left;
            padding-left: 10px;
        }
    }

    .none {
        display: none;
    }

    .flex-col {
        flex-direction: column;
        -webkit-flex-direction: column;
    }

    /* 垂直水平居中 */
    .flex-center {
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }

    /* 垂直居中 */
    .flex-ver {
        align-items: center;
        -webkit-align-items: center;
    }

    /* flex 容器（设置为flex）内子元素向两边顶齐平分 */
    .flex-jcsb {
        justify-content: space-between;
        -webkit-justify-content: space-between;
    }
</style>
