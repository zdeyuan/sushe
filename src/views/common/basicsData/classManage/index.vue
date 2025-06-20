<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
		<div>
			<div  class="top">
				<div>
					<span class="divide-span" style=" margin-right: 10px;">班级代码</span>
					<a-input placeholder="请输入"  style="width:200px" v-model="searchInfo.xzbdm" />
				</div>
				<div>
					<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">班级名称</span>
					<a-input placeholder="请输入"  style="width:200px" v-model="searchInfo.xzbmc" />
				</div>
			</div>
			<div  class="top" style="margin: 15px 0;">
				<div>
					<span class="divide-span" style=" margin-right: 10px;">所属年级</span>
					<a-select :options="grade" placeholder="请选择"  v-model="searchInfo.gradeId"
						style=" width: 150px;" />
				</div>
				<div>
				<span class="divide-span" style="margin-left: 20px; margin-right: 10px;">所属专业</span>
				<a-select   :options="specialty" placeholder="请选择"
					v-model="searchInfo.specId" style="width: 150px;" />
					</div>
				<a-button type="primary" @click="getStuInfo" style="margin-left: 20px;">
					搜索
				</a-button>
				<a-button type="danger" @click="remoder" style="margin-left: 20px;">
					清空
				</a-button>
			</div>
		</div>
		<div class="btns">
			<a-button type="primary" @click="joinStu('add')" style="margin-right: 20px;">
				添加
			</a-button>
			<a-button type="danger" @click="delteIds" style="margin-right: 20px;">
				批量删除
			</a-button>
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新
			</a-button>
			<a-button type="primary" @click="isShowImport=!isShowImport" style="margin-right: 20px;">
				批量导入
			</a-button>
			<a-button type="primary" @click="doExportFn" style="margin-right: 20px;">
				导出
			</a-button>
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination">
				<span slot="action" slot-scope="text, record">
<!-- 					<span style="color: #00D09E; margin-right: 20px; cursor:pointer;"
						@click="joinStu('see',record.id)">查看</span> -->
						<span style="color: #028BE2; cursor:pointer;"
						@click="joinStu('change',record)">修改</span>
				</span>
			</a-table>
		</div>
		<div class="showNewDoginBox">
			<!-- <a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" @ok="uploadCancel" @cancel="uploadCancel" :width="1073"> -->
			<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></joinOrChangeStuInfo>
			<!-- </a-modal> -->
		</div>
		</a-card>
		<edu-form title="导入" v-if="isShowImport" width="40%" top="200px" @ok="doImportFn(false)" @cancel="doImportFn()">
		  <div>
		    <a-form-model labelAlign="right">
		      <a-form-model-item label="附近">
		        <uploadFiles
		          :showFiles="false"
		          one
				  :url="importUrl"
				  v-if="doImport"
				  :getParams="doImport"
		          serviceType="upload"
		          :showMsg="false"
		          @upload="doImportFn"
		          uploadBtnClass="success"
		          uploadBtnName="选择文件"
		          style="display: inline-block;"
		        />
		      </a-form-model-item>
		      <a-form-model-item label="说明" prop="hqUserId" required>
		        <span>请按模板填写好要导入的数据</span>
		        <a class="down-btn"  @click="exportModel">模板下载</a>
		      </a-form-model-item>
		    </a-form-model>
		  </div>
		</edu-form>
	</div>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import joinOrChangeStuInfo from './join.vue'
	import uploadFiles from '@/components/kqManageComponent/uploadFiles';
	export default {
		// mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo,
			uploadFiles
		},
		data() {
			return {
				current: 'schoolInfo',
				isShowImport:false,
				columns: [{
						title: '班级代码',
						dataIndex: 'xzbdm',
						key: 'xzbdm',
					},
					{
						title: '班级名称',
						dataIndex: 'xzbmc',
						key: 'xzbmc',
					},
					{
						title: '班主任',
						dataIndex: 'realName',
						key: 'realName',
					},
					{
						title: '所属专业',
						dataIndex: 'specName',
						key: 'specName',
					},
					{
						title: '所属年级',
						dataIndex: 'njmc',
						key: 'njmc',
					},
					// {
					// 	title: '班主任',
					// 	dataIndex: 'bzrUserName',
					// 	key: 'bzrUserName',
					// },
					{
						title: '毕业时间',
						dataIndex: 'bysjName',
						key: 'bysjName',
					},
					{
						title: '毕业状态',
						dataIndex: 'statusDescription',
						key: 'statusDescription',
						
					},
					{
						title: '班级位置',
						dataIndex: 'campusName',
						key: 'campusName',
					},
					{
						title: '班级上限人数',
						dataIndex: 'zrs',
						key: 'zrs',
					},
					{
						title: '操作',
						dataIndex: 'action',
						key: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				exportConfig:{
				  url: '/common/veCommon/banjiExport',
				  name: '《班级信息表导出》'
				},
				importUrl:'edu-common/veScheduleExcel/importExcel',
				data: [],
				selectedRowKeys: [],
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showSizeChanger: true,
					showQuickJumper: true,
					total: 0
				},
				input: '',
				type: 'xm',
				grade: [],
				stateList:[
					{
						value:'1',
						label:'未毕业',
					},
					{
						value:'2',
						label:'毕业审核',
					},
					{
						value:'3',
						label:'已毕业',
					},
				],
				specialty: [],
				bjIdList: [],
				upload: false,
				joinOrChangeStuShow: false,
				joinOrChangeStuType: '',
				//搜索参数
				searchInfo: {

					pageNo: 1,

					pageSize: 10,

					bystatus: '', //状态

					gradeId: undefined, //年级

					xzbmc: '', //班级名称

					specId: undefined, //专业

					xzbdm: '', //班级代码
				}
			}
		},
		computed: {
			// 拼接导入
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			},
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys; //常量
				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				};
			},
		},
		created() {
			this.getGrade()
			this.specialtyList()
			this.getStuInfo()
		},
		methods: {
			doImport(){
				return {
				  temp: [
				    '班级代码',
				    '班级名称',
				    '所属年级代码',
				    '所属年级',
				    '专业代码',
					'专业名称',
					'毕业时间',
				    '建班年月',
				    '所属班主任',
					'班长',
					'固定教室名称',
					'班级位置',
					'班级上限人数'
				  ],
				  tempName: '班级基本信息',
				  implName: 'VeBaseBanJiServiceImpl.importExcel',
				  }
			},
			/**
			 * @msg: 表格获取请求数据 必须return 一个对象
			 */
			getParams() {
			  const params = this.searchInfo;
			  return params;
			},
			doExportFn() {
				let _this=this;
				this.$confirm({
					title: '提示',
					content: '确定要导出' + _this.exportConfig.name + '吗?',
						okText: '确认',
						cancelText:'取消',
					onOk() {
						 _this.doExportFnReal();
					},
					onCancel() {},
				});
			},
			doExportFnReal() {
			  const config = {
			    service: 'common',
			    name: '导出',
			    nameTime: true
			  };
			  Object.assign(config, this.exportConfig);
			  if (!config.url) {
			    return;
			  }
			  if (config.nameTime) {
			    config.name += this.$date.format() + '.xlsx';
			  }
			  //数据加载
			  let reqData = {};
			  /* 如果是自己的 */
			  reqData[this.sizeName] = 100000;
			  reqData[this.pageName] = 1;
			  if (this.params) {
			    Object.assign(reqData, this.params);
			  }
			  if (this.getParams) {
			    Object.assign(reqData, this.getParams());
			  }
			  reqData.sorts = {
				  column: 'd.id',
				  asc: false
			  };
			  
			  this.$http.exportExcel(config.url, reqData, 'post', {
			    name: config.name
			  });
			},
			doImportFn(type) {
			  this.isShowImport = false;
			  if (!type) {
			    return;
			  }
			  this.$message.success('导入成功');
			  this.getStuInfo();
			},
			remoder() {
				this.searchInfo = {};
				this.input = ''
				this.getStuInfo()
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			JoinOrchangeStuSuss() {
				this.getStuInfo()
			},
			//导出模板
			exportModel() {
				const temp = this.doImport();
				this.$http.exportExcel('edu-common/veScheduleExcel/exportTemp',temp, 'post', { name:  temp.tempName + '导入模板.xlsx' });
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				 this.$http.get(this.$http.service.base + 'veBase/getBanJiPageList',this.searchInfo).then(res => {
					if (res.code == 200) {
						this.data = res.result.list
						this.pagination.total = res.result.total
					}

				}).catch(err => {

					this.$message.warning("获取学生管理信息失败");

				})
			},

			onSelectChange(selectedRowKeys) {
				console.log('selectedRowKeys changed: ', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},

			tableChange(value, key, column) {
				this.searchInfo.pageNo = value.current
				this.pagination.current = value.current
				this.getStuInfo()
			},
			//显示导入弹窗
			showUpload() {
				this.upload = true
			},
			//关闭导入弹窗
			uploadCancel() {
				this.upload = false
				this.joinOrChangeStuType = false
			},
			// 删除信息
			delteIds() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning("请先选择信息");
					return
				}
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除这些数据',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						let ids = ''
						for (let i = 0; i < then.selectedRowKeys.length; i++) {
							if (i == 0) {
								ids += then.selectedRowKeys[i]
							} else {
								ids += ',' + then.selectedRowKeys[i]
							}
						}
						 then.$http.post(then.$http.service.base + '/veBase/deleteBanJiBatch?ids=' + ids,{}).then(res => {
							then.selectedRowKeys = []
							if (res.code == 200) {
								then.getStuInfo()
							}
						
						}).catch(err => {
							then.$message.warning("获取年级失败");
						})
					},
					onCancel() {},
				});
			},

			// 获取年级专业
			getGrade() {
				this.$http.get(this.$http.service.base + 'veCommon/queryGradeList',{
						pageNo: 1,
						pageSize: 100,
						interfaceUserId:'09d5e1e7f9b049008eee645c783a1d66'
					}).then(res => {
					for (let grade of res.result) {
						this.grade.push({
							value: grade.id,
							label: grade.njdm
						})
					}
				}).catch(err => {
					this.$message.warning("获取年级失败");
				})
			},
			getFaculty() {
				this.$http.get(this.$http.service.base + '/veBase/getFacultyPageList',{
						pageNo: 1,
						pageSize: 100,
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
			specialtyList() {
				this.specialty = [];
				this.searchInfo.specId = undefined;
				this.$http.get(this.$http.service.base + '/veBase/getSpecisltyPageList',{}).then(res => {
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
		}
	}
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
	}

	/deep/ .ant-table-tbody>tr>td,
	/deep/.ant-table-thead>tr>th {
		padding: 15px 5px;
	}
	/deep/ .ant-table-thead > tr > th {
	  background: #66c3fd;
	  color:#fff;
	  font-size: 14px;
	}
	/deep/ .ant-table-tbody {
	  tr:nth-child(even) {
	    background: #f4f7f9;
	  }
	}
</style>
