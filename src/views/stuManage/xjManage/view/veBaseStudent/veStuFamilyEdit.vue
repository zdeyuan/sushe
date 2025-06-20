<template>
	<div class="edit_form">
		<!-- 编辑页 -->
		<a-form-model ref="veStuFamilyDataForm" :rules="veStuFamilyRules" labelAlign="right">
			<div class="doAdd">
				<a-button type="primary" @click="doAdd()">
					添加家庭成员
				</a-button>
			</div>
			<div class="no-data" v-if="familys.length == 0">
				暂无家庭成员
			</div>
			<div v-for="(veStuFamilyVo, index) in familys" style="overflow: auto;">
				<div class="detail_title" style="margin-top:15px">
					家庭成员{{ index + 1 }}
					<a-button class="right" type="link" @click="doDelete(index)"> 删除 </a-button>
				</div>
				<a-row>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item class="ytop" label="姓名" prop="name">
							<a-input v-model="veStuFamilyVo.name" :maxLength="30" placeholder="请输入姓名" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item class="ytop" label="关系码" prop="gxm">
							<edu-data v-model="veStuFamilyVo.gxm" stype="select" code="gxm" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="电话" prop="homePhone">
							<a-input v-model="veStuFamilyVo.homePhone" :maxLength="20" placeholder="请输入电话" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="移动电话" prop="phone">
							<a-input v-model="veStuFamilyVo.phone" :maxLength="11" placeholder="请输入移动电话" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="职业" prop="jtcyzym">
							<a-input v-model="veStuFamilyVo.jtcyzym" :maxLength="30" placeholder="请输入职业" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="政治面貌" prop="zzmmm">
							<edu-data v-model="veStuFamilyVo.zzmmm" stype="select" code="zzmmm" />
						</a-form-model-item></a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="出生日期" prop="birth">
							<DatePickByCN  v-model="veStuFamilyVo.birth"  placeholder="请选择出生日期"/>
						</a-form-model-item></a-col>
					<a-col :span="12">
						<a-form-model-item label="所在单位" prop="szdw">
							<a-input v-model="veStuFamilyVo.szdw" :maxLength="100" placeholder="请输入所在单位" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="是否监护人" prop="sfjhr">
							<a-radio-group v-model="veStuFamilyVo.sfjhr">
								<a-radio value="1"> 是 </a-radio>
								<a-radio value="0"> 否 </a-radio>
							</a-radio-group>
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="身份证件类型" prop="sfzjlxm">
							<a-select style="width:100%" :options="sfzlxList" placeholder="请选择"
								v-model="veStuFamilyVo.sfzjlxm" />
						</a-form-model-item>
					</a-col>
				</a-row>
				<a-row>
					<a-col :span="12">
						<a-form-model-item label="身份证件号" prop="sfzjh">
							<a-input v-model="veStuFamilyVo.sfzjh" :maxLength="18" placeholder="请输入身份证件号" />
						</a-form-model-item>
					</a-col>
					<a-col :span="12">
						<a-form-model-item label="家庭类别" prop="jtlb">
							<a-select style="width:100%" :options="jtlb" placeholder="请选择"
								v-model="veStuFamilyVo.jtlb" />
						</a-form-model-item>
					</a-col>
				</a-row>
			</div>
		</a-form-model>
	</div>
</template>

<script>
	import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
	import {
		axios
	} from '@/utils/request'
	export default {
		props: {
			stuId: String
		},
		components: {},
		data() {
			const data = {
				familys: [],
				veStuFamilyRules: {},
				sfzlxList: [],
				jtlb:[]
			};
			return data;
		},
		mounted() {
			this.getsfzlx()
			this.getjtlb()
			this.setShow(this.stuId);
		},
		methods: {
			//获取身份证类型
			getsfzlx() {
				this.sfzlxList = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=SFZLX',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.sfzlxList.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取身份证类型失败')
					})
			},
			//家庭类别
			getjtlb() {
				this.jtlb = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=JTLB',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'politic',
						},
					})
					.then((res) => {
						for (let politic of res.result) {
							this.jtlb.push({
								value: politic.code,
								label: politic.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取家庭类别失败')
					})
			},
			doAdd() {
				this.familys.push({});
			},
			doDelete(index) {
				this.familys.splice(index, 1);
			},
			/**
			 * @msg: 重置数据
			 */
			resetveStuFamilyVo() {
				return {};
			},
			/**
			 * @msg: 初始化修改
			 */
			setShow(stuId) {
				veBaseStudentApi.findFamilys(stuId).then(res => {
					this.familys = res.result;
				});
				this.viewType = 'update';
				this.$nextTick(() => {
					this.$refs.veStuFamilyDataForm.clearValidate();
				});
			},
			/**
			 * @msg: 获取提交的数据 新增和 修改复用
			 */
			getSubData(isUpdate) {
				return this.familys;
			}
		}
	};
</script>
<style lang="less" scoped>
	.doAdd {
		padding-top: 15px;
	}

	.right {
		float: right;
		right: 15px;
	}
</style>