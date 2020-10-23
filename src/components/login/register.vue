<template>
    <div class="p20">
        <p class="logo mt2">
            <img :src="logoimg" alt />
        </p>
        <input type="password" style="display: none;">
        <div class="memberset mt4">

            <p>会员注册</p>
            <p>

                <i class="el-icon-s-custom"></i>
                <input type="text" v-model="zcdata.agentid" placeholder="推荐人ID(选填)" />
            </p>
            <p>

                <i class="el-icon-user-solid"></i>
                <input type="text" v-model="zcdata.nickname" placeholder="请输入昵称" />
            </p>

            <p>
                <i class="el-icon-phone"></i>
                <input type="number" v-model="zcdata.mobile" maxlength="11" placeholder="请输入手机号" />
            </p>
            <p class="f-flex">
                <i class="el-icon-orange"></i>
                <input type="text" v-model="zcdata.verifycode" placeholder="请输入验证码" />
                <el-button type="primary" @click="getcode" :disabled="iscode">{{iscode ? countdown_text :'获取验证码'}} </el-button>
            </p>



            <p>
                <i class="el-icon-lock"></i>
                <input type="text" onfocus="this.type='password'" autocomplete="off" v-model="zcdata.pwd"
                    placeholder="请输入密码" />
            </p>
            <p>
                <i class="el-icon-lock"></i>
                <input type="text" onfocus="this.type='password'" autocomplete="off" v-model="password1"
                    placeholder="请再次输入密码" />
            </p>
            <p>
                <el-button type="primary" @click="reister">立即注册</el-button>
            </p>
            <div class="golog">
                <div class="operate f-flex">
                    <!-- <van-radio-group icon-size="10" v-model="radio" direction="horizontal">
                        <van-radio icon-size="10" name="1">免责条款</van-radio>
                    </van-radio-group> -->
                    <div class="radio" :class="{'radio-border': !radio}" @click="change_radio">
                        <div class="like" v-if="radio"></div>
                    </div>
                    <span class="exoneration-clause" @click="exoneration_clause">免责条款</span>
                </div>
                <span class="golog-a" @click="gologin">已有账号，前往登录</span>
            </div>
            <p>
                <!-- <a href="https://5cando.com/jezhnk">下载APP ></a> -->
                <a :href="link_href">下载APP  ></a>
            </p>
        </div>

        <div class="mask-wrapper" v-if="show_exoneration">
            <div class="mask-close" @click="hide_exoneration">X</div>
            <div class="content" v-html="article">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                zcdata: {
                    type: 0,
                    mobile: '',//手机号码
                    pwd: '',
                    nickname: '',//昵称
                    verifycode: '',//验证码
                    agentid: this.GetUrlParam('code'),//推荐人ID
                },
                password1:'',
                iscode: false,
                logoimg: '',
                show_num: [], // 图形码
                radio: false, // 是否选择免责条款
                show_exoneration: false, // 控制是否弹出 免责条款的具体内容
                article: '', // 免责条款 富文本
                countdown_text: '60秒后获取',  // 倒计时文字
                link_href:''
            }
        },
        mounted() {
            this.logo()
        },
        methods: {
            // 弹出 免责条款的具体内容
            exoneration_clause() {
                let that = this;
                that.show_exoneration = true;
                this.$api.Post('exoneration').then(res => {
                    if (res.status == 1) {
                        that.article = that.htmlEncode(res.result.article);
                    }
                })
                
            },
            // 隐藏 免责条款的具体内容
            hide_exoneration() {
                this.show_exoneration = false;
            },

            // 是否勾选免责条款
            change_radio() {
                this.radio = !this.radio;
            },
            logo(){
                this.$api.Post('logo').then(res=>{
                this.logoimg = res.result.logo
                this.link_href = res.result.xiazai
                })
            },
            
            gologin() {
                this.$router.push({
                    name: 'login'
                })
            },
            htmlEncode(str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/&amp;/g, "&");
                s = s.replace(/&lt;/g, "<");
                s = s.replace(/&gt;/g, ">");
                s = s.replace(/&nbsp;/g, " ");
                s = s.replace(/&#39;/g, "'");
                s = s.replace(/&quot;/g, '"');
                s = s.replace(/<br\/>/g, "\n");
                return s;
            },
            // 立即注册
            reister() {
                var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
                if (this.zcdata.nickname == '') {
                    this.$toast('请输入昵称')
                    return;
                }
                if (this.zcdata.mobile == '') {
                    this.$toast('请输入手机号码')
                    return;
                }
                if (!isMobile.test(this.zcdata.mobile)) {
                    this.$toast('请输入正确的手机号码')
                    return;
                }
                if (this.zcdata.verifycode == '') {
                    this.$toast('请输入验证码')
                    return;
                }
                if (this.zcdata.pwd == '') {
                    this.$toast('请输入密码')
                    return;
                }
                if (this.zcdata.pwd != this.password1) {
                    this.$toast('两次输入密码不一致')
                    return;
                }
                if (!this.radio) {
                    this.$toast('请勾选免责条款')
                    return;
                }
                this.$api.Post('register', this.zcdata).then(res => {
                    this.$toast(res.result.message)
                    console.logo(res)
                    if (res.status == 1) {
                        localStorage.setItem('mobile', this.zcdata.mobile)
                        this.$router.push('/')
                    }
                })

            },
            //获取验证码
            getcode() {
                var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
                if (this.zcdata.mobile == '') {
                    this.$toast('请输入手机号码')
                    return;
                }
                if (!isMobile.test(this.zcdata.mobile)) {
                    this.$toast('请输入正确的手机号码')
                    return;
                }
                this.$api.Post('sendcode', {
                    mobile: this.zcdata.mobile
                }).then(res => {
                    this.$toast(res.result.message)
                    if (res.status == 1) {
                        this.iscode = true;
                        let countdown = 60;
                        let timer = setInterval(()=>{
                            countdown--;
                            if(countdown < 0){
                                clearInterval(timer)
                                this.iscode = false;
                                countdown = 60;
                                return;
                            }
                            this.countdown_text = countdown + '秒后获取';
                        },1000)
                    }
                })
            },
            //paraName 等找参数的名称
            GetUrlParam(paraName) {
                var url = document.location.toString();
                var arrObj = url.split("?");
                if (arrObj.length > 1) {
                    var arrPara = arrObj[1].split("&");
                    var arr;

                    for (var i = 0; i < arrPara.length; i++) {
                        arr = arrPara[i].split("=");

                        if (arr != null && arr[0] == paraName) {
                            return arr[1];
                        }
                    }
                    return "";
                } else {
                    return "";
                }
            },
            randomColor() { //得到随机的颜色值
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ")";
            }
        }
    };
</script>
<style lang="less">
    .mask-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, .7);
        display: flex;
        justify-content: center;
        align-items: center;

        .mask-close {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            border: 1px solid #fff;
            border-radius: 50%;
            font-size: 20px;
            color: #fff;
            position: absolute;
            top: 16px;
            right: 8px;
            z-index: 4;
        }

        .content {
            width: 80%;
            height: 80%;
            background-color: #fff;
            border-radius: 10px;
            /* overflow-x: hidden;
            overflow-y: auto; */
            overflow: auto;
            padding: 10px;
        }
    }

    #canvas {

        flex: 1;
        border: 1px solid #ccc;
        border-radius: 8px;
        background: #fff;
    }

    .logo {
        text-align: center;
    }

    .logo img {
        width: 100px;
    }

    .memberset {
        color: #58a1eb;

        >p:nth-child(1) {
            font-weight: 700;
            font-size: 20px;
        }

        >p:nth-child(2) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 30px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(3) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            height: 50px;

            input {
                width: 60%;
                height: 100%;
            }

            span {
                padding: 14px 10px;
            }
        }

        >p:nth-child(4) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            height: 50px;

            input {
                width: 60%;
                height: 100%;
            }

            span {
                padding: 14px 10px;
            }
        }

        >p:nth-child(5) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(6) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(7) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(8) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(9) {
            margin-top: 40px;

            button {
                width: 100%;
                border-radius: 80px;
                padding: 15px;
            }
        }

        >p:last-child {
            margin-top: 30px;
            text-align: center;
            color: #d54c4e;
            font-size: 18px;
            font-weight: 700;
        }

        i {
            font-size: 22px;
            padding: 14px 10px;
        }
    }

    .golog {
        padding: 10px 0;
        color: #d54c4e;
        display: flex;
        justify-content: space-between;

        .operate {
            align-items: center;

            .radio-border {
                border: 1px solid #aaa;
                background-color: #fff !important;
            }

            .radio {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #409EFF;
                position: relative;

                .like {
                    width: 7px;
                    height: 12px;
                    border-right: 2px solid #fff;
                    border-bottom: 2px solid #fff;
                    transform: rotate(40deg);
                    position: absolute;
                    top: 2px;
                    left: 6px;
                }
            }

            .exoneration-clause {
                padding: 0 10px;
            }
        }

    }

    a {
        color: red;
    }
</style>
