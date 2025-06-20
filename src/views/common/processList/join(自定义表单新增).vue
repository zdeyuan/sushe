<template>
	<a-modal v-model="processListShow" :title="processListType == 'add' ? '添加表单' : '修改表单'" :width="1073"
		:footer='false'>
		<div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">流程实体信息</span>
						</td>
					</tr>
					<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">流程类型选择：</div>
							</td>
							<td class="double">
								<JSelectLiuChen v-model="processListId"/>
							</td>
					</tr>
				</table>
			</div>
			<div class="pageContentBox">
				<table class="scanTable top-div" style="text-align: left">
					<tr class="tr-style">
						<td colspan="4" class="tr-color">
							<span class="title-style">表单内容</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td colspan="4">
							<a-button type="primary" @click="addProcess" style="margin-right: 20px;">
								添加表单格
							</a-button>
						</td>
					</tr>

					<div v-for="(val,key) in ApplyObj" style="padding: 20px;">
						<table class="scanTable top-div" style="text-align: left">
						<tr class="tr-style" style="width: 100%;">
							<td class="td-div" style="padding: 10px;">
								<a-button type="danger" @click="reProcess(key)" >
									删除表单格
								</a-button>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">标题名称：</div>
							</td>
							<td class="double">
								<a-input class="input-style-reply" style="margin-left: 0px;" placeholder="请输入单元格标题名称"  v-model="val.label" >
								</a-input>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">参数名称：</div>
							</td>
							<td class="double">
								<a-input class="input-style-reply" style="margin-left: 0px;" placeholder="请输入单元格参数名称"  v-model="val.parameter" >
								</a-input>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">单元格类型：</div>
							</td>
							<td class="double">
								<a-select :options="inputTypeList" placeholder="请选择单元格类型" v-model="val.inputType" />
							</td>
						</tr>
					<!-- 	<tr v-if="val.inputType != '1' && val.inputType != '5' && val.inputType != '6'" class="tr-style">
							<td class="td-div">
								<div class="font-style">是否使用字典：</div>
							</td>
							<td class="double">
								<a-select :options="isList" placeholder="请选择单元格类型" v-model="val.isDictionary" />
							</td>
						</tr> -->
						<tr v-if="val.isDictionary" class="tr-style">
							<td class="td-div">
								<div class="font-style">字典Code：</div>
							</td>
							<td class="double">
								<a-input class="input-style-reply" style="margin-left: 0px;" placeholder="请输入字典Code如:ZT/DWLX"  v-model="val.dictionaryName" >
								</a-input>
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">是否必填：</div>
							</td>
							<td class="double">
								<a-select :options="isList" placeholder="请选择单元格类型" v-model="val.isRequired" />
							</td>
						</tr>
						<tr class="tr-style">
							<td class="td-div">
								<div class="font-style">是否自定义规则：</div>
							</td>
							<td class="double">
								<a-select :options="isList" placeholder="请选择单元格类型" v-model="val.isCustomRules" />
							</td>
						</tr>
						<tr v-if="val.isCustomRules" class="tr-style">
							<td class="td-div">
								<div class="font-style">自定义规则：</div>
							</td>
							<td class="double">
								<div style="color: red; margin-bottom: 10px;">目前仅支持正则表达式。并且需要去除前后的/符号</div>
								<div style="color: red; margin-bottom: 10px;">错误用例：/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/</div>
								<div style="color: red; margin-bottom: 10px;">正确用例：^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$</div>
								<a-input class="input-style-reply" placeholder="请输入自定义规则"  v-model="val.rules" >
								</a-input>
							</td>
						</tr>
						</table>
					</div>
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
	import JSelectLiuChen from '@/components/kwglbiz/JSelectLiuChen'
	export default {
		components: {
			ueditor,
			JSelectLiuChen
		},
		data() {
			return {
				processListShow: false,
				processListType: '',
				processListId:'',
				ApplyObj: [],
				isList:[
					{
						value: true,
						label: "是"
					},
					{
						value: false,
						label: "否"
					},
				],
				inputTypeList: [
					{
						value: "1",
						label: "输入框"
					},
					{
						value: "2",
						label: "下拉选择框"
					},
					{
						value: "3",
						label: "单选框"
					},
					{
						value: "4",
						label: "复选框"
					},
					{
						value: "5",
						label: "时间选择框"
					},
					{
						value: "6",
						label: "时间选段择框"
					},
				]
			}
		},
		created() {},
		methods: {
			async judesType(type, obj) {
				// 流程id ： processListId
				// 流程类型 ： processListType ----- 判断新增或修改
				// 流程窗口显示 ： processListShow -----判断显示/隐藏
				this.processListType = type
				this.processListId = obj
				this.processListShow = true
				if (type !== 'add') {
					// 数据回显内容
					this.processListId = obj
				} else {
					// 新增判断
					this.processListId = ''
				}
			},
			// 删除表单个
			reProcess(index) {
				this.ApplyObj.splice(index, 1)
			},
			//添加表单格
			addProcess() {
				var obj = {
					inputType: '1',
					label: '',
					parameter:'',
					isRequired: false,
					isCustomRules: false,
					rules: '',
					isDictionary: true,
					dictionaryName: '',
				}
				this.ApplyObj.push(obj)
			},

			//添加
			tip() {
				console.log(this.ApplyObj)
				if (this.processListType == 'add') {
					// 添加数据执行操作
					// 新增判断
					var user = JSON.parse(sessionStorage.getItem('userInfo'))
					var data = {
						applicantId:user.userId,
						formData:this.ApplyObj,
						processTypeId:this.processListId
					}
					this.$http.post('/sys/processInstance/createProcess', data).then((res) => {
						console.log(res, 'res??????')
						this.$message.success('新建成功！')
						this.cancel()
					})
					
				} else {
					// 修改数据执行操作
				}
			},

			//取消按钮
			cancel() {
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