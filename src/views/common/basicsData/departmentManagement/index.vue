<template>
	<div>
		<div class="btns">
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新部门树状图
			</a-button>
			<a-button type="primary" @click="addbm(0, '')" style="margin-right: 20px;">
				新增
			</a-button>
		</div>
		<div class="count">
			<a-tree :load-data="onLoadData" :tree-data="data">
				<template #title="{ key: treeKey, title , jgmc, jgh, pid, dssjjgh, id , item}">
					<a-dropdown :trigger="['contextmenu']">
						<span>{{ jgmc }}---({{ jgh }})</span>
						<template #overlay>
							<a-menu>
								<a-menu-item @click="({ key: menuKey }) => scbm(id)">部门删除</a-menu-item>
								<a-menu-item @click="({ key: menuKey }) => xgbm(id,pid)">部门修改</a-menu-item>
								<a-menu-item @click="({ key: menuKey }) => addbm(pid, dssjjgh)">新增同级部门</a-menu-item>
								<a-menu-item @click="({ key: menuKey }) => addbm(id, jgh)">新增下级部门</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</template>
			</a-tree>
		</div>
		<div class="showNewDoginBox">
			<!-- <a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" @ok="uploadCancel" @cancel="uploadCancel" :width="1073"> -->
			<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></joinOrChangeStuInfo>
			<!-- </a-modal> -->
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import {
		axios
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import joinOrChangeStuInfo from './join.vue'
	export default {
		// mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo
		},
		data() {
			return {
				replaceFields:{
					children:'children', title:'jgmc', key:'id'
				},
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
					pid:0
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
			addbm(pid,dssjjgh){
				var obj = {
					pid,
					dssjjgh
				}
				this.joinStu('add',obj)
			},
			xgbm(id,pid){
				if(pid == 0){
					var msg = this.data.find(e=>e.id == id)
				}else{
					var nod = this.data.find(e=>e.id == pid)
					var msg = nod.children.find(e=>e.id == id)
				}
				this.joinStu('change',msg)
			},
			scbm(id){
				this.delteIds(id)
			},
			onLoadData(treeNode) {
				if (treeNode.dataRef.children) {
					return;
				}
				this.searchInfo.pid = treeNode.dataRef.id
				axios({
					url: '/common/veBase/getDepartmentPageListNew',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {

						if (res.result.length == 0) {
							this.$message.warning("已无下级部门");
							return
						}

						treeNode.dataRef.children = res.result
						
						this.data = [...this.data]
					}
				}).catch(err => {

					this.$message.warning("获取下级部门信息失败");

				})
			},
			changezidiand(record) {
				this.$emit('zidiandi', record)
			},
			onChange(e) {
				e.njzt = e.njzt == true ? 1 : 0
				axios({
						url: '/common/veBase/editFaculty',
						method: 'post',
						data: e,

					})
					.then((res) => {
						if (res.code == 200) {
							this.$message.success('修改成功');
							this.getStuInfo()
							return;
						} else {
							this.$message.warning(res.message);
						}
					})
					.catch((err) => {
						this.$message.warning("修改失败！");
					})
			},
			remoder() {
				this.searchInfo.title = ''
				this.searchInfo.code = ''
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
				this.url.exportXlsUrl = 'common/veIntegration/exportModel';
				this.handleExportXls('报名信息导入模板');
				this.url.exportXlsUrl = 'common/veIntegration/importExcelStudent';
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				this.searchInfo.pid = 0
				axios({
					url: '/common/veBase/getDepartmentPageListNew',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {

						this.data = res.result

						// this.pagination.total = res.result.totalRecord
					}


				}).catch(err => {

					this.$message.warning("获取部门信息失败");

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
			delteIds(obj) {
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '这个部门',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						axios({
							url: '/common/veBase/deleteDepartment?id=' + obj,
							method: 'post',
							params: {}

						}).then(res => {
							// then.selectedRowKeys = []
							if (res.code == 200) {
								then.getStuInfo()
							}

						}).catch(err => {
							then.$message.warning("删除失败");
						})
					},
					onCancel() {},
				});
			}
		}
	}
</script>

<style>
</style>