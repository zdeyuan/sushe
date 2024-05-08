<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title ">
			制度查询
		</div>
		<div class="pageContentBox">
			<div class="headTop">制度管理 > <span class="notTop">制度查询</span></div>
			<div class="content-head">
				<div>
					<a-button :size="size" class="content-button button-skyblue" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getSystemList">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>

				<div style="min-width: 400px;"></div>

				<div>
					<span class="head-span">标题</span>
					<a-input class="condition" placeholder="请输入标题" v-model="title" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
				</div>

				<div>
					<span class="head-span">类别</span>
					<a-cascader class="condition" :options="type" placeholder="请选择类别" v-model="typeId" />
				</div>

				<div>
					<a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getSystemList">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						搜索
					</a-button>

					<a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll()">
						<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px;color:#00d09d;border-bottom: 1px solid #00d09d;" @click="showModal(record.key)">查看</a>
					</span>
				</a-table>
			</div>
		</div>
		<a-modal width='800px' title="查看" :visible="visible" :confirm-loading="confirmLoading" @cancel="handleCancel">
			<div class="systemSeeBox">
				<div class="systemTop">
					{{editTitle}}
				</div>
				<div class="systemReleaseMsg">
					<span class="msgs">
						<span class="tips">发布时间：</span>
						<span>{{js_date_time_second(editTime)}}</span>
					</span>
					<span class="msgs">
						<span class="tips">发布人：</span>
						<span>{{editName}}</span>
					</span>
				</div>
				<div class="systemCount">
					{{editContent}}
				</div>
				<div class="systemType">
					类别：{{editTypeName}}
				</div>	
			</div>
<!-- 			<table class="scanTable">
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>标题:</div>
					</td>
					<td class="double">
						<a-input :disabled="true" v-model="editTitle" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>内容:</div>
					</td>
					<td class="double"><textarea :disabled="true" class="scanInput"
							v-model="editContent"><textarea></textarea></td>
				</tr>
				<tr>
					<td class="single">
						<div>排序:</div>
					</td>
					<td class="double">
						<a-input-number :disabled="true" class="scanInput" v-model="editListSort" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>类别:</div>
					</td>
					<td class="double">
						<a-cascader :disabled="true" class="scanInput" :options="editType" v-model="editTypeId" />
					</td>
				</tr>
			</table> -->
			<template slot="footer" class="floor-footer">
				<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="handleCancel">取消</a-button>
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
			title: '类别',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '用户姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '发布时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			width: '40%',
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
				type: [],
				typeId: [],
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
				title: '',
				editType: [],
				editTypeId: [],
				editTitle: '',
				editTime:'',
				editName:'',
				editContent: '',
				editListSort: '',
				editTypeName: ''
			};
		},
		mounted() {
			this.getTypeList();
			this.getSystemList();
		},
		components: {
			IconFont,
		},
		methods: {
			js_date_time_second(time){
			  var date = new Date(time * 1000);
			  var y = date.getFullYear();
			  var m = date.getMonth() + 1;
			  m = m < 10 ? ('0' + m) : m;
			  var d = date.getDate();
			  d = d < 10 ? ('0' + d) : d;
			  var h = date.getHours();
			  h = h < 10 ? ('0' + h) : h;
			  var minute = date.getMinutes();
			  var second = date.getSeconds();
			  minute = minute < 10 ? ('0' + minute) : minute;
			  second = second < 10 ? ('0' + second) : second;
			  var timeStr = y + '-' + m + '-' + d + '　' + h + ':' + minute + ':' + second;
			  return timeStr;
			},
			showModal(id) {
				axios({
					url: 'dorm/news/updateNewsMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {
					this.edit = true;
					this.editTitle = res.result.title;
					this.editTime = res.result.createTime;
					this.editName = res.result.createUserName
					this.editContent = res.result.content;
					this.editListSort = res.result.listSort;
					this.editTypeId = [res.result.typeId];
					this.editTypeName = res.result.typeName;
					this.visible = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			clearShcoolType() {
				console.log(this.$refs.school);
			},
			getTypeList() {
				axios({
					url: 'dorm/news/queryByName',
					method: 'post',
					params: {
						"name": ''
					}
				}).then(res => {

					this.type.splice(0, this.type.length);
					this.editType.splice(0, this.editType.length);
					for (let type of res.result) {
						this.type.push({
							value: type.id,
							label: type.typeName
						});
						this.editType.push({
							value: type.id,
							label: type.typeName
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			getSystemList() {
				let typeId = this.typeId.length == 0 ? '' : this.typeId[0];
				axios({
					url: 'dorm/news/queryNewsByName',
					method: 'post',
					params: {
						"title": this.title,
						"typeId": typeId
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let system of res.result) {
						data.push({
							key: system.id,
							sort: system.listSort,
							title: system.title,
							type: system.typeName,
							name: system.createUserName,
							time: this.dateToFormat(new Date(system.createTime * 1000)),
						})
					}
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
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
				console.log(str)
				return str;
			},
			resetAll() {
				this.title = '';
				this.typeId = '';
			}
		},
	};
</script>

<style scoped="scoped">
	textarea {
		resize: none;
		width: 300px;
		height: 100px;
		border: 1px solid #D9D9D9;
		outline: #D9D9D9;
		outline-width: 1px;
	}
	.systemSeeBox{
		padding: 10px;
	}
	.systemTop{
		font-size: 30px;
		font-weight: 700;
		text-align: center;
		color: #1885EA;
	}
	.systemReleaseMsg{
		text-align: center;
		margin: 5px 0;
	}
	.msgs{
		font-size: 24px;
		margin: 10px;
	}
	.tips{
		
		color: #1885EA;
	}
	.systemType{
		font-size: 24px;
		margin: 10px 0;
		color: #1885EA;
	}
	.systemCount{
		font-size: 24px;
		margin: 20px 0;
	}
</style>
