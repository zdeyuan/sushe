<template>
	<div class="edit_form">
		<!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
		<edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()"
			@cancel="handelCancel">
			<a-form-model ref="veStuHealthReportDataForm" :rules="veStuHealthReportRules" :model="veStuHealthReportVo"
				labelAlign="right">
				<a-form-model-item label="选择学生" prop="userIds" v-if="dialogStatus === 'create'">
					<stuSelect ref="stuSelect" :check="true"></stuSelect>
				</a-form-model-item>
				<a-form-model-item label="学生" v-else>
					{{ xm }}
				</a-form-model-item>
				<a-form-model-item label="开始时间" prop="startTime" required>
					<DatePickByCN
					      v-model="veStuHealthReportVo.startTime"
					      placeholder="请选择开始时间"
					    />
				</a-form-model-item>
				<a-form-model-item label="结束时间" prop="endTime" required>
					<DatePickByCN
					      v-model="veStuHealthReportVo.endTime"
					      placeholder="请选择结束时间"
					    />
				</a-form-model-item>
				<a-form-model-item label="健康体质得分" prop="score" required>
					<a-input-number v-model="veStuHealthReportVo.score" :min="0" :max="1000" placeholder="请输入健康体质得分"
						style="width:300px" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veStuHealthReportApi from '../../api/veStuHealthReportApi';
	import stuSelect from '@/components/stuSelect';
	export default {
		components: {
			stuSelect
		},
		data() {
			let validateUserZy = (rule, value, callback) => {
				const data = this.$refs.stuSelect.getValue();
				if (data && data.length > 0) {
					callback();
				} else {
					callback(new Error('请选择'));
				}
			};
			const data = {
				veStuHealthReportVo: this.resetveStuHealthReportVo(),
				textMap: {
					update: '编辑-体质健康记录',
					create: '新增-体质健康记录'
				},
				xm: '',
				dialogStatus: 'create',
				veStuHealthReportRules: {
					userIds: [{
						validator: validateUserZy,
						trigger: 'change',
						required: true
					}],
					startTime: [{
						required: true,
						message: '请选择开始时间',
						trigger: 'change',
					}],
					endTime: [{
						required: true,
						message: '请选择结束时间',
						trigger: 'change',
					}],
					score: [{
						required: true,
						message: '请输入体质得分',
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
			resetveStuHealthReportVo() {
				return {
					stuId: '', // 学生Id
					startTime: '', // 开始时间
					endTime: '', // 结束时间
					score: '' // 健康体质得分
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = 'create';
				this.veStuHealthReportVo = this.resetveStuHealthReportVo();
				this.$nextTick(() => {
					this.$refs.veStuHealthReportDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				this.xm = row.xm;
				veStuHealthReportApi.get(row.id).then(res => {
					this.veStuHealthReportVo = res.result;
				});
				this.dialogStatus = 'update';
				this.$nextTick(() => {
					this.$refs.veStuHealthReportDataForm.clearValidate();
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
				const tempData = Object.assign({}, this.veStuHealthReportVo);
				if (this.$refs.stuSelect) {
					tempData.userIds = this.$refs.stuSelect.getValue() || [];
				}
				return tempData;
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.veStuHealthReportDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						veStuHealthReportApi.add(subData).then(res => {
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
				this.$refs.veStuHealthReportDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						veStuHealthReportApi.update(subData).then(() => {
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