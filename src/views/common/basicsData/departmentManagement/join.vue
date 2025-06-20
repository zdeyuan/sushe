<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '新增部门' : '修改部门'" :width="1073"
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
							<div class="font-style">部门号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jgh	"
								@blur="validateField('jgh', ApplyObj.jgh, [validation.requiredRule])"
								:disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.jgh">{{errors.jgh}}</span>
						</td>
						<td class="td-div">
							<div class="font-style">部门名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jgmc" @blur="validateField('jgmc', ApplyObj.jgmc, [validation.requiredRule])"
								:disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.jgmc">{{errors.jgmc}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">英文名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jgywmc" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">机构简称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jgjc" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">部门简拼</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jgjp" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">部门地址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.jgdz" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

					<tr class="tr-style" v-if="ApplyObj.dssjjgh">
						<td class="td-div">
							<div class="font-style">上级部门号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.dssjjgh" :disabled='true'>
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
	import validationService from '@/utils/validateForm';
	export default {
		data() {
			return {
				ApplyObj: {}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				errors: {},
				validation: validationService
			}
		},
		created() {

		},
		methods: {
			async judesType(type, obj) {
				// 判断是否是添加或修改
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.joinOrChangeStuShow = true
					this.joinNotEite = false
				} else {
					this.ApplyObj = obj;
					this.joinOrChangeStuShow = true
					this.joinNotEite = false
				}
			},
			// 验证单个字段的函数
			validateField(fieldName, fieldValue, rules) {
				let errorMessage = null;
				// 遍历规则数组并应用每个规则
				for (const rule of rules) {
					if (typeof rule === 'function') {
						// 如果规则是一个函数，则调用它并检查返回值
						const result = rule(fieldValue);
						if (result !== true) {
							// 如果规则验证失败，则设置错误消息
							errorMessage = result || '输入无效';
							break;
						}
					} else if (typeof rule === 'object' && rule.test) {
						// 如果规则是一个正则表达式对象，则测试字段值
						if (!rule.test(fieldValue)) {
							errorMessage = rule.message || '输入格式不正确';
							break;
						}
					}
				}
				// 设置或清除错误消息
				this.$set(this.errors, fieldName, errorMessage);
			},
			//添加
			tip() {
				// this.ApplyObj.njzzuserid
				// var index = this.fzrUser.findIndex(e=>e.value == this.ApplyObj.njzzuserid)
				// console.log(index,'index？？？？？？？？？？')

				// this.ApplyObj.xm = this.fzrUser[index].label
				const fields = [{
						name: 'jgh',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'jgmc',
						rules: [this.validation.requiredRule]
					}
					// 更多字段和规则
				];
				// 执行字段验证
				this.errors = this.validation.validateFields(fields, this.ApplyObj);
				// 检查是否有错误
				if (Object.values(this.errors).every(error => error === null)) {
					if (this.joinOrChangeStuType == 'add') {

						if (this.joinNotEite) {
							this.cancel()
							return
						}

						axios({
								url: '/common/veBase/addDepartment',
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
								url: '/common/veBase/editDepartment',
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