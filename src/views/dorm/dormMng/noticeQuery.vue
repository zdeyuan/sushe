<template>
	<div  style="padding:0 20px">
		<div class="pageContentBox">
			<div class="top">
				<span class="head-span">标题：</span>
				<div>
					<a-input class="condition" placeholder="请输入标题" v-model="title"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
				<a-button type="primary" style="margin-left:20px;" icon="search" @click="getNoticeList">
					搜索
				</a-button>
				<a-button type="danger" style="margin-left:20px;" @click="resetAll">
					清空
				</a-button>
				<a-button  type="primary" style="margin-left:20px;" icon="reload" @click="getNoticeList">
					刷新
				</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange" class="long-table">
					<span slot="operator" slot-scope="text, record">
						<a @click="showNotice(record.key)">查看</a>
					</span>
				</a-table>
			</div>
		</div>
		<a-modal title="查看" :visible="show" :confirm-loading="confirmLoading" @cancel="showCancel" width="872px">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div>接收范围:</div>
					</td>
					<td class="long">
						<!-- 	<a-cascader :disabled="true" class="small" :options="school" placeholder="请选择校区"
							@change="schoolChange" v-model="schoolId" /> -->
						<a-cascader :disabled="true" class="small" :options="build" placeholder="请选择宿舍楼"
							v-model="buildId" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>标题:</div>
					</td>
					<td class="long">
						<a-input :disabled="true" class="scanInput" placeholder="请输入标题" v-model="addTitle"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>内容:</div>
					</td>
					<td class="long">
						<a-textarea
							:disabled="true"
						      v-model="addContent"
						      :auto-size="{ minRows: 3, maxRows: 5 }"
						    />
					</td>
				</tr>
			</table>

			<template slot="footer">
				<a-button  @click="showCancel" class="buttonCancel">取消</a-button>
			</template>
		</a-modal>
	</div>
</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from '@/utils/request';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	const columns = [{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '接收范围',
			dataIndex: 'range',
			key: 'range',
		},
		{
			title: '发布时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: '发布人',
			dataIndex: 'name',
			key: 'name',
		},
		{
			width: "40%",
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];


	export default {
		data() {
			return {
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['6', '10'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					showSizeChanger: true,
					total: 1000
				},
				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				ModalText: 'Content of the modal',
				visible: false,
				confirmLoading: false,
				add: false,
				confirmLoading: false,
				school: [],
				schoolId: [],
				build: [],
				buildId: [],
				addContent: '',
				addTitle: '',
				title: '',
				edit: false,
				editId: '',
				show: false,
			};
		},
		mounted() {
			this.getNoticeList();
			this.getSchoolList();
		},
		components: {
			IconFont,
		},
		methods: {
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			/* 查询通知公告 */
			getNoticeList() {
				axios({
					url: 'dorm/notice/queryByName',
					method: 'post',
					params: {
						"title": this.title
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let notice of res.result) {
						let range = notice.type == 1 ? '全校' : notice.sslname;
						data.push({
							key: notice.id,
							title: notice.title,
							range: range,
							time: this.dateToFormat(new Date(notice.createTime * 1000)),
							name: '管理员'
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			resetAll() {
				this.title = '';
			},
			dateToFormat(date) {
				let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ';
				if (date.getHours() < 10) {
					str += '0' + date.getHours();
				} else {
					str += date.getHours();
				}
				str += ':'
				if (date.getMinutes() < 10) {
					str += '0' + date.getMinutes();
				} else {
					str += date.getMinutes();
				}
				return str;
			},
			showNotice(id) {
				this.schoolId = [];
				this.build = [];
				this.buildId = [];
				this.editId = id;
				axios({
					url: 'dorm/notice/updateMessage',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {

					this.addTitle = res.result.title;
					this.addContent = res.result.content;
					if (res.result.type == 2) {
						this.schoolId = [res.result.campusId];
						this.schoolChange([0]);
						this.buildId = [res.result.rowId];
					}
					this.show = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			showCancel() {
				this.show = false;
			},
			/* 获取校区列表 */
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {

					this.school.splice(0, this.school.length);
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.name
						});
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 获取宿舍楼列表 */
			schoolChange(value) {
				this.build = [];
				this.buildId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.schoolId[0]
					}
				}).then(res => {

					this.build.splice(0, this.build.length);
					for (let build of res.result) {
						this.build.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
		},
	};
</script>

<style>
	.top {
		padding: 20px;
		display: flex;
		align-items: center;
	}
</style>