<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
				<a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-input v-model="queryParam.name" width="150px" placeholder="请填写名称"></a-input>
				</a-form-item>
				<a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<a-select placeholder="请选择状态" style="width: 150px;" v-model="queryParam.status">
						<a-select-option value="">请选择状态</a-select-option>
						<a-select-option value="1">启用</a-select-option>
						<a-select-option value="0">禁用</a-select-option>
					</a-select>
				</a-form-item>

				<span class="table-page-search-submitButtons">
					<a-button @click="searchQuery" type="primary" icon="search"
						style="margin-right: 10px;">搜索</a-button>
					<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
				</span>
				<div class="table-operator" style="margin-top:5px;margin-bottom:10px;">
					<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
					<!-- <edu-button @click="handleAdd" type="primary" icon="plus" title="添加"></edu-button> -->
					<a-button @click="batchState(1)" type="primary" icon="plus"
						style="margin-right: 10px;">启用</a-button>
					<edu-pms :code="'veJn-remove'" type="danger" ext="delete" iconfont="stop" name="禁用"
						@click="batchState(0)" style="margin-right: 10px;"></edu-pms>
					<a-button type="primary" @click="searchQuery" icon="sync" style="margin-right: 10px;">刷新</a-button>

				</div>
			</a-form>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->


		<!-- table区域-begin -->
		<div>
			<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
			<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
			<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
			<!--      </div>-->
			<a-table ref="table" size="middle" rowKey="id" :columns="columns" :dataSource="dataSource"
				:pagination="ipagination" :loading="loading"
				:rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
				@change="handleTableChange">

				<template slot="htmlSlot" slot-scope="text">
					<div v-html="text"></div>
				</template>
				<template slot="imgSlot" slot-scope="text">
					<span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
					<img v-else :src="getImgView(text)" height="25px" alt="图片不存在"
						style="max-width:80px;font-size: 12px;font-style: italic;" />
				</template>
				<template slot="fileSlot" slot-scope="text">
					<span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
					<a-button v-else :ghost="true" type="primary" icon="download" size="small"
						@click="uploadFile(text)">
						下载
					</a-button>
				</template>

				<span slot="action" slot-scope="text, record">
					<edu-label-button type="3" @click="handleEdit(record)" title="编辑"></edu-label-button>
					<a-divider type="vertical" />
					<edu-delete-button @click="handleDelete(record.id)" type="4" title="删除"></edu-delete-button>
					<!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
				</span>

			</a-table>
		</div>

		<veJwKssjd-modal ref="modalForm" @ok="modalFormOk"></veJwKssjd-modal>
	</a-card>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import VeJwKssjdModal from './modules/VeJwKssjdModal'

	export default {
		name: 'VeJwKssjdList',
		mixins: [EduListMixin],
		components: {
			VeJwKssjdModal
		},
		data() {
			return {
				description: 've_jw_kssjd管理页面',
				// 表头
				columns: [

					{
						title: '时间段名称',
						align: 'center',
						dataIndex: 'name'
					},
					{
						title: '开始时间',
						align: 'center',
						dataIndex: 'starttime'
					},
					{
						title: '结束时间',
						align: 'center',
						dataIndex: 'endtime'
					},
					{
						title: '状态',
						align: 'center',
						dataIndex: 'statusDictText'
					},

					{
						title: '操作',
						dataIndex: 'action',
						align: 'center',
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				url: {
					list: '/kwgl/veJwKssjd/list',
					delete: '/kwgl/veJwKssjd/delete',
					stateBatch: '/kwgl/veJwKssjd/stateBatch',
					deleteBatch: '/kwgl/veJwKssjd/deleteBatch',
					exportXlsUrl: '/kwgl/veJwKssjd/exportXls',
					importExcelUrl: 'kwgl/veJwKssjd/importExcel'
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
		methods: {
			initDictConfig() {}
		}
	}
</script>
<style lang="less" scoped>
	::v-deep .ant-table-thead>tr>th {
		background: #66C3FD;
		color: #FFFFFF;
	}

	/deep/ .ant-form-item-label {
		display: inline-block;
		width: 100px;
		vertical-align: middle !important;
	}
</style>