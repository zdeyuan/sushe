<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学期码</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model="ApplyObj.xqm" placeholder="请输入学期码">
							</a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学期名称</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-input class="input-style-reply" v-model="ApplyObj.xqmc" placeholder="请输入学期名称">
							</a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学年（度）</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<JSelectGrade v-model="ApplyObj.xn" placeholder="请选择学年" />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学期开始日期</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<DatePickByCN
							      v-model="ApplyObj.xqksrqName"
							      placeholder="请选择学期开始日期"
							    />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学期结束日期</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<DatePickByCN
							      v-model="ApplyObj.xqjsrqName"
							      placeholder="请选择日期"
							    />
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>是否当前学期</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-radio-group name="radioGroup"  v-model="ApplyObj.iscurrent">
								<a-radio :value="0">
									是
								</a-radio>
								<a-radio :value="1">
									否
								</a-radio>
							</a-radio-group>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>周数</div>
						</td>
						<td class="double">
							<!-- 没有接口 -->
							<a-input class="input-style-reply" v-model="ApplyObj.weekNum" placeholder="请输入周数">
							</a-input>
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
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import moment from 'moment';
	export default {
		components: {
			JSelectGrade
		},
		data() {
			return {
				ApplyObj: {
					iscurrent:1
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
				// 所有字段都通过了验证，提交表单数据
				let api = ``;
				if (this.joinOrChangeStuType != 'add') {
					api = `common/veBase/editSemester`;
					// this.cancel()
					// return
				} else {
					api = `common/veBase/addSemester`;
				}
				
				// this.ApplyObj.xqjsrqName = moment(this.ApplyObj.xqjsrqName).format(
				// 	'YYYY-MM-DD');
				// this.ApplyObj.xqksrqName = moment(this.ApplyObj.xqksrqName).format(
				// 	'YYYY-MM-DD');	
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
						iscurrent:'0'
					}
					this.num = 0
					this.joinNotEite = false
				}
				this.joinOrChangeStuType = type
			},
			//取消按钮
			cancel() {
				this.ApplyObj = {
					iscurrent:'0'
				}
				this.num = 0
				this.joinOrChangeStuShow = false
			}
		}
	}
</script>