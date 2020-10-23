<template>
  <div>
      <div class="j-btm">
           <router-view />
           
      </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item
          v-for="(item,index) in tabbars"
          :key="index"
          @click="tab(index,item.name)"
        >
          <span :class="currIndex == index ? active:''">{{item.title}}</span>
          <template slot="icon" slot-scope="props">
            <img :src="props.active ? item.active : item.normal">
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      currIndex:0,
      active:0,
      tabbars: [
        {
          name: "index",
          title: "主页",
          normal: require("@/assets/img/icon/index.png"),
          active: require("@/assets/img/icon/index_ac.png")
        },
        {
          name: "vip",
          title: "会员",
          normal: require("@/assets/img/icon/vip.png"),
          active: require("@/assets/img/icon/vip_ac.png")
        },
        {
          name: "task",
          title: "任务",
          normal: require("@/assets/img/icon/task.png"),
          active: require("@/assets/img/icon/task_ac.png")
        },
        {
          name: "setmeal",
          title: "记录",
          normal: require("@/assets/img/icon/setmeal.png"),
          active: require("@/assets/img/icon/setmeal_ac.png")
        },
        {
          name: "personal",
          title: "我的",
          normal: require("@/assets/img/icon/personal.png"),
          active: require("@/assets/img/icon/personal_ac.png")
        }
      ]
    };
  },
  created () {
    
  },
  updated () {
    var routerName = this.$route.name
    var nameId = this.tabbars.findIndex(function(event){
      return event.name == routerName
    })
    this.active = nameId
  },
  watch: {
    // active(value,old){
    //   this.$toast("触发2")
    // }
  },
  methods:{

    tab(index,val) {
      this.currIndex = index;
      this.$router.push(val);
      // localStorage.setItem('index', index)
      console.log(this.active)
    }
  }
};
</script>

<style lang="less">
.van-tabbar-item__icon{
    font-size: 30px;
}
.van-tabbar-item--active {
  color: #FF8F4B!important;
}
.van-tabbar{
    // height: 70px;
}
.j-btm{
    margin-bottom: 55px;
}
</style>