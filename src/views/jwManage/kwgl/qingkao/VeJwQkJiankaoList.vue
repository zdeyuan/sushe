<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="校区" >
                <j-select-xiaoqu placeholder="请选择校区" v-model="queryParam.campusid" @input="campusSelect"></j-select-xiaoqu>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="教学楼" >
                <a-select @change="buildingSelect" v-model="queryParam.jzid" placeholder="请选择教学楼">
                  <a-select-option v-for="item in jzs" :key="item.id" :value="item.id" placeholder="教学楼">
                    {{ item.jzwmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="教室">
                <a-select v-model="queryParam.jsid" placeholder="请选择教室">
                  <a-select-option v-for="item in jss" :key="item.id" :value="item.id" placeholder="教室">
                    {{ item.jsmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="课程">
                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="状态">
                <j-dict-select-tag
                  placeholder="请选择状态"
                  dictCode="kwgl_qingkao_status"
                  v-model="queryParam.status"
                ></j-dict-select-tag>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
				 <edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button> -->
				 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="margin: 10px 0;">
<!--      <a-button @click="add" type="primary" icon="plus">新增</a-button>-->
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
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
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt="图片不存在"
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
<!--         <a v-if="record.ispublish == 0" @click="edit(record)">设置监考</a>-->
          <edu-label-button type="3" v-if="record.ispublish == 0" @click="edit(record)" title="设置监考"></edu-label-button>
        </span>

        <span slot="place" slot-scope="text, record">
          <span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
        </span>
      </a-table>
    </div>

    <veJwQkJiankao-modal ref="modalForm" @ok="modalFormOk"></veJwQkJiankao-modal>
  </a-card>
</template>

<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { EduUtils } from '@/mixins/EduUtils'
  import VeJwQkJiankaoModal from './modules/VeJwQkJiankaoModal'
  import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

export default {
  name: 'VeJwQkJiankaoList',
  mixins: [EduListMixin,EduUtils],
  components: {
    JSelectJiaoxueKecheng,
    JSelectXiaoqu,
    VeJwQkJiankaoModal,
  },
  data() {
    return {
      description: 've_jw_qk_jiankao管理页面',
      // 表头
      columns: [
        {
          title: '课程名称',
          align: 'center',
          dataIndex: 'kcmc',
        },

        {
          title: '监考教师',
          align: 'center',
          dataIndex: 'jiankaoName',
        },

        {
          title: '巡考教师',
          align: 'center',
          dataIndex: 'xunkaoName',
        },

        {
          title: '考试时间',
          align: 'center',
          dataIndex: 'ksrqsj',
        },

        {
          title: '考试地点',
          dataIndex: 'place',
          align: 'center',
          scopedSlots: { customRender: 'place' },
        },

        {
          title: '考试方式',
          align: 'center',
          dataIndex: 'ksfsmDictText',
        },
        // {
        //   title: '考试性质',
        //   align: 'center',
        //   dataIndex: 'ksxzmDictText',
        // },
        // {
        //   title: '考试形式',
        //   align: 'center',
        //   dataIndex: 'ksxsmDictText',
        // },
        {
          title: '人数',
          align: 'center',
          dataIndex: 'number',
        },
        {
          title: '发布状态',
          align: 'center',
          dataIndex: 'ispublishDictText',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'statusDictText',
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/kwgl/veJwQingkao/list',
        delete: '/kwgl/veJwQingkao/delete',
        deleteBatch: '/kwgl/veJwQingkao/deleteBatch',
        exportXlsUrl: '/kwgl/veJwQingkao/exportXls',
        importExcelUrl: 'kwgl/veJwQingkao/importExcel',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  created() {
    // this.getCampus()
  },
  mounted(){
    this.searchQuery();
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    edit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.flag = true
    },
  },
}
</script>
<style lang="less" scoped>

</style>