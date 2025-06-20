<template>
	<a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>工号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.gh"  @blur="validateField('gh', ApplyObj.gh, [validation.requiredRule,validation.numberRule])"  :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.gh">{{errors.gh}}</span>
						</td>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>姓名</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.xm" @blur="validateField('xm', ApplyObj.xm, [validation.requiredRule])" 
								:disabled='joinNotEite'></a-input>
							<span class="nonull-tip" v-if="errors.xm">{{errors.xm}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>联系电话</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" @blur="validateField('lxdh', ApplyObj.lxdh, [validation.requiredRule,validation.iphoneRule])"  v-model.trim="ApplyObj.lxdh" :disabled='joinNotEite'>
							</a-input>
						<span class="nonull-tip" v-if="errors.lxdh">{{errors.lxdh}}</span>
						</td>
						<td class="td-div">
							<div class="font-style">联系邮箱</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.dzxx" :disabled='joinNotEite'>
							</a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>身份证类型</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="SFZlist" placeholder="请选择" @blur="validateField('sfzjlxm', ApplyObj.sfzjlxm, [validation.requiredRule])"  v-model="ApplyObj.sfzjlxm"
								:disabled='joinNotEite' />
							<span class="nonull-tip" v-if="errors.sfzjlxm">{{errors.sfzjlxm}}</span>
						<td class="td-div">
							<div class="font-style"><span class="tip-star">*</span>身份证号</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.sfzjh" @blur="validateField('sfzjh', ApplyObj.sfzjh, [validation.requiredRule])" :disabled='joinNotEite'>
							</a-input>
							<span class="nonull-tip" v-if="errors.sfzjh">{{errors.sfzjh}}</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">民族</div>
						</td>
						<td class="double">
							<j-dict-select-tag :disabled="check"  v-model="ApplyObj.mzm" placeholder="请选择民族"
                             dictCode="nation" :trigger-change="false" ></j-dict-select-tag>
							<!-- <a-select style="width:100%" :options="MZlist" placeholder="请选择" v-model="ApplyObj.mzm"
								:disabled='joinNotEite' /> -->
						<td class="td-div">
							<div class="font-style">政治面貌</div>
						</td>
						<td class="double">
							<j-dict-select-tag :disabled="check"  v-model="ApplyObj.zzmmm" placeholder="请选择政治面貌"
							 dictCode="politic" :trigger-change="false" ></j-dict-select-tag>
							<!-- <a-select style="width:100%" :options="ZZMMlist" placeholder="请选择" v-model="ApplyObj.zzmmm"
								:disabled='joinNotEite' /> -->
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">当前住址</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" v-model.trim="ApplyObj.dqzz" :disabled='joinNotEite'>
							</a-input>
						<td class="td-div">
							<div class="font-style">户口类型</div>
						</td>
						<td class="double">
							<j-dict-select-tag :disabled="check"  v-model="ApplyObj.hklbm" placeholder="请选择户口类型"
							 dictCode="residence" :trigger-change="false" ></j-dict-select-tag>
							<!-- <a-select style="width:100%" :options="HKLBlist" placeholder="请选择" v-model="ApplyObj.hklbm"
								:disabled='joinNotEite' /> -->
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">教职工类</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="JZGlist" placeholder="请选择" v-model="ApplyObj.jzglbm"
								:disabled='joinNotEite' />
						<td class="td-div">
							<div class="font-style">岗位类别</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="GWLBlist" placeholder="请选择" v-model="ApplyObj.gwlbm"
								:disabled='joinNotEite' />
						</td>
					</tr>
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">工作经历</span>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">部门</div>
						</td>
						<td class="double">
							 <deptTree ref="deptTree"></deptTree>
						</td>
						<td class="td-div">
							<div class="font-style">专业组</div>
						</td>
						<td class="double">
							<a-select style="width:100%" :options="ZYZlist" placeholder="请选择" v-model="ApplyObj.jyzId"
								:disabled='joinNotEite' />
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">是否兼职</div>
						</td>
						<td class="double">
							<a-switch v-model="ApplyObj.sfjzjs" />
						<td class="td-div">
							<div class="font-style">是否双师型</div>
						</td>
						<td class="double">
							<a-switch v-model="ApplyObj.sfssxjs" />
						</td>
					</tr>
				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" @click="tip"> 确认 </a-button>
								<a-button class="search-button btn-style btn-cancle" @click="cancel"> 取消 </a-button>
							</a-col>
							<a-col :span="6"> </a-col>
						</a-row>
					</div>
				</div>
			</div>
		</div>
	</a-modal>
</template>
<script>
	import {
		axios
	} from '@/utils/request'
	import validationService from '@/utils/validateForm';
	import deptTree from '@/components/deptTree';
	export default {
		components: {
			deptTree
		},
		data() {
			
			return {
				fzrUser: [],
				ApplyObj: {
					status: 0
				}, //弹窗对象
				joinOrChangeStuShow: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				MZlist: [],
				ZZMMlist: [],
				HKLBlist: [],
				JZGlist: [],
				SFZlist: [],
				GWLBlist: [],
				ZYZlist:[],
				errors: {},
				faculty:[],
				validation: validationService
			}	
		},
		created() {
			this.getzyz()
			this.getsfzj()
			this.getzzmm()
			this.gethklist()
			this.getjzg()
			this.getsfz()
			this.getgwlb()
			this.getFaculty();
		},
		methods: {
			// 验证单个字段的函数
			validateField(fieldName, fieldValue, rules) {
				let errorMessage = null;
				
				// 遍历规则数组并应用每个规则
				for (const rule of rules) {
					if (typeof rule === 'function') {
						// 如果规则是一个函数，则调用它并检查返回值
						const result = rule(fieldValue);
						if (result !== true) {
							// 如果规则验证失败，则设置错误消息
							errorMessage = result || '输入无效';
							break;
						}
					} else if (typeof rule === 'object' && rule.test) {
						// 如果规则是一个正则表达式对象，则测试字段值
						if (!rule.test(fieldValue)) {
							errorMessage = rule.message || '输入格式不正确';
							break;
						}
					}
				}
				// 设置或清除错误消息
				this.$set(this.errors, fieldName, errorMessage);
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
			getgwlb() {
				this.GWLBlist = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=GWLB',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.GWLBlist.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取岗位列表失败')
					})
			},
			getsfz() {
				this.SFZlist = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=SFZLX',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.SFZlist.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取教职工类别列表失败')
					})
			},
			getzyz() {
				this.ZYZlist = []
				axios({
						url: '/common/veCommon/queryJYZList',
						method: 'get',
						params: {

						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.ZYZlist.push({
								value: nation.id,
								label: nation.jyzmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取教职工类别列表失败')
					})
			},
			getjzg() {
				this.JZGlist = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=JZGLB',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.JZGlist.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取教职工类别列表失败')
					})
			},
			gethklist() {
				this.HKLBlist = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=HKLB',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.HKLBlist.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取户口类别列表失败')
					})
			},
			getzzmm() {
				this.ZZMMlist = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=ZZMM',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.ZZMMlist.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取政治面貌列表失败')
					})
			},
			getsfzj() {
				this.MZlist = []
				axios({
						url: '/common/veCommon/queryDictDataByModelCode?modelCode=MZ',
						method: 'get',
						params: {
							interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
							// dictCode: 'nation',
						},
					})
					.then((res) => {
						for (let nation of res.result) {
							this.MZlist.push({
								value: nation.code,
								label: nation.title,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取民族列表失败')
					})
			},
			convertToTree(dataArray) {
			    // 创建一个新的对象来存储树形节点
			   return dataArray.map(data => {
			           const node = {
			               id: data.id,
			               pId: data.pid,
			               value: data.id,
			               title: data.jyzmc
			           };
			   
			           if (data.children && data.children.length > 0) {
			               node.children = this.convertToTree(data.children);
			           }
			   
			           return node;
			       });
			},
			 loadTree(){
			   var that = this;
			   axios({
			   		url: '/common/veBase/getDepartmentPageList',
			   		method: 'get'
			   	})
			   	.then((res) => {
			   		if (res.code == 200) {
						console.log("部门",res.result)
			   			//this.treeData=this.convertToTree(res.result);
			   		}
			   	})
			 },
			async judesType(type, obj) {
				console.log(type, 'type')
				// console.log(id, 'id')
				// 判断是否是添加或修改
				this.joinOrChangeStuType = type
				this.loadTree();
				if (type !== 'add') {
					this.ApplyObj = obj
					this.joinOrChangeStuShow = true;
					this.joinNotEite = false
					this.$refs.deptTree.setValue([obj.depId]);
				} else {
					this.ApplyObj = {};
					this.joinOrChangeStuShow = true
					this.joinNotEite = false
				}
			},
			//添加
			tip() {
				const fields = [{
						name: 'gh',
						rules: [this.validation.requiredRule]
					},
					{
						name: 'xm',
						rules: [this.validation.requiredRule]
					},{
						name: 'sfzjlxm',
						rules: [this.validation.requiredRule]
					},{
						name: 'lxdh',
						rules: [this.validation.requiredRule,this.validation.iphoneRule
						]
					},
					{
						name: 'sfzjh',
						rules: [this.validation.requiredRule]
					}
					// 更多字段和规则
				];

				// 执行字段验证
				this.errors = this.validation.validateFields(fields, this.ApplyObj);
				// 检查是否有错误
				if (Object.values(this.errors).every(error => error === null)) {
					const deptDpt= this.$refs.deptTree.getValueData();
					if (deptDpt && deptDpt.length > 0) {
					  this.ApplyObj.depId = deptDpt[0].id;
					}
					if (this.joinOrChangeStuType == 'add') {

						if (this.joinNotEite) {
							this.cancel()
							return
						}
						this.ApplyObj.sfjzjs = this.ApplyObj.sfjzjs == true ? 1 : 0
						this.ApplyObj.sfssxjs = this.ApplyObj.sfssxjs == true ? 1 : 0
						this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 1;
						axios({
								url: '/common/veCommon/addTeacher',
								method: 'post',
								data: this.ApplyObj,

							})
							.then((res) => {
								if (res.code == 200) {
									this.$message.success('添加成功');
									this.$emit("JoinOrchangeStuSuss", '233')
									this.cancel();
									return;
								} else {
									this.$message.warning(res.message);
								}
							})
							.catch((err) => {
								this.$message.warning("添加失败！");
							})

					} else {
						this.ApplyObj.sfjzjs = this.ApplyObj.sfjzjs == true ? 1 : 0
						this.ApplyObj.sfssxjs = this.ApplyObj.sfssxjs == true ? 1 : 0
						this.ApplyObj.status = this.ApplyObj.status == true ? 1 : 1;
						axios({
								url: '/common/veCommon/editTeacher',
								method: 'post',
								data: this.ApplyObj,

							})
							.then((res) => {
								if (res.code == 200) {
									this.$message.success('修改成功');
									this.$emit("JoinOrchangeStuSuss", '233')
									this.cancel();
									return;
								} else {
									this.$message.warning(res.message);
								}
							})
							.catch((err) => {
								this.$message.warning("修改失败！");
							})
					}
				}
			},

			//取消按钮
			cancel() {
				this.ApplyObj = {}
				this.joinOrChangeStuShow = false
			},
		},
	}
</script>