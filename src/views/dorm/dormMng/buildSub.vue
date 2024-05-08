<template>
	<a-col :span="6">
		<div class="hello">
			<div class="frame">
				<div class="title-frame">
					<img src="../icon/man.svg" v-if="sextype==1">
					<img src="../icon/wen.png" v-if="sextype == 2">
					<div>{{buildId}}</div>
					<div>({{sextype==1? '男生': sextype==2 ?'女生' : '混住'}}宿舍楼)</div>
				</div>
				<div class="content-frame">
					<div class="bed-imgs">
						<img class="bed-img" :src="url">
						
					</div>
					<div class="bed-services">
						<div class="bed-service">剩余床位:<span class="tips blu">{{residueBedNum}}</span></div>
						<div class="bed-service">入住比率:<span class="tips oege">{{liveratio}}</span></div>
						<div class="bed-service-btn" @click="clickquery">点击查看</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="param-frame">
					<div class="param-item">
						<span class="count">总楼层数:<span class="tips ">{{allFloorNum}}</span></span>
						<span class="count"> 总床位数:<span class="tips oege">{{allBedNum}}</span></span>
					</div>
					<div class="param-item">
						<span class="count">总寝室数:<span class="tips ">{{allRoomNum}}</span></span>
						<span class="count"> 已住人数:<span class="tips ">{{livePeopleNum}}</span></span>
					</div>
				</div>
			</div>
		</div>
	</a-col>
</template>

<script>
	export default {
		name: "BuildSub",
		props: {
			sextype: Number,
			buildId: String,
			residueBedNum: Number,
			liveratio: String,
			allFloorNum: Number,
			allRoomNum: Number,
			allBedNum: Number,
			livePeopleNum: Number,
			url:String,
		},
		methods: {
			clickquery: function() {
				sessionStorage.setItem('XBM',this.sextype)
				this.$emit("clickquery", null);
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tips {
		font-size: 16px;
	}

	.blu {
		color: #1BB2F3;
	}

	.oege {
		color: #FCA57C;
	}

	.count {
		margin: 0 10px;
	}

	.hello {
		margin-bottom: 20px;
	}

	.frame {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
		width: 300px;
		height: 300px;
		border-radius: 15px;
		box-shadow: 0px 0px 10px #ccc;
	}

	.title-frame {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		background-color: #1BB2F3;
		width: 100%;
		height: 20%;
		border-radius: 15px 15px 0px 0px;
		color: white;
	}

	.title-frame img {
		width: 20px;
	}

	.title-frame div {
		font-size: 18px;
		font-weight: bold;
		font-family: "microsoft yahei";
	}

	.bed-service {
		font-size: 14px;
		font-family: "microsoft yahei";
	}

	.content-frame {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin-top: 10px;
	}

	.content-frame .bed-imgs {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin-top: 10px;
	}

	.bed-imgs {
		width: 140px !important;
		height: 70px;
		color: #A9A9A9;
	}


	.content-frame img {
		width: 140px;
		height: 70px;
		margin: 5px;
	}

	.content-frame .bed-services {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: start;
		justify-content: center;
		width: 35%;
		font-size:	12px;
		cursor: pointer;
	}

	.content-frame .bed-service-btn {
		color: white;
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background-color: #1BB2F3;
		margin-top: 5px;
		font-size: 12px;
		border-radius: 3px;
	}

	.line {
		border-top: 2px solid #ccc;
		width: 90%;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.param-frame {
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: space-around;
		justify-content: space-around;
		width: 90%;
	}

	.param-item {
		width: 100%;
		font-size: 17px;
		font-family: "microsoft yahei";
		text-align: center;
	}

	.redFont {
		color: red;
	}
</style>
