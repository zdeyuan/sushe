<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title">
			楼层管理
		</div>
		<div class="pageContentBox">
			<div class="headTop">基础管理 > <span class="notTop">楼层管理</span></div>
			<div class="content-head">
				<div>
					<a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="showModal">
						<icon-font type="icontianjia" style="color: #FFFFFF; " />
						添加
					</a-button>
					<a-modal title="添加" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
						@cancel="handleCancel">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div>宿舍-校区楼:</div>
								</td>
								<td class="double">
									<a-cascader class="small" :options="addSchool" placeholder="请选择校区"
										@change="addSchoolChange" v-model="addSchoolId" />
									<a-cascader class="small" :options="addBuild" placeholder="请选择宿舍楼"
										v-model="addBuildId" />
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>楼层名称:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入楼层名称" v-model="addName" />
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>楼层代码:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入楼层代码" v-model="addCode" />
								</td>
							</tr>
						</table>
						<template slot="footer" class="floor-footer">
							<a-button type="primary" style="background-color:#0098f8;font-weight:bold;color:#ffffff" @click="handleOk()">确定</a-button>
							<a-button style="background-color:#999999;font-weight:bold;color:#ffffff" @click="handleCancel()">取消</a-button>
						</template>
					</a-modal>

					<a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="patchDelete">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						删除
					</a-button>

					<a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getFloorList">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>

				<div style="min-width: 320px;"></div>

				<div>
					<span class="head-span">校区</span>
					<a-cascader class="condition" :options="school" placeholder="请选择校区" @change="schoolChange"
						v-model="schoolId" />
				</div>

				<div>
					<span class="head-span">宿舍楼</span>
					<a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" v-model="buildId" />
				</div>

				<div>
					<a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642  " @click="getFloorList">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						搜索
					</a-button>

					<a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A  " @click="resetAll">
						<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :row-selection="{ selectedRowKeys: deleteList, onChange: onSelectChange }" :defaultCurrent="6"
					:pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px; border-bottom: 1px solid #66C3FD;" @click="editFloor(record.key)">编辑</a>
						<span>|</span>
						<a style="font-size:18px;color:orange; border-bottom: 1px solid orange;"
							@click="deleteFloor(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</div>
		<!-- </a-card> -->
		<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK" @cancel="editCancel">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div>楼层名称:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入楼层名称" v-model="editName" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>楼层代码:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入楼层代码" v-model="editCode" />
					</td>
				</tr>
			</table>
			<template slot="footer" class="floor-footer">
				<a-button type="primary" @click="editOK()">确定</a-button>
				<a-button @click="editCancel()">取消</a-button>
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
	} from "@/utils/request"

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '楼层名称',
			dataIndex: 'name',
			width: '15%',
			key: 'name',
		},
		{
			title: '楼层代码',
			dataIndex: 'code',
			key: 'code',
		},
		// {
		// 	title: '宿舍楼',
		// 	dataIndex: 'jzwmc',
		// 	key: 'jzwmc',
		// },
		// {
		// 	title: '校区',
		// 	dataIndex: 'xqmc',
		// 	key: 'xqmc',
		// },
		{
			title: '操作',
			dataIndex: 'operator',
			width: '15%',
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
				school: [],
				build: [],
				schoolId: [],
				buildId: [],
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				addName: '',
				addCode: '',
				addSchool: [],
				addSchoolId: [],
				addBuild: [],
				addBuildId: [],
				editId: '',
				edit: false,
				editName: '',
				editCode: '',
				deleteList:[]
			};
		},
		mounted() {
			this.getSchoolList();
			this.getFloorList();
		},
		components: {
			IconFont,
		},
		methods: {
			onSelectChange(selectedRowKeys){
				this.deleteList = selectedRowKeys;
			},
			showModal() {
				this.addName = '';
				this.addCode = '';
				this.addSchoolId = [];
				this.addBuild = [];
				this.addBuildId = [];
				this.visible = true;
			},
			handleOk(e) {
				this.confirmLoading = true;
				if (this.addName == '' || this.addCode == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/floorMng/addLouCeng',
					method: 'post',
					params: {
						"xqh": this.addSchoolId[0],
						"jzwh": this.addBuildId[0],
						"lcName": this.addName,
						"lcCode": this.addCode
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getFloorList();
					this.visible = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("添加楼层失败");
				})
			},
			handleCancel(e) {
				console.log('Clicked cancel button');
				this.visible = false;
			},
			onChange(value) {
				console.log(value);
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getFloorList() {
				// this.rowSelection = []
				this.deleteList = []
				let xqId = this.schoolId.length == 0 ? null : this.schoolId[0];
				let sslId = this.buildId.length == 0 ? null : this.buildId[0];
				axios({
					url: 'dorm/floorMng/select',
					method: 'post',
					params: {
						"xqId": xqId,
						"sslId": sslId,
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let floor of res.result) {
						data.push({
							key: floor.id,
							name: floor.lcname,
							code: floor.lccode,
							jzwmc: floor.jzwmc,
							xqmc: floor.xqmc
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("获取楼层列表失败");
				})
			},
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {

					}
				}).then(res => {

					for (let sc of res.result) {
						this.school.push({
							value: sc.id,
							label: sc.name
						});
						this.addSchool.push({
							value: sc.id,
							label: sc.name
						})
					}
				}).catch(err => {
					this.$message.warning("获取校区列表失败");
				})
			},
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
					this.$message.warning("获取宿舍楼列表失败");
				})
			},
			addSchoolChange(value) {
				this.addBuild = [];
				this.addBuildId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.addSchoolId[0]
					}
				}).then(res => {

					this.addBuild.splice(0, this.addBuild.length);
					for (let build of res.result) {
						this.addBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("获取宿舍楼列表失败");
				})
			},
			resetAll() {
				this.schoolId = [];
				this.buildId = [];
				this.build.splice(0, this.build.length);
			},
			editFloor(id) {
				this.editId = id;
				axios({
					url: 'dorm/floorMng/getEdit',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.editName = res.result.lcname;
					this.editCode = res.result.lccode;
					this.edit = true;
				}).catch(err => {
					this.$message.warning("获取该楼层信息失败");
				})
			},
			editOK() {
				if (this.editName == '' || this.editCode == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/floorMng/edit',
					method: 'post',
					params: {
						"id": this.editId,
						"lcName": this.editName,
						"lcCode": this.editCode,
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getFloorList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("修改楼层信息失败");
				})
			},
			editCancel() {
				this.edit = false;
			},
			deleteFloor(id) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/floorMng/delete',
						method: 'post',
						params: {
							"id": id,
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getFloorList();
					}).catch(err => {
						this.$message.warning("删除失败");
					})
				}
			},
			patchDelete() {
				if (this.deleteList.length == 0) {
					this.$message.warning("请选中要删除的列");
					return;
				}
				let re = confirm("确认批量删除?");
				let deleteStr = '';
				for (let i = 0; i < this.deleteList.length; i++) {
					deleteStr += this.deleteList[i];
					if (i < this.deleteList.length - 1) {
						deleteStr += ',';
					}
				}
				if (re) {
					axios({
						url: 'dorm/floorMng/deleteMany',
						method: 'post',
						params: {
							"ids": deleteStr,
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getFloorList();
					}).catch(err => {
						this.$message.warning("批量删除失败");
					})
				}
			}
		}
	};
</script>

<style>
</style>
