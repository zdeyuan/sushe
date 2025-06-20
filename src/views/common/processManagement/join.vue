<template>
	<a-modal v-model="processListShow" :title="processListType == 'add' ? '添加表单' : '修改表单'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">流程配置</span>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">流程名称：</div>
						</td>
						<td class="double">
							<a-input class="input-style-reply" style="margin-left: 0px;" placeholder="请输入流程名称"
								v-model="processManagement.name">
							</a-input>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">是否启用：</div>
						</td>
						<td class="double">
							<a-select :options="isList" placeholder="请选择是否启用" v-model="processManagement.isActive" />
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">流程描述：</div>
						</td>
						<td class="double">
							<a-input v-model="processManagement.description" class="input-style-reply"
								style="margin-left: 0px;" placeholder="请输入流程描述">
							</a-input>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">流程版本：</div>
						</td>
						<td class="double">
							<a-input v-model="processManagement.version" class="input-style-reply"
								style="margin-left: 0px;" placeholder="请输入流程版本">
							</a-input>
						</td>
					</tr>
				</table>
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">显示字段</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td colspan="4">
							<a-button type="primary" @click="addshowColumn" style="margin-right: 20px;">
								添加显示字段
							</a-button>
						</td>
					</tr>

					<!-- <div v-for="(val,key) in ApplyObj" style="padding: 20px;"> -->

					<a-table :pagination="false" :columns="showColumncolumns" :data-source="showColumn" bordered>
						<template v-for="col in ['name','jz','zhiddian']" :slot="col" slot-scope="text, record, index">
							<div :key="col" v-if="col == 'name'">
								<a-input :value="record.name"
									@change="e => showColumnhandleChangename(e.target.value, record.name, col,'name')"
									class="input-style-reply" style="margin-left: 0px; width: 150px;"
									placeholder="请输入显示名称">
								</a-input>
							</div>
							<div :key="col" v-if="col == 'jz'">
								<a-input :value="record.jz"
									@change="e => showColumnhandleChangejz(e.target.value, record.jz, col,'jz')"
									class="input-style-reply" style="margin-left: 0px; width: 150px;"
									placeholder="请输入代表键值">
								</a-input>
							</div>
							<div :key="col" v-if="col == 'zhiddian'">
								<a-input v-model="record.zhiddian" class="input-style-reply"
									style="margin-left: 0px; width: 150px;" placeholder="请输入字典值">
								</a-input>
							</div>
						</template>
						<template slot="operation" slot-scope="text, record, index">
							<div class="editable-row-operations">
								<a-button type="danger" @click="reshowColumnProcess(index)">
									删除显示字段
								</a-button>
							</div>
						</template>
					</a-table>
				</table>
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">步骤信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td colspan="4">
							<a-button type="primary" @click="addProcess" style="margin-right: 20px;">
								添加步骤
							</a-button>
						</td>
					</tr>

					<!-- <div v-for="(val,key) in ApplyObj" style="padding: 20px;"> -->

					<a-table :pagination="false" :columns="columns" :data-source="ApplyObj" bordered>
						<template
							v-for="col in ['stepOrder','stepName', 'approverType', 'approverValue','isRequired','timeoutHours']"
							:slot="col" slot-scope="text, record, index">
							<div :key="col" v-if="col == 'stepOrder'">
								{{record.stepOrder}}
							</div>
							<div :key="col" v-if="col == 'stepName'">
								<a-input :value="record.stepName"
									@change="e => handleChange(e.target.value, record.stepOrder, col)"
									class="input-style-reply" style="margin-left: 0px; width: 150px;"
									placeholder="请输入步骤名称">
								</a-input>
							</div>
							<div :key="col" v-if="col == 'approverType'">
								<a-select :value="record.approverType" :options="inputTypeList" placeholder="请选择审批人类型"
									@change="e => handleChange(e, record.stepOrder, col)" />
							</div>
							<div :key="col" v-if="col == 'approverValue'">
								<JSelectAllrols v-if='record.approverType == "role"' v-model="record.approverValue">
								</JSelectAllrols>
								<JSelectAllUser v-if='record.approverType == "user"' v-model="record.approverValue">
								</JSelectAllUser>
								<!-- <a-select :value="record.approverValue" :options="inputTypeList" placeholder="请选择审批人"
									@change="e => handleChange(e, record.stepOrder, col)" /> -->
							</div>
							<div :key="col" v-if="col == 'isRequired'">
								<a-select :value="record.isRequired" :options="isList" placeholder="请选择是否必需审批"
									@change="e => handleChange(e, record.stepOrder, col)" />
							</div>
							<div :key="col" v-if="col == 'timeoutHours'">
								<a-select :value="record.timeoutHours" :options="isdayList" placeholder="请选择审批超时时间"
									@change="e => handleChange(e, record.stepOrder, col)" />
							</div>
						</template>
						<template slot="operation" slot-scope="text, record, index">
							<div class="editable-row-operations">
								<a-button type="danger" @click="reProcess(index)">
									删除步骤
								</a-button>
							</div>
						</template>
					</a-table>

					<!-- <table class="scanTable top-div" style="text-align: left">
							<tr class="tr-style" style="width: 100%;">
								<td class="td-div" style="padding: 10px;">
									<a-button type="danger" @click="reProcess(key)">
										删除步骤
									</a-button>
								</td>
							</tr>
							<tr class="tr-style">
								<td class="td-div">
									<div class="font-style">步骤{{key+1}}</div>
								</td>
							</tr>
							<tr class="tr-style">
								<td class="td-div">
									<div class="font-style">步骤名称：</div>
								</td>
								<td class="double">
									<a-input class="input-style-reply" style="margin-left: 0px;" placeholder="请输入步骤名称"
										v-model="val.stepName">
									</a-input>
								</td>
							</tr>
							<tr class="tr-style">
								<td class="td-div">
									<div class="font-style">审批人类型：</div>
								</td>
								<td class="double">
									<a-select :options="inputTypeList" placeholder="请选择审批人类型"
										v-model="val.approverType" />
								</td>
							</tr>
							<tr class="tr-style">
								<td class="td-div">
									<div class="font-style">审批人：</div>
								</td>
								<td class="double">
									<a-select :options="inputTypeList" placeholder="请选择审批人"
										v-model="val.approverValue" />
								</td>
							</tr>
							<tr class="tr-style">
								<td class="td-div">
									<div class="font-style">是否必需审批：</div>
								</td>
								<td class="double">
									<a-select :options="isList" placeholder="请选择是否必需审批" v-model="val.isRequired" />
								</td>
							</tr>
							<tr class="tr-style">
								<td class="td-div">
									<div class="font-style">审批超时时间：</div>
								</td>
								<td class="double">
									<a-select :options="isdayList" placeholder="请选择审批超时时间" v-model="val.timeoutHours" />
								</td>
							</tr>
						</table>
					</div> -->
				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" @click="tip"> 确定 </a-button>
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
	import ueditor from '@/components/ueditor';
	import JSelectAllrols from '@/components/kwglbiz/JSelectAllrols'
	import JSelectAllUser from '@/components/kwglbiz/JSelectAllUser'
	export default {
		components: {
			ueditor,
			JSelectAllUser,
			JSelectAllrols
		},
		data() {
			return {
				processListShow: false,
				processListType: '',
				processManagement: {},
				ApplyObj: [],
				showColumn: [],
				showColumncolumns: [{
						title: '显示字段名称',
						dataIndex: 'name',
						scopedSlots: {
							customRender: 'name'
						},
					},
					{
						title: '显示字段键值',
						dataIndex: 'jz',
						scopedSlots: {
							customRender: 'jz'
						},
					},
					{
						title: '是否字典(没有为空)',
						dataIndex: 'zhiddian',
						scopedSlots: {
							customRender: 'zhiddian'
						},
					},
					{
						title: '操作',
						dataIndex: 'operation',
						scopedSlots: {
							customRender: 'operation'
						},
					},
				],
				columns: [{
						title: '步骤',
						dataIndex: 'stepOrder',
						scopedSlots: {
							customRender: 'stepOrder'
						},
					},
					{
						title: '步骤名称',
						dataIndex: 'stepName',
						scopedSlots: {
							customRender: 'stepName'
						},
					},
					{
						title: '审批人类型',
						dataIndex: 'approverType',
						scopedSlots: {
							customRender: 'approverType'
						},
					},
					{
						title: '审批人值',
						width: 250,
						dataIndex: 'approverValue',
						scopedSlots: {
							customRender: 'approverValue'
						},
					},
					{
						title: '是否必须审批',
						dataIndex: 'isRequired',
						scopedSlots: {
							customRender: 'isRequired'
						},
					},
					{
						title: '审批超时时间',
						dataIndex: 'timeoutHours',
						scopedSlots: {
							customRender: 'timeoutHours'
						},
					},
					{
						title: '操作',
						dataIndex: 'operation',
						scopedSlots: {
							customRender: 'operation'
						},
					},
				],
				isdayList: [{
						value: 0,
						label: "一天"
					},
					{
						value: 1,
						label: "一周"
					},
					{
						value: 2,
						label: "一个月"
					},
				],
				isList: [{
						value: 0,
						label: "是"
					},
					{
						value: 1,
						label: "否"
					},
				],
				inputTypeList: [{
						value: "user",
						label: "经办人员"
					},
					{
						value: "role",
						label: "经办角色"
					},
					{
						value: "dynamic",
						label: "动态规则"
					},
				]
			}
		},
		created() {},
		methods: {
			showinfo() {
				this.$http.post('/sys/processStep/save', data).then((res) => {
					console.log(res, 'res??????')
					if (res.code == 200) {
						this.$message.success('保存成功！')
						this.$emit('JoinOrchangeStuSuss', 1)
						this.cancel()
					}
				})
			},
			handleChange(value, key, column) {
				const newData = [...this.ApplyObj];
				const target = newData.find(item => key === item.stepOrder);
				if (target) {
					target[column] = value;
					this.ApplyObj = newData;
				}
			},
			showColumnhandleChangejz(value, key, column, name) {
				const newData = [...this.showColumn];
				const target = newData.find(item => key === item.jz);
				if (target) {
					target[column] = value;
					this.showColumn = newData;
				}
			},
			showColumnhandleChangezd(value, key, column, name) {
				const newData = [...this.showColumn];
				const target = newData.find(item => key === item.zhiddian);
				if (target) {
					target[column] = value;
					this.showColumn = newData;
				}
			},
			showColumnhandleChangename(value, key, column, name) {
				const newData = [...this.showColumn];
				const target = newData.find(item => key === item.name);
				if (target) {
					target[column] = value;
					this.showColumn = newData;
				}
			},
			async judesType(type, obj) {
				// 流程id ： processListId
				// 流程类型 ： processListType ----- 判断新增或修改
				// 流程窗口显示 ： processListShow -----判断显示/隐藏
				this.processListType = type
				this.processListShow = true
				if (type !== 'add') {
					// 数据回显内容
					this.processManagement = obj
					console.log(obj, 'obj?????')
					if (obj.showColumn != null) {
						this.showColumn = JSON.parse(obj.showColumn)
					}
					this.$http.get('/sys/processStep/list', {
						processTypeId: this.processManagement.id
					}).then((res) => {
						console.log(res, 'res??????')
						this.ApplyObj = res.result.records
					})
				} else {
					this.processManagement = {}
				}
			},
			reshowColumnProcess(index) {
				this.showColumn.splice(index, 1)
				console.log(this.showColumn, 'this.ApplyObj[i].stepOrder???')
				var newData = [...this.showColumn];
				for (var i = 0; newData.length; i++) {
					newData[i]['stepOrder'] = i + 1
				}
				this.showColumn = newData;
			},
			// 删除表单个
			reProcess(index) {
				this.ApplyObj.splice(index, 1)
				console.log(this.ApplyObj, 'this.ApplyObj[i].stepOrder???')
				var newData = [...this.ApplyObj];
				for (var i = 0; newData.length; i++) {
					newData[i]['stepOrder'] = i + 1
				}
				this.ApplyObj = newData;
			},
			addshowColumn() {
				var obj = {
					name: '',
					key: '',
					zd: ''
				}
				this.showColumn.push(obj)
			},
			//添加表单格
			addProcess() {
				var obj = {
					stepOrder: this.ApplyObj.length + 1,
					stepName: '',
					approverType: '',
					approverValue: '',
					timeoutHours: '0',
					isRequired: '0',
				}
				this.ApplyObj.push(obj)
			},

			//添加
			tip() {
				console.log(this.ApplyObj)
				if (this.processListType == 'add') {

					if (this.processManagement.name == '') {
						this.$message.warning('流程名称没有填写，请确认')
						return
					}

					if (this.processManagement.isActive === '') {
						this.$message.warning('是否启用没有选择，请确认')
						return
					}

					if (this.processManagement.description == '') {
						this.$message.warning('流程描述没有填写，请确认')
						return
					}

					if (this.processManagement.version == '') {
						this.$message.warning('流程版本没有填写，请确认')
						return
					}

					// 添加数据执行操作
					for (var i = 0; i < this.ApplyObj.length; i++) {
						if (this.ApplyObj[i].stepName == '') {
							this.$message.warning(`步骤${this.ApplyObj[i].stepOrder}的步骤名称没有填写，请确认`);
							return
						}
						if (this.ApplyObj[i].approverType == '') {
							this.$message.warning(`步骤${this.ApplyObj[i].stepOrder}的审批人类型没有选择，请确认`);
							return
						}
						if (this.ApplyObj[i].approverValue == '') {
							this.$message.warning(`步骤${this.ApplyObj[i].stepOrder}的审批人值没有选择，请确认`);
							return
						}
					}
					this.processManagement.showColumn = JSON.stringify(this.showColumn)
					var data = {
						processType: this.processManagement,
						steps: this.ApplyObj,
					}

					this.$http.post('/sys/processStep/save', data).then((res) => {
						if (res.code == 200) {
							this.$message.success('保存成功！')
							this.$emit('JoinOrchangeStuSuss', 1)
							this.cancel()
						}
					})
				} else {
					// 修改数据执行操作
					console.log(this.processManagement, 'this.processManagement????')
					if (this.processManagement.name == '') {
						this.$message.warning('流程名称没有填写，请确认')
						return
					}

					if (this.processManagement.isActive === '') {
						this.$message.warning('是否启用没有选择，请确认')
						return
					}

					if (this.processManagement.description == '') {
						this.$message.warning('流程描述没有填写，请确认')
						return
					}

					if (this.processManagement.version == '') {
						this.$message.warning('流程版本没有填写，请确认')
						return
					}

					// 添加数据执行操作
					for (var i = 0; i < this.ApplyObj.length; i++) {
						if (this.ApplyObj[i].stepName == '') {
							this.$message.warning(`步骤${this.ApplyObj[i].stepOrder}的步骤名称没有填写，请确认`);
							return
						}
						if (this.ApplyObj[i].approverType == '') {
							this.$message.warning(`步骤${this.ApplyObj[i].stepOrder}的审批人类型没有选择，请确认`);
							return
						}
						if (this.ApplyObj[i].approverValue == '') {
							this.$message.warning(`步骤${this.ApplyObj[i].stepOrder}的审批人值没有选择，请确认`);
							return
						}
					}
					console.log(this.showColumn, 'this.showColumn?????')
					this.processManagement.showColumn = JSON.stringify(this.showColumn)
					var data = {
						processType: this.processManagement,
						steps: this.ApplyObj,
					}

					this.$http.post('/sys/processStep/save', data).then((res) => {
						console.log(res, 'res??????')
						if (res.code == 200) {
							this.$message.success('保存成功！')
							this.$emit('JoinOrchangeStuSuss', 1)
							this.cancel()
						}
					})
				}
			},

			//取消按钮
			cancel() {
				this.processManagement = {}
				this.showColumn = []
				this.ApplyObj = []
				this.processListShow = false
				this.$emit('JoinOrchangeStuSuss', 1)
			},
		},
	}
</script>

<style>
	.count {
		padding: 0px;
		margin-top: 10px;
	}

	.tb {
		text-align: left;
	}

	.scanTable {
		width: 100%;
	}

	/* 表行高样式 */
	.tr-style {
		height: 49px;
		border: 1px solid #dee2e6;
	}

	/* 行颜色 */
	.tr-color {
		padding-left: 10px;
		box-sizing: border-box;
		height: 60px;
		width: 100%;
		background: #66c3fd;
		color: #fff;
	}

	.input-style-reply {
		color: #666666;
		width: 300px;
		border: 1px solid #666;
		background-color: #ffffff;
		border: 0;
		/* margin-left: 5px; */
	}

	.input-style-replyTwo {
		color: #666666;
		width: 180px;
		background-color: #ffffff;
		border: 0;
		/* margin-left: 5px; */
	}

	.td-div {
		padding-left: 10px;
		box-sizing: border-box;
		width: 159px;
	}

	.btn {
		width: 100px;
		height: 40px;
		background: #0098f8;
		border-radius: 5px;
		font-family: Microsoft YaHei;
		color: #ffffff;
	}

	.applyBtn-div {
		width: 100%;
	}

	.btn-style {
		width: 100px;
		height: 40px;
		margin-bottom: 33px;
		margin-top: 30px;
	}


	.date-style-Apply .ant-input {
		width: 300px;
		height: 34px;
	}

	.r-style {}

	.icon-img {
		margin-bottom: 5px;
		margin-right: 1px;
	}

	.info-tip {
		width: 94px;
		height: 19px;

		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
	}

	.tableClean-button {
		width: 88px;
		height: 34px;
		margin-right: 0px;
		margin-left: 10px;
		background: #028BE2;
		border-radius: 5px;
		color: #fff;

		&:hover {
			background: #028BE2;
			color: #fff;
		}
	}
</style>