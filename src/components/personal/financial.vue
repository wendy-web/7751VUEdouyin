<template>
  <div>
    <div>
      <van-nav-bar
        title="资金明细"
        left-text
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <div>
        <div class="source f-flex f-jc-c">
          <p>资金来源：</p>
          <van-dropdown-menu>
            <van-dropdown-item
              @change="selects(type)"
              v-model="type"
              :options="option1"
            />
          </van-dropdown-menu>
        </div>
      </div>
    </div>
    <div class="p20" style="padding-top:5px">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="financiallist"
          v-for="(item, index) in finanlist"
          :key="index"
        >
          <p class="f-flex f-jc-sb">
            <span>{{ item.title }}</span>
            <span>{{ item.money }}</span>
          </p>
          <p class="f-flex f-jc-sb">
            <span>{{ (item.createtime * 1) | formatDate }}</span>
            <!-- <span>{{
              item.status == "1"
                ? "待审批"
                : item.status == "2"
                ? "成功"
                : "驳回"
            }}</span> -->
          </p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      page: 1,
      loading: false,
      finished: false,
      option1: [
        { text: "全部", value: "" },
        { text: "后台充值", value: 0 },
        // { text: "提现", value: 1 },
        { text: "任务分润", value: 2 },
        { text: "任务奖励", value: 3 },
        { text: "套餐分佣", value: 4 }
      ],
      finanlist: []
    };
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value*1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  mounted() {
    this.bill_flow();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    //请求明细接口
    bill_flow() {
      this.$api
        .Post("bill_flow", { type: this.type, page: this.page })
        .then(res => {
          this.finanlist = res.result.list;
        });
    },
    //分类切换
    selects(e) {
      this.page=1
      this.bill_flow();
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.page++;
        this.$api
          .Post("bill_flow", {
            type: this.type,
            page: this.page
          })
          .then(res => {
            if (res.status == 1) {
              this.finanlist = this.finanlist.concat(res.result.list);
              // 数据全部加载完成
              if (res.result.list.length < 10) {
                this.finished = true;
              }
            }
          });
        // 加载状态结束
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.financiallist {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  > p:nth-child(1) {
    > span:nth-child(2) {
      color: #000;
      font-weight: 500;
      font-size: 20px;
    }
  }
  > p:nth-child(2) {
    margin-top: 6px;
    color: #ccc;
  }
}
.source {
  position: relative;
  // border-bottom: 1px solid #eee;
  > p {
    padding-top: 15px;
    font-size: 16px;
  }
}
.van-dropdown-menu__title {
  font-size: 16px !important;
}
</style>
