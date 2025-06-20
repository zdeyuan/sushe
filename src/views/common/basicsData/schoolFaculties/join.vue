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
							<div class="font-style"><span class="tip-star">*</span>院系代码</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.yxdm" @blur="validateField('yxdm', ApplyObj.yxdm, [validation.requiredRule])" :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.yxdm">{{errors.yxdm}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>院系名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.yxmc"
								:disabled='joinNotEite' @blur="validateField('yxmc', ApplyObj.yxmc, [validation.requiredRule])"></a-input>
							<span class="nonull-tip" v-if="errors.yxmc">{{errors.yxmc}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">院系英文名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.yxywmc" :disabled='joinNotEite'>
							</a-input>
						<td class="td-div">
							<div class="font-style">状态</div>
						</td>
						<td class="double">
							<a-switch v-model="ApplyObj.status" />
						</td>
					</tr>

				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" @click="tip"> 确认 </a-button>
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
				fzrUser:[],
				ApplyObj: {
					status:0
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				errors:{},
				validation: validationService
			}
		},
		created(){
		},
		methods: {
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
			async judesType(type, obj) {
				console.log(type, 'type')
				// console.log(id, 'id')
				// 判断是否是添加或修改
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.joinOrChangeStuShow = true
				} else {
					this.ApplyObj = {}
					this.joinOrChangeStuShow = true
					this.joinNotEite = false
				}
			},
			//添加
			tip() {
				const fields = [{
						name: 'yxdm',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'yxmc',
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
							this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
							axios({
									url: '/common/veBase/addFaculty',
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
							this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
							axios({
									url: '/common/veBase/editFaculty',
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
