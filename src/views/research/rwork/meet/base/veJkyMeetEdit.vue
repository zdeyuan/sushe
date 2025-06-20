<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form :title="textMap[dialogStatus]" type="view" size="big"
			@ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
			<a-form-model ref="veJkyMeetDataForm" :rules="veJkyMeetRules" :model="veJkyMeetVo"
				class="mini-form-item inline-form2" labelAlign="right">
				<a-form-model-item label="会议主题" prop="title" required>
					<a-input v-model="veJkyMeetVo.title" :maxLength="255" placeholder="请输入会议主题" />
				</a-form-model-item>
				<a-form-model-item label="会议参与教研人员" prop="userIds">
					<jkyUserSelect ref="jkyUserSelectZy" :check="true"></jkyUserSelect>
				</a-form-model-item>
				<a-form-model-item label="会议参与其他人员" prop="otherUser">
					<a-row>
						<a-col :span="12">
							<a-textarea v-model="veJkyMeetVo.otherUser" :maxLength="500" placeholder="请输入会议参与其他人员"
								:rows="4" />
						</a-col>
						<a-col :span="12">
							<span style="color: #666;font-size:12px"> 多个参与人员用英文半角逗号分隔</span>
						</a-col>
					</a-row>
				</a-form-model-item>
				<a-form-model-item label="会议内容" prop="content" required>
					<div style="padding-right:30%">
						<a-textarea v-model="veJkyMeetVo.content" :maxLength="65535" placeholder="请输入会议内容" :rows="4" />
					</div>
				</a-form-model-item>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="会议场地" prop="placeId" required>
							<edu-data v-model="veJkyMeetVo.placeId" stype="select" width="180px" :datas="placeNodes"
								textKey="name" dtype="datas" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="联系人" prop="contactMan" required>
							<a-input v-model="veJkyMeetVo.contactMan" :maxLength="20" placeholder="请输入联系人" />
						</a-form-model-item>
					</a-col> </a-row><a-row>
					<a-col :span="12">
						<a-form-model-item label="联系电话" prop="mobile">
							<a-input v-model="veJkyMeetVo.mobile" :maxLength="20" placeholder="请输入联系电话" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="联系邮箱" prop="email">
							<a-input v-model="veJkyMeetVo.email" :maxLength="100" placeholder="请输入联系邮箱" />
						</a-form-model-item>
					</a-col>
				</a-row>

				<a-form-model-item label="会议时间" prop="startTime" required>
					<DatePickByCN v-model="veJkyMeetVo.startTime" placeholder="请选择会议开始时间"
						displayFormat="YYYY-MM-DD HH:mm:ss"  />
					至
					<DatePickByCN v-model="veJkyMeetVo.endTime" placeholder="请选择会议结束时间"
						displayFormat="YYYY-MM-DD HH:mm:ss"  </a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import veJkyMeetApi from '@/api/research/rwork/veJkyMeetApi';

	import jkyUserSelect from '@/components/kqManageComponent/jkyUserSelect';

	export default {
		props: {
			placeNodes: {
				type: Array
			}
		},
		components: {
			jkyUserSelect
		},
		data() {
			let validateUserZy = (rule, value, callback) => {
				const data = this.$refs.jkyUserSelectZy.getValue();
				if (data && data.length > 0) {
					callback();
				} else {
					callback(new Error('请选择会议参与教研人员'));
				}
			};
			const data = {
				veJkyMeetVo: this.resetveJkyMeetVo(),
				textMap: {
					update: '修改会议申请',
					create: '发布会议申请'
				},
				dialogStatus: 'create',
				veJkyMeetRules: {
					userIds: [{
						validator: validateUserZy,
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
			resetveJkyMeetVo() {
				return {
					title: '', // 会议主题
					otherUser: '', // 其他人员
					content: '', // 会议内容
					placeId: '', // 会议场地id
					contactMan: '', // 联系人
					mobile: '', // 联系电话
					email: '', // 联系邮箱
					createUid: '', // 创建用户id
					createTime: '', // 创建时间
					startTime: '', // 会议开始时间
					endTime: '', // 会议结束时间
					markUid: '', // 审核人id
					markTime: '', // 审核时间
					markName: '', // 审核人名称
					createName: '' // 创建用户名称
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.viewType = 'create';
				this.veJkyMeetVo = this.resetveJkyMeetVo();
				this.$nextTick(() => {
					this.$refs.veJkyMeetDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				veJkyMeetApi.get(row.id).then(res => {
					this.veJkyMeetVo = res.result;
					this.$refs.jkyUserSelectZy.setValue([res.result.userIds]);
				});
				this.viewType = 'update';
				this.$nextTick(() => {
					this.$refs.veJkyMeetDataForm.clearValidate();
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
				const tempData = Object.assign({}, this.veJkyMeetVo);
				tempData.userIds = this.$refs.jkyUserSelectZy.getValue();
				tempData.status = 0;
				return tempData;
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.veJkyMeetDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						veJkyMeetApi.add(subData).then(res => {
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
				this.$refs.veJkyMeetDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						veJkyMeetApi.update(subData).then(() => {
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