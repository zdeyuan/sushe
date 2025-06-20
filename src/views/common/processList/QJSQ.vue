<template>
	<a-card>
		<!-- 编辑页 -->
		<div class="noticeInfo">
			<div class="header">
				学生请假流程审批
			</div>
			<div class="content" style="padding: 20px;">
				<a-form-model ref="veStuLeaveDataForm" :rules="veStuLeaveRules" :model="veStuLeaveVo"
					labelAlign="right">
					<a-form-model-item label="请假类型" prop="type" required>
						<edu-data :disabled='buke' v-model="veStuLeaveVo.type" stype="select" :datas="typeNodes" textKey="title"
							dtype="datas" />
					</a-form-model-item>
					<a-form-model-item label="开始时间" prop="startTime" required>
						<a-date-picker :disabled='buke' v-model="veStuLeaveVo.start_time" valueFormat="YYYY-MM-DD" />
					</a-form-model-item>
					<a-form-model-item label="结束时间" prop="endTime" required>
						<a-date-picker :disabled='buke' v-model="veStuLeaveVo.end_time" valueFormat="YYYY-MM-DD" />
					</a-form-model-item>
					<a-form-model-item label="请假原因" prop="content" required>
						<a-input :disabled='buke' v-model="veStuLeaveVo.content" :maxLength="65535" placeholder="请输入请假原因" />
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</a-card>
</template>

<script>
	import veStuLeaveApi from "@/views/stuManage/kqManage/api/veStuLeaveApi";

	export default {
		components: {},
		props: {
			buke: {
				type: Boolean,
				default: false
			}
		},
		data() {
			const data = {
				veStuLeaveVo: this.resetveStuLeaveVo(),
				textMap: {
					update: "编辑-请假信息表",
					create: "新增-请假信息表"
				},
				dialogStatus: 'create',
				veStuLeaveRules: {
					type: [{
						message: '请选择请假类型',
						trigger: 'change',
						required: true
					}],
					startTime: [{
						message: '请选择开始时间',
						trigger: 'change',
						required: true
					}],
					endTime: [{
						message: '请选择结束时间',
						trigger: 'change',
						required: true
					}],
					content: [{
						message: '请选择请假原因',
						trigger: 'change',
						required: true
					}]
				},
				typeNodes: [{
					id: 1,
					title: '事假'
				}, {
					id: 2,
					title: '病假'
				}, {
					id: 3,
					title: '丧假'
				}]
			};
			return data;
		},
		mounted() {},
		methods: {
			/**
			 * @msg: 重置数据
			 */
			resetveStuLeaveVo() {
				return {
					stuId: '', // 学生id
					name: '', // 学生姓名
					code: '', // 学生学号
					specId: '', // 专业id
					bjId: '', // 班级id
					type: '', // 请假类型;1事假、2病假、3丧假
					startTime: '', // 开始时间
					endTime: '', // 结束时间
					applyTime: '', // 申请时间
					auditUserId: '', // 审核人
					auditUserName: '', // 
					auditStatus: '', // 审核状态;0待审核 1通过2未通过
					auditTime: '', // 
					auditReason: '', // 未通过原因
					content: '', // 请假原因
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.viewType = "create"
				this.veStuLeaveVo = this.resetveStuLeaveVo();
				this.$nextTick(() => {
					this.$refs.veStuLeaveDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			showup(row) {
				this.veStuLeaveVo = row
				// veStuLeaveApi.get(row.id).then((res) => {
				// 	this.veStuLeaveVo = res.result
				// });
				this.viewType = "update"
				this.$nextTick(() => {
					this.$refs.veStuLeaveDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			},
			/**
			 * @msg: 获取提交的数据 新增和 修改复用
			 */
			getSubData(isUpdate) {
				const tempData = Object.assign({}, this.veStuLeaveVo);
				return tempData
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData(data) {
				this.$refs.veStuLeaveDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							data.no = true
						}
						data.no == false
						data.subData = subData
						// veStuLeaveApi.add(subData).then(res => {
						// 	this.$notification.success({
						// 		message: "数据新增成功",
						// 		description: '新增了一条数据'
						// 	});
						// 	this.$emit('onOk');
						// });
					}
				});
			},
			/**
			 * @msg: 调用Api修改数据
			 */
			updateData() {
				this.$refs.veStuLeaveDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						veStuLeaveApi.update(subData).then(() => {
							this.$notification.success({
								message: "数据修改成功",
								description: "修改了一条数据"
							});
							this.$emit('onOk');
						});
					}
				});
			},
		}
	};
</script>
<style lang="less" scoped>
	.ant-row {
		display: flex;
	}

	.countBox {
		padding: 20px;
		border: 1px solid #ccc;
	}
</style>