<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<edu-form :title="textMap[dialogStatus]" @ok="createData()" @cancel="handelCancel">
			<a-form-model ref="veStuChangeDataForm" :rules="veStuChangeRules" :model="veStuChangeVo" labelAlign="right">
				<div class="detail_title">原学籍基本信息</div>
				
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="所属专业部" prop="xz">
							<a-select :options="faculty" placeholder="请选择" disabled
								v-model="veBaseStudentVo.falId" style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属专业" prop="xz">
							<a-select  :options="specialty" disabled placeholder="请选择" 
								v-model="veBaseStudentVo.specId"  style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="所属班级" prop="xz">
							<a-select   :options="bjIdList" placeholder="请选择" disabled v-model="veBaseStudentVo.bjId"
								style="width: 100%;" />
						</a-form-model-item>
					</a-col>
					
					<a-col :span="12">
						<a-form-model-item label="姓名"  prop="name">
							 <a-input v-model="veBaseStudentVo.xm" :maxLength="20" disabled placeholder="请输入姓名" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="学号"  prop="code">
							 <a-input v-model="veBaseStudentVo.xh" :maxLength="20" disabled placeholder="请输入学号" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="异动类别" prop="ydlbm" required>
							<edu-data v-model="veStuChangeVo.ydlbm" stype="select" code="ydlbm" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<template>
					<div class="detail_title mt"
						v-if="veStuChangeVo.ydlbm == 3 || veStuChangeVo.ydlbm == 4 || veStuChangeVo.ydlbm == 6">异动信息
					</div>
					<a-form-model-item class="ytop" v-if="veStuChangeVo.ydlbm == 3" label="专业去向" prop="boxZybmbj">
						<boxZybmbj ref="boxZybmbj" nianji nianjiToBj></boxZybmbj>
					</a-form-model-item>

					<a-form-model-item class="ytop" v-if="veStuChangeVo.ydlbm == 4" label="留级去向" prop="boxZybmbj2">
						<boxZybmbj ref="boxZybmbj2" :ofalId="veBaseStudentVo.falId+''" :ospecId="veBaseStudentVo.specId+''"
							nianji njbj nianjiToBj></boxZybmbj>
					</a-form-model-item>

					<a-form-model-item class="ytop" v-if="veStuChangeVo.ydlbm == 6" label="异动去向" prop="ydqxxm">
						<a-input v-model="veStuChangeVo.ydqxxm" :maxLength="50" placeholder="请输入异动去向" />
					</a-form-model-item>
				</template>

				<div class="detail_title mt">其他信息</div>

				<a-form-model-item label="异动原因" class="ytop" prop="ydMsg" required>
					<a-textarea v-model="veStuChangeVo.ydMsg" :maxLength="65535" placeholder="请输入异动说明" :rows="4" />
				</a-form-model-item>
				<a-form-model-item label="异动说明" class="ytop" prop="ydsm" required>
					<a-textarea v-model="veStuChangeVo.ydsm" :maxLength="65535" placeholder="请输入异动说明" :rows="4" />
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
	import boxZybmbj from '@/components/boxZybmbj';
	import moment from 'moment';
	export default {
		components: {
			boxZybmbj
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
					}],
					ydlbm: [
					  {
					    required: true,
					    message: '请选择异动类别',
					    trigger: 'change',
					  }
					],
					ydMsg: [
					  {
					    required: true,
					    message: '请填写异动原因',
					    trigger: 'change',
					  }
					],
					ydsm: [
					  {
					    required: true,
					    message: '请选择异动说明',
					    trigger: 'change',
					  },
					],
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
					ydsm: '', // 异动说明
					stuId:'',
					ydDate: this.$date.format('YYYY-MM-DD')
				};
			},
			/**
			 * @msg: 初始化修改
			 */
			doChange(row,type) {
				veBaseStudentApi.get(row.id).then(res => {
					this.veBaseStudentVo = res.result.stu;
					this.veBaseStudentInfoVo=res.result.stuInfo;
					this.veStuChangeVo.stuId=this.veBaseStudentVo.id;
					console.log("学生信息",res.result)
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
			  this.veStuChangeVo = this.resetveStuChangeVo();
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
							const tempData = Object.assign({}, this.veBaseStudentVo);
							const form= Object.assign({}, this.veStuChangeVo);
							if (form.ydlbm == "4") {
								if(this.$refs.boxZybmbj2){
									if (typeof this.$refs.boxZybmbj2.getSetValue === 'function') {
									  this.$refs.boxZybmbj2.getSetValue(tempData, () => {
										 form.gradeId=tempData.gradeId;
										 form.bjId=tempData.bjId;
										resolve(form);
									  });
									} else {
									  reject(new Error('this.$refs.boxZybmbj2 上不存在 getSetValue 方法'));
									}
								}
							} else if (form.ydlbm == 3) {
								if (typeof this.$refs.boxZybmbj.getSetValue === 'function') {
								  this.$refs.boxZybmbj.getSetValue(tempData, () => {
									form.falId = tempData.falId;
									form.gradeId = tempData.gradeId;
									form.specId = tempData.specId;
									form.bjId = tempData.bjId;
									resolve(form);
								  });
								} else {
								  reject(new Error('this.$refs.boxZybmbj2 上不存在 getSetValue 方法'));
								}
							}else {
								resolve(form);
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
							console.log("getSubData() 出错:", error);
						});
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped></style>