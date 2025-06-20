<template>
	<a-modal v-model="processListShow" :title="processListType == 'add' ? '审批流程' : '审批流程'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<div>
					<!-- <QJSQ ref='testRefsChildData' :buke='true' v-if="processListName == '学生请假流程审批'"/>
					<PYFA ref='testRefsChildData' :buke='true' v-if="processListName == '培养方案流程审批'"/>
					<XSXJXG ref='testRefsChildData' :buke='true' v-if="processListName == '学籍修改'"/> -->
					<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
						<div style="width: 50%;" v-for="(val,key) in showcolumn">
							<div v-for="(val1,key1) in formdata" v-if="val.jz == key1" style="margin: 10px 0; font-weight: 700;">
								<div v-if="val.zhiddian" class="flex"><span>{{val.name}}：</span><edu-data v-model="formdata[key1]" stype="select" :code="val.zhiddian"  :disabled='true'/></div>
								<div v-else class="flex"><span>{{val.name}}：</span>{{val1 == '' ? '暂无数据' : val1}}</div>
							</div>
						</div>
					</div>
				</div>

				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">当前审批节点</span>
						</td>
					</tr>
					<tr class="tr-style" v-for="(val,key) in steps" v-if="key == (stepsindex-1)">
						<td class="td-div">
							<div class="font-style">{{key == (stepsindex-1) ? '当前节点' : '节点名称'}}：</div>
						</td>
						<td class="double">
							{{val.step_name}}
						</td>
					</tr>
				</table>

				<table class="scanTable top-div" style="text-align: left;margin-top: 20px;" v-if="rebuck == true">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">驳回理由</span>
						</td>
					</tr>
					<tr class="tr-style">
						<td>
							<a-textarea v-model="comment" placeholder="请输入驳回理由"
								:auto-size="{ minRows: 3, maxRows: 5 }" />
						</td>
					</tr>
				</table>

				<!-- 按钮区 -->
				<div class="content-head">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button class="search-button btn-style btn" v-if="rebuck == false" @click="tip"> 同意审批 </a-button>
								<a-button class="search-button btn-style btn-cancle" v-if="rebuck == false" @click="rebuck = true"> 驳回审批
								</a-button>
								
								<a-button class="search-button btn-style btn" v-if="rebuck == true" @click="cancel"> 确认驳回 </a-button>
								<a-button class="search-button btn-style btn-cancle" v-if="rebuck == true" @click="rebuck = false"> 取消驳回
								</a-button>
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
	// import biaodancontent from '../processList/content.vue'
	// import QJSQ from '../processList/QJSQ.vue'
	// import PYFA from '../processList/PYFA.vue'
	// import XSXJXG from '../processList/XSXJXG.vue'
	export default {
		components: {
			ueditor,
			JSelectLiuChen,
			// QJSQ,
			// PYFA,
			// XSXJXG
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
				steps: [],
				showcolumn:[],
				formdata:[],
				stepsindex: '',
				formData: {},
				instanceId: '',
				comment:'',
				rebuck: false
			}
		},
		mounted() {
			this.getliucen()
		},
		methods: {
			goup(e) {
				console.log(this.$refs.testRefsChildData, 'this.$refs.biaodan??????')
				this.$refs.testRefsChildData.doUpdate(e)
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
						this.instanceId = res.result.instance_id
						this.processListName = res.result.process_name
						this.stepsindex = res.result.current_step
						this.steps = JSON.parse(res.result.steps)
						this.showcolumn = JSON.parse(res.result.show_column)
						this.formdata = JSON.parse(res.result.form_data)
					})
				} else {
					// 新增判断
					this.processListId = ''
				}
			},

			//添加
			tip() {
				// 修改数据执行操作
				var user = JSON.parse(sessionStorage.getItem('userInfo'))
				var data = {
					approvalResult: 'approved',
					applicantId: user.userId,
					comment: this.comment,
					instanceId: this.instanceId
				}
				this.$http.post('/sys/processInstance/approveProcess', data).then((res) => {
					this.$refs.testRefsChildData.cancel()
					this.processListName = undefined
					this.processListId = []
					this.ApplyObj = []
					this.processListShow = false
					this.$message.success('审批成功！')
					this.$emit('JoinOrchangeStuSuss', 1)
					// this.cancel()
				})
			},

			//取消按钮
			cancel() {
				// // 修改数据执行操作
				// 修改数据执行操作
				var user = JSON.parse(sessionStorage.getItem('userInfo'))
				var data = {
					approvalResult: 'rejected',
					applicantId: user.userId,
					comment: this.comment,
					instanceId: this.instanceId
				}
				this.$http.post('/sys/processInstance/approveProcess', data).then((res) => {
					this.$refs.testRefsChildData.cancel()
					this.processListName = undefined
					this.processListId = []
					this.ApplyObj = []
					this.processListShow = false
					this.$message.success('驳回成功！')
					this.$emit('JoinOrchangeStuSuss', 1)
					// this.cancel()
				})
			},
		},
	}
</script>

<style scoped>
	.count {
		padding: 0px;
		margin-top: 10px;
	}
	.flex{
		display:flex;align-items:center;
		&>span{
			min-width:80px;
		}
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