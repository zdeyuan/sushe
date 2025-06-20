<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form type="view"  @ok="createData()" @cancel="handelCancel">
			<a-form-model ref="veStuChangeDataForm" :rules="veStuChangeRules" :model="veStuChangeVo" labelAlign="right">
				<div class="detail_title" style="margin-bottom:10px;font-size:16px;">已选学生：</div>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="所属年级" prop="xz">
							<JSelectGrade placeholder="请选择所属年级" v-model="veBaseStudentInfoVo.gradeId"/>
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属专业部" prop="xz">
							<a-select :options="faculty" placeholder="请选择" 
								v-model="veBaseStudentInfoVo.falId" style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属专业" prop="xz">
							<a-select  :options="specialty"  placeholder="请选择" 
								v-model="veBaseStudentInfoVo.specId"  style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属班级" prop="xz">
							<a-select   :options="bjIdList" placeholder="请选择"  v-model="veBaseStudentInfoVo.bjId"
								style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					
				</a-row>

				<div class="detail_title mt">其他信息</div>

				<a-form-model-item label="异动原因" class="ytop" prop="ydMsg" required>
					<a-textarea v-model="veStuChangeVo.ydMsg" :maxLength="65535" placeholder="请输入异动说明" :rows="4" />
				</a-form-model-item>
			</a-form-model>
		</edu-form>
	</div>
</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import veStuChangeApi from '@/views/stuManage/xjManage/api/veStuChangeApi';
	import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
    import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	export default {
		components: {
			JSelectGrade
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
					
					ydlbm: '', // 异动类别码;1=>'退学',2=>'休学',3=>'转专业',4=>'留级',5=>'转入',6=>'转出',
					ydMsg: '', // 异动原因
					ydsm: '' // 异动说明
				};
			},
			/**
			 * @msg: 初始化修改
			 */
			doChange(row) {
				veBaseStudentApi.get(row.id).then(res => {
					this.veBaseStudentInfoVo = res.result.stu;
				});
				this.dialogStatus = 'update';
				this.$nextTick(() => {
					this.$refs.veStuChangeDataForm.clearValidate();
				});
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
				let _this=this;
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
							}else {
								// 添加对其他情况的拒绝处理
								reject(new Error("未知的 ydlbm 值: " + tempData.ydlbm));
							}
							
						}).then((subData)=>{
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
<style lang="less" scoped></style>