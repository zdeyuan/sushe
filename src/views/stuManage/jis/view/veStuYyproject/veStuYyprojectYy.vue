<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form title="详情" @cancel="handelCancel" @ok="dialogStatus === 'create' ? createData() : null">
			<a-form :form="form" ref=" " :model="veStuYyVo" :rules="veStuYyRules" labelAlign="right" layout="inline">
				<a-row>
					<a-col :span="12">
						<a-form-item label="预约项目对象">
							<edu-dict-text :value="veStuYyprojectVo.type" code="yyType" /></td>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="预约形式">
							<edu-dict-text code="yyXinz" :value="veStuYyprojectVo.yyType"></edu-dict-text>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-item label="预约场地" v-if="veStuYyprojectVo.type==2">
							{{ veStuYyprojectVo.XQMC }} - {{ veStuYyprojectVo.JZWMC }} - {{ veStuYyprojectVo.JSMC }}
						</a-form-item>
						<a-form-item label="预约设备名称" v-if="veStuYyprojectVo.type==3">
							{{veStuYyprojectVo.sbName}}
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="限制人数">
							{{veStuYyprojectVo.limitNum}}人
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-item label="项目开始时间">
							{{veStuYyprojectVo.statusTime}}
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="项目结束时间">
							{{veStuYyprojectVo.endTime}}
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="开始时间" prop="yystartTime">
							<DatePickByCN
							      v-model="veStuYyVo.yystartTime"
								  v-decorator="[ 'yystartTime', veStuYyRules.yystartTime]"
							      placeholder="请选择开始时间"
								  displayFormat="YYYY-MM-DD HH:mm:ss"
							    />
							<!-- <a-date-picker :locale="locale" v-decorator="[ 'yystartTime', veStuYyRules.yystartTime]"
								v-model="veStuYyVo.yystartTime" valueFormat="YYYY-MM-DD HH:mm:ss" show-time / -->
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="结束时间" prop="yyendTime">
							<DatePickByCN
								 v-decorator="[ 'yyendTime', veStuYyRules.yyendTime]"
							      v-model="veStuYyVo.yyendTime"
							      placeholder="请选择报名结束时间"
								  displayFormat="YYYY-MM-DD HH:mm:ss"
							    />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-form-model-item label="预约原因" prop="yyReason">
					<a-textarea v-model="veStuYyVo.yyReason" v-decorator="[ 'yyReason', veStuYyRules.yyReason]"
						:maxLength="300" placeholder="请输入预约介绍" :rows="4" />
				</a-form-model-item>
			</a-form>
		</edu-form>
	</div>
</template>

<script>
	import veStuYystuApi from "@/views/stuManage/jis/api/veStuYystuApi";
	import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
	export default {
		components: {},
		data() {
			const data = {
				form: this.$form.createForm(this),
				locale,
				dialogStatus: 'create',
				veStuYyVo: {
					stuId: '',
					yyId: '',
					yystartTime: '',
					yyendTime: '',
					yyReason: ''
				},
				veStuYyprojectVo: {},
				veStuYyRules: {
					yyendTime: {
						rules: [{
							required: true,
							message: '请选择结束时间!'
						}]
					},
					yystartTime: {
						rules: [{
							required: true,
							message: '请选择开始时间!'
						}]
					},
					yyReason: {
						rules: [{
							required: true,
							message: '请选择预约原因!'
						}]
					}
				}
			};
			return data;
		},
		mounted() {},
		methods: {
			/**
			 * @msg: 初始化修改
			 */
			doShow(row) {
				let user = JSON.parse(window.sessionStorage.getItem('userInfo'));
				this.veStuYyprojectVo = Object.assign({}, row)
				this.veStuYyVo.yyId = row.id;
				this.veStuYyVo.stuId = user.teacherOrStudentId;
			},
			createData() {
				// this.$refs.veStuYyDataForm.validate(valid => {
				// if (valid) {
				this.form.validateFields((res) => {
					if (!res) {
						if (this.veStuYyVo.yystartTime >= this.veStuYyprojectVo.statusTime &&
							this.veStuYyVo.yyendTime <= this.veStuYyprojectVo.endTime &&
							this.veStuYyVo.yystartTime <= this.veStuYyVo.yyendTime) {} else {
							this.$notification.error({
								message: '预约时间不在项目的时间范围内',
								description: '错误提示'
							});
							return;
						}
						
						veStuYystuApi.add(this.veStuYyVo).then(res => {
							this.$notification.success({
								message: '数据新增成功',
								description: '新增了一条数据'
							});
							this.$emit('onOk');
						});
					}
				});
				// }
				// });

			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			}
		}
	};
</script>
<style lang="less" scoped>

</style>