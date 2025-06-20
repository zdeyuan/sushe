<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()"
			@cancel="handelCancel">
			<a-form-model ref="veHqAnbaoDataForm" :rules="veHqAnbaoRules" :model="veHqAnbaoVo" labelAlign="right">
				<a-form-model-item label="记录时间" prop="jlTime" required>
					<DatePickByCN
					   v-model="veHqAnbaoVo.jlTime"
					  placeholder="请选择记录时间"  />
				</a-form-model-item>
				<a-form-model-item label="记录人姓名" prop="hqUserId" required>
					<hqUserSelect width="300px" v-model="veHqAnbaoVo.hqUserId" hqUserType="3"></hqUserSelect>
				</a-form-model-item>
				<a-form-model-item label="安保状态" prop="jllx">
					<edu-data v-model="veHqAnbaoVo.jllx" stype="radio" code="anbaozStatus" />
				</a-form-model-item>
				<a-form-model-item label="详细说明" prop="remark">
					<a-textarea v-model="veHqAnbaoVo.remark" :maxLength="300" placeholder="请输入详细说明" :rows="4" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veHqAnbaoApi from '@/views/logistics/base/api/veHqAnbaoApi';
	import hqUserSelect from '@/components/kqManageComponent/hqUserSelect';

	export default {
		components: {
			hqUserSelect
		},
		data() {
			const data = {
				veHqAnbaoVo: this.resetveHqAnbaoVo(),
				textMap: {
					update: '安保记录',
					create: '安保记录'
				},
				dialogStatus: 'create',
				veHqAnbaoRules: {
					jlTime: [{
						required: true,
						message: '请选择记录时间'
					}],
					hqUserId: [{
						required: true,
						message: '请选择记录人姓名'
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
			resetveHqAnbaoVo() {
				return {
					jlTime: this.$date.format('YYYY-MM-DD'), // 记录时间
					hqUserId: '', // 记录人姓名
					jllx: 1, // 数据字典：1=正常
					remark: '' // 详细说明
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.viewType = 'create';
				this.veHqAnbaoVo = this.resetveHqAnbaoVo();
				this.$nextTick(() => {
					this.$refs.veHqAnbaoDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				veHqAnbaoApi.get(row.id).then(res => {
					this.veHqAnbaoVo = res.result;
				});
				this.viewType = 'update';
				this.$nextTick(() => {
					this.$refs.veHqAnbaoDataForm.clearValidate();
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
				const tempData = Object.assign({}, this.veHqAnbaoVo);
				return tempData;
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.veHqAnbaoDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						veHqAnbaoApi.add(subData).then(res => {
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
				this.$refs.veHqAnbaoDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						veHqAnbaoApi.update(subData).then(() => {
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