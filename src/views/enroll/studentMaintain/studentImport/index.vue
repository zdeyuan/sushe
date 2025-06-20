<template>
	<div  class='constbox'>
		<div class="pageContentBox">
			<a-row>
				<a-col>
					<div class="mailInset">
						<a-row>
							<a-col :span='4'>
								<div class="inputTips">
									<span class="head-span">导入模板：</span>
								</div>
							</a-col>
							<a-col :span='20'>
								<div class="inputCount">
									<a @click="handleExportXls('学生维护信息导入模板')" style="text-decoration: underline; ">点击下载</a>
								</div>
							</a-col>
							<a-col :span='4'>
								<div class="inputTips">
									<span class="head-span">选择Excel表格：</span>
								</div>
							</a-col>
							<a-col :span='20'>
									<a-input class="temp-input"  />
									<a-upload name="file" 
										:multiple="false"
										:showUploadList="false"
										:headers="tokenHeader"
										:action="importExcelUrl"
										@change="handleImportExcel">
										<a-button class='uplordBtn' type="primary">
											浏览
										</a-button>
									</a-upload>
							</a-col>
							<a-col :span='4'>
								<!-- <div class="inputTips">
									<span class="head-span">选择Excel表格：</span>
								</div> -->
							</a-col>
							<a-col :span='20'>
								<div class="btns">
									<a-button type="primary">
										确定保存
									</a-button>
								</div>
							</a-col>
						</a-row>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	export default {
		mixins: [EduListMixin],// 引入模块
		components: {

		},
		data() {
			return {
				content: '',
				csId:[],
				columns:[],
				url: {
					list: 'enroll/fenban/fenbanShow',
					exportXlsUrl: 'enroll/fenbanImport/exportModel',
					importExcelUrl: 'enroll/fenbanImport/import',
					// exportModel:'enroll/fenbanImport/exportModel'
					//importExcelUrl: 'enroll/stuInfoQuery/jiayouUploading',
				},
			};
		},
		computed:{
			// 拼接导入
			importExcelUrl: function () {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			}
		},
		methods: {
			handleChange(file){
				console.log(file)
			},
		}
	}
</script>

<style scoped="scoped">
	.pageContentBox{
		width: 80vw;
		height: 60vh;
	}
	.temp-input {
	  width: 203px;
	  height: 34px;
	  background: rgba(255, 255, 255, 0);
	  border: 1px solid rgba(217, 237, 244);
	  border-radius: 3px;
	}
	.inputTips {
		margin-top: 5px;
		text-align: right;
	}

	.inputTips span {
		font-size: 20px;
	}
	
	.uplordBtn{
		margin-left: 10px;
	}

	.inputCount {
		margin-top: 8px;
		margin-bottom: 20px;
	}

	.mailInset {
		margin-top: 20px;
	}

	.btns {
		margin-top: 40px;
		/* text-align: center; */
	}

	.btns button {
		/* margin: 20px 30px; */
		margin: 20px 0px;
	}
</style>
