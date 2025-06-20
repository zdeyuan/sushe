<template>
	<div class="bigZhe">
		<div style="font-size: 20px;">
			<span style="color: white; margin-right: 20px;" @click="over">关闭图片</span>
			<span style="color: white; margin-right: 20px;" @click="up">上一张</span>
			<span style="color: white; margin-right: 20px;" @click="dumo">下一张</span>
		</div>
		<img :src='isImg'  class="Bigimg">
	</div>
</template>

<script>
	export default {
		props: {
			imgList:{
				
			},
			index:{
				
			}
		},
		data() {
			return {
				isImg:"",
				key:0
			}
		},
		watch:{
			imgList(flag){
				this.isImg = this.imgList[this.index]
			}
		},
		mounted() {
			this.key = this.index
			this.isImg = this.imgList[this.index]
		},
		methods:{
			over(){
				this.$emit('showBigImg',false)
			},
			up(){
				var index = this.key-1
				if(index == -1){
					this.$message.warning('没有上一页了')
					return
				}
				if(this.imgList[index] == undefined){
					this.$message.warning('没有上一页了')
					return
				}else{
					this.isImg = this.imgList[index]
					this.key -= 1
				}
			},
			dumo(){
				var index = this.key+1
				if(this.imgList[index] == undefined){
					this.$message.warning('没有下一页了')
					return
				}else{
					this.isImg = this.imgList[index]
					this.key += 1
				}
			},
		}
	}
</script>

<style>
	.bigZhe {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 2000;
    overflow: auto;
		background: rgba(0, 0, 0, 0.3);
	}

	.Bigimg {
		max-width: 100%;
		display: block;
		position: absolute;
		left: 0;
		right: 0;
		margin:40px auto;
		z-index: 1000;
	}
</style>
