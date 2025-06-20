<template>
	<a-modal v-model="visible" :title="title" :width="900" :footer="false">

		<div :style="{width: '100%',border: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',}">
			<a-spin :spinning="confirmLoading">
				<a-form :form="form">

					<a-form-item label="菜单类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
						<a-radio-group @change="onChangeMenuType"
							v-decorator="['menuType',{'initialValue':localMenuType}]">
							<a-radio :value="0">一级菜单</a-radio>
							<a-radio :value="1">子菜单</a-radio>
						</a-radio-group>
					</a-form-item>
					<a-form-item v-show="localMenuType!=0" label="上级" :labelCol="labelCol" :wrapperCol="wrapperCol"
						:validate-status="validateStatus" :hasFeedback="true" :required="true">
						<span slot="help">{{ validateStatus=='error'?'请选择上级菜单':'&nbsp;&nbsp;' }}</span>
						<a-tree-select style="width:100%" :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
							:treeData="treeData" v-model="model.pid" placeholder="请选择父级菜单" :disabled="disableSubmit"
							@change="handlepidChange">
						</a-tree-select>
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="编号">
						<a-input placeholder="请输入编号" v-decorator="[ 'jyzbh',validatorRules.jyzbh]"
							:readOnly="disableSubmit" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="名称" hasFeedback>
						<a-input placeholder="请输入名称" v-decorator="[ 'jyzmc', validatorRules.jyzmc]"
							:readOnly="disableSubmit" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="英文名称" hasFeedback>
						<a-input placeholder="请输入英文名称" v-decorator="[ 'jyzywmc', {}]" :readOnly="disableSubmit" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="简称" hasFeedback>
						<a-input placeholder="请输入简称" v-decorator="[ 'jyzjc', {}]" :readOnly="disableSubmit" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属院系" hasFeedback>
						<a-select :options="faculty" placeholder="请选择" @change="facultyChange"
							v-decorator="[ 'falId', validatorRules.falId]" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="专业" hasFeedback>
						<a-select :options="specialty" placeholder="请选择" v-decorator="[ 'specId', validatorRules.specId]" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属校区" hasFeedback>
						<a-select class="scanInput" ref="school" :options="school" placeholder="请选择校区"
							v-decorator="[ 'campusId', {}]" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="负责人">
						<a-select :options="fzrUser" placeholder="请选择" v-decorator="[ 'fzrUserId', {}]" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="联系电话">
						<a-input class="input-style-reply" v-decorator="[ 'telephone',{}] " >
						</a-input>
					</a-form-item>
					<a-form-item v-show="show" :labelCol="labelCol" :wrapperCol="wrapperCol" label="建立年月">
						<a-month-picker 
							v-decorator="[ 'jlny',  { initialValue: moment(new Date(), 'YYYY-MM') }]" />
					</a-form-item>

					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
						<j-dict-select-tag v-decorator="['status', {}]" placeholder="请选择状态" :type="'radio'"
							:triggerChange="true" dictCode="valid_status" />

					</a-form-item>


				</a-form>

			</a-spin>
			<a-row :style="{textAlign:'right'}">
				<a-button :style="{marginRight: '8px'}" @click="handleCancel">
					关闭
				</a-button>
				<a-button :disabled="disableSubmit" @click="handleOk" type="primary">确定</a-button>
			</a-row>
		</div>
	</a-modal>
</template>

<script>
	import {
		axios
	} from '@/utils/request'
	import zyzApi from '@/api/common/zyz';
	import {
		addPermission,
		editPermission,
		queryTreeList,
		duplicateCheck
	} from '@/api/common/api'
	import pick from 'lodash.pick'
	import moment from 'moment';
	import 'moment/locale/zh-cn';
	import validationService from '@/utils/validateForm';
	export default {
		name: "PermissionModal",
		data() {
			return {
				moment,
				drawerWidth: 700,
				treeData: [],
				treeValue: '0-0-4',
				title: "操作",
				visible: false,
				disableSubmit: false,
				model: {},
				school: [],
				localMenuType: 0,
				faculty: [],
				specialty: [],
				fzrUser: [],
				show: true, //根据菜单类型，动态显示隐藏表单元素
				isRequrie: true, // 是否需要验证
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 5
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 16
					},
				},
				validation: validationService,
				specialty: [],
				confirmLoading: false,
				form: this.$form.createForm(this),
				validateStatus: "",
				joinOrChangeStuType: ''
			}
		},
		computed: {
			validatorRules: function() {
				return {
					jyzmc: {
						rules: [{
							required: true,
							message: '请输入标题!'
						}]
					},
					jyzbh: {
						rules: [{
							required: true,
							message: '请输入编号!'
						}]
					},
					falId: { rules: [{ required: true, message: '请选择院系' }] },
					specId: { rules: [{ required: true, message: '请选择专业' }] }
					//telphone:{rules: [{ required: true,  validation.iphoneRule }]},
				}
			}
		},
		created() {
		},
		methods: {
			gettc() {
				this.fzrUser=[];
				axios({
						url: '/common/veCommon/getTeacherList?interfaceUserId=09d5e1e7f9b049008eee645c783a1d66',
						method: 'get'
					})
					.then((res) => {
						if (res.code == 200) {
							for (let fzrUser of res.result) {
								this.fzrUser.push({
									value: fzrUser.gh,
									label: fzrUser.xm,
								})
							}
							return;
						}
					})
					.catch((err) => {
						this.$message.warning("获取教师失败！");
					})
			},
			getSchoolList() {
				axios({
					url: 'common/veCommon/queryCampusList',
					method: 'get',
					params: {}
				}).then(res => {
					this.school=[];
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.xqmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取校区列表失败");
				})
			},
			getFaculty() {
				this.faculty=[];
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
				this.form.specId = '';
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
			// 转换上级树结构
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
			loadTree() {
				var that = this;
				zyzApi.list().then((res) => {
					if (res.success) {
						// this.treeData=this.convertToTree(res.result);
						this.treeData = this.convertToTree(res.result);
						console.log("this.treeData", this.treeData)
					}
				});
			},
			onChange(date, dateString) {},
			add() {
				// 默认值
				this.edit({
					status: '1'
				});
			},
			edit(record) {
				this.getFaculty();
				this.getSchoolList();
				this.gettc();
				if(record.falId){
					this.facultyChange(record.falId);
				}
				this.form.resetFields();
				this.loadTree();
				this.model = Object.assign({}, record);
				//--------------------------------------------------------------------------------------------------
				this.show = record.menuType == 2 ? false : true;
				if (this.model.pid) {
					this.localMenuType = 1;
				} else {
					this.localMenuType = 0;
				}
				this.visible = true;
				let fieldsVal = pick(this.model, 'jyzbh', 'jyzmc', 'jyzywmc', 'jyzjc', 'falId', 'telephone', 'specId',
					'campusId', 'fzrUserId', 'jlny', 'status');
				this.$nextTick(() => {
					this.form.setFieldsValue(fieldsVal)
				});
			},
			close() {
				this.$emit('close');
				this.disableSubmit = false;
				this.visible = false;
			},
			handleOk() {
				const that = this;
				// 触发表单验证
				this.form.validateFields((err, values) => {
					if (!err) {

						let formData = Object.assign(this.model, values);
						if ((formData.menuType == 1) && !formData.pid) {
							that.validateStatus = 'error';
							that.$message.error("请检查你填的类型以及信息是否正确！");
							return;
						} else {
							that.validateStatus = 'success';
						}
						if (formData.jlny) {
							formData.jlny = moment(formData.jlny).format('YYYY-MM');
						}
						let obj;

						if (!this.model.id) {
							obj = zyzApi.add(formData);
						} else {
							obj = zyzApi.update(formData);
						}
						obj.then((res) => {
							if (res.code == 200) {
								that.$message.success(res.message);
								that.$emit('ok');
							} else {
								that.$message.warning(res.message);
							}
						}).finally(() => {
							that.confirmLoading = false;
							that.close();
						});
					} else {
						console.log("错误提示", err)
					}
				})
			},
			handleCancel() {
				this.close()
			},
			validateNumber(rule, value, callback) {
				if (!value || new RegExp(/^[0-9]*[1-9][0-9]*$/).test(value)) {
					callback();
				} else {
					callback("请输入正整数!");
				}
			},
			onChangeMenuType(e) {
				//console.log('localMenuType checked', e.target.value)
				this.localMenuType = e.target.value;
				if (this.localMenuType == 0) {
					this.model.pid = 0;
				}
			},
			handlepidChange(value) {
				if (!value) {
					this.validateStatus = "error"
				} else {
					this.validateStatus = "success"
				}
			}
		}
	}
</script>

<style scoped>
	/deep/.ant-select-selection--single {
		width: 100%
	}
</style>