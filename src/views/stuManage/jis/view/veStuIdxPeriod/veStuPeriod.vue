<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-21 22:49:27
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-16 11:46:26
-->
<template>
	<edu-layout type="table">
		<!-- 表格 -->
		<div slot="table" class="right_table">
			<div class="ant-table-body edu-form-size">
				<a-form-model ref="veStuIdxScoreConfigDataForm" :rules="veStuIdxScoreConfigRules"
					:model="veStuIdxScoreConfigVo" labelAlign="right">
					<a-form-model-item label="选择评测周期" prop="type" required>
						<edu-data v-model="veStuIdxScoreConfigVo.type" stype="radio" code="zhouqi" />
					</a-form-model-item>
					<a-form-model-item label="提示">
						<div style="color:red">注意：这里只允许初始化的时候设置一次，请慎重选择评测周期选项！</div>
					</a-form-model-item>
				</a-form-model>

				<div class="form-footer">
					<a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="updateData">
						确定
					</a-button>
				</div>
			</div>
		</div>
	</edu-layout>
</template>

<script>
	import veStuPeriodApi from '@/views/stuManage/jis/api/veStuPeriodApi';

	export default {
		components: {},
		data() {
			const data = {
				veStuIdxScoreConfigVo: {},
				dataList: {},
				veStuIdxScoreConfigRules: {
					type: [{
						required: true,
						message: '请选择评测周期',
						trigger: 'change',
					}],
				}
			};
			return data;
		},
		mounted() {
			//this.init();
		},
		methods: {
			init() {
				const sub = {
					sorts: [{
						column: 'list_sort',
						asc: true
					}]
				};
				veStuPeriodApi.all(sub).then(res => {
					this.dataList = res.result;
				});
			},
			/**
			 * @msg: 调用Api修改数据
			 */
			updateData() {
				this.$refs.veStuIdxScoreConfigDataForm.validate(valid => {
					if (valid) {
						this.veStuIdxScoreConfigVo.type == 0 ? 1 : 2;
						veStuPeriodApi.update(this.veStuIdxScoreConfigVo).then(() => {
							this.$notification.success({
								message: '数据修改成功',
								description: '修改了一条数据'
							});
							this.$emit('onOk');
						});
					}
				})
				// this.$notification.success({
				//   message: '数据修改成功',
				//   description: '修改了一条数据'
				// });
				// this.$emit('onOk');
			},
			/**
			 * @msg: 表格获取请求数据 必须return 一个对象
			 */
			getParams() {
				const params = this.$refs['cwQuery'].getQueryData();
				return params;
			},
			/**
			 * @msg: 搜索事件
			 */
			handleFilter() {
				this.$refs.veStuPeriodTable.reload();
			},
			/**
			 * @msg: 新增事件
			 */
			handleCreate() {
				this.showType = 'edit';
				this.$nextTick(() => {
					this.$refs.veStuPeriodEdit.doCreate();
				});
			},
			/**
			 * @msg: 编辑行事件
			 */
			handleUpdate(row) {
				this.showType = 'edit';
				this.$nextTick(() => {
					this.$refs.veStuPeriodEdit.doUpdate(row);
				});
			},
			/**
			 * @msg: 编辑行事件
			 */
			toDetail(row) {
				this.showType = 'show';
				this.$nextTick(() => {
					this.$refs.veStuPeriodShow.doShow(row);
				});
			},
			/**
			 * @msg: 编辑页取消事件
			 */
			editCancel() {
				this.showType = 'table';
			},
			/**
			 * @msg: 编辑页成功事件
			 */
			editOk() {
				this.showType = 'table';
				this.$refs.veStuPeriodTable.reload();
			}
		}
	};
</script>
<style lang="less" scoped>
	.ant-table-body {
		padding: 15px 10%;
	}

	.my_table {
		width: 100%;

		th,
		td {
			text-align: center;
			padding: 8px;
			border: 1px solid #f2f2f2;
		}
	}

	.form-footer {
		padding: 15px;
		text-align: center;
	}
</style>