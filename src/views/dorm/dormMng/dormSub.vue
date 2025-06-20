<template>
	<a-col :span="8">
		<div class="hello">
			<div class="frame">
				<div class="title-frame">
					<div>{{dormId}}</div>
					<div>{{dormName}} ({{floor}})</div>
				</div>
				<div class="content-frame">
					<div class="bed-imgs">
						<a-col :span="8" v-for='(val,key) in allBedNum'>
							<icon-font class="bed-img" type="iconchuangwei" v-bind:class="{'bed-icon': use[key]}" />
						</a-col>
					</div>
					<div class="bed-services">
						<div class="bed-service" @click="allocationstu">分配学生</div>
						<div class="bed-service" @click="fixroom">维修宿舍</div>
						<div class="bed-service" @click="clearroom">清空宿舍</div>
						<div class="bed-service" @click="meansmgr">资产管理</div>
					</div>
				</div>
				<div class="line"></div>
				<div class="param-frame">
					<div class="param-item">
						<span class="count">已住人数:<span class="tips ">{{livePeopleNum}}</span></span>
						<span class="count"> 剩余床位:<span class="tips oege">{{residueBedNum}}</span></span>
					</div>
				</div>
			</div>
		</div>
	</a-col>
</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_5ulwn7x139u.js',
	});

	export default {
		name: "DormSub",
		data() {
			return {
				use: [],
			}
		},
		mounted() {
			this.initBed();
		},
		props: {
			dormId: String,
			dormName: String,
			floor: String,
			allRoomNum: Number,
			allBedNum: Number,
			livePeopleNum: Number,
			residueBedNum: Number
		},
		watch: {
			livePeopleNum: function(newflag) {
				this.initBed();
			}
		},
		components: {
			IconFont,
		},
		methods: {
			allocationstu: function() {
				this.$emit("allocationstu", null);
			},
			fixroom: function() {
				this.$emit("fixroom", null);
			},
			clearroom: function() {
				this.$emit("clearroom", null);
			},
			meansmgr: function() {
				this.$emit("meansmgr", null);
			},
			initBed() {
				if (this.$props.livePeopleNum == 0) {
					this.use = []
				}
				for (let i = 0; i < this.allBedNum; i++) {
					if (i < this.$props.livePeopleNum) {
						this.use.push(true);
					} else {
						this.use.push(false);
					}
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tips {
		font-size: 20px;
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
		height: 230px;
		border-radius: 15px;
		box-shadow: 0px 0px 10px #ccc;

	}

	.title-frame {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		font-size:16px;
		justify-content: center;
		background-color: #1BB2F3;
		width: 100%;
		height: 20%;
		border-radius: 15px 15px 0px 0px;
		color: white;
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



	.content-frame {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		width: 90%;
		border: 1px solod black;
	}

	.bed-imgs {
		display: flex;
		flex-wrap: wrap;
	}

	.bed-img {
		/* width: 30px; */
		font-size:25px;
		color: #999999;
	}

	.content-frame img {
		width: 45px;
		height: 20px;
		margin: 5px;
	}

	.content-frame .bed-services {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		width: 30%;
		font-size: 14px;
		cursor: pointer;
	}

	.line {

		border-top: 2px solid #ccc;
		width: 90%;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.param-frame {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		width: 90%;
		margin-top: 10px;
		font-size: 14px;
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

	.bed-icon {
		color: #1BB2F3;
	}
</style>
