<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form :title="textMap[dialogStatus]" @ok="viewType==='create'?createData():updateData()"
			@cancel="handelCancel">
			<a-form-model ref="veStuLeaveDataForm" :rules="veStuLeaveRules" :model="veStuLeaveVo" labelAlign="right">
				<a-form-model-item label="请假类型" prop="type" required>
					<edu-data v-model="veStuLeaveVo.type" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
				</a-form-model-item>
				<a-form-model-item label="开始时间" prop="startTime" required>
					<DatePickByCN
						  v-model="veStuLeaveVo.startTime"
						  placeholder="请选择结束时间"  />
				</a-form-model-item>
				<a-form-model-item label="结束时间" prop="endTime" required>
					<DatePickByCN
						  v-model="veStuLeaveVo.endTime"
						  placeholder="请选择结束时间"  />
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
		props:{
			typeNodes:{
				type:Array,
				default:[]
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
					type: [{ message:'请选择请假类型', trigger: 'change', required: true }],
					startTime: [{ message:'请选择开始时间', trigger: 'change', required: true }],
					endTime: [{ message:'请选择结束时间', trigger: 'change', required: true }],
					content: [{ message:'请选择请假原因', trigger: 'change', required: true }]
				}
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
					type: '', // 请假类型;1事假、2病假、3丧假
					startTime: '', // 
					endTime: '', // 审核状态;0待审核 1通过2未通过
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