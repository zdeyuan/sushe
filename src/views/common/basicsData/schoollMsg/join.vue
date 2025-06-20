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
						<td class="td-div" >
							<div class="font-style"><span class="tip-star">*</span>校区代码</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqdm" @blur="validateField('xqdm', ApplyObj.xqdm, [validation.requiredRule])" :disabled='joinNotEite'>
							</a-input>
							<div class="nonull-tip" v-if="errors.xqdm">{{errors.xqdm}}</div>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>校区名称</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqmc" 
								:disabled='joinNotEite' @blur="validateField('xqmc', ApplyObj.xqmc, [validation.requiredRule])"></a-input>
							<span class="nonull-tip" v-if="errors.xqmc">{{errors.xqmc}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>校区地址</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqdz" @blur="validateField('xqdz', ApplyObj.xqdz, [validation.requiredRule])":disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.xqdz">{{errors.xqdz}}</span>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>手机号码</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqlxdh"
								:disabled='joinNotEite' @blur="validateField('xqlxdh', ApplyObj.xqlxdh, [validation.requiredRule,validation.iphoneRule])"></a-input>
							<span class="nonull-tip" v-if="errors.xqlxdh">{{errors.xqlxdh}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">校区传真</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqczdh" :disabled='joinNotEite'>
							</a-input>
						<td class="td-div">
							<div class="font-style">电子邮件</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.dzyj"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">校区邮政编码</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqyzbm" :disabled='joinNotEite'>
							</a-input>
						<td class="td-div">
							<div class="font-style">所在区划码</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqszdxzqhm"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">校区面积</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqmj" :disabled='joinNotEite'>
							</a-input>
						<td class="td-div">
							<div class="font-style">校区建筑面积</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqjzmj"
								:disabled='joinNotEite'></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">固定资产值</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqgdzczz"
								:disabled='joinNotEite'></a-input>
						</td>
						<td class="td-div" >
							<div class="font-style">仪器设备总值</div>
						</td>
						<td >
							<a-input v-model.trim="ApplyObj.xqjxkysbzz"
								:disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">校区负责人</div>
						</td>
						<td >
							<a-select :options="fzrUser" style="width:100px" placeholder="请选择"
								v-model="ApplyObj.fzrUserId" :disabled='joinNotEite' />
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
				fzrUser:[],
				ApplyObj: {}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				validation: validationService,
				errors:{},
			}
		},
		created(){
			this.gettc()
		},
		methods: {
			gettc() {
				var user = sessionStorage.getItem('userInfo')
				// console.log(user,'user????')
				user = JSON.parse(user)
				axios({
						url: '/common/veCommon/getTeacherList?interfaceUserId=09d5e1e7f9b049008eee645c783a1d66',
						method: 'get'
					})
					.then((res) => {
						if (res.code == 200) {
							for (let fzrUser of res.result) {
								this.fzrUser.push({
									value: fzrUser.id,
									label: fzrUser.xm,
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
						name: 'xqdm',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xqdz',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xqmc',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xqlxdh',
						rules: [this.validation.requiredRule, this.validation.iphoneRule]
					},
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
								url: '/common/veBase/addCampus',
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
						axios({
								url: '/common/veBase/editCampus',
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

			//获取楼层列表
			cityChange(value) {
				axios({
						url: 'common/veBase/queryBuildListByCampusId',
						method: 'get',
						params: {
							campusId: this.ApplyObj.campusId,
						},
					})
					.then((res) => {
						this.city.splice(0, this.addspecialty.length)
						for (let city of res.result) {
							this.city.push({
								value: city.id,
								label: city.name,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取楼层失败')
					})
			},
		},
	}
</script>
