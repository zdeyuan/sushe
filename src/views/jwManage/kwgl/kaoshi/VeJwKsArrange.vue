<template>
	<a-form :form="form" style="margin-top:15px;">
		<a-form-item label="专业部-专业">
			<j-select-zyb style="width: 50%; margin-right: 10px;" placeholder="请选择专业部"
				v-decorator="['falid', validatorRules.falid]" :trigger-change="true" @change="zybChange"></j-select-zyb>
			<j-select-zy-by-zyb style="width: 40%" ref="zyByZyb" placeholder="请选择专业"
				v-decorator="['specid', validatorRules.specid]" :trigger-change="true"></j-select-zy-by-zyb>
		</a-form-item>


		<a-form-item label="学期">
			<j-select-xueqi v-decorator="['semid', validatorRules.semid]" placeholder="请选择学期" :trigger-change="true">
			</j-select-xueqi>
		</a-form-item>
		
		<a-form-item label="年级">
			 <j-select-grade v-decorator="['gradeid', validatorRules.gradeId]" :trigger-change="true" ></j-select-grade>
		</a-form-item>

		<a-form-item label="课程">
			<j-select-jiaoxue-kecheng :disabled="check" v-decorator="['kcid', validatorRules.kcid]" width="100%"
				placeholder="请选择课程" :trigger-change="true"></j-select-jiaoxue-kecheng>
		</a-form-item>

		<a-form-item label="教学班">
			<j-select-banji v-decorator="['bjid', validatorRules.bjid]" placeholder="请选择教学班"
				:trigger-change="true"></j-select-banji>
		</a-form-item>

		<a-form-item label="考试方式">
			<j-dict-select-tag :disabled="check" v-decorator="['ksfsm', validatorRules.ksfsm]" placeholder="请选择考试方式"
				dictCode="kwgl_exam_way" :trigger-change="true"></j-dict-select-tag>
		</a-form-item>

		<a-form-item label="考试性质">
			<j-dict-select-tag :disabled="check" v-decorator="['ksxzm', validatorRules.ksxzm]" placeholder="请选择考试性质"
				dictCode="kwgl_exam_properties" :trigger-change="true"></j-dict-select-tag>
		</a-form-item>

		<a-form-item label="考试形式">
			<j-dict-select-tag :disabled="check" v-decorator="['ksxsm', validatorRules.ksxsm]" placeholder="请选择考试形式"
				dictCode="kwgl_exam_form" :trigger-change="true"></j-dict-select-tag>
		</a-form-item>

		<a-form-item label="考试日期">
			<j-date :disabled="check" placeholder="请选择考试日期" v-decorator="['ksrq', validatorRules.ksrq]"
				:show-time="true" :trigger-change="true" date-format="YYYY-MM-DD" v-model="time" style="width: 100%" />
		</a-form-item>

		<a-form-item label="考试时间段">
			<j-select-kssjd :disabled="check" v-decorator="['kssjdid', validatorRules.kssjdid]" placeholder="请选择考试时间段"
				:trigger-change="true"></j-select-kssjd>
		</a-form-item>

		<a-form-item label="考试地点">
			<a-select style="display: inline-block;width: 30%;margin-right: 10px;"
				v-decorator="['campusid', validatorRules.campusid]" @change="campusSelect" placeholder="请选择校区">
				<a-select-option :value="undefined">请选择</a-select-option>
				<a-select-option v-for="item in xiaoquList" :key="item.id" :value="item.id">
					{{ item.xqmc }}
				</a-select-option>
			</a-select>
			<a-select style="display: inline-block;width: 30%;margin-right: 10px;"
				v-decorator="['jzid', validatorRules.jzid]" @change="buildingSelect" placeholder="请选择教学楼">
				<a-select-option :value="undefined">请选择</a-select-option>
				<a-select-option v-for="item in jzs" :key="item.id" :value="item.id">
					{{ item.jzwmc }}
				</a-select-option>
			</a-select>
			<a-select style="display: inline-block;width: 30% ;margin-right: 10px;"
				v-decorator="['jsid', validatorRules.jsid]" placeholder="请选择教室">
				<a-select-option :value="undefined">请选择</a-select-option>
				<a-select-option v-for="item in jss" :key="item.id" :value="item.id">
					{{ item.jsmc }}
				</a-select-option>
			</a-select>
		</a-form-item>

		<a-form-item label="最多参加人数">
			<a-input-number v-decorator="['number', validatorRules.number]" placeholder="最多参加人数" style="width: 100%" />
		</a-form-item>

		<a-form-item label="状态">
			<a-radio-group v-decorator="['status', validatorRules.status]">
				<a-radio :value="1"> 启用</a-radio>
				<a-radio :value="0"> 禁用</a-radio>
			</a-radio-group>
		</a-form-item>

		<div style="text-align: center;">
			<a-button @click="handleCancel" type="danger"  style="margin-right: 10px;">清空安排</a-button>
			<a-button @click="handleOk" type="primary"  style="margin-right: 10px;">安排考试</a-button>
		</div>
	</a-form>


</template>

<script>
	import {
		axios
	} from "@/utils/request"
	import {
		httpAction,
		getActionCampusById
	} from '@/api/common/manage'
	import pick from 'lodash.pick'
	import {
		validateDuplicateValue
	} from '@/utils/util'
	import JDictSelectTag from '@/components/dict/JDictSelectTag'
	import {
		getAction
	} from '@/api/common/manage'
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import {
		EduUtils
	} from '@/mixins/EduUtils'
	import JSelectKssjd from '@/components/kwglbiz/JSelectKssjd'
	import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	export default {
		name: 'VeJwKaoshiModal',
		mixins: [EduUtils],
		components: {
			JSelectBanji,
			JSelectGrade,
			JSelectXueqi,
			JSelectZyByZyb,
			JSelectZyb,
			JSelectJiaoxueKecheng,
			JSelectKssjd
		},
		data() {
			return {
				form: this.$form.createForm(this),
				// eduurl: 'http://159.75.200.65:4010',
				title: '操作',
				flag: true,
				jzs: {},
				jss: {},
				specs: {},
				xiaoquList: {},
				width: 800,
				visible: false,
				model: {},
				gradeList:[],
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 5
					}
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 16
					}
				},
				confirmLoading: false,
				validatorRules: {
					//   name: { rules: [{ required: true, message: '请输入考试名称!' }] },
					falid: {
						rules: [{
							required: true,
							message: '请选择专业组!'
						}]
					},
					gradeid: {
						rules: [{
							required: true,
							message: '请选择年级!'
						}]
					},
					specid: {
						rules: [{
							required: true,
							message: '请选择专业!'
						}]
					},
					kcid: {
						rules: [{
							required: true,
							message: '请选择课程!'
						}]
					},
					semid: {
						rules: [{
							required: true,
							message: '请选择学期!'
						}]
					},
					ksfsm: {
						rules: [{
							required: true,
							message: '请选择考试方式!'
						}]
					},
					ksxzm: {
						rules: [{
							required: true,
							message: '请选择考试性质!'
						}]
					},
					ksxsm: {
						rules: [{
							required: true,
							message: '请选择考试形式!'
						}]
					},
					bjid: {
						rules: [{
							required: true,
							message: '请选择班级!'
						}]
					},
					ksrq: {
						rules: [{
							required: true,
							message: '请选择考试日期'
						}]
					},
					kssjdid: {
						rules: [{
							required: true,
							message: '请选择考试时间段!'
						}]
					},
					campusid: {
						rules: [{
							required: true,
							message: '请选择校区!'
						}]
					},
					jzid: {
						rules: [{
							required: true,
							message: '请选择教学楼!'
						}]
					},
					jsid: {
						rules: [{
							required: true,
							message: '请选择考试教室!'
						}]
					},
					number: {
						rules: [{
							required: true,
							message: '请填写最多参加人数!'
						}]
					},
					// ispublish: { rules: [] },
					// status: { rules: [{ required: true, message: '请输入状态（1=启用，0=禁用）!' }] },
					// createuserid: { rules: [{ required: true, message: '请输入创建人ID!' }] },
					// createtime: { rules: [{ required: true, message: '请输入创建时间!' }] },
					// terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
					kcmc: {
						rules: []
					},
					cjstatus: {
						rules: []
					}
				},
				url: {
					add: '/kwgl/veJwKaoshi/add',
					edit: '/kwgl/veJwKaoshi/edit',
					getBuildingList: '/jxzy/jwJianzhu/list',
					getClassroomList: '/jxzy/jwJiaoshi/list'
				}
			}
		},
		created() {
			this.getDepartment()
			this.getXiaoqu()
			// this.getGrade()
		},
		methods: {
			// 获取所属年级
			getGrade(){
				axios({
				   url: 'enroll/divideClassMng/getGrade',
				   method: 'post',
				   params: {},
				 }).then((res)=>{
					if(res.code == '200'){
						for( var i = 0 ;  i < res.result.length ; i++ ){
							this.gradeList.push({
								label:res.result[i].njmc,
								value:res.result[i].id
							})
						}
					}else{
						this.$message.warning('所属年级信息获取失败')
					}
				})
			},
			zybChange(code) {
				this.form.setFieldsValue(
					pick({
							specid: ''
						},
						'specid'))

				if (this.$refs.zyByZyb != null) {
					this.$refs.zyByZyb.initDictData(code)
				}
			},
			add() {
				this.edit({})
			},
			edit(record) {
				// record.ksfsm = record.ksfsm == null ? null : record.ksfsm + ''
				// record.ksxzm = record.ksxzm == null ? null : record.ksxzm + ''

				// record.falid =  record.falid == null ? null : record.falid + ''
				// record.specid =  record.specid == null ? null : record.specid + ''

				record.semid = record.semid == null ? null : record.semid + ''

				record.kcid = record.kcid == null ? null : record.kcid + ''
				record.kssjdid = record.kssjdid == null ? null : record.kssjdid + ''

				record.bjid = record.bjid == null ? null : record.bjid + ''


				if (record.campusid != null) {
					this.campusSelect(record.campusid)
				}
				if (record.jzid != null) {
					this.buildingSelect(record.jzid)
				}

				this.form.resetFields()
				this.model = Object.assign({}, record)
				this.visible = true
				this.$nextTick(() => {
					if (this.$refs.zyByZyb != null && record.falid != '' && record.falid != null) {
						this.$refs.zyByZyb.initDictData(record.falid)
					}
					this.form.setFieldsValue(
						pick(
							this.model,
							'name',
							'falid',
							'specid',
							'kcid',
							'semid',
							'ksfsm',
							'ksxzm',
							'ksxsm',
							'ksrqsj',
							'ksrq',
							'kssjdid',
							'campusid',
							'jzid',
							'jsid',
							'bjid',
							'students',
							'number',
							'ispublish',
							'status',
							'createuserid',
							'createtime',
							'terminalid',
							'kcmc',
							'cjstatus'
						)
					)
				})
			},
			close() {
				this.$emit('close')
				this.visible = false
			},
			getXiaoqu() {
				getActionCampusById().then((res) => {
					console.log(res)
					if (res.success) {
						this.xiaoquList = res.result
					}
				})
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
									this.form.resetFields()
									that.$message.success(res.message)
									// 'that.close()
									// that.$emit('ok')'
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
				// this.close()
				this.form.resetFields()
			},
			popupCallback(row) {
				this.form.setFieldsValue(
					pick(
						row,
						'name',
						'kcid',
						'ksfsm',
						'ksxzm',
						'ksxsm',
						'ksrqsj',
						'ksrq',
						'kssjdid',
						'campusid',
						'jzid',
						'jsid',
						'number',
						'ispublish',
						'status',
						'createuserid',
						'createtime',
						'terminalid',
						'kcmc',
						'cjstatus'
					)
				)
			},
			//
			// getDepartment() {
			//   var getDeparementUrl = window._CONFIG['domianBaseURL'] + '/common/veCommon/queryFacultyList'
			//   getAction(getDeparementUrl)
			//     .then((res) => {
			//       if (res.success) {
			//         this.deps = res.result
			//         console.log('------------------------')
			//         console.log(this.deps)
			//       } else {
			//         this.$message.warning(res.message)
			//       }
			//     })
			//     .finally(() => {
			//       this.loading = false
			//     })
			// },
			//
			// depSelect(value) {
			//   console.log(value)
			//   var getSpecUrl = this.eduurl + '/common/veCommon/querySpecialtyListByFalId'
			//   getAction(getSpecUrl, { id: this.id, falId: value })
			//     .then((res) => {
			//       if (res.success) {
			//         this.specs = res.result
			//         console.log(this.specs)
			//       } else {
			//         this.$message.warning(res.message)
			//       }
			//     })
			//     .finally(() => {
			//       this.loading = false
			//     })
			// },

			campusSelect(value) {
				console.log(value)
				var that = this
				getAction(this.url.getBuildingList, {
						campusid: value,
						pageSize: 9999
					})
					.then((res) => {
						if (res.success) {
							this.jzs = res.result.records
							console.log(this.jzs)
						} else {
							that.$message.warning(res.message)
						}
					})
					.finally(() => {
						that.loading = false
					})
			},

			buildingSelect(value) {
				console.log(value)
				var that = this
				getAction(this.url.getClassroomList, {
						jzid: value,
						pageSize: 9999
					})
					.then((res) => {
						if (res.success) {
							this.jss = res.result.records
						} else {
							that.$message.warning(res.message)
						}
					})
					.finally(() => {
						that.loading = false
					})
			}
		}
	}
</script>

<style lang="less" scoped>
	::v-deep .ant-select {
		width: 23% !important;
	}
	
	::v-deep .ant-row{
		display: flex !important;
	}
	
	::v-deep .ant-form-item-label{
		width: 15%;
		text-align: right;
	}
	
	::v-deep .ant-form-item-control-wrapper{
		width: 80%;
	}
	
	::v-deep .left{
		width: 210px !important;
	}
	::v-deep .ant-select-selection{
		width: 200px;
	}

	.item {
		display: flex;
		margin-bottom: 20px;
		.red {
			color: red;
		}

		.label {
			height: 40px;
			line-height: 40px;
			width: 10%;
			text-align: right;
			margin-right: 20px;
		}

		.nr {
			display: flex;
			width: 60%;
		}
	}
</style>