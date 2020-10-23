<template>
    <div class="perback">
        <pageTop></pageTop>
        <ul class="messList">
            <li class="f-flex f-jc-sb">
                <p>抖音</p>
                <p>于20分种前<span>通过</span></p>
            </li>
            <li class="f-flex f-jc-sb">
                <p>抖音</p>
                <p>于20分种前<span>通过</span></p>
            </li>
        </ul>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            indexdata: "",
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
}
.messList{
    padding: 0 5px;
    li{
     padding: 5px 5px 0px 5px;
     line-height: 1rem;
     border-bottom:  1px dashed gray;
     p{
         span{
             color: green;
             margin-left: 5px;
         }
     }
    }
}
    
</style>
