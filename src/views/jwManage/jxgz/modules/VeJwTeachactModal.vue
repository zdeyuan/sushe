<template>
	<a-modal :title="title" :width="width" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk"
		@cancel="handleCancel" cancelText="关闭">
		<a-spin :spinning="confirmLoading">
			<a-form :form="form">
				<a-form-item label="活动名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-input v-decorator="['actname', validatorRules.actname]"></a-input>
				</a-form-item>
				<a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<!--          <a-input-number v-decorator="['bjid', validatorRules.bjid]" style="width: 100%" />-->
					<j-select-banji v-decorator="['bjid', validatorRules.bjid]" :trigger-change="true"></j-select-banji>
				</a-form-item>

				<a-form-item label="活动地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-input v-decorator="['address', validatorRules.address]"></a-input>
				</a-form-item>
				<a-form-item label="活动人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-input-number v-decorator="['personnum', validatorRules.personnum]" style="width: 100%" />
				</a-form-item>
				<a-form-item label="活动时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<!-- <a-input-number
            v-decorator="['acttime', validatorRules.acttime]"
            placeholder="请输入活动时间"
            style="width: 100%"
          /> -->
					<j-date v-decorator="['acttimeDate', validatorRules.acttime]" :trigger-change="true"
						style="width: 100%" />
				</a-form-item>
				<a-form-item label="带队教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<j-select-teacher v-decorator="['teacherid', validatorRules.teacherid]"
						:trigger-change="true"></j-select-teacher>
				</a-form-item>
				<a-form-item label="活动状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<!-- <a-input-number
            v-decorator="['actstatus', validatorRules.actstatus]"
            placeholder="请输入活动状态"
            style="width: 100%"
          /> -->
					<a-radio-group v-decorator="['actstatus', validatorRules.actstatus]">
						<a-radio value="1">有效 </a-radio>
						<a-radio value="0">无效 </a-radio>
					</a-radio-group>
				</a-form-item>

				<a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-textarea v-decorator="['content', validatorRules.content]"></a-textarea>
				</a-form-item>
			</a-form>
		</a-spin>
	</a-modal>
</template>

<script>
	import {
		httpAction
	} from '@/api/common/manage'
	import pick from 'lodash.pick'
	import {
		validateDuplicateValue
	} from '@/utils/util'
	import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
	import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

	export default {
		name: 'VeJwTeachactModal',
		components: {
			JSelectBanji,
			JSelectTeacher
		},
		data() {
			return {
				form: this.$form.createForm(this),
				title: '操作',
				width: 800,
				visible: false,
				model: {},
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 5
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 16
					},
				},
				confirmLoading: false,
				validatorRules: {
					actname: {
						rules: [{
							required: true,
							message: '请选择活动名称'
						}]
					},
					bjid: {
						rules: [{
							required: true,
							message: '请选择班级!'
						}]
					},
					bjname: {
						rules: []
					},
					personnum: {
						rules: [{
							required: true,
							message: '请输入人数'
						}]
					},
					address: {
						rules: [{
							required: true,
							message: '请输入活动地点'
						}]
					},
					acttime: {
						rules: [{
							required: true,
							message: '请选择活动时间'
						}]
					},
					teacherid: {
						rules: [{
							required: true,
							message: '请选择带队教师'
						}]
					},
					actstatus: {
						rules: [{
							required: true,
							message: '请选择活动状态'
						}]
					},
					createtime: {
						rules: []
					},
					terminalid: {
						rules: []
					},
					content: {
						rules: []
					},
				},
				url: {
					add: '/jxgz/veJwTeachact/add',
					edit: '/jxgz/veJwTeachact/edit',
				},
			}
		},
		created() {},
		methods: {
			add() {
				this.edit({})
			},
			edit(record) {
				if (record.teacherid != null) {
					record.teacherid += '';
				}
				if (record.bjid != null) {
					record.bjid += '';
				}
				if (record.actstatus != null) {
					record.actstatus += '';
				}
				this.form.resetFields()
				this.model = Object.assign({}, record)
				this.visible = true
				this.$nextTick(() => {
					this.form.setFieldsValue(
						pick(
							this.model,
							'actname',
							'bjid',
							'bjname',
							'personnum',
							'address',
							'acttime',
							'acttimeDate',
							'teacherid',
							'actstatus',
							'createtime',
							'terminalid',
							'content'
						)
					)
				})
			},
			close() {
				this.$emit('close')
				this.visible = false
			},
			handleOk() {
				const that = this
				// 触发表单验证
				this.form.validateFields((err, values) => {
					if (!err) {
						that.confirmLoading = true
						let httpurl = ''
						let method = ''
						if (!this.model.id) {
							httpurl += this.url.add
							method = 'post'
						} else {
							httpurl += this.url.edit
							method = 'put'
						}
						let formData = Object.assign(this.model, values)
						console.log('表单提交数据', formData)
						httpAction(httpurl, formData, method)
							.then((res) => {
								if (res.success) {
									that.$message.success(res.message)
									that.$emit('ok')
									that.close()
								} else {
									that.$message.warning(res.message)
								}
							})
							.finally(() => {
								that.confirmLoading = false
							})
					}
				})
			},
			handleCancel() {
				this.close()
			},
			popupCallback(row) {
				this.form.setFieldsValue(
					pick(
						row,
						'actname',
						'bjid',
						'bjname',
						'personnum',
						'address',
						'acttime',
						'acttimeDate',
						'teacherid',
						'actstatus',
						'createtime',
						'terminalid',
						'content'
					)
				)
			},
		},
	}
</script>

<style scoped>
	::v-deep .ant-form-item {
		display: flex;
	}

	::v-deep .ant-form-item-label {
		width: 150px;
		text-align: right;
	}

	::v-deep .ant-form-item-control {
		width: 400px !important;
	}
</style>