<template>
	<div class="edit_form">
		<edu-form :title="留宿申请" @ok="dialogStatus === 'create' ? createData() : updateData()" @cancel="handelCancel">
			<a-form-model type="view" ref="accommodateForm" :rules="hqStuPositionRules" :model="applyObj"
				labelAlign="right">
					<a-form-model-item label="留宿类型" prop="title" required>
						<a-select class="condition" :options="type" placeholder="请选择类型" v-model="applyObj.type" />
					</a-form-model-item>
					<a-form-model-item label="留宿时间" prop="stime" required>
						<a-range-picker @change="applyChange" />
					</a-form-model-item>
					<a-form-model-item label="申请原因" prop="content" required>
						<a-textarea v-model="applyObj.content" placeholder="清输入申请原因"
							:auto-size="{ minRows: 3, maxRows: 5 }" />
					</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import termList from '@/components/kqManageComponent/termList';
	import deptTree from '@/components/kqManageComponent/deptTree';

	export default {
		components: {
			termList,
			deptTree
		},
		data() {
			let validateDept = (rule, value, callback) => {
				const data = this.applyObj.stime;
				if (data && data.length > 0) {
					callback();
				} else {
					callback(new Error('请选择'));
				}
			};
			const data = {
				applyObj: this.resethqStuPositionVo(),
				dialogStatus: 'create',
				hqStuPositionRules: {
					type: [{
						required: true,
						message: '留宿类型必填',
						trigger: 'change',
					}],
					content: [{
						required: true,
						message: '申请原因必填',
						trigger: 'change',
					}],
					stime:[{
						validator:validateDept,
						trigger: 'change',
						required: true
					}]
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
					type: '', 
					stime: '', 
					etime: '', 
					content: '', 
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = 'create';
				this.applyObj = this.resethqStuPositionVo();
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
		}
	};
</script>
<style lang="less" scoped></style>