<template>
	<div class="edit_form">
		<!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
		<edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()"
			@cancel="handelCancel">
			<a-form-model ref="hqStuPositionDataForm" :rules="hqStuPositionRules" :model="hqStuPositionVo"
				labelAlign="right">
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="职位名称" prop="title" required>
							<a-input v-model="hqStuPositionVo.title" :maxLength="20" placeholder="请输入职位名称" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="职位编号" prop="code" required>
							<a-input v-model="hqStuPositionVo.code" :maxLength="20" placeholder="请输入职位编号" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="学期" prop="semesterId" required>
							<termList v-model="hqStuPositionVo.semesterId" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="发布部门" prop="applyDept">
							<deptTree ref="deptTree"></deptTree>
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="薪资" prop="money" required>
							<a-input-number v-model="hqStuPositionVo.money" :min="0" placeholder="请输入薪资"
								style="width:200px" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="需要人数" prop="num" required>
							<a-input-number v-model="hqStuPositionVo.num" :min="0" placeholder="请输入需要人数"
								style="width:200px" />
						</a-form-model-item>
					</a-col>
				</a-row>

				<a-form-model-item label="职位要求描述" prop="requirement" required>
					<a-textarea v-model="hqStuPositionVo.requirement" :maxLength="300" placeholder="请输入职位要求描述"
						:rows="4" />
				</a-form-model-item>
				<a-form-model-item label="工作内容描述" prop="content" required>
					<a-textarea v-model="hqStuPositionVo.content" :maxLength="300" placeholder="请输入工作内容描述" :rows="4" />
				</a-form-model-item>

				<a-row>
					<a-col :span="12">
						<a-form-model-item label="是否需要面试" prop="isView" required>
							<edu-data v-model="hqStuPositionVo.isView" stype="radio" code="shifou" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="发布状态" prop="status" required>
							<edu-data v-model="hqStuPositionVo.status" stype="radio" code="shifou" />
						</a-form-model-item>
					</a-col>
				</a-row>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import hqStuPositionApi from '../../api/hqStuPositionApi';
	import termList from '@/components/kqManageComponent/termList';
	import deptTree from '@/components/kqManageComponent/deptTree';

	export default {
		components: {
			termList,
			deptTree
		},
		data() {
			let validateDept = (rule, value, callback) => {
				const data = this.$refs.deptTree.getValue();
				if (data && data.length > 0) {
					callback();
				} else {
					callback(new Error('请选择'));
				}
			};
			const data = {
				hqStuPositionVo: this.resethqStuPositionVo(),
				textMap: {
					update: '编辑-职位信息',
					create: '新增-职位信息'
				},
				dialogStatus: 'create',
				hqStuPositionRules: {
					title: [{
						required: true,
						message: '职位名称必填',
						trigger: 'change',
					}],
					code: [{
						required: true,
						message: '职位编号必填',
						trigger: 'change',
					}],
					semesterId: [{
						required: true,
						message: '学期必填',
						trigger: 'change',
					}],
					money: [{
						required: true,
						message: '薪资必填',
						trigger: 'change',
					}],
					num: [{
						required: true,
						message: '需要人数必填',
						trigger: 'change',
					}],
					requirement: [{
						required: true,
						message: '职位要求描述必填',
						trigger: 'change',
					}],
					content: [{
						required: true,
						message: '工作内容描述必填',
						trigger: 'change',
					}],
				}
			};
			return data;
		},
		mounted() {},
		methods: {
			/**
			 * @msg: 重置数据
			 */
			resethqStuPositionVo() {
				return {
					title: '', // 职位名称
					code: '', // 职位编号，同一终端唯一
					num: '', // 需要人数
					hasNum: '', // 已批人数
					semesterId: '', // 学期id
					departmentId: '', // 发布部门id
					money: '', // 薪资
					requirement: '', // 职位要求描述
					content: '', // 工作内容描述
					isView: 0, // 是否需要面试;1是0否
					status: 1 // 发布状态;1发布0未发布
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = 'create';
				this.hqStuPositionVo = this.resethqStuPositionVo();
				this.$nextTick(() => {
					this.$refs.hqStuPositionDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				hqStuPositionApi.get(row.id).then(res => {
					this.hqStuPositionVo = res.result;
				});
				this.dialogStatus = 'update';
				this.$nextTick(() => {
					this.$refs.hqStuPositionDataForm.clearValidate();
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
				const tempData = Object.assign({}, this.hqStuPositionVo);

				const deptDpt = this.$refs.deptTree.getValueData();
				if (deptDpt && deptDpt.length > 0) {
					tempData.departmentId = deptDpt[0].id;
					//  tempData.applyDeptName = deptDpt[0].value;
				}

				return tempData;
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.hqStuPositionDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						hqStuPositionApi.add(subData).then(res => {
							this.$notification.success({
								message: '数据新增成功',
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
				this.$refs.hqStuPositionDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						hqStuPositionApi.update(subData).then(() => {
							this.$notification.success({
								message: '数据修改成功',
								description: '修改了一条数据'
							});
							this.$emit('onOk');
						});
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped></style>