<template>
  <div>
    <div>
      <van-nav-bar
        title="提现记录"
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
        v-if='shide'
      >
        <div
          class="recordllist"
          v-for="(item, index) in finanlist"
          :key="index"
        >
          <p class="f-flex f-jc-sb">
            <!-- <span>{{ item.title }}</span> -->
            <span>{{ item.money }}</span>
            <span>{{
              item.status == "0"
                ? "待审批"
                : item.status == "1"
                ? "通过审批"
                : "拒绝"
            }}</span>
          </p>
          <p class="f-flex f-jc-sb">
            <span>{{item.createtime}}</span>
          </p>
        </div>
      </van-list>
      <div class="empty_box" v-else>还没有数据哦！</div>
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
      shide: true,
      option1: [
        { text: "全部", value: "" },
        { text: "不通过审批", value: -1 },
        { text: "待审批", value: 0 },
        { text: "通过审批", value: 1 },
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
    this.getList();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //请求明细接口
    getList(){
      var that = this;
      this.$api.Post("tixian_log", { page : that.page, type: that.type}).then(res => {
          if (res.status == 1) {
              console.log(res)
              // 数据全部加载完成
              if (res.result.log.length <= 0) {
                  that.shide = false;
                  return;
              } else {
                  that.finanlist = res.result.log;
              }
          }
      });
    },
    //分类切换
    selects(e) {
      console.log(e)
      this.page=1;
      this.type = e
      this.loading = false;
      this.shide = true;
      this.getList();
    },
    onLoad() {
      var that = this;
      setTimeout(() => {
        this.page++;
        if (that.finanlist.length >= 10) {
            that.page++;
            that.getLoadlist();
        } else {
            that.loading = false;
        }
        // 加载状态结束
        this.loading = false;
      }, 1000);
    },
    getLoadlist(){
      var that = this;
      that.finished = true;
      that.loading = false;
      this.$api.Post("tixian_log", { page : that.page, type: that.type}).then(res => {
          if (res.status == 1) {
              // 数据全部加载完成
              if (res.result.log.length <= 0) {
                  that.finished = true;
                  return;
              } else {
                  var array = res.result.log
                  that.finanlist = that.finanlist.concat(array);
                  that.finished = false
                  that.loading = false
              }
          }
      });
    }
  }
};
</script>

<style lang="less">
.recordllist {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  > p:nth-child(1) {
    > span:nth-child(2) {
      color: #000;
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
.empty_box{
  text-align: center;
}
</style>
