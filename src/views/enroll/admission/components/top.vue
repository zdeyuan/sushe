<template>
	<div class="topBox">
		<div class="stateOne" @click="changePages(1)">
			<span :class="judgeClass(stateOne)" style="left: 15px;">
				1.个人信息
			</span>
			<img :src= 'stateOneImg' class="topImgs"/>
		</div>
		<div class="stateTwo" @click="changePages(2)">
			<span :class="judgeClass(stateTwo)" >
				2.缴费
			</span>
			<img :src= 'stateTwoImg' class="topImgs"/>
		</div>
		<div class="stateThree" @click="changePages(3)">
			<span :class="judgeClass(stateThree)" >
				3.助学贷款
			</span>
			<img :src= 'stateThreeImg' class="topImgs"/>
		</div>
		<div class="stateFour" @click="changePages(4)">
			<span :class="judgeClass(stateFour)" >
				4.选择宿舍
			</span>
			<img :src= 'stateFourImg' class="topImgs"/>
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
				stateFour:3,
				stateOneImg:stateOneDesignate,
				stateTwoImg:stateTwoNot,
				stateThreeImg:stateTwoNot,
				stateFourImg:stateThreeNot,
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
					this.stateFour = 3
					this.stateOneImg = stateOneDesignate
					this.stateTwoImg = stateTwoNot
					this.stateThreeImg = stateTwoNot
					this.stateFourImg = stateThreeNot
				}else if(this.designate == 2){
					this.stateTwo = 1
					this.stateOne = 2
					this.stateThree = 3
					this.stateFour = 3
					this.stateOneImg = stateOnePass
					this.stateTwoImg = stateTwoDesignate
					this.stateThreeImg = stateTwoNot
					this.stateFourImg = stateThreeNot
				}else if(this.designate == 3){
					this.stateThree = 1
					this.stateOne = 2
					this.stateTwo = 2
					this.stateFour = 3
					this.stateOneImg = stateOnePass
					this.stateTwoImg = stateTwoPass
					this.stateThreeImg = stateTwoDesignate
					this.stateFourImg = stateThreeNot
				}else if(this.designate == 4){
					this.stateThree = 2
					this.stateOne = 2
					this.stateTwo = 2
					this.stateFour = 1
					this.stateOneImg = stateOnePass
					this.stateTwoImg = stateTwoPass
					this.stateThreeImg = stateTwoPass
					this.stateFourImg = stateThreeDesignate
				}
			},
			judgeClass(msg){
				if(msg == 3){
					return 'abs ash'
				}else{
					return 'abs white'
				}
			},
			changePages(msg){
				this.$emit('changePages',msg)
			}
		}
	}
</script>

<style scoped>
	.stateOne,.stateTwo,.stateThree,.stateFour{
		display: inline-block;
		position: relative;
	}
	.stateTwo{
		left: -35px;
	}
	.stateThree{
		left: -68px;
	}
	.stateFour{
		left: -100px;
	}
	.topImgs{
		width: 370px;
		height: 56px;
	}
	.abs{
		position: absolute;
		top: 5px;
		left: 45px;
		font-size: 30px;
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
