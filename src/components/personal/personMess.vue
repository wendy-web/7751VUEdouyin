<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="iunfoBox">
           <p class="promptMess">您的身份信息</p> 
           <ul class="wrapp">
               <li>
                   <p>真实姓名:</p>
                   <input type="number" placeholder="请输入真实姓名">
               </li>
               <li>
                   <p>QQ:</p>
                   <input type="number" placeholder="请输入QQ">
               </li>
           </ul>
           <div class="set_btn">设置信息</div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
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
        main() {
            this.$api.Post("main").then(res => {
                console.log(res)
                if (res.status == 1) {
                    this.indexdata = res.result;
                }
            })
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
.messRed{
    width: 100%;
    line-height: 1rem;
    padding: 0 0.5rem;
    color: red;
    font-size: 16px;
    font-weight: bold;
}
.wrapp{
    padding: 0 0.5rem;
    font-size: 16px;
    li{
        display: flex;
        align-items: center;
        line-height: 1.2rem;
        border-bottom: 1px solid #ddd;
        p{
            width: 2rem;
            margin-right: 5px;
        }
        input{
            flex: 1;
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
