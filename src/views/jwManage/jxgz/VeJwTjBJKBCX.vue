<template>
	<div class="schedule">

		<a-row>
			<a-col :span="24">
				<a-card :bordered="false" size="small" class="schedule-right boxshadow">
					<!-- 查询区域 -->
					<div class="table-page-search-wrapper">
						<div>
							<a-form layout="inline">
								<a-row>
									<a-col :md="5" :sm="24">
										<a-form-item label="专业部">
											<j-select-zyb placeholder="请选择专业部" v-model="queryParam.falid"
												@input="zybChange"></j-select-zyb>
										</a-form-item>
									</a-col>

									<a-col :md="5" :sm="24">
										<a-form-item label="专业">
											<j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业"
												v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
										</a-form-item>
									</a-col>
									<a-col :md="5" :sm="24">
										<a-form-item label="班级">
											<j-select-banji-by-zy ref="banjiByZy" v-model="queryParam.bjid"
												placeholder="请选择班级"></j-select-banji-by-zy>
										</a-form-item>
									</a-col>
									<a-col :md="5" :sm="24">
										<a-form-item label="学期">
											<j-select-xueqi placeholder="请选择学期"
												v-model="queryParam.semid"></j-select-xueqi>
										</a-form-item>
									</a-col>
									<a-col :md="4" :sm="24">
										<span style="float: left; overflow: hidden;margin-left: 10px"
											class="table-page-search-submitButtons">
											<a-button @click="handleExportXls" type="primary" icon="upload"
												style="margin-right: 10px;">导出</a-button>
											<!-- <a-button type="primary" @click="doPrint" icon="printer">打印</a-button> -->
											<!-- <edu-button type="4" icon="upload" @click="handleExportXls" title="导出" style="margin-bottom:0px"></edu-button> -->
										</span>
									</a-col>
								</a-row>
							</a-form>
						</div>
					</div>
					<!-- 查询区域-END -->


					<!--          课表区域-->
					<div class="schedule-main">
						<!--            <div class="schedule-main__title">{{ scheduleTitle }}</div>-->
						<div class="schedule-main__table">
							<a-row class="table-row">
								<a-col class="table-th" :span="3"> 节次/星期 </a-col>
								<a-col class="table-th" :span="3" v-for="(item, index) in weekData" :key="index">
									{{ item.weekName }}
								</a-col>
							</a-row>
							<div v-if="!loading" style="display: flex;justify-content: center">
								<a-spin />
							</div>
							<a-row v-if="loading" class="table-row table-row__body"
								v-for="item in scheduleNodeMorningData" :key="item.id">
								<a-col :span="3" class="table-td table-section">
									<div class="table-td__inner">
										{{ item.section }}
										<div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
									</div>
								</a-col>
								<a-col :span="3" class="table-td" v-for="(sub, index) in weekData" :key="index"
									@click="handleAddOrEdit(item, index)" :class="{'disabled':!item.status}">
									<div class="table-td__inner" v-show="item[index]">
										{{ (item[index] && item[index].kcmc) || '-' }}
										<div class="table-td__label">
											{{ (item[index] && item[index].jsmc) || '-' }}
											{{ (item[index] && item[index].jsxm) || '-' }}
										</div>
									</div>
								</a-col>
							</a-row>

							<a-row class="table-row">
								<a-col class="table-th" :span="24"> 午休 </a-col>
							</a-row>
							<div v-if="!loading" style="display: flex;justify-content: center">
								<a-spin />
							</div>
							<a-row v-if="loading" class="table-row table-row__body"
								v-for="item in scheduleNodeAfternoonData" :key="item.id">
								<a-col :span="3" class="table-td table-section">
									<div class="table-td__inner">
										{{ item.section }}
										<div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
									</div>
								</a-col>
								<a-col :span="3" class="table-td" v-for="(sub, index) in weekData" :key="index"
									@click="handleAddOrEdit(item, index)">
									<div class="table-td__inner" v-show="item[index]">
										{{ (item[index] && item[index].kcmc) || '-' }}
										<div class="table-td__label">
											{{ (item[index] && item[index].jsmc) || '-' }}
											{{ (item[index] && item[index].jsxm) || '-' }}
										</div>
									</div>
								</a-col>
							</a-row>
							<a-row class="table-row">
								<a-col class="table-th" :span="24"> 晚自习 </a-col>
							</a-row>
							<div v-if="!loading" style="display: flex;justify-content: center">
								<a-spin />
							</div>
							<a-row v-if="loading" class="table-row table-row__body"
								v-for="item in scheduleNodeNightData" :key="item.id">
								<a-col :span="3" class="table-td table-section">
									<div class="table-td__inner">
										{{ item.section }}
										<div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
									</div>
								</a-col>
								<a-col :span="3" class="table-td" v-for="(sub, index) in weekData" :key="index"
									@click="handleAddOrEdit(item, index)">
									<div class="table-td__inner" v-show="item[index]">
										{{ (item[index] && item[index].kcmc) || '-' }}
										<div class="table-td__label">
											{{ (item[index] && item[index].jsmc) || '-' }}
											{{ (item[index] && item[index].jsxm) || '-' }}
										</div>
									</div>
								</a-col>
							</a-row>
						</div>
					</div>
				</a-card>
			</a-col>
		</a-row>

	</div>
</template>

<script>
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
	import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
	import ACol from 'ant-design-vue/es/grid/Col'
	import {
		getAction,
		deleteAction,
		putAction,
		postAction,
		httpAction
	} from '@/api/common/manage'
	import {
		downFile
	} from '@/api/common/manage'
	export default {
		name: 'manual',
		components: {
			ACol,
			JSelectZyb,
			JSelectZyByZyb,
			JSelectBanjiByZy,
			JSelectXueqi,
		},
		data() {
			return {
				loading: true,
				queryParam: {
					falid: '',
					specid: '',
					bjid: '',
					semid: ''
				},
				dateFormatList: ['YYYY-MM-DD', 'YYYY-MM-DD'],
				// 树搜索条件
				keyword: '',
				//树数据
				treeData: [],

				// 学期数据
				semesterData: [],
				// 学期信息
				semsterInfo: {},
				// 学期id
				semesterId: undefined,
				// 院系列表
				facultyList: [],
				// 专业列表
				specisltyList: [],
				//班级列表
				classesList: [],
				// 班级信息
				classInfo: {},
				// 排课id
				pkId: null,
				//
				// 星期表格
				weekData: [{
						id: 1,
						weekName: '星期一',
						course: {}
					},
					{
						id: 2,
						weekName: '星期二',
						course: {}
					},
					{
						id: 3,
						weekName: '星期三',
						course: {}
					},
					{
						id: 4,
						weekName: '星期四',
						course: {}
					},
					{
						id: 5,
						weekName: '星期五',
						course: {}
					},
					{
						id: 6,
						weekName: '星期六',
						course: {}
					},
					{
						id: 7,
						weekName: '星期日',
						course: {}
					},
				],

				// 排课节数据
				scheduleNodeData: [],
				// 排课节上午数据
				scheduleNodeMorningData: [{
						section: '第一节',
						kssj: '08:00',
						jssj: '8:45'
					},
					{
						section: '第二节',
						kssj: '09:00',
						jssj: '9:45'
					},
					{
						section: '第三节',
						kssj: '10:00',
						jssj: '10:45'
					},
					{
						section: '第四节',
						kssj: '11:00',
						jssj: '11:45'
					},
				],
				// 排课节下午数据
				scheduleNodeAfternoonData: [{
						section: '第五节',
						kssj: '14:00',
						jssj: '14:45'
					},
					{
						section: '第六节',
						kssj: '15:00',
						jssj: '15:45'
					},
					{
						section: '第七节',
						kssj: '16:00',
						jssj: '16:45'
					},
					{
						section: '第八节',
						kssj: '17:00',
						jssj: '17:45'
					},
				],
				// 排课节晚自习数据
				scheduleNodeNightData: [{
						section: '第九节',
						kssj: '19:00',
						jssj: '19:45'
					},
					{
						section: '第十节',
						kssj: '20:00',
						jssj: '20:45'
					},
				],

				// 排课课表数据
				scheduleData: [],

				// 排课课表明细数据
				scheduleDetail: [],

				// 弹框
				visible: false,

				// 是否是新增
				isAdd: false,

				url: {
					exportExcel: "/jxrw/kbcx/exportExcel"
				}
			}
		},
		created() {

		},
		watch: {
			'queryParam.bjid'() {
				this.bjkb()
			},
			'queryParam.semid'() {
				this.bjkb()
			}
		},
		computed: {
			scheduleTitle() {
				return this.semesterId ? `${this.classInfo.name || ''}（${this.semsterInfo.xqmc}）排课` : '暂无排课'
			},
		},
		methods: {
			// 导出
			handleExportXls(fileName) {
				if (!fileName || typeof fileName != "string") {
					fileName = "班级课表"
				}
				let param = this.queryParam;
				console.log("导出参数", param)
				downFile(this.url.exportExcel, param).then((data) => {
					if (!data) {
						this.$message.warning("文件下载失败")
						return
					}
					if (typeof window.navigator.msSaveBlob !== 'undefined') {
						window.navigator.msSaveBlob(new Blob([data], {
							type: 'application/vnd.ms-excel'
						}), fileName + '.xls')
					} else {
						let url = window.URL.createObjectURL(new Blob([data], {
							type: 'application/vnd.ms-excel'
						}))
						let link = document.createElement('a')
						link.style.display = 'none'
						link.href = url
						link.setAttribute('download', fileName + '.xls')
						document.body.appendChild(link)
						link.click()
						document.body.removeChild(link); //下载完成移除元素
						window.URL.revokeObjectURL(url); //释放掉blob对象
					}
				})
			},
			bjkb() {
				if (this.queryParam.bjid == '' || this.queryParam.semid == '') {
					return
				}
				let _this = this;
				this.loading = false;
				_this.scheduleNodeMorningData = [{
						section: '第一节',
						kssj: '08:00',
						jssj: '8:45'
					},
					{
						section: '第二节',
						kssj: '09:00',
						jssj: '9:45'
					},
					{
						section: '第三节',
						kssj: '10:00',
						jssj: '10:45'
					},
					{
						section: '第四节',
						kssj: '11:00',
						jssj: '11:45'
					},
				]
				_this.scheduleNodeAfternoonData = [{
						section: '第五节',
						kssj: '14:00',
						jssj: '14:45'
					},
					{
						section: '第六节',
						kssj: '15:00',
						jssj: '15:45'
					},
					{
						section: '第七节',
						kssj: '16:00',
						jssj: '16:45'
					},
					{
						section: '第八节',
						kssj: '17:00',
						jssj: '17:45'
					},
				]
				_this.scheduleNodeNightData = [{
						section: '第九节',
						kssj: '19:00',
						jssj: '19:45'
					},
					{
						section: '第十节',
						kssj: '20:00',
						jssj: '20:45'
					},
				]
				let data = {
					xzbids: this.queryParam.bjid,
					semid: this.queryParam.semid,
				}
				getAction('/jxrw/kbcx/bjkb', data).then(res => {
					console.log(res);
					if (res.success) {
						let arr = res.result.data;
						for (var i = 0; i < arr.length; i++) {
							if (arr[i].section <= 4) {
								_this.$set(_this.scheduleNodeMorningData[arr[i].section - 1], (arr[i].week - 1),
									arr[i]);
								// _this.scheduleNodeMorningData[arr[i].section-1][arr[i].week-1]=arr[i];
							} else if (arr[i].section > 4 && arr[i].section <= 8) {
								_this.scheduleNodeAfternoonData[arr[i].section - 5][arr[i].week - 1] = arr[i];
							} else if (arr[i].section > 8 && arr[i].section <= 10) {
								_this.scheduleNodeNightData[arr[i].section - 9][arr[i].week - 1] = arr[i];
							}
						}
						console.log(_this.scheduleNodeMorningData);
						_this.loading = true;
					}
					_this.loading = true;
				})
			},
			zybChange(code) {
				if (this.$refs.zyByZyb != null) {
					this.$refs.zyByZyb.initDictData(code)
				}
			},
			zyChange(code) {
				if (this.$refs.banjiByZy != null) {
					this.$refs.banjiByZy.initDictData(code)
				}
			},
		},
	}
</script>
<style scoped lang="less">
	.tree-wrp {
		max-height: 937px;
		margin-top: 10px;
		overflow-y: auto;
	}

	.schedule {
		background-color: #fff;
		padding: 15px;

		.boxshadow {
			box-shadow: 0px 1px 8px 0px #e9edf6;
		}

		&-breadcrumb {
			padding-bottom: 15px;
		}

		&-left {
			&__search {
				display: flex;
				padding: 10px 0;

				.search-input {
					margin-right: 10px;
				}
			}

			&__form {
				display: flex;
				align-items: center;

				.form-label {
					padding-right: 10px;
				}

				.form-value {
					flex: 1;
				}
			}
		}

		&-right {
			margin-left: 15px;
		}

		&-main {
			&__title {
				font-size: 18px;
				text-align: center;
				padding: 15px 0;
			}

			&__table {
				text-align: center;

				.table-row {
					&__body {
						border-right: 1px solid #e6e6e6;
						border-bottom: 1px solid #e6e6e6;
					}
				}

				.table-th {
					background-color: #66c3fd;
					color: #fff;
					line-height: 30px;
				}

				.table-td {
					padding: 5px;
					min-height: 80px;
					border-left: 1px solid #e6e6e6;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;

					&.disabled {
						background-color: #f1f1f1;
						cursor: default
					}

					&__inner {
						width: 100%;
						height: 100%;
					}

					&__label {
						color: #fc620e;
						padding-top: 5px;
					}
				}

				.table-section {
					background-color: #f8f8f8;
					color: #666;

					&__time {}
				}
			}
		}
	}
</style>