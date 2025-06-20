<template>
	<a-modal v-model="processListShow" :title="processListType == 'add' ? '流程申请' : processListType == 'change' ? '修改流程' : '重新提交'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox" v-if="processListType == 'regoup' && logs !=''">
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">审批返回信息</span>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">驳回理由：</div>
						</td>
						<td class="double">
							<a-textarea v-model="logs.comment" placeholder="请输入驳回理由"
								:auto-size="{ minRows: 3, maxRows: 5 }" disabled/>
						</td>
					</tr>
				</table>
			</div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">流程实体信息</span>
						</td>
					</tr>
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">流程选择：</div>
						</td>
						<td class="double">
							<a-select :options="inputTypeList" :disabled='processListType == "regoup"'
								placeholder="流程选择" v-model="processListName" @select="goup" />
						</td>
					</tr>
				</table>
			</div>
			<div class="pageContentBox" style="margin-top: 20px;">
				<div>
					<QJSQ ref='testRefsChildData' v-show="processListName == '学生请假流程审批'"/>
					<!-- <biaodancontent ref='testRefsChildData' /> -->
				</div>

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
	import JSelectLiuChen from '@/components/kwglbiz/JSelectLiuChen'
	import QJSQ from './QJSQ'
	export default {
		components: {
			ueditor,
			JSelectLiuChen,
			QJSQ
		},
		data() {
			return {
				processListShow: false,
				processListType: '',
				processListId: '',
				processListName: undefined,
				ApplyObj: [],
				isList: [{
						value: true,
						label: "是"
					},
					{
						value: false,
						label: "否"
					},
				],
				inputTypeList: [],
				setarr: [],
				formData: {},
				logs: ''
			}
		},
		mounted() {
			this.getliucen()
		},
		methods: {
			goup(e) {
				console.log(this.$refs.testRefsChildData, 'this.$refs.biaodan??????')
				this.$refs.testRefsChildData.doCreate()
			},
			getliucen() {
				console.log('?????????')
				this.$http.get('/sys/processType/select', {}).then((res) => {
					this.inputTypeList = []
					this.setarr = res.result
					var arr = res.result
					for (var i = 0; i < arr.length; i++) {
						var obj = {
							value: arr[i].name,
							label: arr[i].name
						}
						this.inputTypeList.push(obj)
					}
				})
			},

			async judesType(type, obj) {
				// 流程id ： processListId
				// 流程类型 ： processListType ----- 判断新增或修改
				// 流程窗口显示 ： processListShow -----判断显示/隐藏
				this.processListType = type
				this.processListShow = true
				if (type !== 'add') {
					// 数据回显内容
					this.processListId = obj
					var data = {
						id: this.processListId
					}
					this.$http.get('/sys/processInstance/queryById', data).then((res) => {
						if (type == 'regoup') {
							var arr = JSON.parse(res.result.logs)
							this.logs = arr[arr.length-1]
						}
						this.processListName = res.result.process_name
						var obj = JSON.parse(res.result.form_data)
						this.$refs.testRefsChildData.showup(res.result.process_name, obj)
					})
				} else {
					// 新增判断
					this.processListId = ''
				}
			},

			//添加
			tip() {
				console.log(this.ApplyObj)
				if (this.processListType == 'add') {
					this.$refs.testRefsChildData.createData(this.formData)
					console.log(this.formData, 'formData?????')
					if(this.formData.no){
						return
					}
					return
					// 添加数据执行操作
					// 新增判断
					var user = JSON.parse(sessionStorage.getItem('userInfo'))
					var msg = this.setarr.find(e => e.name == this.processListName)
					console.log(msg, 'msg??????')
					var data = {
						applicantId: user.userId,
						formData: this.formData,
						processTypeId: msg.id
					}
					this.$http.post('/sys/processInstance/createProcess', data).then((res) => {
						console.log(res, 'res??????')
						this.$message.success('新建成功！')
						this.$emit('JoinOrchangeStuSuss', 1)
						this.cancel()
					})

				} else if(this.processListType == 'change'){
					// 修改数据执行操作
					this.$refs.testRefsChildData.set(this.formData)
					console.log(this.formData, 'formData?????')
					// 添加数据执行操作
					// 新增判断
					var user = JSON.parse(sessionStorage.getItem('userInfo'))
					var msg = this.setarr.find(e => e.name == this.processListName)
					console.log(msg, 'msg??????')
					var data = {
						id: this.processListId,
						applicantId: user.userId,
						formData: this.formData,
						processTypeId: msg.id
					}
					this.$http.put('/sys/processInstance/edit', data).then((res) => {
						console.log(res, 'res??????')
						this.$message.success('修改成功！')
						this.$emit('JoinOrchangeStuSuss', 1)
						this.cancel()
					})
				} else {
					// 修改数据执行操作
					this.$refs.testRefsChildData.set(this.formData)
					console.log(this.formData, 'formData?????')
					// 添加数据执行操作
					// 新增判断
					var user = JSON.parse(sessionStorage.getItem('userInfo'))
					var msg = this.setarr.find(e => e.name == this.processListName)
					console.log(msg, 'msg??????')
					var data = {
						id: this.processListId,
						applicantId: user.userId,
						formData: this.formData,
						processTypeId: msg.id
					}
					this.$http.post('/sys/processInstance/resubmitProcess', data).then((res) => {
						console.log(res, 'res??????')
						this.$message.success('修改成功！')
						this.$emit('JoinOrchangeStuSuss', 1)
						this.cancel()
					})
				}
			},

			//取消按钮
			cancel() {
				this.$refs.testRefsChildData.cancel()
				this.processListName = undefined
				this.processListId = []
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