<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
           <div class="selBtn f-flex">
               帐号类型：
               <p
                v-for="(item, index) of list"
                :key="index"
                @click="changId(index)"
                :class="[active == index ? 'active' : '']"
            >
                <span></span> {{item}}
            </p>
           </div>
           <!-- 微信 -->
           <div class="wachat" v-if="wachat_ac">
               <div class="wachatId">
                   微信帐号：
                   <input type="text" placeholder="请输入微信帐号" v-model="wechat">
                </div>
                <!-- <p>已绑定</p> -->
                <div class="set_btn" v-if="listobj.wx_status == 2" @click="binding(1)">提交</div>
                <div class="set_btn" v-else @click="jiechu(1)">已绑定，解除绑定</div>

           </div>
           <!-- 抖音 -->
           <div class="douyinId" v-else>
               <!-- 显示未绑定 -->
               <div v-if='listobj.dy_status == 2'>
                    <p class="imgList">操作说明: <span @click="show = true">查看教程</span></p>
                    <div class="f-flex">
                        <span>添加截图：</span>
                        <div class="imgBox">
                            <div class="addImg" v-if="addImgicon">+</div>
                            <input type="file" name id="upload" class="none" @change="change_img" ref="file"/>
                            <img :src="post_imgurl" class="up_img">
                        </div>
                    </div>
                    <div class="set_btn" @click="binding(2)">提交</div>
                    <p class="bottomMess">由于审核人数较多预计需要60分钟左右<br>
                    点击添加微信：<span>{{listobj.kfweixin}}</span><br>
                    加快审核进度
                    </p>
                </div>
                <!-- 显示已绑定 -->
                <div v-else>
                    <div class="repliseBtn" @click="jiechu(2)">解除绑定</div>
                    <img :src="listobj.tiktok" alt="" class="alerdImg">
                </div>
           </div>
        </div>
        <!-- :showIndex="false"不展示页码 -->
        <van-image-preview v-model="show" :images="images" @change="onChange" :showIndex="false">
            <template v-slot:index >第{{ index }}页</template>
        </van-image-preview>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            post_imgurl: '',
            list: ['微信', '抖音'],
            active: 0,
            addImgicon: true,
            wachat_ac: true,
            listobj:'',
            wechat: '',
            show: false,
            index: 1,
            images: [],
        }
    },
    components: {
        pageTop
    },
    mounted() {
        this.gataState()
    },
    created() {
    },
    methods: {
        jiechu(index){
            var that = this;
            that.$api.Post('jiechu',{
                    type: index
                }).then(res =>{
                    console.log(res)
                    if(res.status == 1){
                        this.$toast(res.result.message)
                        this.$router.go()
                    }
                })
        },
        binding(index){
            var that = this;
            if(index == 1){
                that.$api.Post('accountbinding',{
                    type: index,
                    wechat: that.wechat
                }).then(res =>{
                    console.log(res)
                    this.$toast(res.result.message)
                    if(res.status == 1){
                        setTimeout(function(){
                            this.$router.go()
                        }, 1000)
                    }
                })

            } else{
                 that.$api.Post('accountbinding',{
                    type: index,
                    tiktok: that.post_imgurl
                }).then(res =>{
                    console.log(res)
                    this.$toast(res.result.message)
                    if(res.status == 1){
                        setTimeout(function(){
                            this.$router.go()
                        }, 1000)
                    }
                })
            }
        },
        onChange(index){
            this.index = index + 1;
        },
        gataState(){
          var that = this
		  that.$api.Post('number').then(res =>{
			  console.log(res)
			  if(res.status == 1){
                  that.listobj = res.result;
                  that.wechat = that.listobj.wechat
                  if(that.listobj.tiktok != ''){
                    that.post_imgurl = that.listobj.tiktok
                    that.addImgicon = false;
                  }
                  that.images.push(that.listobj.jiaocheng)
			  }
		  })
        },
        changId(index){
            this.active = index
            this.wachat_ac = index == 0 ? true : false;
        },
        // 上传图片
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
                that.addImgicon = false;   
            };
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
.van-image-preview{
    background: #000;
}
.infoBox{
    padding: 0 10px;
    .selBtn{
        padding: 10px 0;
        p{
            margin-left: 10px;
            display: flex;
            align-items: center;
            span{
                display: inline-block;
                width: 15px;
                height: 15px;
                border-radius: 50%;
                border: 1px solid #ddd;
                box-sizing: border-box;
                margin-right: 5px;
            }
        }
        .active{
            span{
                background: url(../../assets/img/img_icon/active.png) no-repeat;
                background-size: 100% 100%;
                border: none;
            }
        }
    }
}
.imgList{
    line-height: 1rem;
    margin-top: 5px;
    span{
        color: #F6BF3C;
    }
}
// 微信的绑定
.wachatId{
    display: flex;
    align-items: center;
    input{
        flex: 1;
        margin-left: 5px;
        line-height: 1rem;
        padding: 0 5px;
        border-radius: 5px;
        border: 1px solid #ddd;
    }
}
// 抖音绑定
.douyinId{
    >p:nth-child(1){
        line-height: 1rem;
        span{
            color: #F3AD10;
        }
    }
}
.imgBox{
    position: relative;
    .addImg{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 5px;
    border: 1px dashed red;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    color: red;
    margin-left: 5px;
    }
    input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 222;
        opacity: 0;
    }
    .up_img{
        width: 5rem;
    }
}
.bottomMess{
    font-size: 14px;
    span{
        color: #000;
        background: #F67276;
    }
}
.repliseBtn{
    margin: 5px auto;
    width: 35%;
    border:1px dashed red;
    color: red;
    text-align: center;
    line-height: 0.8rem;
    border-radius: 20px;
}
.alerdImg{
    width: 90%;
    display: block;
    margin: 5px auto;
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
