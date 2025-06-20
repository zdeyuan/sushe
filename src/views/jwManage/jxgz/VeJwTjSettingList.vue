<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">

        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!-- <edu-button @click="handleAdd" type="primary" icon="plus" title="添加"></edu-button> -->
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"

        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在"
               style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)" type="3" title="编辑">编辑</a>

          <a-divider type="vertical"/>

          <a @click="handleDelete(record.id)" type="4" title="删除">删除</a>

          <!--          <a-dropdown>-->
          <!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
          <!--            <a-menu slot="overlay">-->
          <!--              <a-menu-item>-->
          <!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
          <!--                  <a>删除</a>-->
          <!--                </a-popconfirm>-->
          <!--              </a-menu-item>-->
          <!--            </a-menu>-->
          <!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>

    <veJwTjSetting-modal ref="modalForm" @ok="modalFormOk"></veJwTjSetting-modal>
  </a-card>
</template>

<script>

  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeJwTjSettingModal from './modules/VeJwTjSettingModal'
  // import EduButton from '@/components/button/EduButton'

  export default {
    name: 'VeJwTjSettingList',
    mixins: [EduListMixin],
    components: {
      // EduButton,
      VeJwTjSettingModal
    },
    data() {
      return {
        description: 've_jw_tj_setting管理页面',
        // 表头
        columns: [

          {
            title: '低分分数段',
            align: 'center',
            dataIndex: 'minmark'
          },
          {
            title: '统计高分分数段',
            align: 'center',
            dataIndex: 'maxmark'
          },
          {
            title: '分值段',
            align: 'center',
            dataIndex: 'permark'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/jxgz/veJwTjSetting/list',
          delete: '/jxgz/veJwTjSetting/delete',
          deleteBatch: '/jxgz/veJwTjSetting/deleteBatch',
          exportXlsUrl: '/jxgz/veJwTjSetting/exportXls',
          importExcelUrl: 'jxgz/veJwTjSetting/importExcel'
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
      initDictConfig() {
      },
	  delteIds() {
	  	if (this.selectedRowKeys.length == 0) {
	  		this.$message.warning("请先选择信息");
	  		return
	  	}
	  	var then = this
	  	this.$confirm({
	  		title: '是否删除',
	  		content: '是否删除这些数据',
	  		okText: '确认',
	  		cancelText: '取消',
	  		onOk() {
	  			let ids = ''
	  			for (let i = 0; i < then.selectedRowKeys.length; i++) {
	  				if (i == 0) {
	  					ids += then.selectedRowKeys[i]
	  				} else {
	  					ids += ',' + then.selectedRowKeys[i]
	  				}
	  			}
	  			console.log(then.$http, 'then.$http?????????')
	  			then.$http.delete(then.$http.baseServer + '/jxgz/veJwTjSetting/deleteBatch?ids=' + ids, {})
	  				.then(res => {
	  					then.selectedRowKeys = []
	  					if (res.code == 200) {
	  						then.searchReset()
	  					}
	  
	  				}).catch(err => {
	  					then.$message.warning("获取年级失败");
	  				})
	  		},
	  		onCancel() {},
	  	});
	  },
    }
  }
</script>
<style scoped>
  
</style>