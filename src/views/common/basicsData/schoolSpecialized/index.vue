<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style="margin-right: 10px;">专业代码</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.zydm" />

				<span class="divide-span" style="margin-left: 20px; margin-right: 10px;">专业名称</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.zymc" />

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
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新
			</a-button>
			<!-- <a-button type="primary" @click="isShowImport=!isShowImport" style="margin-right: 20px;">
				批量导入
			</a-button> -->
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination">
				
				<span slot="iszssy" slot-scope="text, record">
					 <a-switch v-model="record.iszssy" @change="onChange(record)" />
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
				  v-if="doImport"
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
		        <a class="down-btn"  @click="exportModel">模板下载</a>
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
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	import joinOrChangeStuInfo from './join.vue';
	import uploadFiles from '@/components/kqManageComponent/uploadFiles';
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
				columns: [{
						title: '专业编号',
						dataIndex: 'zybh',
						key: 'zybh',
					},
					{
						title: '专业代码',
						dataIndex: 'zydm',
						key: 'zydm',
					},
					{
						title: '专业名称',
						dataIndex: 'zymc',
						key: 'zymc',
					},
					{
						title: '专业英文名称',
						dataIndex: 'zyywmc',
						key: 'zyywmc',
					},
					{
						title: '学制',
						dataIndex: 'xzmc',
						key: 'xzmc',
					},
					// {
					// 	title: '专业方向名称',
					// 	dataIndex: 'zyfxmc',
					// 	key: 'zyfxmc',
					// },
					{
						title: '专业简称',
						dataIndex: 'zyjc',
						key: 'zyjc',
					},
					// {
					// 	title: '建立年月',
					// 	dataIndex: 'jlny',
					// 	key: 'jlny',
					// },
					{
						title: '专业教师数',
						dataIndex: 'zyjss',
						key: 'zyjss',
					},
					// {
					// 	title: '开设机构号',
					// 	dataIndex: 'ksjgh',
					// 	key: 'ksjgh',
					// },
					{
						title: '总学分',
						dataIndex: 'zxf',
						key: 'zxf',
					},
					{
						title: '是否招生专业',
						dataIndex: 'iszssy',
						key: 'iszssy',
						slots: { title: 'iszssy' },
						scopedSlots: { customRender: 'iszssy' },
					},
					{
						title: '所属院系',
						dataIndex: 'yxmc',
						key: 'yxmc',
					},
					{
						title: '状态',
						dataIndex: 'status',
						key: 'status',
						slots: { title: 'status' },
						scopedSlots: { customRender: 'status' },
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
				importUrl:this.$http.service.stu + 'veStuExcel/importExcel',
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
				joinOrChangeStuShow: false,
				joinOrChangeStuType: '',
				//搜索参数
				searchInfo: {

					pageNo: 1,

					pageSize: 10,

					zydm: '', //状态

					zymc: '', //年级
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
				    '专业部名称',
				    '专业编号',
				    '专业代码',
				    '专业名称',
				    '专业英文名称',
				    '学制',
				    '专业方向名称',
				    '专业简称',
				    '专业教师数',
				    '建立年月',
				    '开设机构号',
				    '总学分',
				    '是否为招生使用1是0否',
				    '所属院系',
				    '上级专业',
				  ],
				  tempName: '专业基本信息',
				  implName: 'veBaseSpecialtyServiceImpl.importExcel',
				  }
			},
			doImportFn(type) {
			  this.isShowImport = false;
			  if (!type) {
			    return;
			  }
			  this.$message.success('导入成功');
			},
			onChange(e){
				e.status = e.status == true ? 1 : 0
				e.iszssy = e.iszssy == true ? 1 : 0
				axios({
						url: '/common/veBase/editSpecialty',
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
				this.searchInfo.zydm = ''
				this.searchInfo.zymc = ''
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
				this.$http.exportExcel(this.$http.service.stu + 'veStuExcel/exportTemp',temp, 'post', { name:  temp.tempName + '导入模板.xlsx' });
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				axios({
					url: 'common/veBase/getSpecisltyPageListNew',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {

						this.data = res.result.list
						this.data.forEach((e)=>{
							e.iszssy = e.iszssy == 1 ? true : false
						})
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
							url: 'common/veBase/deleteSpecialtyBatch?ids=' + ids,
							method: 'post',
							params: {}

						}).then(res => {
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