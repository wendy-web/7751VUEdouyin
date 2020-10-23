<template>
    <div class="p20">
        <p class="logo mt2">
            <img :src="logoimg" alt />
        </p>
        <div class="memberset1 mt4">
            <p>找回密码</p>

            <p>
                <i class="el-icon-phone"></i>
                <input type="text" v-model="zcdata.mobile" maxlength="11" placeholder="请输入手机号" />
            </p>

            <p class="f-flex">
                <i class="el-icon-orange"></i>
                <input type="number" v-model.trim="zcdata.show_num" placeholder="请输入图形码" />
                <canvas @click="change_icon_code" id="canvas" width="100" height="40"></canvas>

            </p>

            <p class="f-flex">
                <i class="el-icon-orange"></i>
                <input type="text" v-model="zcdata.code" placeholder="请输入验证码" />
                <el-button type="primary" @click="getcode" :disabled="iscode">{{ iscode ? "已发送" : "获取验证码" }}
                </el-button>
            </p>
            <p>
                <i class="el-icon-lock"></i>
                <input type="password" v-model="zcdata.password" placeholder="请输入新密码" />
            </p>
            <p>
                <i class="el-icon-lock"></i>
                <input type="password" v-model="zcdata.password1" placeholder="请确认新密码" />
            </p>
            <p>
                <el-button type="primary" @click="save">保存</el-button>
            </p>
            <p>
                <el-button type="primary" @click="back">返回登录</el-button>
            </p>
            <p>下载APP ></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                zcdata: {
                    mobile: "",
                    password: "",
                    password1: "",
                    code: "",
                    show_num: '', // 输入的图形码
                },
                iscode: false,
                logoimg: '',
                show_num: [], // 图形码
            };
        },
        mounted() {
            this.logo();
            this.draw([]);
        },
        methods: {
            logo() {
                this.$api.Post('logo').then(res => {
                    this.logoimg = res.result.logo
                })
            },
            back() {
                this.$router.push({
                    name: "login"
                });
            },
            save() {
                var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;

                if (this.zcdata.mobile == "") {
                    this.$toast("请输入手机号码");
                    return;
                }
                if (!isMobile.test(this.zcdata.mobile)) {
                    this.$toast("请输入正确的手机号码");
                    return;
                }

                if (this.zcdata.show_num == '') {
                    this.$toast('请输入图形码')
                    return
                }
                if (this.zcdata.show_num != this.show_num.join('')) {
                    this.$toast('请输入正确的图形码')
                    return
                }

                if (this.zcdata.code == "") {
                    this.$toast("请输入验证码");
                    return;
                }
                if (this.zcdata.password == "") {
                    this.$toast("请输入新密码");
                    return;
                }
                if (this.zcdata.password != this.zcdata.password1) {
                    this.$toast("两次输入密码不一致");
                    return;
                }
                this.$api.Post("forgetpwd", this.zcdata).then(res => {
                    this.$toast(res.result.message);
                    if (res.status == 1) {
                        this.$router.push({
                            name: "login"
                        });
                    }
                });
            },
            //获取验证码
            getcode() {
                var isMobile = /^1[3|4|5|6|7|8][0-9]{9}$/;
                if (this.zcdata.mobile == "") {
                    this.$toast("请输入手机号码");
                    return;
                }
                if (!isMobile.test(this.zcdata.mobile)) {
                    this.$toast("请输入正确的手机号码");
                    return;
                }
                let icon_code = this.show_num.join(''); // 图形码
                let input_icon_code = this.zcdata.show_num; // 用户输入的图形码

                if (input_icon_code == '') {
                    this.$toast('请输入图形码')
                    return
                }
                if (input_icon_code != icon_code) {
                    this.$toast('请输入正确的图形码')
                    return
                }
                this.$api.Post("forgetcode", {
                    mobile: this.zcdata.mobile
                }).then(res => {
                    this.$toast(res.result.message);
                    if (res.status == 1) {
                        this.iscode = true;
                    }
                });
            },
            // 绘制图形码
            draw(show_num) {
                /* var canvas_width = $('#canvas').width();
                var canvas_height = $('#canvas').height(); */

                var canvas = document.getElementById("canvas"); //获取到canvas的对象，演员
                var canvas_width = canvas.width;
                var canvas_height = canvas.height;

                var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
                canvas.width = canvas_width;
                canvas.height = canvas_height;
                /*var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";*/
                var sCode = "1,2,3,4,5,6,7,8,9,0";
                var aCode = sCode.split(",");
                var aLength = aCode.length; //获取到数组的长度

                for (var i = 0; i <= 3; i++) {
                    var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
                    var deg = Math.random() * 30 * Math.PI / 180; //产生0~30之间的随机弧度
                    var txt = aCode[j]; //得到随机的一个内容
                    show_num[i] = txt.toLowerCase();
                    var x = 10 + i * 20; //文字在canvas上的x坐标
                    var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
                    context.font = "bold 23px 微软雅黑";

                    context.translate(x, y);
                    context.rotate(deg);

                    context.fillStyle = this.randomColor();
                    context.fillText(txt, 0, 0);

                    context.rotate(-deg);
                    context.translate(-x, -y);
                }
                this.show_num = show_num;
                for (var i = 0; i <= 5; i++) { //验证码上显示线条
                    context.strokeStyle = this.randomColor();
                    context.beginPath();
                    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
                    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
                    context.stroke();
                }
                for (var i = 0; i <= 30; i++) { //验证码上显示小点
                    context.strokeStyle = this.randomColor();
                    context.beginPath();
                    var x = Math.random() * canvas_width;
                    var y = Math.random() * canvas_height;
                    context.moveTo(x, y);
                    context.lineTo(x + 1, y + 1);
                    context.stroke();
                }
            },

            randomColor() { //得到随机的颜色值
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                return "rgb(" + r + "," + g + "," + b + ")";
            },
            // 点击切换图形码
            change_icon_code() {
                this.draw([]);
            },
        }
    };
</script>

<style lang="less">
    .logo {
        text-align: center;
    }

    .logo img {
        width: 100px;
    }

    .memberset1 {
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

        >p:nth-child(3) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(4) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(5) {
            background: #f7f7f7;
            //   padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
            height: 50px;

            input {
                width: 80%;
                height: 100%;
            }
        }

        >p:nth-child(6) {
            margin-top: 20px;

            button {
                width: 100%;
            }
        }

        >p:nth-child(7) {
            margin-top: 10px;

            button {
                width: 100%;
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
</style>
