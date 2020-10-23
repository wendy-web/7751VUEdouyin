<template>
    <div>
        <div>
            <van-nav-bar title="客服" left-text left-arrow @click-left="onClickLeft" />
        </div>
        <!-- <p class="tilel">
            如有疑问请联系微信客服：qz315069
        </p> -->
        <div v-html="article"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                article: ''
            }
        },
        mounted() {
            let that = this;
            // this.my_setmeal_list();

            this.$api.Post("kefu").then(res => {
                if (res.status == 1) {
                    that.article = that.htmlEncode(res.result.article);
                }
            });
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1);
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

        }
    };
</script>

<style lang="less">
    .tilel {
        text-align: center;
        line-height: 100px;
    }
</style>
