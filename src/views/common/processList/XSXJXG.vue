<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<a-card>
			<!-- 编辑页 -->
			<div class="noticeInfo">
				<div class="header">
					学生学籍申请修改审批
				</div>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="所属专业部" prop="xz">
							<a-select :options="faculty" placeholder="请选择" @change="facultyChange"
								v-model="veBaseStudentInfoVo.falId" :disabled='buke' style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属专业" prop="xz">
							<a-select :options="specialty" placeholder="请选择" @change="getClazz"
								v-model="veBaseStudentInfoVo.specId" :disabled='buke' style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属班级" prop="xz">
							<a-select :options="bjIdList" :disabled='buke' placeholder="请选择" v-model="veBaseStudentInfoVo.bjId"
								style="width: 100%;" />
						</a-form-model-item>
					</a-col>

					<a-col :span="12">
						<a-form-model-item label="姓名" prop="name">
							<a-input v-model="veBaseStudentInfoVo.name" :disabled='buke' :maxLength="20" placeholder="请输入姓名" style="width: 150px;" />
						</a-form-model-item>
					</a-col>
					<!-- <a-col :span="12">
						<a-form-model-item label="学号" prop="code">
							<a-input v-model="veBaseStudentInfoVo.xh" :disabled='buke' :maxLength="20" placeholder="请输入学号"  style="width: 150px;"/>
						</a-form-model-item>
					</a-col> -->
					<a-col :span="12">
						<a-form-model-item label="异动类别" prop="ydlbm" required>
							<edu-data v-model="veStuChangeVo.ydlbm" stype="select" code="ydlbm"  :disabled='buke'/>
						</a-form-model-item>
					</a-col>
				</a-row>
				<template>
					<div class="detail_title mt"
						v-if="veStuChangeVo.ydlbm == 3 || veStuChangeVo.ydlbm == 4 || veStuChangeVo.ydlbm == 6">异动信息
					</div>
					<a-form-model-item class="ytop" v-if="veStuChangeVo.ydlbm == 3" :disabled='buke' label="专业去向" prop="boxZybmbj">
						<boxZybmbj ref="boxZybmbj" nianji nianjiToBj></boxZybmbj>
					</a-form-model-item>

					<a-form-model-item class="ytop" v-if="veStuChangeVo.ydlbm == 4" label="留级去向" prop="boxZybmbj2">
						<boxZybmbj ref="boxZybmbj2" :ofalId="veBaseStudentVo.falId" :disabled='buke' :ospecId="veBaseStudentVo.specId"
							nianji njbj nianjiToBj></boxZybmbj>
					</a-form-model-item>

					<a-form-model-item class="ytop" v-if="veStuChangeVo.ydlbm == 6" label="异动去向" prop="ydqxxm">
						<a-input v-model="veStuChangeVo.ydqxxm" :maxLength="50" :disabled='buke' placeholder="请输入异动去向" />
					</a-form-model-item>
				</template>

				<div class="detail_title mt">其他信息</div>

				<a-form-model-item label="异动原因" class="ytop" prop="ydMsg" required>
					<a-textarea v-model="veStuChangeVo.ydMsg" :maxLength="65535" :disabled='buke' placeholder="请输入异动说明" :rows="4" />
				</a-form-model-item>
				<a-form-model-item label="异动说明" class="ytop" prop="ydsm" required>
					<a-textarea v-model="veStuChangeVo.ydsm" :maxLength="65535" :disabled='buke' placeholder="请输入异动说明" :rows="4" />
				</a-form-model-item>
				</a-form-model>
			</div>
		</a-card>
	</div>	
</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import veStuChangeApi from '@/views/stuManage/xjManage/api/veStuChangeApi';
	import veBaseStudentApi from '@/views/stuManage/xjManage/api/veStuChangeApi';
	import boxZybmbj from '@/components/boxZybmbj';

	export default {
		components: {
			boxZybmbj
		},
		props: {
			buke: {
				type: Boolean,
				default: false
			}
		},
		data() {
			let validateBoxZybmbj = (rule, value, callback) => {
				const data = this.$refs.boxZybmbj.getCheck();
				if (data) {
					callback(new Error(data));
				} else {
					callback();
				}
			};
			let validateBoxZybmbj2 = (rule, value, callback) => {
				const data = this.$refs.boxZybmbj2.getCheck();
				if (data) {
					callback(new Error(data));
				} else {
					callback();
				}
			};
			const data = {
				faculty: [],
				specialty: [],
				bjIdList: [],
				veStuChangeVo: this.resetveStuChangeVo(),
				veBaseStudentVo: {},
				veBaseStudentInfoVo: {},
				textMap: {
					update: '编辑学籍异动',
					create: '新增学籍异动'
				},
				dialogStatus: 'create',
				veStuChangeRules: {
					boxZybmbj: [{
						validator: validateBoxZybmbj,
						trigger: 'change',
						required: true
					}],
					boxZybmbj2: [{
						validator: validateBoxZybmbj2,
						trigger: 'change',
						required: true
					}]
				}
			};
			return data;
		},
		mounted() {
			this.getFaculty();
		},
		methods: {
			/**
			 * @msg: 重置数据
			 */
			resetveStuChangeVo() {
				return {
					code: '', // 学号
					name: '', // 姓名
					stuId: '', // 学生id
					ydlbm: '', // 异动类别码;1=>'退学',2=>'休学',3=>'转专业',4=>'留级',5=>'转入',6=>'转出',
					ydDate: '', // 异动日期
					ydMsg: '', // 异动原因
					spDate: '', // 审批日期
					spwh: '', // 审批文号
					jbrgh: '', // 经办人工号
					ydlyxxm: '', // 异动来源学校码
					ydqxxm: '', // 异动去向学校码
					ydsm: '', // 异动说明
					ofalId: '', //
					ospecId: '', // 原专业码
					objId: '', // 原班号
					ogradeId: '', // 原年级
					falId: '', // 院系
					specId: '', // 专业码
					bjId: '', // 班级
					gradeId: '', // 年级
					isRecover: '', // 异动恢复状态;1已恢复
					recoverUserId: '', // 异动恢复操作人id
					recoverTime: '' // 异动恢复时间
				};
			},
			/**
			 * @msg: 初始化修改
			 */
			showup(row) {
				this.veBaseStudentVo = row;
				this.veBaseStudentInfoVo = row;
				this.dialogStatus = 'update';
				// this.$nextTick(() => {
				// 	this.$refs.veStuChangeDataForm.clearValidate();
				// });
			},
			/**
			 * @msg: 初始化新增
			 */
			doCreate() {
				this.dialogStatus = 'create';
				this.veBaseStudentVo = this.resetveStuChangeVo();
				this.$nextTick(() => {
					this.$refs.veStuChangeDataForm.clearValidate();
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
			getSubData() {
				new Promise((resolve, reject) => {
					const tempData = Object.assign({}, this.veStuChangeVo);
					if (tempData.ydlbm == 4) {
						this.$refs.boxZybmbj.getSetValue(tempData, () => {
							resolve(tempData);
						});
					} else if (tempData.ydlbm == 3) {
						tempData.stuId = this.veBaseStudentVo.id;
						tempData.code = this.veBaseStudentVo.code;
						tempData.name = this.veBaseStudentVo.name;
						tempData.ydDate = this.$date.format('YYYY-MM-DD');
						console.log(tempData);
						resolve(tempData);
					} else {
						// 添加对其他情况的拒绝处理
						reject(new Error("未知的 ydlbm 值: " + tempData.ydlbm));
					}

				});



			},
			getFaculty() {

				axios({
					url: 'common/veBase/getFacultyPageList',
					method: 'get',
					params: {
						pageNo: 1,
						pageSize: 100
					}
				}).then(res => {

					for (let faculty of res.result.list) {
						this.faculty.push({
							value: faculty.id,
							label: faculty.yxmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取专业部失败");
				})
			},
			facultyChange(value) {
				console.log(value)
				this.specialty = [];
				this.veBaseStudentVo.specId = '';

				if (value.length == 0) {
					return;
				}

				axios({
					url: 'common/veCommon/querySpecialtyListByFalId',
					method: 'get',
					params: {
						pageNo: 1,
						pageSize: 100,
						falId: value
					}
				}).then(res => {

					//this.search();

					this.specialty.splice(0, this.specialty.length);
					for (let specialty of res.result) {
						this.specialty.push({
							value: specialty.id,
							label: specialty.zymc
						})
					}
				}).catch(err => {
					this.$message.warning("获取专业失败");
				})
			},
			getClazz(value) {

				this.bjIdList = []
				this.veBaseStudentVo.bjId = ''

				axios({
						url: '/common/veCommon/queryBanJiListBySpecId',
						method: 'get',
						params: {
							specId: value,
							pageNo: 1,
							pageSize: 100
						},
					})
					.then((res) => {

						this.bjIdList.splice(0, this.bjIdList.length)

						for (let bjIdList of res.result) {
							this.bjIdList.push({
								value: bjIdList.id,
								label: bjIdList.xzbmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取班级失败')
					})

			},
			/**
			 * @msg: 调用Api创建数据
			 */
			createData() {
				let _this = this;
				this.$refs.veStuChangeDataForm.validate(valid => {
					if (valid) {
						new Promise((resolve, reject) => {
							const tempData = Object.assign({}, this.veStuChangeVo);
							console.log(tempData)
							if (tempData.ydlbm == 4) {
								this.$refs.boxZybmbj.getSetValue(tempData, () => {
									resolve(tempData);
								});
							} else if (tempData.ydlbm == 3) {
								tempData.stuId = this.veBaseStudentVo.id;
								tempData.code = this.veBaseStudentVo.code;
								tempData.name = this.veBaseStudentVo.name;
								tempData.ydDate = this.$date.format('YYYY-MM-DD');
								console.log(tempData);
								resolve(tempData);
							} else {
								// 添加对其他情况的拒绝处理
								reject(new Error("未知的 ydlbm 值: " + tempData.ydlbm));
							}

						}).then((subData) => {
							if (subData == null) {
								return;
							}
							veStuChangeApi.add(subData).then(res => {
								this.$notification.success({
									message: '数据新增成功',
									description: '新增了一条数据'
								});
								this.$emit('onOk');
							});
						}).catch((error) => {
							console.error("getSubData() 出错:", error);
						});
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped>、
::v-deep .ant-form-item {
	display: flex !important;
}
</style>