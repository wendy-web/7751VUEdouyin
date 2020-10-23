<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="foutk_box">
            <img :src="userimg" alt="">
            <button @click="submitimg()">立即设置</button>
        </div> 
        <div class="myUi_box">
            <ul class="myUi_ul">
                <li class="myUi_li"
                v-for="(item,index) in imglist" :key="index"
                @click="selectimg(item.xianshi_avatar)"
                >
                    <img :src="item.xianshi_avatar" alt="">
                </li>
            
            </ul>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            // 可供选择的头像数组
            imglist:[
                {
                    img:require('@/assets/img/userimg/0.png'),
                },
                {
                    img:require('@/assets/img/userimg/01.png')
                },
                {
                    img:require('@/assets/img/userimg/1.png')
                },
                {
                    img:require('@/assets/img/userimg/2.png')
                },
                {
                    img:require('@/assets/img/userimg/3.png')
                },
                {
                    img:require('@/assets/img/userimg/4.png')
                },
                {
                    img:require('@/assets/img/userimg/5.png')
                },
                {
                    img:require('@/assets/img/userimg/6.png'),
                },
                {
                    img:require('@/assets/img/userimg/7.png')
                },
                {
                    img:require('@/assets/img/userimg/8.png')
                },
                {
                    img:require('@/assets/img/userimg/9.png')
                },
                {
                    img:require('@/assets/img/userimg/10.png')
                },
                {
                    img:require('@/assets/img/userimg/11.png')
                },
                {
                    img:require('@/assets/img/userimg/12.png')
                },
                {
                    img:require('@/assets/img/userimg/13.png')
                },
                {
                    img:require('@/assets/img/userimg/15.png')
                },
                {
                    img:require('@/assets/img/userimg/16.png')
                },
                {
                    img:require('@/assets/img/userimg/17.png')
                },
                {
                    img:require('@/assets/img/userimg/18.png')
                },
                {
                    img:require('@/assets/img/userimg/19.png')
                },
                {
                    img:require('@/assets/img/userimg/20.png')
                },
                {
                    img:require('@/assets/img/userimg/21.png')
                },
                {
                    img:require('@/assets/img/userimg/22.png')
                },
                {
                    img:require('@/assets/img/userimg/23.png')
                },
                {
                    img:require('@/assets/img/userimg/24.png')
                },
                {
                    img:require('@/assets/img/userimg/25.png')
                },
                {
                    img:require('@/assets/img/userimg/26.png')
                },
                {
                    img:require('@/assets/img/userimg/27.png')
                },
                {
                    img:require('@/assets/img/userimg/28.png')
                },
                {
                    img:require('@/assets/img/userimg/29.png')
                },
                {
                    img:require('@/assets/img/userimg/30.png')
                },
                {
                    img:require('@/assets/img/userimg/31.png')
                },
                {
                    img:require('@/assets/img/userimg/32.png')
                },
                {
                    img:require('@/assets/img/userimg/33.png')
                },
                {
                    img:require('@/assets/img/userimg/34.png')
                },
                {
                    img:require('@/assets/img/userimg/35.png')
                },
                {
                    img:require('@/assets/img/userimg/36.png')
                },
                {
                    img:require('@/assets/img/userimg/37.png')
                },
                {
                    img:require('@/assets/img/userimg/38.png')
                },
                {
                    img:require('@/assets/img/userimg/39.png')
                },
                {
                    img:require('@/assets/img/userimg/40.png')
                },
                {
                    img:require('@/assets/img/userimg/41.png')
                },
                {
                    img:require('@/assets/img/userimg/42.png')
                },
                {
                    img:require('@/assets/img/userimg/43.png')
                },
                {
                    img:require('@/assets/img/userimg/44.png')
                },
                {
                    img:require('@/assets/img/userimg/45.png')
                },
                {
                    img:require('@/assets/img/userimg/46.png')
                },
                {
                    img:require('@/assets/img/userimg/47.png')
                },
                {
                    img:require('@/assets/img/userimg/48.png')
                },
                {
                    img:require('@/assets/img/userimg/49.png')
                },
                {
                    img:require('@/assets/img/userimg/50.png')
                },
                {
                    img:require('@/assets/img/userimg/51.png')
                },
                {
                    img:require('@/assets/img/userimg/52.png')
                },
                {
                    img:require('@/assets/img/userimg/53.png')
                },
                {
                    img:require('@/assets/img/userimg/54.png')
                },
                {
                    img:require('@/assets/img/userimg/55.png')
                },
                {
                    img:require('@/assets/img/userimg/56.png')
                },
                {
                    img:require('@/assets/img/userimg/57.png')
                },
                {
                    img:require('@/assets/img/userimg/58.png')
                },
                {
                    img:require('@/assets/img/userimg/59.png')
                },
                {
                    img:require('@/assets/img/userimg/60.png')
                },
            ],
            userimg: this.$route.query.avatar,
            nochoose:false,
        };
    },
    components: {
        pageTop
    },
    mounted() {
        this.getimg()
    },
    created() {
    },
    methods: {
        selectimg(img){
          this.nochoose=true;
          this.userimg=img;
        },
        submitimg() {
            this.$api.Post("yhavatar", { avatar: this.userimg }).then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.$toast(res.result.message)
                    setTimeout(()=>{
                        this.$router.go(-1);
                    }, 1500)
                } else{
                    this.$toast(res.result.message)
                }
            })
        },
        getimg() {
            this.$api.Post("avatar").then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.imglist = res.result.avatar
                    console.log(res.result.avatar)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .foutk_box{
        width: 100%;
        height: 100px;
        background-image: '';
        background-size: 100% auto;
        color: #000;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-bottom: 10px;
            display:block;
            margin:10px auto;
        }
        button{
            border: none;
            background: none;
            width: 100%;
            text-align: center;
        }
    }
    .myUi_box{
        width: 100%;
        background: #fff;
        border-top: 20px solid #f2f2f2;
        .myUi_ul{
            width: 100%;
            display:flex;
            flex-wrap: wrap;
            .myUi_li{
                width: 20%;
                padding: 2.5%;
                img{
                    width: 100%;
                    height: 60px;
                }
            }
        }
    }
</style>
