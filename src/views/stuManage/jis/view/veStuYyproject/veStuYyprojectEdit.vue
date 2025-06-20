<template>
	<div class="edit_form">
		<!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
		<edu-form :title="textMap[dialogStatus]" @ok="dialogStatus === 'create' ? createData() : updateData()"
			@cancel="handelCancel">
			<a-form-model ref="veStuYyprojectDataForm" :rules="veStuYyprojectRules" :model="veStuYyprojectVo"
				labelAlign="right">
				<a-form-model-item label="预约项目对象" prop="type" required>
					<edu-data v-model="veStuYyprojectVo.type" stype="radio" code="yyType" />
				</a-form-model-item>
				<a-form-model-item label="预约教师" v-if="veStuYyprojectVo.type == 1" prop="fzrId">
					<userSelectBox ref="userSelectBox"></userSelectBox>
				</a-form-model-item>
				<a-form-model-item label="预约场地" v-if="veStuYyprojectVo.type == 2" prop="campusId">
					<a-select style="display: inline-block;width: 33%" v-model="veStuYyprojectVo.campusId"
						@change="campusSelect" placeholder="请选择校区">
						<a-select-option :value="undefined">请选择</a-select-option>
						<a-select-option v-for="item in xiaoquList" :key="item.id" :value="item.id">
							{{ item.xqmc }}
						</a-select-option>
					</a-select>
					<a-select style="display: inline-block;width: 33%" v-model="veStuYyprojectVo.jzId"
						@change="buildingSelect" placeholder="请选择教学楼">
						<a-select-option :value="undefined">请选择</a-select-option>
						<a-select-option v-for="item in jzs" :key="item.id" :value="item.id">
							{{ item.jzwmc }}
						</a-select-option>
					</a-select>
					<a-select style="display: inline-block;width: 33%" v-model="veStuYyprojectVo.jsId"
						placeholder="请选择教室">
						<a-select-option :value="undefined">请选择</a-select-option>
						<a-select-option v-for="item in jss" :key="item.id" :value="item.id">
							{{ item.jsmc }}
						</a-select-option>
					</a-select>

				</a-form-model-item>
				<a-form-model-item label="预约设备" v-if="veStuYyprojectVo.type == 3" prop="sbSelect">
					<sbSelect ref="sbSelect"></sbSelect>
				</a-form-model-item>
				<a-form-model-item label="预约形式" prop="yyType" required>
					<edu-data v-model="veStuYyprojectVo.yyType" stype="radio" code="yyXinz" />
					<div style="color:red">如果选择常规时间预约，只需要选择日期对应的星期和时间即可.例如2016-09-14 09:00-2016-09-14
						18:00会直接处理成周一到周五的09-18时才能预约</div>
				</a-form-model-item>
				<a-form-model-item label="限制人数" prop="limitNum" required>
					<a-input-number v-model="veStuYyprojectVo.limitNum" :min="0" placeholder="请输入限制人数"
						style="width:300px" />
				</a-form-model-item>
				<a-form-model-item label="开始时间" prop="statusTime" required>
					<DatePickByCN
					      v-model="veStuYyprojectVo.statusTime"
					      placeholder="请选择开始时间"
						  displayFormat="YYYY-MM-DD HH:mm:ss"
					    />
				</a-form-model-item>
				<a-form-model-item label="结束时间" prop="endTime" required>
					<DatePickByCN
					      v-model="veStuYyprojectVo.endTime"
					      placeholder="请选择结束时间"
						  displayFormat="YYYY-MM-DD HH:mm:ss"
					    />
				</a-form-model-item>
				<a-form-model-item label="预约介绍" prop="yyRemark" required>
					<a-textarea v-model="veStuYyprojectVo.yyRemark" :maxLength="300" placeholder="请输入预约介绍" :rows="4" />
				</a-form-model-item>
				<a-form-model-item label="状态" prop="status" required>
				  <edu-data v-model="veStuYyprojectVo.status" stype="radio" code="status" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import {
		httpAction,
		getActionCampusById,
		getAction
	} from '@/api/common/manage'
	import veStuYyprojectApi from '@/views/stuManage/jis/api/veStuYyprojectApi';
	import userSelectBox from '@/components/userSelectBoxbyUserId';
	import sbSelect from '@/components/sbSelect';
	export default {
		components: {
			userSelectBox,
			sbSelect
		},
		data() {
			let validateUser = (rule, value, callback) => {
				const data = this.$refs.userSelectBox.getValue();
				if (data && data.length > 0) {
					callback();
				} else {
					callback(new Error('请选择预约教师'));
				}
			};
			let validateSb = (rule, value, callback) => {
				const data = this.$refs.sbSelect.getValue();
				if (data && data.length > 0) {
					callback();
				} else {
					callback(new Error('请选择设备'));
				}
			};
			let validatecd = (rule, value, callback) => {
				const data = this.veStuYyprojectVo.jsId;
				if (data) {
					callback();
				} else {
					callback(new Error('请选择场地'));
				}
			};
			const data = {
				veStuYyprojectVo: this.resetveStuYyprojectVo(),
				textMap: {
					update: '编辑-',
					create: '新增-'
				},
				dialogStatus: 'create',
				veStuYyprojectRules: {
					fzrId: [{
						validator: validateUser,
						trigger: 'change',
						required: true
					}],
					sbSelect: [{
						validator: validateSb,
						trigger: 'change',
						required: true
					}],
					campusId: [{
						validator: validatecd,
						trigger: 'change',
						required: true
					}],
					yyType: [{
						required: true,
						message: '请选择预约形式',
						trigger: 'change',
					}],
					limitNum:  [{
						required: true,
						message: '请输入限制人数',
						trigger: 'change',
					}],
					statusTime: [{
						required: true,
						message: '请选择开始时间',
						trigger: 'change',
					}],
					endTime: [{
						required: true,
						message: '请选择开始时间',
						trigger: 'change',
					}],
					yyRemark: [{
						required: true,
						message: '请输入预约介绍',
						trigger: 'change',
					}],
				},
				jzs: [],
				jss: [],
				xiaoquList: [],
				url: {
					getBuildingList: '/jxzy/jwJianzhu/list',
					getClassroomList: '/jxzy/jwJiaoshi/list',
				}
			};
			return data;
		},
		mounted() {
			this.getXiaoqu();
		},
		methods: {
			/**
			 * @msg: 重置数据
			 */
			resetveStuYyprojectVo() {
				return {
					type: 1, // 预约项目对象
					sbId: '', //  预约设备ID
					sbName: '', //
					yy_remark: '', // 预约说明
					limitNum: '', // 限制人数
					statusTime: '', // 开始时间
					endTime: '', // 结束时间
					status: 1, // 状态（1：启用，0：禁用）
					campusId: '', //
					jzId: '', //
					jsId: '', //
					address: '', //
					projectId: '', // 项目负责人id
					is_public: '', // 发布状态
					projectIdText: '', // 项目负责人
					auth_personId: '', // 审核人ID
					auth_persionText: '', //
					auth_status: '', // 审核状态(1通过，0不通过，2未审核)
					audit_reason: '', // 不通过原因
					yyType: 1 // 预约形式（1.自主预约，2.常规时间预约）
				};
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = 'create';
				this.veStuYyprojectVo = this.resetveStuYyprojectVo();
				this.$nextTick(() => {
					this.$refs.veStuYyprojectDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 初始化修改
			 */
			doUpdate(row) {
				veStuYyprojectApi.get(row.id).then(res => {
					this.veStuYyprojectVo = res.result;
					this.$nextTick(() => {
						if (this.veStuYyprojectVo.projectId) {
							this.$refs.userSelectBox.setObj([{
								id: this.veStuYyprojectVo.projectId,
								name: this.veStuYyprojectVo.projectIdText
							}]);
						}
						if (this.veStuYyprojectVo.sbId) {
							this.$refs.sbSelect.setObj([{
								id: this.veStuYyprojectVo.sbId + '',
								name: this.veStuYyprojectVo.sbName
							}]);
						}

					});
					this.dialogStatus = 'update';

					this.$refs.veStuYyprojectDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 编辑页取消
			 */
			handelCancel() {
				this.$emit('onCancel');
			},
			getXiaoqu() {
				getActionCampusById().then((res) => {
					if (res.success) {
						this.xiaoquList = res.result;
						if (this.veStuYyprojectVo.campusId) {
							this.campusSelect(this.veStuYyprojectVo.campusId);
						}
					}
				})
			},
			campusSelect(value) {
				getAction(this.url.getBuildingList, {
						campusid: value,
						pageSize: 999
					})
					.then((res) => {
						if (res.success) {
							this.jzs = res.result.records;
							if (this.veStuYyprojectVo.jzId) {
								this.buildingSelect(this.veStuYyprojectVo.jzId);
							}
						} else {
							this.$message.warning(res.message)
						}
					})
					.finally(() => {
						this.loading = false
					})
			},

			buildingSelect(value) {
				getAction(this.url.getClassroomList, {
						jzid: value,
						pageSize: 999
					})
					.then((res) => {
						if (res.success) {
							this.jss = res.result.records;

						} else {
							this.$message.warning(res.message)
						}
					})
					.finally(() => {
						this.loading = false
					})
			},
			/**
			 * @msg: 获取提交的数据 新增和 修改复用
			 */
			getSubData(isUpdate) {
				const tempData = Object.assign({}, this.veStuYyprojectVo);
				if (tempData.type == 1) {
					const userData = this.$refs.userSelectBox.getObj();
					tempData.projectId = userData.id;
					tempData.projectIdText = userData.name;
					tempData.sbId = '';
					tempData.sbName = '';
					tempData.jsId = '';
					tempData.jzId = '';
					tempData.campusId = '';
				} else if (tempData.type == 3) {
					const sbData = this.$refs.sbSelect.getObj();
					tempData.sbId = sbData[0].id;
					tempData.sbName = sbData[0].name;
					tempData.projectId = '';
					tempData.projectIdText = '';
					tempData.jsId = '';
					tempData.jzId = '';
					tempData.campusId = '';
				}
				return tempData;
			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				this.$refs.veStuYyprojectDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(false);
						if (subData == null) {
							return;
						}
						veStuYyprojectApi.add(subData).then(res => {
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
				console.log(this.$refs.veStuYyprojectDataForm, 'valid？？？？？')
				this.$refs.veStuYyprojectDataForm.validate(valid => {
					if (valid) {
						const subData = this.getSubData(true);
						if (subData == null) {
							return;
						}
						veStuYyprojectApi.update(subData).then(() => {
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