<template>
	<div>
		<a-modal :title="title" :width="width" placement="right" okText="确定" cancel-text="返回" @cancel="handleCancel"
			@ok="handleOk" :visible="visible$1">
			<a-form-model ref="sbform" :model="form" :label-col="{ span:8 }" :wrapper-col="{ span:16 }">
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="学期" prop="semid" required
							:rules="[{ required: true, message: '请选择学期' }]">
							<a-select style="width: 100%" v-model="form.semid" placeholder="请选择学期"
								@change="onSemiChange" :disabled="isDisabled">
								<a-select-option v-for="(item,i) in semesterData" :key="i" :value="item.id"
									:data="item">{{item.xqmc}}</a-select-option>
							</a-select>
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="开始选课时间" prop="starttime"
							:rules="[{ required: true, message: '请选择开始选课时间' }]">
							<DatePickByCN
							   v-model="form.starttime"
							   :disabled="isDisabled"
							  placeholder="请选择开始选课时间"  />
						</a-form-model-item>
					</a-col>

					<a-col :span="12">
						<a-form-model-item label="停止选课时间" prop="endtime"
							:rules="[{ required: true, message: '请选择停止选课时间' }]">
							<DatePickByCN
							   v-model="form.endtime"
							   :disabled="isDisabled"
							  placeholder="请选择停止选课时间"  />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="排序码" prop="ordernum" :rules="[{ required: true, message: '请输入排序码' }]">
							<a-input-number style="width: 100%" :min="0" v-model="form.ordernum" placeholder="请输入排序码"
								:disabled="isDisabled" />
						</a-form-model-item>
					</a-col>

					<a-col :span="12">
						<a-form-model-item label="是否有效" prop="ordernum"
							:rules="[{ required: true, message: '请选择是否有效' }]">
							<a-switch :checked="form.status == 1" @change="onStatusChange" :disabled="isDisabled" />
						</a-form-model-item>
					</a-col>

					<a-col :span="24">
						<a-form-model-item label="描述" :label-col="{ span: 4 }" :wrapper-col="{ span: 17 }">
							<a-input v-model="form.remark" :max-length="100" placeholder="请输入描述"
								:disabled="isDisabled" />
						</a-form-model-item>
					</a-col>
				</a-row>
			</a-form-model>
		</a-modal>
	</div>
</template>
<script>
	import {
		apiScheduleClassChoiceXksj
	} from '@/api/schedule/index'
	import {
		childSycId
	} from '@/config'
	const initData = {
		// createtime: '',
		// createuserid: '',
		// createusername: '',
		// deletetime: '',
		// id: 0,
		// isdelete: 0,
		endtime: '',
		ordernum: 0,
		remark: '',
		semid: undefined,
		semname: '',
		starttime: '',
		status: 0,
		// terminalid: 0,
		// updatetime: '',
	}

	const titles = ['新增', '编辑', '查看']
	export default {
		name: 'XKSJAdd',
		props: {
			visible: {
				type: Boolean
			},
			data: {
				type: Object,
				default () {
					return {}
				},
			},
			mode: {
				type: Number,
				default: 1
			}, // 1 新增/ 2 编辑/ 3 查看
		},
		data() {
			return {
				width: 800,
				semesterData: [], // 所有学期
				form: {
					...initData
				},
			}
		},
		created() {
			this.getSemesterList()
		},
		watch: {
			visible(n) {
				if (n) {
					if (this.mode === 1) {
						this.form = {
							...initData
						}
					}
					if (this.mode === 2 || this.mode === 3) {
						this.form = {
							...this.data
						}
					}
				}
			},
		},
		computed: {
			visible$1: {
				get() {
					return this.visible
				},
				set(val) {
					this.$emit('update:visible', val)
				},
			},
			title() {
				return titles[this.mode - 1]
			},
			isDisabled() {
				return this.mode === 3
			}
		},
		components: {},
		methods: {
			onSemiChange(val, vmOpt) {
				this.form.semname = vmOpt.data.attrs.data.xqmc
			},
			onStatusChange(val) {
				this.form.status = val ? 1 : 0
			},
			handleCancel() {
				this.visible$1 = false
			},
			handleOk() {
				console.log(this.$refs.sbform,'this.$refs.sbform?????')
				this.$refs.sbform.validate().then(() => {
						if (this.mode === 1) {
							this.addData().then(() => {
								this.visible$1 = false
								this.$emit('success-callback')
							})
						} else if (this.mode === 2) {
							this.updateData().then(() => {
								this.visible$1 = false
								this.$emit('success-callback')
							})
						} else if (this.mode === 3) {
							this.visible$1 = false
						}
					})
					.catch(error => {
						console.log("校验失败", error);
					});
			},

			// 拉取所有学期
			getSemesterList() {
				const params = {
					id: childSycId
				}
				apiScheduleClassChoiceXksj.getSemesterList(params).then((res) => {
					if (res.success) {
						this.semesterData = res.result || []
					}
				})
			},
			updateData() {
				const params = {
					...this.form
				}
				return apiScheduleClassChoiceXksj.update(params)
			},
			addData() {
				const params = {
					...this.form
				}
				return apiScheduleClassChoiceXksj.create(params)
			},
		},
	}
</script>
<style scoped>
</style>