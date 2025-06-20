<template>
	<a-card>
		<div class="noticeInfo">
			<div class="header">
				{{tabel}}
			</div>
			<div class="content">
				<div>
					<table class="scanTable top-div" style="text-align: left; border: none;">
						<tr class="tr-style" v-for="(val,key) in ApplyObj">
							<td class="td-div">
								<div class="font-style"><span style="color: red;"
										v-if="val.isRequired">*</span>{{val.label}}</div>
							</td>
							<td class="double">
								<a-input v-if="val.inputType == '1'" class="input-style-reply"
									:placeholder="'请输入'+val.label" v-model="content[val.parameter]" :disabled='buke'>
								</a-input>
								<goBuckreupST v-if="val.inputType == '2' && !(val.parameter== 'XZ'||val.parameter== 'ZY'||val.parameter== 'NJ'||val.parameter== 'XQ'||val.parameter== 'ZYZ')" :ref='val.parameter'
									:code='val.dictionaryName' :name='val.label' :disabled='buke'/>
								<goBuckreupRD v-if="val.inputType == '3'" :ref='val.parameter'
									:code='val.dictionaryName' :name='val.label' :disabled='buke'/>
								<goBuckreupCB v-if="val.inputType == '4'" :ref='val.parameter'
									:code='val.dictionaryName' :name='val.label' :disabled='buke'/>
								<a-date-picker v-if="val.inputType == '5'" :placeholder="'请选择'+val.label"
									format="YYYY-MM-DD HH:mm:ss" v-model="content[val.parameter]" :disabled='buke'/>
								<a-range-picker v-if="val.inputType == '6'" :placeholder="['请选择开始时间','请选择结束时间']"
									format="YYYY-MM-DD HH:mm:ss" v-model="content[val.parameter]" :disabled='buke'/>
								<j-select-zyb v-if="val.inputType == '7' && val.dictionaryName== 'ZYZ'" v-model="content[val.parameter]"  v-decorator="['ZYZ', content[val.parameter]]" :placeholder="'请选择'+val.label"
								 :ref='val.parameter' :triggerChange="false" @change="zybChange"/>
								<j-select-zy-by-zyb v-if="val.inputType == '7' && val.dictionaryName== 'ZY'" v-model="content[val.parameter]" :placeholder="'请选择'+val.label"
								 :ref='val.parameter' :triggerChange="false" />
								<j-select-xuezhi v-if="val.inputType == '7' && val.dictionaryName== 'XZ'" v-model="content[val.parameter]" :triggerChange="false" :placeholder="'请选择'+val.label"></j-select-xuezhi>
								<j-select-grade v-if="val.inputType == '7' && val.dictionaryName== 'NJ'" v-model="content[val.parameter]" :triggerChange="false" :placeholder="'请选择'+val.label"></j-select-grade>
								<j-select-xueqi v-if="val.inputType == '7' && val.dictionaryName== 'XQ'"  v-model="content[val.parameter]" :triggerChange="false" :placeholder="'请选择'+val.label"></j-select-xueqi>
							</td>
						</tr>
					</table>
				</div>
				<!-- <div class="content-head" style="margin-top: 20px;">
					<div class="applyBtn-div">
						<a-row>
							<a-col :span="10"> </a-col>
							<a-col :span="8">
								<a-button type="primary" style="margin-right: 20px;" @click="tip"> 确定 </a-button>
								<a-button type="danger" @click="cancel"> 取消 </a-button>
							</a-col>
							<a-col :span="6"> </a-col>
						</a-row>
					</div>
				</div> -->
			</div>
		</div>
	</a-card>
</template>
<script>
	import {
		axios
	} from '@/utils/request'
	import goBuckreupST from '@/components/goBuckreupST'
	import goBuckreupRD from '@/components/goBuckreupRD'
	import goBuckreupCB from '@/components/goBuckreupCB'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
	import moment from 'moment';
	import liucen from './lliuclist';
	export default {
		components: {
			goBuckreupST,
			goBuckreupRD,
			goBuckreupCB,
			JSelectZyByZyb, 
			JSelectZyb, 
			JSelectXuezhi, 
			JSelectGrade, 
			JSelectXueqi
		},
		props: {
			buke: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				content: {},
				ApplyObj: [],
				liucen: liucen,
				tabel:''
			}
		},
		mounted() {
			console.log(liucen,'liucen????')
		},
		watch:{
			'content.ZYZ':function(flag){
				console.log(flag,"???????")
				this.zybChange(flag,'ZY')
			},
			'content.YZYZ':function(flag){
				console.log(flag,"???????")
				this.zybChange(flag,'YZY')
			},
			'content.XZYZ':function(flag){
				console.log(flag,"???????")
				this.zybChange(flag,'XZY')
			}
		},
		methods: {
			zybChange(code,type) {
			  if (this.$refs[type] != null) {
				console.log(this.$refs[type][0],'this.$refs')
			    this.$refs[type][0].initDictData(code)
			  }
			},
			set(data){
				for (var i = 0; i < this.ApplyObj.length; i++) {
				
					// 字典数据获取判断
					if (this.ApplyObj[i].inputType == '2' || this.ApplyObj[i].inputType == '3' || this.ApplyObj[i]
						.inputType == '4') {
						// 说明数据是从字典中进行获取的
						this.$refs[this.ApplyObj[i].parameter][0].getOutcome(this.content, this.ApplyObj[i].parameter)
					}
					// 修改时间格式重新写入数据
					if (this.ApplyObj[i].inputType == '5') {
						// 5为单时间做单独转换
						this.content[this.ApplyObj[i].parameter] = moment(this.content[this.ApplyObj[i].parameter]).format(
							'YYYY-MM-DD HH:mm:ss');
					}
					if (this.ApplyObj[i].inputType == '6') {
						// 6为开始时间结束时间为数组做两次转换
						this.content[this.ApplyObj[i].parameter] = [moment(this.content[this.ApplyObj[i].parameter][0])
							.format('YYYY-MM-DD HH:mm:ss'), moment(this.content[this.ApplyObj[i].parameter][1]).format(
								'YYYY-MM-DD HH:mm:ss')
						]
					}
				
					// 判断是否必填
					if (this.ApplyObj[i].isRequired) {
						if (this.content[this.ApplyObj[i].parameter] == '' || this.content[this.ApplyObj[i].parameter] ==
							null || this.content[this.ApplyObj[i].parameter] == undefined) {
							this.$message.error(this.ApplyObj[i].label + '数据为空，请确认是否填写！！');
							return
						}
					}
				
				
					if (this.ApplyObj[i].isCustomRules) {
						var rulesStr = this.ApplyObj[i].rules
						var rules = new RegExp(rulesStr); // 去掉前后的斜杠
						if (!rules.test(this.content[this.ApplyObj[i].parameter])) {
							this.$message.error(this.ApplyObj[i].label + '格式错误，请确认数据！！');
							return
						}
					}
				
				
				}
				console.log(this.content,'this.content？？？？？？')
				
				data.content = this.content
				data.ApplyObj =this.ApplyObj
			},
			async gocallbuck(rebuckobj){
				if (rebuckobj != '') {
					console.log(rebuckobj,'rebuckobj?????')
					this.content = rebuckobj.content
					if(this.content['ZY']){
						this.zybChange(this.content['ZYZ'],'ZY')
					}
					if(this.content['YZY']){
						this.zybChange(this.content['YZYZ'],'YZY')
					}
					if(this.content['XZY']){
						this.zybChange(this.content['XZYZ'],'XZY')
					}
					// 数据回显操作
					for (var i = 0; i < this.ApplyObj.length; i++) {
				
						// 字典数据获取判断
						if (this.ApplyObj[i].inputType == '2' || this.ApplyObj[i].inputType == '3' || this.ApplyObj[i]
							.inputType == '4') {
							console.log(this.$refs,'this.$refs[this.ApplyObj[i].parameter]？？？？？？？')	
							console.log(this.ApplyObj[i].parameter,'this.$refs[this.ApplyObj[i].parameter]？？？？？？？')	
							console.log(this.$refs[this.ApplyObj[i].parameter],'this.$refs[this.ApplyObj[i].parameter]？？？？？？？')	
							// 说明数据是从字典中进行获取的
							this.$refs[this.ApplyObj[i].parameter][0].setOutcome(this.content, this.ApplyObj[i].parameter)
						}
				
					}
				}
			},
			showup(name, rebuckobj) {
				this.tabel = name
				for (var i = 0; i < this.liucen.length; i++) {
					if (name == this.liucen[i].name) {
						this.ApplyObj = this.liucen[i].ApplyObj
						this.gocallbuck(rebuckobj)
					}
				}
				setTimeout(()=>{
					this.gocallbuck(rebuckobj)
				},1000) 
				
			},
			cancel() {
				this.ApplyObj = []
				this.tabel = ''
				this.content = {}
			},
			tip() {
				// 循环判断那些数据需要通过参数refs获取
				// this.ApplyObj
				for (var i = 0; i < this.ApplyObj.length; i++) {

					// 字典数据获取判断
					if (this.ApplyObj[i].inputType == '2' || this.ApplyObj[i].inputType == '3' || this.ApplyObj[i]
						.inputType == '4') {
						console.log(this.ApplyObj[i].inputType,'?????')
						// 说明数据是从字典中进行获取的
						this.$refs[this.ApplyObj[i].parameter][0].getOutcome(this.content, this.ApplyObj[i].parameter)
						console.log(this.content,'?????')
					}
					// 修改时间格式重新写入数据
					if (this.ApplyObj[i].inputType == '5') {
						// 5为单时间做单独转换
						this.content[this.ApplyObj[i].parameter] = moment(this.content[this.ApplyObj[i].parameter]).format(
							'YYYY-MM-DD HH:mm:ss');
					}
					if (this.ApplyObj[i].inputType == '6') {
						// 6为开始时间结束时间为数组做两次转换
						this.content[this.ApplyObj[i].parameter] = [moment(this.content[this.ApplyObj[i].parameter][0])
							.format('YYYY-MM-DD HH:mm:ss'), moment(this.content[this.ApplyObj[i].parameter][1]).format(
								'YYYY-MM-DD HH:mm:ss')
						]
					}

					// 判断是否必填
					if (this.ApplyObj[i].isRequired) {
						if (this.content[this.ApplyObj[i].parameter] == '' || this.content[this.ApplyObj[i].parameter] ==
							null || this.content[this.ApplyObj[i].parameter] == undefined) {
							this.$message.error(this.ApplyObj[i].label + '数据为空，请确认是否填写！！');
							return
						}
					}


					if (this.ApplyObj[i].isCustomRules) {
						var rulesStr = this.ApplyObj[i].rules
						var rules = new RegExp(rulesStr); // 去掉前后的斜杠
						if (!rules.test(this.content[this.ApplyObj[i].parameter])) {
							this.$message.error(this.ApplyObj[i].label + '格式错误，请确认数据！！');
							return
						}
					}


				}
				
				console.log(this.content, 'this.content？？？？？？？')
			}
		}
	}
</script>

<style scoped lang="less">
	.noticeInfo {
		.header {
			border-bottom: 1px dashed #b9b9b9;
			padding-bottom: 10px;

			.title {
				text-align: center;
				padding: 10px 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.text {
				font-size: 22px;
				color: rgba(18, 28, 37, 0.85);
				letter-spacing: 0.34px;
			}

			.info {
				display: flex;
				flex-direction: row;
				justify-content: center;

				div {
					font-size: 14px;
					margin-right: 20px;
					color: rgba(18, 28, 37, 0.65);
					letter-spacing: 0;
				}
			}
		}

		.content {
			font-size: 16px;
			color: rgba(18, 28, 37, 0.85);
			letter-spacing: 0.28px;
			line-height: 32px;
			padding: 23px 0 48px 0;
			height: calc(100% - 159px);
			overflow-y: auto;

			::v-deep .ant-calendar-range-picker-input {
				font-weight: 600;
				color: #8C8C8C;
			}

			.downloadFile {
				padding-bottom: 70px;

				.title {
					padding-bottom: 5px;
					font-size: 14px;
					color: rgba(18, 28, 37, 0.65);
				}

				.file {
					font-size: 14px;
					color: rgba(18, 28, 37, 0.85);
					letter-spacing: 0.25px;
					padding: 6px;

					.fileName {
						display: inline-block;
						width: 300px;
					}

					.operate {
						padding-left: 100px;
					}
				}
			}
		}
	}

	.ql-editor {
		box-sizing: border-box;
		line-height: 1.42;
		height: 100%;
		outline: none;
		overflow-y: auto;
		padding: 12px 15px;
		tab-size: 4;
		text-align: left;
		white-space: pre-wrap;
		word-wrap: break-word;
	}
</style>