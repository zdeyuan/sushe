<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <!--todo  打印成绩单  数据未来源未对接 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item  label="年级">
                <j-select-grade placeholder="请选择年级" v-model="queryParam.gradeid"></j-select-grade>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item  label="班级">
                <j-select-banji-by-zy ref="banjiByZy" v-model="queryParam.xzbid"  placeholder="请选择班级"></j-select-banji-by-zy>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item  label="专业部">
                <j-select-zyb placeholder="请选择专业部" v-model="queryParam.falid" @input="zybChange"></j-select-zyb>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item  label="专业">
                <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="学生姓名">
                <a-input placeholder="请输入学生姓名"  v-model="queryParam.xm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="性别">
                <j-dict-select-tag v-model="queryParam.sex" placeholder="请选择性别" dictCode="sex"/>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="身份证号">
                <a-input placeholder="请输入身份证号"  v-model="queryParam.sfz"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <!-- <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>
                <a-button
                  @click="searchReset"
                  icon="delete"
                  style="margin:0 8px; background: #f47920; color: white"
                >清除</a-button> -->
				
				<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>	
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->


    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="searchQuery" type="primary" icon="printer" style="margin-right: 10px;">批量打印</a-button>
      <a-button @click="searchReset" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_cj_free')">导出</a-button>-->
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
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
<!--          <a @click="detail(record)">查看</a>-->
          <a @click="" style="color:#00ff3c; ">打印</a>
          <a-divider type="vertical" />
          <a @click="">预览</a>
<!--          <a-divider type="vertical" />-->
<!--          <a @click="edit(record)">编辑</a>-->
<!--          <a-divider type="vertical" />-->
<!--          <a @click="audit(record)">审核</a>-->
        </span>
        <span slot="score" slot-scope="text, record">
          <span v-if="record.ksxsid == 1">{{ record.kccj }}</span>
          <span v-if="record.ksxsid == 2">{{ record.kcdjcjmDictText }}</span>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import VeJwCjFreeModal from './modules/VeJwCjFreeModal'
import VeJwCjFreeEdit from './modules/VeJwCjFreeEdit'
import VeJwCjFreeAudit from './modules/VeJwCjFreeAudit'
import VeJwCjFreeAdd from './modules/VeJwCjFreeAdd'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

export default {
  name: 'VeJwCjFreeList',
  mixins: [EduListMixin],
  components: {
    JSelectJiaoxueKecheng,
    JSelectBanjiByZy,
    JSelectZyByZyb,
    JSelectZyb,
    JSelectXuezhi,
    JSelectXueqi,
    JSelectGrade,
    VeJwCjFreeModal,
    VeJwCjFreeEdit,
    VeJwCjFreeAudit,
    VeJwCjFreeAdd,
  },
  data() {
    return {
      description: '打印成绩',
      // 表头
      columns: [
        {
          title: '学生',
          align: 'center',
          dataIndex: 'xm',
        },

        {
          title: '学号',
          align: 'center',
          dataIndex: 'xh',
        },

        {
          title: '性别',
          align: 'center',
          dataIndex: 'sexDictText',
          // scopedSlots: { customRender: 'score' },
        },

        {
          title: '身份号',
          align: 'center',
          dataIndex: 'kcidDictText',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'state',
        },

        {
          title: '所属年级',
          align: 'center',
          dataIndex: 'falidName',
        },
        {
          title: '所属专业部',
          align: 'center',
          dataIndex: 'specidName',
        },
        {
          title: '所属专业',
          align: 'center',
          dataIndex: 'gradeidName',
        },
        {
          title: '所属班级',
          align: 'center',
          dataIndex: 'semidName',
        },

        {
          title: '学制',
          align: 'center',
          dataIndex: 'typeDictText',
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/kwgl/veJwCjFree/list',
        delete: '/kwgl/veJwCjFree/delete',
        deleteBatch: '/kwgl/veJwCjFree/deleteBatch',
        stateBatch: "/kwgl/veJwCjFree/stateBatch",
        exportXlsUrl: '/kwgl/veJwCjFree/exportXls',
        importExcelUrl: 'kwgl/veJwCjFree/importExcel',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
      }
    },
    zyChange(code){
      if (this.$refs.banjiByZy != null) {
        this.$refs.banjiByZy.initDictData(code)
      }
    },
    initDictConfig() {},

    detail(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看（' + record.xm + '）免缓缺信息'
      this.$refs.modalForm.disableSubmit = true
    },
    edit(record) {
      // this.$refs.editForm.edit(record)
      // this.$refs.editForm.title = '编辑（' + record.xm + '）免缓缺信息'
      // this.$refs.editForm.disableSubmit = false

      this.$refs.addForm.edit(record)
      this.$refs.addForm.title = '编辑（' + record.xm + '）免缓缺信息'
      this.$refs.addForm.disableSubmit = false
    },
    audit(record) {
      this.$refs.auditForm.edit(record)
      this.$refs.auditForm.title = '审核（' + record.xm + '）免缓缺信息'
      this.$refs.auditForm.disableSubmit = false
    },
    add() {
      this.$refs.addForm.add()
      this.$refs.addForm.title = '添加免缓缺信息'
      this.$refs.addForm.disableSubmit = false
    },
  },
}
</script>
<style lang="less" scoped>

</style>