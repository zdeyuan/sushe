<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">修改学制</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学制名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply"
								v-model.trim="ApplyObj.xzmc" @blur="validateField('xzmc', ApplyObj.xzmc, [validation.requiredRule])" :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.xzmc">{{errors.xzmc}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学制年限</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-input class="input-style-reply"
								v-model.trim="ApplyObj.years" @blur="validateField('years', ApplyObj.years, [validation.requiredRule, validation.numberRule])" :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.years">{{errors.years}}</span>
						</td>
					</tr>
				</table>
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
				ApplyObj: {
					xzmc: '',
					years: ''
				}, //弹窗对象
				num: 0,
				errors: {
					xzmc: false,
					years: false,
				},
				joinOrChangeStuType: '',
				joinOrChangeStuShow: false,
				joinNotEite: false,
				validation: validationService
			}
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

			// 修改操作前,获取到用户信息
			getStuMsg(msg) {
				this.ApplyObj = msg;
			},
			//添加
			tip() {
				const fields = [{
						name: 'xzmc',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'years',
						rules: [this.validation.requiredRule, this.validation.numberRule]
					},
					// 更多字段和规则
				];

				// 执行字段验证
				this.errors = this.validation.validateFields(fields, this.ApplyObj);

				// 检查是否有错误
				if (Object.values(this.errors).every(error => error === null)) {
					// 所有字段都通过了验证，提交表单数据
					let api = ``;
					if (this.joinOrChangeStuType != 'add') {
						api = `common/veBase/editXueZhi`;
						// this.cancel()
						// return
					} else {
						api = `common/veBase/addXueZhi`;
					}
					axios({
							url: api,
							method: 'post',
							data: this.ApplyObj,
					
						})
						.then((res) => {
							if (res.code == 200) {
								this.$message.success(res.message);
								this.$emit("JoinOrchangeStuSuss", this.joinOrChangeStuType)
								this.cancel();
								return;
							} else {
								this.$message.warning(res.message);
							}
							// this.$message.warning(res.message);
					
					
						})
						.catch((err) => {
							this.$message.warning("添加失败！");
						})
					// 这里可以添加提交表单数据的逻辑，比如发送到服务器
				} else {
					// 有字段未通过验证，阻止表单提交并显示错误消息
					//alert('请检查表单中的错误并修正。');
				}
				
			},
			async judesType(type, msg) {
				this.joinOrChangeStuType = type
				this.joinOrChangeStuShow = true
				// 判断是否是添加或修改
				if (type !== 'add') {
					// console.log(type,'type')
					// 不是添加流程进入 修改 
					// 根据方法获取msg
					// setTimeout(()=>{
					await this.getStuMsg(msg)
					// },500)
				} else {
					this.ApplyObj = {
						xzmc: '',
						years: ''
					}
					this.num = 0
					this.joinNotEite = false
				}
				this.joinOrChangeStuType = type
			},
			//取消按钮
			cancel() {
				this.ApplyObj = {
					xzmc: '',
					years: ''
				}
				this.num = 0
				this.joinOrChangeStuShow = false
			}
		}
	}
</script>