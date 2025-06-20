<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div >
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">角色编码</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.code" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">角色名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.text"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>
					
					<tr class="tr-style">
						<!-- <td class="td-div">
							<div class="font-style">角色备注</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.remark" :disabled='joinNotEite'>
							</a-input>
						</td> -->
						<td class="td-div">
							<div class="font-style">状态</div>
						</td>
						<td class="double">
							<a-switch :disabled='joinNotEite' v-model="ApplyObj.status" />
						</td>
						<td class="td-div">
							<div class="font-style">是否默认角色</div>
						</td>
						<td class="double">
							<a-switch :disabled='joinNotEite' v-model="ApplyObj.isdefault" />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">角色备注</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.remark" >
							</a-input>
						</td>
					</tr>

					
				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" @click="tip"> 确定 </a-button>
								<a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消 </a-button>
							</a-col>
							<a-col :span="6"> </a-col>
						</a-row>
					</div>
				</div>
			</div>
		</div>
	</a-modal>
</template>
<script>
	import {
		axios
	} from '@/utils/request'

	export default {
		data() {
			return {
				ApplyObj: {
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: ''
			}
		},
		created(){
			// this.getyx()
		},
		methods: {
			async judesType(type, obj) {
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.ApplyObj.roleId = Number(this.ApplyObj.roleId)
					console.log(this.ApplyObj,'this.ApplyObj？？？？？')
					this.joinOrChangeStuShow = true;
					this.joinNotEite = true
				} else {
					this.ApplyObj = {}
					this.joinOrChangeStuShow = true
					this.joinNotEite = false
				}
			},
			//添加
			tip() {
				// this.ApplyObj.njzzuserid
				// var index = this.fzrUser.findIndex(e=>e.value == this.ApplyObj.njzzuserid)
				// console.log(index,'index？？？？？？？？？？')
				
				// this.ApplyObj.xm = this.fzrUser[index].label
				
				
				if (this.joinOrChangeStuType == 'add') {
				
					if (this.joinNotEite) {
						this.cancel()
						return
					}
					this.ApplyObj.isdefault = this.ApplyObj.isdefault == true ? 1 : 0
					this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
					axios({
							url: '/edu-base/base/VeBaseSysRole/addSysRoleAndMenu',
							method: 'post',
							data: this.ApplyObj,

						})
						.then((res) => {
							if (res.code == 200) {
								this.$message.success('添加成功');
								this.$emit("JoinOrchangeStuSuss",'233')
								this.cancel();
								return;
							}else{
								this.$message.warning(res.message);
							}
						})
						.catch((err) => {
							this.$message.warning("添加失败！");
						})

				} else {
					this.ApplyObj.isdefault = this.ApplyObj.isdefault == true ? 1 : 0
					this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
					axios({
							url: '/edu-base/base/VeBaseSysRole/editSysRoleAndMenu',
							method: 'post',
							data: this.ApplyObj,

						})
						.then((res) => {
							if (res.code == 200) {
								this.$message.success('修改成功');
								this.$emit("JoinOrchangeStuSuss",'233')
								this.cancel();
								return;
							}else{
								this.$message.warning(res.message);
							}
						})
						.catch((err) => {
							this.$message.warning("修改失败！");
						})
				}
			},

			//取消按钮
			cancel() {
				this.ApplyObj = {}
				this.joinOrChangeStuShow = false
			},
		},
	}
</script>


