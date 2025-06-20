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
							<div class="font-style"><span class="tip-star">*</span>专业编号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zybh" @blur="validateField('zybh', ApplyObj.zybh, [validation.requiredRule])" :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.zybh">{{errors.zybh}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>专业代码</div>

						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zydm" @blur="validateField('zydm', ApplyObj.zydm, [validation.requiredRule])"
								:disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.zydm">{{errors.zydm}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>专业名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zymc"  @blur="validateField('zymc', ApplyObj.zymc, [validation.requiredRule])":disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.zymc">{{errors.zymc}}</span>
						<td class="td-div">
							<div class="font-style">专业英文名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zyywmc"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>学制</div>
						</td>
						<td class="double">
							<a-select :options="xzUser" style="width:100%" @blur="validateField('xz', ApplyObj.xz, [validation.requiredRule])" placeholder="请选择" v-model="ApplyObj.xz"
								:disabled='joinNotEite' />
							<span class="nonull-tip" v-if="errors.xz">{{errors.xz}}</span>
							<!-- <a-input class="input-style-reply" v-model.trim="ApplyObj.xz" :disabled='joinNotEite'>
							</a-input> -->
						<td class="td-div">
							<div class="font-style">专业方向名称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zyfxmc"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">专业简称</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zyjc" :disabled='joinNotEite'>
							</a-input>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>所属院系</div>
						</td>
						<td class="double">
							<a-select :options="yxUser" style="width:100%" @blur="validateField('falId', ApplyObj.falId, [validation.requiredRule])" placeholder="请选择" v-model="ApplyObj.falId"
								:disabled='joinNotEite' />
							<span class="nonull-tip" v-if="errors.falId">{{errors.falId}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">专业教师数</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zyjss" :disabled='joinNotEite'>
							</a-input>
						</td>
						<td class="td-div">
							<div class="font-style">总学分</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.zxf"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">是否招生专业</div>
						</td>
						<td class="double">
							<a-switch v-model="ApplyObj.iszssy" />
						</td>
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
				xzUser: [],
				yxUser: [],
				ApplyObj: {
					status: 0,
					iszssy: 0
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				errors: {},
				validation: validationService
			}
		},
		created() {
			this.gettc()
			this.getyx()
		},
		methods: {
			getyx() {
				var user = sessionStorage.getItem('userInfo')
				// console.log(user,'user????')
				user = JSON.parse(user)
				axios({
						url: '/common/veCommon/queryFacultyList?interfaceUserId=09d5e1e7f9b049008eee645c783a1d66',
						method: 'get'
					})
					.then((res) => {
						if (res.code == 200) {
							for (let yxUser of res.result) {
								this.yxUser.push({
									value: yxUser.id,
									label: yxUser.yxmc,
								})
							}
							return;
						}
					})
					.catch((err) => {
						this.$message.warning("获取教师失败！");
					})
			},
			gettc() {
				var user = sessionStorage.getItem('userInfo')
				// console.log(user,'user????')
				user = JSON.parse(user)
				axios({
						url: '/common/veCommon/queryXueZhiList?interfaceUserId=09d5e1e7f9b049008eee645c783a1d66',
						method: 'get'
					})
					.then((res) => {
						if (res.code == 200) {
							for (let xzUser of res.result) {
								this.xzUser.push({
									value: xzUser.id,
									label: xzUser.xzmc,
								})
							}
							return;
						}
					})
					.catch((err) => {
						this.$message.warning("获取教师失败！");
					})
			},
			async judesType(type, obj) {
				console.log(type, 'type')
				// console.log(id, 'id')
				// 判断是否是添加或修改
				this.joinOrChangeStuType = type
				if (type !== 'add') {
					this.ApplyObj = obj
					this.ApplyObj.xz = Number(this.ApplyObj.xz)
					this.ApplyObj.falId=obj.fal_id;
					this.joinOrChangeStuShow = true
				} else {
					this.ApplyObj = {}
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
				const fields = [{
						name: 'zybh',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'zydm',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'zymc',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xz',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'falId',
						rules: [this.validation.requiredRule]
					}
					// 更多字段和规则
				];

				// 执行字段验证
				this.errors = this.validation.validateFields(fields, this.ApplyObj);
				// 检查是否有错误
				if (Object.values(this.errors).every(error => error === null)) {
					this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
					this.ApplyObj.iszssy = this.ApplyObj.iszssy == true ? 1 : 0
					if (this.joinOrChangeStuType == 'add') {

						if (this.joinNotEite) {
							this.cancel()
							return
						}
						// this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 0
						axios({
								url: '/common/veBase/addSpecialty',
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
						axios({
								url: '/common/veBase/editSpecialty',
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