<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form :title="textMap[dialogStatus]" @ok="viewType==='create'?createData():updateData()"
			@cancel="handelCancel">
			<a-form-model ref="veStuLeaveDataForm" :rules="veStuLeaveRules" :model="veStuLeaveVo" labelAlign="right">
				<a-form-model-item label="学生id" prop="stuId" required>
					<a-input v-model="veStuLeaveVo.stuId" :maxLength="0" placeholder="请输入学生id" />
				</a-form-model-item>
				<a-form-model-item label="学生姓名" prop="name" required>
					<a-input v-model="veStuLeaveVo.name" :maxLength="30" placeholder="请输入学生姓名" />
				</a-form-model-item>
				<a-form-model-item label="学生学号" prop="code" required>
					<a-input v-model="veStuLeaveVo.code" :maxLength="30" placeholder="请输入学生学号" />
				</a-form-model-item>
				<a-form-model-item label="专业id" prop="specId" required>
					<a-input v-model="veStuLeaveVo.specId" :maxLength="0" placeholder="请输入专业id" />
				</a-form-model-item>
				<a-form-model-item label="班级id" prop="bjId" required>
					<a-input v-model="veStuLeaveVo.bjId" :maxLength="0" placeholder="请输入班级id" />
				</a-form-model-item>
				<a-form-model-item label="请假类型;1事假、2病假、3丧假" prop="type" required>
					<a-input v-model="veStuLeaveVo.type" :maxLength="0" placeholder="请输入请假类型;1事假、2病假、3丧假" />
				</a-form-model-item>
				<a-form-model-item label="开始时间" prop="startTime" required>
					<a-date-picker v-model="veStuLeaveVo.startTime" valueFormat="YYYY-MM-DD" />
				</a-form-model-item>
				<a-form-model-item label="结束时间" prop="endTime" required>
					<a-date-picker v-model="veStuLeaveVo.endTime" valueFormat="YYYY-MM-DD" />
				</a-form-model-item>
				<a-form-model-item label="申请时间" prop="applyTime" required>
					<a-date-picker v-model="veStuLeaveVo.applyTime" valueFormat="YYYY-MM-DD" />
				</a-form-model-item>
				<a-form-model-item label="审核人" prop="auditUserId" required>
					<a-input v-model="veStuLeaveVo.auditUserId" :maxLength="32" placeholder="请输入审核人" />
				</a-form-model-item>
				<a-form-model-item label="" prop="auditUserName" required>
					<a-input v-model="veStuLeaveVo.auditUserName" :maxLength="255" placeholder="请输入" />
				</a-form-model-item>
				<a-form-model-item label="审核状态;0待审核 1通过2未通过" prop="auditStatus" required>
					<a-input v-model="veStuLeaveVo.auditStatus" :maxLength="0" placeholder="请输入审核状态;0待审核 1通过2未通过" />
				</a-form-model-item>
				<a-form-model-item label="" prop="auditTime" required>
					<a-date-picker v-model="veStuLeaveVo.auditTime" valueFormat="YYYY-MM-DD" />
				</a-form-model-item>
				<a-form-model-item label="未通过原因" prop="auditReason" required>
					<a-input v-model="veStuLeaveVo.auditReason" :maxLength="65535" placeholder="请输入未通过原因" />
				</a-form-model-item>
				<a-form-model-item label="请假原因" prop="content" required>
					<a-input v-model="veStuLeaveVo.content" :maxLength="65535" placeholder="请输入请假原因" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veStuLeaveApi from "../../api/veStuLeaveApi";

	export default {
		components: {},
		data() {
			const data = {
				veStuLeaveVo: this.resetveStuLeaveVo(),
				textMap: {
					update: "编辑-请假信息表",
					create: "新增-请假信息表"
				},
				dialogStatus: 'create',
				veStuLeaveRules: {}
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
			doUpdate(row) {
				veStuLeaveApi.get(row.id).then((res) => {
					this.veStuLeaveVo = res.result
				});
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
			createData() {
				this.$refs.veStuLeaveDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						veStuLeaveApi.add(subData).then(res => {
							this.$notification.success({
								message: "数据新增成功",
								description: '新增了一条数据'
							});
							this.$emit('onOk');
						});
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

</style>