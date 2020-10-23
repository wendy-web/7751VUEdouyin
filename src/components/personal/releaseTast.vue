<template>
    <div class="perback">
        <pageTop></pageTop>
        <div class="infoBox">
            <p class="padLis">
                <span>类别</span>
                <van-icon name="checked" class="iconSel"/>
                抖音
            </p>
            <p>
                <van-field
                    v-model="data.num"
                    placeholder="请输入任务数量"
                    label="任务数量"
                />
            </p>
            <p>
                <van-field
                    v-model="data.rwurl"
                    placeholder="请输入任务链接"
                    label="任务链接"
                />
            </p>
            <p>
                <van-field
                    v-model="data.rwsm"
                    placeholder="请输入任务需求"
                    label="任务需求"
                />
            </p>
            <p class="padLis" style="color:#E8AA32">发布内容账户余额不能少于5元     </p>
           <div class="set_btn" @click="submit">提交</div>
        </div>
    </div>
</template>

<script>
import pageTop from "@/router/pageTop.vue"
export default {
    data() {
        return {
            data: {
                num: '',
                rwurl: '',
                rwsm: ''
            }
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
        submit(){
            if (this.data.num == "") {
                this.$toast("请输入任务数量");
                return;
            }
            if (this.data.rwurl == "") {
                this.$toast("请输入任务链接");
                return;
            }
            if (this.data.rwsm == "") {
                this.$toast("请输入任务需求");
                return;
            }
            this.$api.Post("fabu_renwu", this.data).then(res => {
				if (res.status == 1) {
					this.$toast(res.result.message);
					this.$router.go()
				} else{
					this.$toast(res.result.message);
				}
			});
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
.infoBox{
    padding: 10px;
    p{
        border-bottom: 1px solid #d6d7da;
        span{
            display: inline-block;
            width:20%;
            text-align: right;
        }
        .iconSel{
            margin-left: 50px;
            color: #1D89FF;
        }
    }
    .padLis{
        padding: 10px 0;
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
