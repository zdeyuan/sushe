<template>
	<div>
<!-- 		<div>
			<div :class="judget(1)" @click="content = 1">
				拟录取
			</div>
			<div :class="judget(2)" @click="content = 2">
				预录取
			</div>
			<div :class="judget(3)" @click="content = 3">
				正式录取
			</div>
		</div> -->
		<a-menu v-model="content" mode="horizontal">
		    <a-menu-item key="1"> 拟录取 </a-menu-item>
		    <a-menu-item key="2" > 预录取 </a-menu-item>
			<a-menu-item key="3" > 正式录取 </a-menu-item>
		</a-menu>
		<div>
			<proposed-admission v-if="content == '1'"></proposed-admission>
			<pre-admission v-if="content == '2'"></pre-admission>
			<full-admission v-if="content == '3'"></full-admission>
		</div>	
	</div>	
</template>

<script>
import proposedAdmission from './admissionAssembly/proposedAdmission.vue';
import PreAdmission from './admissionAssembly/preAdmission.vue';
import FullAdmission from './admissionAssembly/fullAdmission.vue';
	export default {
		name: 'index',
		// 在这里注册后标签才可以使用 
		components:{
			proposedAdmission,
			PreAdmission,
			FullAdmission
		},
		data() {
			return {
				content:['1']
			};
		},
		methods:{
			judget(msg){
				if(msg == this.content){
					return 'content-title'
				}else{
					return 'content-title not-title'
				}
			}
		}
	};
</script>

<style scoped>
	
	.oa-meet-page{
		position: relative; /**相对定位 */
		width: 100%;
		height: 100%;
		padding: 30px;
		
	}
</style>
