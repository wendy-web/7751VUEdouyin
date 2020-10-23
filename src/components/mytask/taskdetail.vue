<template>
  <div>
        <div>
      <van-nav-bar title="提交任务" left-text left-arrow @click-left="onClickLeft" />
    </div>
    <div class="task-details p20">
            <p><span>任务编号：</span>{{one.tasksname}}</p>
            <p><span>要求：</span>{{one.needs}}</p>
            <p><span>申请时间：</span>{{one.createtime*1 | formatDate}}</p>
            <p><span>任务佣金：</span>{{one.money}}</p>
            <p><span>任务类型：</span>{{one.grade=='0'?'普通':'巨星'}}</p>
            <p><span>任务类别：</span>{{one.type=='0'?'抖音':'快手'}}</p>
            <p><span>执行时间：</span>/</p>
            <p><span>审核时间：</span>/</p>
            <p class="f-flex">
                <span>任务凭证：</span>
                <van-uploader  v-model="fileList"  :max-count="1" :after-read="afterRead" />
            </p>
            <div class="taskbtns">
                  <el-button type="primary" :disabled="img!=''?false:true" @click="submit">提交任务</el-button>
            </div>
    </div>
  </div>
</template>

<script>
export default {
   data () {
       return {
           id:this.$route.query.id,
           one:'',
           fileList:[],
           img:''
       }
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
   mounted () {
     this.my_task_one()  
   },
   methods: {
       onClickLeft() {
      this.$router.go(-1);
    },
    my_task_one(){
        this.$api.Post('my_task_one',{id:this.id}).then(res=>{
           this.one=res.result.task;
        })
    },
    afterRead(file1) {
      // 此时可以自行将文件上传至服务器
      console.log(file1);
      this.$api.Post('uploader',{file:file1.file}).then(res=>{
         this.img=res.result;
      })
    },
    submit(){
      if(this.img==''){
        this.$toast('请先上传凭证')
        return
      }
        this.$api.Post('task_sublimt',{id:this.id,img:this.img}).then(res=>{
          this.$toast(res.result.message)
          if(res.status==1){
            setTimeout(()=>{
              this.$router.go(-1)
            },500)
          }
        })
    }
       
   }
}
</script>

<style lang="less">
.task-details{
  >p{
      padding: 10px 0;
      >span{
          display: inline-block;
          width: 25%;
          text-align: right;
          margin-right: 10px;
       
      }
  }
}
.taskbtns{
  margin-top: 30px;
  text-align: center;
  button{
    width: 100%;
  }
}
</style>