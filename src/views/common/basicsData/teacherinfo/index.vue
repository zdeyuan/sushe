<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style=" margin-right: 10px;">工号</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.gh" />

				<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">姓名</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.xm" />

			</div>
			<div style="margin-left:10px;margin-bottom: 15px;">
				<a-button type="primary" @click="getStuInfo">
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
			<a-button type="primary" @click="doExportFn" style="margin-right: 20px;">
				导出
			</a-button>
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新
			</a-button>
			<a-button type="primary"@click="isShowImport=!isShowImport"  style="margin-right: 20px;">
				批量导入
			</a-button>
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination" :scroll="{x:1300}">
				
				<span slot="sfjzjs" slot-scope="text, record">
					 <a-switch v-model="record.sfjzjs" @change="onChange(record)" />
				</span>
				
				<span slot="sfssxjs" slot-scope="text, record">
					 <a-switch v-model="record.sfssxjs" @change="onChange(record)" />
				</span>
				
				<span slot="status" slot-scope="text, record">
					 <a-switch v-model="record.status" @change="onChange(record)" />
				</span>
				
				<span slot="action" slot-scope="text, record">
					<span style="color: #028BE2; cursor:pointer;" @click="joinStu('change',record)">修改</span>
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
		        <a class="down-btn" @click="exportModel" >模板下载</a>
		      </a-form-model-item>
		    </a-form-model>
		  </div>
		</edu-form>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import {
		axios
	} from '@/utils/request';
	import uploadFiles from '@/components/kqManageComponent/uploadFiles';
	import joinOrChangeStuInfo from './join.vue'
	export default {
		//mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo,
			uploadFiles
		},
		data() {
			return {
				current: 'schoolInfo',
				isShowImport:false,
				importUrl:'edu-common/veScheduleExcel/importExcel',
				columns: [{
						title: '工号',
						dataIndex: 'gh',
						width: 200,
						fixed: 'left',
						key: 'gh',
					},
					{
						title: '姓名',
						dataIndex: 'xm',
						width: 200,
						fixed: 'left',
						key: 'xm',
					},
					{
						title: '联系电话',
						dataIndex: 'lxdh',
						width: 200,
						key: 'lxdh',
					},
					{
						title: '联系邮箱',
						dataIndex: 'dzxx',
						width: 200,
						key: 'dzxx',
					},
					{
						title: '员工状态',
						width: 100,
						dataIndex: 'dqztmName',
						key: 'dqztmName',
					},
					// {
					// 	title: '国籍',
					// 	width: 100,
					// 	dataIndex: 'nationality',
					// 	key: 'nationality',
					// },
					{
						title: '民族',
						width: 100,
						dataIndex: 'mzmName',
						key: 'mzmName',
					},
					// {
					// 	title: '身份证件号',
					// 	width: 200,
					// 	dataIndex: 'yxywmc',
					// 	key: 'sfzjh',
					// },
					{
						title: '政治面貌',
						width: 100,
						dataIndex: 'zzmmmName',
						key: 'zzmmmName',
					},
					{
						title: '当前住址',
						width: 300,
						dataIndex: 'dqzz',
						key: 'dqzz',
					},
					{
						title: '户口类别',
						width: 100,
						dataIndex: 'hklbmName',
						key: 'hklbmName',
					},
					// {
					// 	title: '从教年月',
					// 	width: 200,
					// 	dataIndex: 'cjny',
					// 	key: 'cjny',
					// },
					// {
					// 	title: '参加工作年月',
					// 	width: 200,
					// 	dataIndex: 'cjgzny',
					// 	key: 'cjgzny',
					// },
					{
						title: '教职工类',
						width: 200,
						dataIndex: 'jzglbmName',
						key: 'jzglbmName',
					},
					{
						title: '岗位类别',
						width: 200,
						dataIndex: 'gwlbmName',
						key: 'gwlbmName',
					},
					{
						title: '是否兼职',
						width: 150,
						dataIndex: 'sfjzjs',
						key: 'sfjzjs',
						slots: { title: 'sfjzjs' },
						scopedSlots: { customRender: 'sfjzjs' },
					},
					{
						title: '是否双师型',
						width: 150,
						dataIndex: 'sfssxjs',
						key: 'sfssxjs',
						slots: { title: 'sfssxjs' },
						scopedSlots: { customRender: 'sfssxjs' },
					},
					// {
					// 	title: '参加工作年月',
					// 	width: 200,
					// 	dataIndex: 'cjgzny',
					// 	key: 'cjgzny',
					// },
					// {
					// 	title: '状态',
					// 	dataIndex: 'status',
					// 	width: 100,
					// 	fixed: 'right',
					// 	key: 'status',
					// 	slots: { title: 'status' },
					// 	scopedSlots: { customRender: 'status' },
					// },
					{
						title: '操作',
						dataIndex: 'action',
						width: 100,
						fixed: 'right',
						key: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
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
				exportConfig:{
				  url: '/common/veCommon/teacherExport',
				  name: '《老师信息表导出》'
				},
				joinOrChangeStuShow: false,
				joinOrChangeStuType: '',
				//搜索参数
				searchInfo: {

					pageNo: 1,

					pageSize: 10,

					gh: '', //状态

					xm: '', //年级
				}
			}
		},
		computed: {
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys; //常量

				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				};
			},
		},
		created() {
			this.getStuInfo()
		},
		methods: {
			doImport(){
				return {
				  temp: [
				   '工号',
				   '姓名',
				   '身份证类型',
				   '身份证号',
				   '性别(男1,女2)',
				   '民族',
				   '政治面貌',
				   '户口类别',
				   '当前住址',
				   '联系电话',
				   '联系邮箱',
				   '教职工类',
				   '邮政编码',
				   '部门',
				   '专业组'
				  ],
				  tempName: '教师基本信息',
				  implName: 'veBaseTeacherServiceImpl.importExcel',
				}
			},
			doImportFn(type) {
			  this.isShowImport = false;
			  if (!type) {
			    return;
			  }
			  this.getStuInfo()
			  this.$message.success('导入成功');
			},
			onChange(e){
				e.status = e.status == true ? 1 : 0
				e.sfjzjs = e.sfjzjs == true ? 1 : 0
				e.sfssxjs = e.sfssxjs == true ? 1 : 0
				axios({
						url: '/common/veBase/editTeacher',
						method: 'post',
						data: e,
				
					})
					.then((res) => {
						if (res.code == 200) {
							this.$message.success('修改成功');
							this.getStuInfo()
							return;
						}else{
							this.$message.warning(res.message);
						}
					})
					.catch((err) => {
						this.$message.warning("修改失败！");
					})
			},
			remoder() {
				this.searchInfo.gh = ''
				this.searchInfo.xm = ''
				this.getStuInfo()
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			JoinOrchangeStuSuss() {
				this.getStuInfo()
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
			getParams() {
			  const params = this.searchInfo;
			  return params;
			},
			doExportFnReal() {
			  const config = {
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
			  // reqData[this.sizeName] = 100000;
			  // reqData[this.pageName] = 1;
			  // if (this.params) {
			  //   Object.assign(reqData, this.params);
			  // }
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
			//导出模板
			exportModel() {
				const temp = this.doImport();
				this.$http.exportExcel('edu-common/veScheduleExcel/exportTemp',temp, 'post', { name:  temp.tempName + '导入模板.xlsx' });
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				axios({
					url: 'common/veCommon/getTeacherPageListByIPage',
					method: 'get',
					params: this.searchInfo
				}).then(res => {
					if (res.code == 200) {
						this.data = res.result.records
						this.pagination.total = res.result.total
					}

				}).catch(err => {

					this.$message.warning("获取教师管理信息失败");

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
						axios({
							url: 'common/veBase/deleteTeacherBatch?ids=' + ids,
							method: 'post',
							params: {}

						}).then(res => {
							then.selectedRowKeys = []
							if (res.code == 200) {
								then.getStuInfo()
							}

						}).catch(err => {
							then.$message.warning("获取删除失败");
						})
					},
					onCancel() {},
				});
			}
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