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
				columns: [{
						title: '步骤序号',
						dataIndex: 'buzho',
						scopedSlots: {
							customRender: 'buzho'
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
						value: '1',
						label: "一天"
					},
					{
						value: '2',
						label: "一周"
					},
					{
						value: '3',
						label: "一个月"
					},
				],
				isList: [{
						value: true,
						label: "是"
					},
					{
						value: false,
						label: "否"
					},
				],
				inputTypeList: [{
						value: "1",
						label: "经办人员"
					},
					{
						value: "2",
						label: "经办角色"
					},
				]
			}
		},
		created() {},
		methods: {
			handleChange(value, key, column) {
				const newData = [...this.ApplyObj];
				const target = newData.find(item => key === item.key);
				if (target) {
					target[column] = value;
					this.ApplyObj = newData;
				}
			},
			async judesType(type, obj) {
				// 流程id ： processListId
				// 流程类型 ： processListType ----- 判断新增或修改
				// 流程窗口显示 ： processListShow -----判断显示/隐藏
				this.processListType = type
				this.processListId = obj
				this.processListShow = true
				if (type !== 'add') {
					// 数据回显内容
				} else {
					// 新增判断
				}
			},
			// 删除表单个
			reProcess(index) {
				this.ApplyObj.splice(index, 1)
			},
			//添加表单格
			addProcess() {
				var obj = {
					stepName:'',
					approverType:'',
					approverValue:'',
					timeoutHours: '1',
					isRequired: false,
				}
				this.ApplyObj.push(obj)
			},

			//添加
			tip() {
				console.log(this.ApplyObj)
				if (this.processListType == 'add') {
					// 添加数据执行操作
					this.$http.post('/sys/processType/save',this.processManagement).then((res)=>{
						console.log(res,'res??????')
					})
				} else {
					// 修改数据执行操作
				}
			},

			//取消按钮
			cancel() {
				this.ApplyObj = []
				this.processListShow = false
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