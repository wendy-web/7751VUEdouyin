<template>
    <div class="prames">
		<!-- <div class="parTop" :style="bgTop"></div> -->
		<!-- 轮播 -->
        <div>
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(item,index) in imgLis" :key="index">
                    <img :src="item.thumb" alt srcset />
                </van-swipe-item>
            </van-swipe>
        </div>
		<!-- 类型 -->
		<div class="sortLis">
			<div 
				 :class="['lis', type == item.type ? 'allActive' : '']"
				 v-for='(item,index) in allSortLis'
				 :key="index"
				 @click="allSelectLis(item.type)"
			>
				<img :src="item.img" alt="">
				<p>{{item.text}}</p>
			</div>
		</div>

		<ul class="lisType">
			<li
				v-for="(item, index) in sortLis"
			    :key="index"
				:class="levelac == index ? 'active' : 0"
				@click="selectLis(item.level, index)"
			>
				{{item.levelname}}
			</li>
		</ul>
		<ul class="banner">
                <!-- <router-link to='/recharge' tag='div' class="sel_bnt">充值</router-link> -->
			<li v-for="(item, index) in list" :key="index" ref="item">
				<div class="ban_left">
					<p>{{item.type}}</p>
					<img src="@/assets/img/img_icon/dy.png" alt="" v-if="type == 1">
					<img src="@/assets/img/img_icon/wechat.png" alt="" v-if="type == 2">
					<img src="@/assets/img/img_icon/dy.png" alt="" v-if="type == 3">
					<img src="@/assets/img/img_icon/dy.png" alt="" v-if="type == 4">

					<p>{{item.level}}</p>
				</div>
				<div class="ban_right">
					<p><span>需求方：{{item.mobile}}</span><span class="played">已付款</span></p>
					<p><span>剩余：{{item.num}} </span><span class="price">{{item.money}}元</span></p>
					<p><span>要求：{{item.rwsm}}</span><button @click="receive(item.id)">领取</button></p>
				</div>
			</li>
			
		</ul>
	</div>
</template>

<script>
export default {
  data() {
    return {
	  getdata:'',
      bgTop: {
        backgroundImage: "url(" + require("@/assets/img/aliketoop.jpg") + ")"
	  },
	  bgCont: {
        backgroundImage: "url(" + require("@/assets/img/alickon.png") + ")"
	  },
	  list: [],
	  imgLis: [],
	  sortLis: [],
	  allSortLis:[
		  {
			  type: 1,
			  img: require('@/assets/img/img_icon/dy.png'),
			  text: '抖音'
		  },
		   {
			  type: 2,
			  img: require('@/assets/img/img_icon/wechat.png'),
			  text: '微信'
		  },
		   {
			  type: 3,
			  img: require('@/assets/img/img_icon/dy.png'),
			  text: '短信'
		  },
		   {
			  type: 4,
			  img: require('@/assets/img/img_icon/dy.png'),
			  text: '其他'
		  }
	  ],
	  level: 0,
	  levelac: 0,
	  type: 1
    };
  },
  mounted() {
	  this.gateDate();
	  this.gataList();
  },
  methods: {
	  gataList(){
		var that = this;
		this.$api.Post("home").then(res => {
			if(res.status == 1){
				that.imgLis = res.result.thumb;
			}
		});
		
		this.$api.Post("renwu_level").then(res => {
			if(res.status == 1){
				console.log(res.result.level)
				that.sortLis = res.result.level
			}
		});

	  },
	  gateDate() {
		  var that = this
		  that.$api.Post('renwu',{
			  level: that.level,
			  type: that.type
		  }).then(res =>{
			  if(res.status == 1){
				  that.list = res.result.renwulist;
			  }
		  })
	  },
	// 领取
	  receive(rwid){
		this.$api.Post("jierenwu",{rwid: rwid}).then(res => {
			if(res.status == 1){
          		this.$toast(res.result.message);
				this.$router.go(0)
			} else {
          		this.$toast(res.result.message);
			}
		});
	  },
	//  抖音分类
	  allSelectLis(type){
		  this.type = Number(type)
	  	  this.gateDate();
	  },
	//   等级分类
	  selectLis(level,index){
		  this.level = Number(level)
		  this.levelac = index
	  	  this.gateDate();
	  }
  }
};
</script>

<style lang="less" scoped>
.prames {
	width: 100%;
	height: auto;
	background-color: #fff!important;
	.sortLis{
		width: 100%;
		padding: 20px 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #ddd;
		.lis{
			width: 20%;
			height: 1.4rem;
			text-align: center;
			box-sizing: border-box;
			padding-top: 0.2rem;
    		border-radius: 5px;
			img{
				width: 30%;
			}
		}
	}
	.banner{
		width: 95%;
		margin: 20px auto 0;
		li{
			width: 100%;
			padding: 15px 10px 5px;
			box-sizing: border-box;
			box-shadow: 0px 0px 5px 0px darkgray;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 5px;
			font-size: 15px;
			margin-bottom: 10px;
			.ban_left{
				width: 25%;
				text-align: center;
				border-right: 1px solid #ddd;
				p{
					line-height: 1rem;
				}
				img{
					width: 50%;
					margin-top: 0.4rem;
				}
			}
			.ban_right{
				width: 70%;
			}
		}
	}
}
.van-swipe{
	height: 4rem;
}
.ban_right p:nth-child(1){
	line-height: 1rem;
	.played{
		color:#B6AC79;
		margin-left: 4px;
	}
}
.ban_right p:nth-child(2){
	margin-top: 10px;
	height: 1.3rem;
	position: relative;
	.price{
		position:absolute;
		right: 0;
		font-size: 20px;
		font-weight: bold;
	}
}
.ban_right p:nth-child(3){
	height: 1rem;
	position: relative;
	button{
		position: absolute;
		right: 0;
		height: 100%;
		padding: 0 5px;
		background-image: linear-gradient(to top, #FF8206, #FFAC06);
		color: #fff;
		border: 1px solid #E8A237;
		border-bottom: 4px solid #BF5F00;
		border-radius: 5px;
		box-sizing: border-box;
	}
}
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 160px;
	text-align: center;
	color: #B6AC79;
	position: relative;
	//   background-color: #39a9ed;
}
.my-swipe img {
	width: 100%;
	height: 100%;
	position:absolute;
	left: 0;
	right: 0;
}
.lisType{
	width: 95%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	li{
		padding: 2px 3px;
		border-radius: 5px;
		box-sizing: border-box;
	}
	.active{
		border: 1px solid #a9a7a7;
		color: #66C7F9;
	}
}
.allActive{
	box-shadow: 0px 0px 2px 0px #949292;
	background: #ececec;
	box-sizing: border-box;
}
</style>