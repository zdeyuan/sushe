<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<div>
				<a-form layout="inline">
					<a-row :gutter="24">
						<a-col :md="7" :sm="24" style="">
							<a-form-item label="校区">
								<j-select-xiaoqu placeholder="请选择校区" style="width: 200px;" v-model="queryParam.campusid"
									@input="campusSelect"></j-select-xiaoqu>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="">
							<a-form-item label="教学楼">
								<a-select @change="buildingSelect" v-model="queryParam.jzid" style="width: 200px;"
									placeholder="请选择教学楼">
									<a-select-option v-for="item in jzs" :key="item.id" :value="item.id"
										placeholder="教学楼">
										{{ item.jzwmc }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="margin-right: 50px;">
							<a-form-item label="教室">
								<a-select v-model="queryParam.jsid" style="width: 200px;" placeholder="请选择教室">
									<a-select-option v-for="item in jss" :key="item.id" :value="item.id"
										placeholder="教室">
										{{ item.jsmc }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>


						<a-col :md="7" :sm="24" style="">
							<a-form-item label="专业部">
								<j-select-zyb placeholder="请选择专业部" style="width: 200px;" v-model="queryParam.falid"
									@input="zybChange"></j-select-zyb>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="">
							<a-form-item label="专业">
								<j-select-zy-by-zyb ref="zyByZyb" style="width: 200px;" placeholder="请选择专业"
									v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="margin-right: 50px;">
							<a-form-item label="班级">
								<j-select-banji-by-zy ref="banjiByZy" style="width: 200px;" v-model="queryParam.bjid"
									placeholder="请选择班级"></j-select-banji-by-zy>
							</a-form-item>
						</a-col>


						<a-col :md="7" :sm="24" style="">
							<a-form-item label="学期">
								<j-select-xueqi placeholder="请选择学期" style="width: 200px;"
									v-model="queryParam.semid"></j-select-xueqi>
							</a-form-item>
						</a-col>

						<a-col :md="9" :sm="24" style="">
							<a-form-item label="课程">
								<j-select-jiaoxue-kecheng placeholder="请选择课程" style="width: 300px;"
									v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24">
							<span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
								<a-button @click="searchQuery" type="primary" icon="search"
									style="margin-right: 10px;">搜索</a-button>
								<a-button @click="searchReset" type="danger" icon="delete"
									style="margin-right: 10px;">清除</a-button>
							</span>
						</a-col>
					</a-row>
				</a-form>
			</div>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator" style="margin: 10px 0;">
			<!-- <edu-button @click="add" type="primary" icon="plus" title="添加"></edu-button> -->
			<!-- <a-button @click="add" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button> -->
			<!--      <a-button @click="add" type="primary" icon="plus">新增</a-button>-->
			<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_qk_jiankao')">导出</a-button>-->
			<!--      <a-upload-->
			<!--        name="file"-->
			<!--        :showUploadList="false"-->
			<!--        :multiple="false"-->
			<!--        :headers="tokenHeader"-->
			<!--        :action="importExcelUrl"-->
			<!--        @change="handleImportExcel"-->
			<!--      >-->
			<!--        <a-button type="primary" icon="import">导入</a-button>-->
			<!--      </a-upload>-->
			<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
			<!--        <a-menu slot="overlay">-->
			<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>-->
			<!--        </a-menu>-->
			<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
			<!--      </a-dropdown>-->
		</div>

		<!-- table区域-begin -->
		<div>
			<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
			<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
			<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
			<!--        >项-->
			<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
			<!--      </div>-->

			<!--      :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
			<a-table ref="table" size="middle" rowKey="id" :columns="columns" :dataSource="showDataSource"
				:pagination="ipagination" :loading="loading" :scroll="{ x: 1200 }" @change="handleTableChange">
				<template slot="htmlSlot" slot-scope="text">
					<div v-html="text"></div>
				</template>
				<template slot="imgSlot" slot-scope="text">
					<span v-if="!text" style="font-size: 12px; font-style: italic">无此图片</span>
					<img v-else :src="getImgView(text)" height="25px" alt="图片不存在"
						style="max-width: 80px; font-size: 12px; font-style: italic" />
				</template>
				<template slot="fileSlot" slot-scope="text">
					<span v-if="!text" style="font-size: 12px; font-style: italic">无此文件</span>
					<a-button v-else :ghost="true" type="primary" icon="download" size="small"
						@click="uploadFile(text)">
						下载
					</a-button>
				</template>

				<span slot="action" slot-scope="text, record">
					<!--          <a v-if="record.ispublish == 0" @click="edit(record)">设置监考</a>-->
					<edu-label-button type="3" v-if="record.ispublish == 0" @click="edit(record)"
						title="设置监考"></edu-label-button>
				</span>

				<span slot="place" slot-scope="text, record">
					<span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
				</span>
				<span slot="ksrqsj" slot-scope="text, record">
					<span>{{ record.ksrq }} {{ record.ksrqsj }}</span>
				</span>
			</a-table>
		</div>

		<veJwKsJiankao-modal ref="modalForm" @ok="modalFormOk"></veJwKsJiankao-modal>

		<ve-jw-kaoshi-modal ref="modalFormKaoshi" @ok="modalFormOk"></ve-jw-kaoshi-modal>

	</a-card>
</template>

<script>
	// import { EduListMixin } from '@/mixins/EduListMixin'
	import {
		EduListMixin
	} from '@/mixins/KwglMixin'
	import VeJwKsJiankaoModal from './modules/VeJwKsJiankaoModal'
	import {
		getAction
	} from '@/api/common/manage'
	import {
		EduUtils
	} from '@/mixins/EduUtils'
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'
	import VeJwKaoshiModal from './modules/VeJwKaoshiModal'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
	import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
	import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

	export default {
		name: 'VeJwBkJiankaoList',
		mixins: [EduListMixin, EduUtils],
		components: {
			JSelectJiaoxueKecheng,
			JSelectBanjiByZy,
			JSelectZyByZyb,
			JSelectZyb,
			VeJwKaoshiModal,
			JSelectXiaoqu,
			JSelectXueqi,
			VeJwKsJiankaoModal
		},
		data() {
			return {
				description: 've_jw_bk_jiankao管理页面',
				// eduurl: 'http://159.75.200.65:4010',
				// 表头
				columns: [{
						title: '课程名称',
						align: 'center',
						width: 150,
						dataIndex: 'kcidDictText'
					},

					{
						title: '监考教师',
						align: 'center',
						width: 150,
						dataIndex: 'jiankaoName'
					},

					{
						title: '巡考教师',
						align: 'center',
						width: 150,
						dataIndex: 'xunkaoName'
					},
					{
						title: '考试名称',
						align: 'center',
						width: 150,
						dataIndex: 'name'
					},
					{
						title: '考试时间',
						align: 'center',
						width: 150,
						dataIndex: 'ksrqsj',
						scopedSlots: {
							customRender: 'ksrqsj'
						}
					},

					{
						title: '考试地点',
						width: 250,
						dataIndex: 'action',
						align: 'center',
						scopedSlots: {
							customRender: 'place'
						}
					},
					{
						title: '考试性质',
						align: 'center',
						width: 150,
						dataIndex: 'ksxzmDictText'
					},
					{
						title: '考试形式',
						align: 'center',
						width: 150,
						dataIndex: 'ksxsmDictText'
					},

					{
						title: '考试方式',
						align: 'center',
						width: 150,
						dataIndex: 'ksfsmDictText'
					},

					{
						title: '人数',
						align: 'center',
						width: 150,
						dataIndex: 'number'
					},
					{
						title: '发布状态',
						align: 'center',
						width: 150,
						dataIndex: 'ispublishDictText'
					},
					{
						title: '状态',
						align: 'center',
						width: 150,
						dataIndex: 'statusDictText'
					},

					{
						title: '操作',
						width: 150,
						dataIndex: 'action',
						fixed: 'right',
						align: 'center',
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				url: {
					list: '/kwgl/veJwKaoshi/list',
					delete: '/kwgl/veJwKaoshi/delete',
					deleteBatch: '/kwgl/veJwKaoshi/deleteBatch',
					exportXlsUrl: '/kwgl/veJwKaoshi/exportXls',
					importExcelUrl: 'kwgl/veJwKaoshi/importExcel',
					getBuildingList: '/jxzy/jwJianzhu/list',
					getClassroomList: '/jxzy/jwJiaoshi/list'
				},
				dictOptions: {},
				isorter: []
			}
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			}
		},

		created() {
			this.getCampus()
		},
		mounted() {
			this.searchQuery();
		},
		methods: {
			initDictConfig() {},

			// getCampus() {
			//   var getDeparementUrl = this.eduurl + '/common/veCommon/queryCampusList'
			//   getAction(getDeparementUrl)
			//     .then((res) => {
			//       if (res.success) {
			//         this.campus = res.result
			//         console.log('------------------------')
			//         console.log(this.campus)
			//       } else {
			//         this.$message.warning(res.message)
			//       }
			//     })
			//     .finally(() => {
			//       this.loading = false
			//     })
			// },

			edit: function(record) {
				this.$refs.modalForm.edit(record)
				this.$refs.modalForm.title = '编辑'
				this.$refs.modalForm.disableSubmit = false
				this.$refs.modalForm.flag = true
			},
			add() {
				this.$refs.modalFormKaoshi.add()
				this.$refs.modalFormKaoshi.title = '新增'
				this.$refs.modalFormKaoshi.disableSubmit = false
				this.$refs.modalFormKaoshi.flag = true
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
		}
	}
</script>
<style lang="less" scoped>
	::v-deep .j-select-biz-component-box {
		width: 300px;
	}

	::v-deep .ant-table-thead>tr>th {
		background: #66C3FD;
		color: #FFFFFF;
	}

	::v-deep .ant-form-item {
		display: flex;
	}
</style>