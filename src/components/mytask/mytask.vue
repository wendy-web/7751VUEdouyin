<template>
  <div>
    <div>
      <van-nav-bar title="我的任务" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div class="f-flex navtask">
      <p :class="[type==0?'active':'']" @click="taskde(0)">待完成</p>
      <p :class="[type==1?'active':'']" @click="taskde(1)">待审核</p>
       <p :class="[type==-1?'active':'']" @click="taskde(-1)">已驳回</p>
      <p :class="[type==2?'active':'']" @click="taskde(2)">已完成</p>
     
    </div>
    <!-- 列表 -->
    <div class="zylist p20">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="taskall" v-for="(item,index) in tasklist" :key="index">
        <div class="f-flex taskitem" >
          <div>
              
           <!-- <img :src="item.type==0?dy:ks" alt />
            <span>{{item.grade=='0'?'普通':'巨星'}}</span> -->
            
            
            <img v-if="item.type==0" :src="dy" alt />
            <img v-if="item.type==1" :src="ks" alt />
            <img v-if="item.type==2" :src="tb" alt />
            
            <span v-if="item.grade == 0">普通</span>
            <span v-if="item.grade == 1">巨星</span>
            <span v-if="item.grade == 2">淘宝</span>
            
            
          </div>
          <div>
            <p>
              编号：{{item.tasksname}}
              <span>剩余:{{item.number}}</span>
            </p>
            <p>要求：{{item.needs}}</p>
            <p>时间：{{item.createtime*1 | formatDate}}</p>
          </div>
          <div>
            <p>￥ {{item.money}}元</p>
            <p>
              <span>任务佣金</span>
            </p>
          </div>
        </div>
        <div class="mt1 copylink">
             <!-- <el-button type="warning">打开视频</el-button> -->
             <el-button type="info" v-clipboard:copy="item.link"  v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</el-button>     
               <el-button type="primary" :disabled="type==0 || type==-1?false:true" @click="tjtask(item.id)">{{type==0?'提交任务':type==1?'待审核':type==-1?'重新提交':'已完成'}}</el-button>   </div>
      </div>
         </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
      page:1,
      tasklist:'',
      loading: false,
      finished: false,
      dy:require('../../assets/dy.png'),
      ks:require('../../assets/ks.png'),
      tb:require('../../assets/tb.png'),
      grade:this.$route.query.grade
    };
  },
  mounted(){
   this.my_task_list()
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
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    taskde(e) {
      this.page=1;
      this.type = e;
       this.finished = false;
      this.my_task_list()
    },
    // 获取数据
     my_task_list(){
       this.$api.Post('my_task_list',{
         page:this.page,
         status:this.type,
         grade:this.grade
       }).then(res=>{
      
         if(res.status==1){
           this.tasklist=res.result.list;
         }
       })
     },
     //复制
     onCopy(){
    
       this.$toast('复制成功')
     },
     onError(){
       this.$toast('复制失败')
     },
     //提交任务
     tjtask(e){
          this.$router.push({name:'taskdetail',query:{id:e}})
     },
      onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.page++;
        this.$api
          .Post("my_task_list", {
            page:this.page,
         status:this.type
          })
          .then(res => {
            if (res.status == 1) {
              this.tasklist = this.tasklist.concat(res.result.list);
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
.navtask {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  .active {
    color: #57a1ec;
  }
  > p {
    width: 33%;
    text-align: center;
  }
}
.taskall{
 box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
}
.taskitem {
  position: relative;
  line-height: 26px;
  // margin-bottom: 20px;
  > div:nth-child(1) {
    width: 20%;
    span {
      position: absolute;
      left: 10px;
      top: 50px;

      color: #000;
      //  padding: 5px 15px;
      font-size: 14px;
    }
  }
  > div:nth-child(2) {
    width: 60%;
    font-size: 14px;
    span {
      border: 1px solid #57a4f4;
      color: #57a4f4;
      padding: 5px 8px;
      border-radius: 20px;
      margin-left: 5px;
    }
  }
  > div:nth-child(3) {
    width: 22%;
    padding-top: 5px;
    text-align: center;
    > p {
      color: #57a4f4;
      font-weight: 500;
    }
    span {
      color: #000;
      font-size: 14px;
    }
  }
  img {
    width: 50px;
    // margin-top: 30px;
  }
}
.copylink{
  text-align: center;
  button{
    margin: 0 30px;
  }
}
</style>
