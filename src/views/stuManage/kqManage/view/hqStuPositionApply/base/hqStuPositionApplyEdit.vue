<template>
	<div class="edit_form">
		<!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
		<edu-form :title="textMap[dialogStatus]" @ok="dialogStatus==='create'?createData():updateData()"
			@cancel="handelCancel">
			<a-form-model ref="hqStuPositionApplyDataForm" :rules="hqStuPositionApplyRules"
				:model="hqStuPositionApplyVo" labelAlign="right">
				<a-form-model-item label="学生id" prop="stuId" required>
					<a-input v-model="hqStuPositionApplyVo.stuId" :maxLength="0" placeholder="请输入学生id" />
				</a-form-model-item>
				<a-form-model-item label="职位id" prop="positionId" required>
					<a-input v-model="hqStuPositionApplyVo.positionId" :maxLength="0" placeholder="请输入职位id" />
				</a-form-model-item>
				<a-form-model-item label="申请说明" prop="content" required>
					<a-input v-model="hqStuPositionApplyVo.content" :maxLength="65535" placeholder="请输入申请说明" />
				</a-form-model-item>
				<a-form-model-item label="申请状态" prop="status" required>
					<edu-data v-model="hqStuPositionApplyVo.status" stype="select" :datas="statusItems" />
				</a-form-model-item>
				<a-form-model-item label="申请时间" prop="applyTime" required>
					<DatePickByCN
						  v-model="hqStuPositionApplyVo.applyTime"
						  placeholder="请选择申请时间"  />
				</a-form-model-item>
				<a-form-model-item label="审核时间" prop="auditTime" required>
					<DatePickByCN
						  v-model="hqStuPositionApplyVo.auditTime"
						  placeholder="请选择审核时间"  />
				</a-form-model-item>
				<a-form-model-item label="审核人id" prop="auditUserId" required>
					<a-input v-model="hqStuPositionApplyVo.auditUserId" :maxLength="32" placeholder="请输入审核人id" />
				</a-form-model-item>
				<a-form-model-item label="" prop="auditUserName" required>
					<a-input v-model="hqStuPositionApplyVo.auditUserName" :maxLength="255" placeholder="请输入" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import hqStuPositionApplyApi from "../../../api/hqStuPositionApplyApi";

	export default {
		components: {},
		data() {
			const data = {
				hqStuPositionApplyVo: this.resethqStuPositionApplyVo(),
				textMap: {
					update: "编辑-学生职位申请表",
					create: "新增-学生职位申请表"
				},
				dialogStatus: 'create',
				statusItems: [{
						label: '待审核',
						value: 0
					},
					{
						label: '审核通过',
						value: 1
					}, {
						label: '审核不通过',
						value: 2
					}
				],
				hqStuPositionApplyRules: {}
			};
			return data;
		},
		mounted() {},
		methods: {
			/**
			 * @msg: 重置数据
			 */
			resethqStuPositionApplyVo() {
				return {
					stuId: '', // 学生id
					positionId: '', // 职位id
					content: '', // 申请说明
					status: '', // 申请状态;0待审核1审核通过2不通过
					applyTime: '', // 申请时间
					auditTime: '', // 审核时间
					auditUserId: '', // 审核人id
					auditUserName: '', // 
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = "create"
				this.hqStuPositionApplyVo = this.resethqStuPositionApplyVo();
				this.$nextTick(() => {
					this.$refs.hqStuPositionApplyDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				hqStuPositionApplyApi.get(row.id).then((res) => {
					this.hqStuPositionApplyVo = res.result
				});
				this.dialogStatus = "update"
				this.$nextTick(() => {
					this.$refs.hqStuPositionApplyDataForm.clearValidate();
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
				const tempData = Object.assign({}, this.hqStuPositionApplyVo);
				return tempData
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.hqStuPositionApplyDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						hqStuPositionApplyApi.add(subData).then(res => {
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
				this.$refs.hqStuPositionApplyDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						hqStuPositionApplyApi.update(subData).then(() => {
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