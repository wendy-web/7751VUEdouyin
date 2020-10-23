<template>
  <div>
	<img :src="imgBg" class="bgImg">
    <div class="prames">
		<div class="parTop"></div>
		<div class="parConter">
			<!-- <div class="bgCont" :style="bgCont"> -->
			<div class="bgCont">
				<div class="userInfo">
					<p>您的身份: <span class="life">{{levelname}}</span></p>
					<p>每日任务数：{{leveldiscount}}</p>
				</div>
				<div class="taskList f-flex f-ver f-jc-sb" :class="'clolr'+index+''" v-for="(item,index) in tasklist" :key="index">
					<div>
						<p>{{item.levelname}}<span class="tasknum">{{item.ordermoney}}</span></p>
						<p class="twones">每天可领<span class="tasknuse">{{item.ordercount}}</span>次任务</p>
					</div>
					<div>
						<p class="golest" @click="join_level(item.id)">立即加入</p>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      bgTop: {
        backgroundImage: ''
	  },
	  bgCont: {
        backgroundImage: "url(" + require("@/assets/img/alickon.png") + ")"
	  },
	  tasklist: [],
	  levelname: '',
	  leveldiscount: '',
	  imgBg: ''
    };
  },
  mounted() {
    this.level_list();
  },
  methods: {
	  join_level(level){
		var that = this;
		//弹窗
		Dialog.confirm({
			title: "",
			message: "确定加入会员等级吗？"
		})
		.then(() => {
			this.$api.Post("buy_level",{ levelid : level}).then(res => {
				if (res.status == 1) {
					this.$toast(res.result.message);
					this.$router.go()
				} else{
					this.$toast(res.result.message);
				}
			});
		})
		.catch(() => {
		});
	  },
	  level_list() {
		var that = this;
		this.$api.Post("center").then(res => {
			if (res.status == 1) {
				that.levelname = res.result.levelname
				that.leveldiscount = res.result.leveldiscount ? res.result.leveldiscount : 0
			}
		});
		
		this.$api.Post("member_background").then(res => {
			console.log(res)
			if (res.status == 1) {
				that.imgBg = res.result.img
			}
		});
		this.$api
			.Post('levellist').then(res => {
				if(res.status == 1){
					that.tasklist = res.result.level
				}
			});
	},
  }
};
</script>

<style lang="less">
.bgImg{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: calc(100% - 1.3rem);
	z-index: -1;
}
.clolr0{
	background: linear-gradient(to bottom,rgba(233,195,109,1) 0%,rgba(233,195,109,0.4) 100%);
}
.clolr1{
	background: linear-gradient(to bottom,rgba(201,209,244,1) 0%,rgba(201,209,244,0.4) 100%);
}
.clolr2{
	background: linear-gradient(to bottom,rgba(212,202,197,1) 0%,rgba(212,202,197,0.4) 100%);
}
.clolr3{
	background: linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 100%);
}
.clolr4{
	background: linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%);
}
.clolr5{
	background: linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0) 100%);
}
.prames {
	width: 100%;
	height: auto;
	.parTop{
		width: 100%;
		height: 25vh;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.parConter{
		width: 100%;
		height: auto;
		padding: 10px 0;
		.bgCont{
			width: 100%;
			height: auto;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			padding: 10% 6%;
			padding-bottom: 7%;
			.userInfo{
				width: 100%;
				height: auto;
				color: #FEB952;
				background-color: rgba(254, 250, 215);
				border-radius: 15px;
				padding: 20px 10%;
				.life{
					font-weight: bold;
					text-decoration:underline;
				}
			}
			.taskList{
				width: 100%;
				height: auto;
				color: #000;
				font-size: 16px;
				box-shadow:0px 0px 5px #333333;
				border-radius: 15px;
				padding: 20px 10px;
				margin-top: 15px;
				p{
					color: #515A71;
					margin-bottom: 10px;
					font-weight: bold;
				}
				.tasknum{
					font-size: 22px;
					margin-left: 5px;
				}
				.twones{
					color: #515A71;
					font-size: 14px;
				}
				.tasknuse{
					color: #F5893A;
				}
				.golest{
					font-size: 15px;
					font-weight: normal !important;
				}
			}
		}
	}
	
}
</style>