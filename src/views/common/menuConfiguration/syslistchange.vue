<template>
	<a-modal v-model="syslistchange" title="系统菜单权限修改" :width="1073" :footer='false'>
		<div style="display: flex;">
			<div style="margin-right: 30px;">
				<a-table :columns="columns" :data-source="manage" rowKey='id'>
					<span slot="action" slot-scope="text, record">
						<span style="color: #028BE2; cursor:pointer;" @click="getSysMenuTreeList(record)">修改权限</span>
					</span>
				</a-table>
			</div>
			<div>
				<div style="margin-bottom: 30px;">
					{{tablename}}
					<a-button type="primary" style="margin-left: 30px;" @click="onChange">
						权限修改
					</a-button>
				</div>
				<a-table :columns="columns2" :data-source="dataup" rowKey='id' :row-selection="rowSelection"
					@change="tableChange">
					<span slot="action" slot-scope="text, record">
						<a-switch :checked="judeShow(record)" disabled />
						<!-- {{judeShow(record) ? '已启用' : '已禁止'}} -->
					</span>
				</a-table>
			</div>
		</div>
	</a-modal>
</template>
<script>
	import {
		axios
	} from '@/utils/request'

	export default {
		data() {
			return {
				ApplyObj: {}, //弹窗对象
				syslistchange: false,
				joinNotEite: false,
				joinOrChangeStuType: '',
				selectedRowKeys: [],
				columns: [{
						title: '系统名称',
						dataIndex: 'appName',
						key: 'appName',
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
				columns2: [{
						title: '菜单名称',
						dataIndex: 'text',
						key: 'text',
					},
					{
						title: '备注',
						dataIndex: 'tip',
						key: 'tip',
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
				manage: [],
				dataup: [],
				tablename: '',
				tableid: '',
				roldmenu: []
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
			this.manage = JSON.parse(localStorage.getItem('manage'))
			console.log(this.manage, 'this.manage??????')
			var arr = []
			for (var i = 0; i < this.manage.length; i++) {
				if (this.manage[i].appName != '统一管理平台' && this.manage[i].appName != '公共数据平台') {
					arr.push(this.manage[i])
				}
			}
			this.manage = arr
			console.log(this.manage, 'this.manage??????')
		},
		methods: {
			tableChange(){
				
			},
			onSelectChange(selectedRowKeys) {
				console.log('selectedRowKeys changed: ', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			judeShow(msg) {
				var flag = false
				for (var i = 0; i < this.roldmenu.length; i++) {
					if (this.roldmenu[i].menuId == msg.id) {
						flag = true
					}
				}
				return flag
			},
			onChange() {
				var roleId = JSON.parse(sessionStorage.getItem('sbcdjsqx'))
				var arr = []
				for(var i = 0;i<this.roldmenu.length;i++){
					arr.push(this.roldmenu[i].menuId)
				}
				
				for(var i = 0;i<this.selectedRowKeys.length;i++){
					var index = arr.findIndex(e=>e == this.selectedRowKeys[i])
					if(index == -1){
						arr.push(this.selectedRowKeys[i])
					}else{
						arr.splice(index, 1)
					}
				}
			
				var data = {
					text: roleId.text,
					id: roleId.id,
					appId: this.tableid,
					ids: arr
				}
				axios({
						url: '/edu-base/base/VeBaseSysRole/editSysRoleAndMenu',
						method: 'post',
						data: data
					})
					.then((res) => {
						axios({
								url: '/edu-base/base/VeBaseSysRole/getSysRoleMenuListByRoleIdAppId?appId=' + this
									.tableid +
									'&roleId=' + roleId.id,
								method: 'get',
							})
							.then((res) => {
								console.log(res, 'res??????')
								// this.dataup = res.result
								this.roldmenu = res.result
								this.selectedRowKeys = []
							})
							.catch((err) => {

							})
					})
					.catch((err) => {

					})
			},
			getSysMenuTreeList(obj) {
				console.log(obj, 'obj？？？？？')
				this.tablename = obj.appName
				this.tableid = obj.id
				axios({
						url: '/edu-base/base/VeBaseSysRole/getSysMenuTreeList?id=' + obj.id,
						method: 'get',
					})
					.then((res) => {
						console.log(res, 'res??????')
						this.dataup = res.result
					})
					.catch((err) => {

					})
				var roleId = JSON.parse(sessionStorage.getItem('sbcdjsqx'))
				axios({
						url: '/edu-base/base/VeBaseSysRole/getSysRoleMenuListByRoleIdAppId?appId=' + obj.id +
							'&roleId=' + roleId.id,
						method: 'get',
					})
					.then((res) => {
						console.log(res, 'res??????')
						// this.dataup = res.result
						this.roldmenu = res.result
					})
					.catch((err) => {

					})
			},
			async judesType(type, obj) {
				this.joinOrChangeStuType = type
				this.syslistchange = true
				this.dataup = []
				this.tablename = ''
				this.roldmenu = []
			},
			//取消按钮
			cancel() {
				this.ApplyObj = {}
				this.joinOrChangeStuShow = false
			},
		},
	}
</script>

