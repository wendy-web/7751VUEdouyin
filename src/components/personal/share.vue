<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="shareCon">
            <div class="shareBtn">
                我的分享地址:
                <button
                    v-clipboard:copy="url"
                    v-clipboard:success="copySuc"
                    v-clipboard:error="copyErr"
                >复制二维码链接</button>
            </div>
            <p class="shareLink">{{url}}</p>
            <div class="shareBtn">我的分享地址:<button>刷新二维码图片</button></div>
            <img :src="saveImg" alt="" class="shareImg">
            <div class="saveBtn" @click="apiLoad">保存二维码</div>
        </div>
         <!-- :autoplay="3000" -->
        <van-swipe class="my-swipe" :show-indicators=false @change="onChange" :autoplay="3000">
            <van-swipe-item
                v-for="(item, index) in imgLis"
                :key="index"
            >
                <img :src="item" alt="" 
                    :class="[
                    'listImg',
                    imgActive === index ? 'active' : ''
                    ]"
                >
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            url: '复制链接',
            saveImg: '',
            ol_img: '',
            imgLis:[],
            imgActive: 0
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
            var that = this;
            this.$api.Post("tuiguang").then(res => {
                if (res.status == 1) {
                    that.url = res.result.erweima_lianjie
                    that.saveImg = res.result.erweima
                    that.imgLis = res.result.img
                    console.log(this.imgLis)
                } else{
                    this.$toast(res.result.message);
                }
            });
        },
        onChange(index) {
            this.imgActive = index
        },
        apiLoad(){
            var that = this;
            var date = new Date();
            var time = date.getTime();
            var url = that.imgLis[that.imgActive]
            if(!that.hasPermission()){
                // alert("缺少必要权限");
                that.requestPermission();
                return;
            }
            api.actionSheet({
                title: '是否保存图片到本地？',//提示是否要保存到本地
                cancelTitle: '取消',
                buttons: ['是']
            }, function (ret, err) {
                if (ret.buttonIndex == 1) {
                    // 下载文件
                    api.download({
                        url: url,//下载地址
                        // savePath: 'fs://test'+time+'.jpg',//存储路径，不传时使用自动创建的路径
                        report: true,       //下载过程是否上报
                        cache: true,        //是否使用本地缓存
                        allowResume: true  //是否允许断点续传
                    }, function (ret, err) {
                        if (ret.state == 1) {
                            /* api.toast({ msg : '图片下载成功'});*/
                            // 保存图片和视频到系统相册
                            api.saveMediaToAlbum({
                                path: ret.savePath,
                            }, function (ret, err) {
                                if (ret && ret.status) {
                                    alert('图片已成功保存到相册');
                                } else {
                                    alert('图片保存到相册失败');
                                }
                            });
                        }
                    });
                }
            });
        },
        requestPermission(){
            api.requestPermission({
                list:['storage'],
                code:1
            }, function(ret, err){
               
            });
        },
		hasPermission(){
            var resultList = api.hasPermission({
                list:['storage']
            });
        
            for (let index = 0; index < resultList.length; index++) {
                const element = resultList[index];
                if(!element.granted){
                    return false;
                }
            }
            return true;
        },
        // 复制成功
        copySuc() {
            this.$toast("复制成功");
        },
        // 复制失败
        copyErr() {
            this.$toast("复制失败");
        },
    }
}
</script>

<style lang="less" scoped>
*{margin:0px;padding:0px}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #fff;
}
.listImg{
    width: 200px;
    height: 250px;
    padding: 20px;
    box-sizing: border-box;
    transition: all 0.5s;
}
.active{
    padding: 0;
}
.perback{
    background-color: #DADEEA !important;
    color: #000;
}
.shareCon{
    height: 100%;
    margin-top: 10%;
    overflow: hidden;
    .shareBtn{
        text-align: center;
        margin: 15px 0;
        button{
            color: #fff;
            background: #515980;
            padding: 3px 5px;
            border-radius: 5px;
        }
    }
    .shareLink{
        width: 80%;
        margin: 0 auto;
        padding: 10px 10%;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        background: #636363;
        border-radius: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .shareImg{
        width: 3rem;
        height: 3rem;
        display: block;
        background: pink;
        margin: auto;
    }
    .saveBtn{
        width: 40%;
        margin: 20px auto;
        box-sizing: border-box;
        text-align: center;
        color: #fff;
        background: #246BBD;
        border-radius: 5px;
        line-height: 0.8rem;
    }
}



</style>
