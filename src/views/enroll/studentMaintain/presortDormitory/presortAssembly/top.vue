<template>
	<div class="topBox">
		<div class="stateOne">
			<span :class="judgeClass(stateOne)" style="left: 15px;">
				1.选择要安排床位的班级
			</span>
			<img :src= 'stateOneImg' class="topImgs"/>
		</div>
		<div class="stateTwo">
			<span :class="judgeClass(stateTwo)" >
				2.选择要安排入住的寝室
			</span>
			<img :src= 'stateTwoImg' class="topImgs"/>
		</div>
		<div class="stateThree">
			<span :class="judgeClass(stateThree)" >
				3.确认班级分配床位信息
			</span>
			<img :src= 'stateThreeImg' class="topImgs"/>
		</div>
	</div>	
</template>

<script>
	import stateOneDesignate from '@/assets/dormitory/stateOneDesignate.png'
	import stateOnePass from '@/assets/dormitory/stateOnePass.png'
	import stateTwoNot from '@/assets/dormitory/stateTwoNot.png'
	import stateTwoDesignate from '@/assets/dormitory/stateTwoDesignate.png'
	import stateTwoPass from '@/assets/dormitory/stateTwoPass.png'
	import stateThreeNot from '@/assets/dormitory/stateThreeNot.png'
	import stateThreeDesignate from '@/assets/dormitory/stateThreeDesignate.png'
	export default {
		props:['designate'],
		data(){
			return{
				stateOne:1,
				stateTwo:3,
				stateThree:3,
				stateOneImg:stateOneDesignate,
				stateTwoImg:stateTwoNot,
				stateThreeImg:stateThreeNot
			}
		},
		watch:{
			designate:function(newflag){
				console.log(newflag)
				this.judgeDesignate()
			}
		},
		methods: {
			judgeDesignate(){
				if(this.designate == 1){
					this.stateOne = 1
					this.stateTwo = 3
					this.stateThree = 3
					this.stateOneImg = stateOneDesignate
					this.stateTwoImg = stateTwoNot
					this.stateThreeImg = stateThreeNot
				}else if(this.designate == 2){
					this.stateTwo = 1
					this.stateOne = 2
					this.stateThree = 3
					this.stateOneImg = stateOnePass
					this.stateTwoImg = stateTwoDesignate
					this.stateThreeImg = stateThreeNot
				}else if(this.designate == 3){
					this.stateThree = 1
					this.stateOne = 2
					this.stateTwo = 2
					this.stateOneImg = stateOnePass
					this.stateTwoImg = stateTwoPass
					this.stateThreeImg = stateThreeDesignate
				}
			},
			judgeClass(msg){
				if(msg == 3){
					return 'abs ash'
				}else{
					return 'abs white'
				}
			}
		}
	}
</script>

<style scoped>
	.stateOne,.stateTwo,.stateThree{
		display: inline-block;
		position: relative;
	}
	.stateTwo{
		left: -35px;
	}
	.stateThree{
		left: -68px;
	}
	.topImgs{
		width: 350px;
		height: 56px;
	}
	.abs{
		position: absolute;
		top: 5px;
		left: 30px;
		font-size: 25px;
		font-weight: 400;
		font-family: Microsoft YaHei;
	}
	.ash{
		color: #CCCCCC;
	}
	.white{
		color: #FFFFFF;
	}
</style>
