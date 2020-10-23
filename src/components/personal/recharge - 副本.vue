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
                <input type="number" placeholder="输入充值金额" class="inp" id="tai_mony" ref="test" />
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
                erm_code: ''
            };
        },
        created(){
            this.change_code();
        },
        methods: {
            change_code() {
                this.$api.Post("erm_code").then(res => {
                    if(res.status == 0){
                        this.$toast(res.result.message)
                        return;
                    }
                    if(res.status == 1){
                        if(!res.result.qrimages){
                            this.change_code()
                            return;
                        }
                        this.erm_code = res.result.qrimages;
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
                    that.post_imgurl = result;
                    that.post_imgx(result);
                };
            },
            // 上傳圖片
            post_imgx(url_st) {
                this.$api.Post("uploader", {
                    upload: url_st
                }, 0).then(res => {
                    console.log(res)
                    if (res.result.message == "上传成功") {
                        this.upload = res.fielname;
                    }
                    // var img_tol = document.getElementById("up_img").src(res.url)
                    // this.post_imgx()
                });
            },
            recharge() {
                console.log(this.$api.topup)
                var that = this;
                var tai_mony = document.getElementById("tai_mony").value;

                var tai_image = this.aaaala;
                if (this.rechanum != 0) {
                    return;
                }
                if (!tai_mony) {
                    this.$toast('请输入充值金额')
                    return;
                }

                if (tai_image == "@/assets/img/icon/add.png" || tai_image == "") {
                    this.$toast("请上传支付凭证");
                    return;
                }

                this.$api.Post(this.$api.topup, {
                    image: tai_image,
                    money: tai_mony
                }, 0).then(res => {
                    that.$toast(res.result.message);
                    if (res.status == 1) {
                        this.rechanum = 1;
                        setTimeout(() => {
                            that.$router.back();
                        }, 1500);
                    } else {
                        this.rechanum = 0;
                    }
                });
            },


        },

    };
</script>

<style lang="less" scoped>
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
        color: white;
        margin-top: 20px;
        outline: none;
        background: #57a1EC;
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
