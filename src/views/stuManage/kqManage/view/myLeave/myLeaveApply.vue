<template>
	<!-- 表格 -->
	<edu-layout type="table">
		 <div slot="table" class="right_table">
		<a-form-model ref="veStuLeaveDataForm" :rules="veStuLeaveRules" :model="veStuLeaveVo"  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" labelAlign="right">
			<a-form-model-item label="请假类型" prop="type" required>
				<edu-data v-model="veStuLeaveVo.type" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
			</a-form-model-item>
			<a-form-model-item label="开始时间" prop="startTime" required>
				<DatePickByCN
					  v-model="veStuLeaveVo.startTime"
					  placeholder="请选择开始时间"  />
			</a-form-model-item>
			<a-form-model-item label="结束时间" prop="endTime" required>
				<DatePickByCN
					  v-model="veStuLeaveVo.endTime"
					  placeholder="请选择结束时间"  />
			</a-form-model-item>
			<a-form-model-item label="请假原因" prop="content" required>
				<a-input v-model="veStuLeaveVo.content" :maxLength="65535" placeholder="请输入请假原因" />
			</a-form-model-item>
			<div class="form-footer">
			  <a-button style="padding: 0 25px;margin-right: 15px;" type="primary" @click="createData">
			    保存
			  </a-button>
			</div>
		</a-form-model>
		</div>
	</edu-layout>
	<!-- 编辑页 -->
</template>

<script>
	import veStuLeaveApi from "../../api/veStuLeaveApi";
	import veStuCheckTypeApi from '../../api/veStuCheckTypeApi';
	export default {
		components: {},
		data() {
			const data = {
				veStuLeaveVo: this.resetveStuLeaveVo(),
				textMap: {
					update: "编辑-请假信息表",
					create: "新增-请假信息表"
				},
				typeNodes: [{
					id:1,
					title:'事假'
				},{
					id:2,
					title:'病假'
				},{
					id:3,
					title:'丧假'
				}],
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
		mounted() {
		},
		methods: {
			/**
			 * @msg: 重置数据
			 */
			resetveStuLeaveVo() {
				return {
					type: '', // 请假类型;1事假、2病假、3丧假
					startTime: '', // 开始时间
					endTime: '', // 结束时间
					content: '', // 请假原因
				};
			},
			
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.veStuLeaveDataForm.validate((valid,errorFields) => {
					console.log(111,this.veStuLeaveVo)
					if (valid) {
						const subData = this.veStuLeaveVo;
						if (subData == null) {
							return;
						}
						veStuLeaveApi.add(subData).then(res => {
							this.$notification.success({
								message: "请假成功",
								description: '新增了一条数据'
							});
						});
					}else{
						this.$notification.error({
							message: "表单验证失败",
							description: '请检查表单填写是否正确'
						});
					}
				});
			},
		}
	};
</script>
<style lang="less" scoped>
.form-footer {
  padding: 15px;
  text-align: center;
}
</style>