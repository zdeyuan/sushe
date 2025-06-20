<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">字典名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.title" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">字典代码</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.code"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">排序</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.listSort" :disabled='joinNotEite'>
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
								<div style="display:flex">
									<a-button class="search-button btn-style btn" @click="tip">确定</a-button>
									<a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消 </a-button>
								</div>
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
		created() {
			
		},
		methods: {
			async judesType(type, obj) {
				console.log(type, 'type')
				// console.log(id, 'id')
				// 判断是否是添加或修改
				console.log(obj, 'this.ApplyObj？？？？？')
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.ApplyObj.userType = this.ApplyObj.userType+'1'
					this.ApplyObj.roleId = Number(this.ApplyObj.roleId)
					console.log(this.ApplyObj, 'this.ApplyObj？？？？？')
					this.joinOrChangeStuShow = true
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

				var obj = JSON.parse(localStorage.getItem('zidianxingqin'))
				console.log(obj,'obj????????')
				this.ApplyObj.modelCode = obj.code
				if (this.joinOrChangeStuType == 'add') {

					if (this.joinNotEite) {
						this.cancel()
						return
					}

					axios({
							url: '/edu-base/base/veDictdata/add',
							method: 'post',
							data: this.ApplyObj,

						})
						.then((res) => {
							if (res.code == 200) {
								this.$message.success('添加成功');
								this.$emit("JoinOrchangeStuSuss", '233')
								this.cancel();
								return;
							} else {
								this.$message.warning(res.message);
							}
						})
						.catch((err) => {
							this.$message.warning("添加失败！");
						})

				} else {
					// this.ApplyObj.userType = this.ApplyObj.userType+'0'
					axios({
							url: '/edu-base/base/veDictdata/edit',
							method: 'post',
							data: this.ApplyObj,

						})
						.then((res) => {
							if (res.code == 200) {
								this.$message.success('修改成功');
								this.$emit("JoinOrchangeStuSuss", '233')
								this.cancel();
								return;
							} else {
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


