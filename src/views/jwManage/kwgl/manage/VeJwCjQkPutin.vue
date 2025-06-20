<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="10" :sm="24">
              <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
            </a-col>
            <a-col :md="7" :sm="24" style="margin-left: 2.56%">
              <a-form-item label="课程">
                <!--                <j-dict-select-tag-->
                <!--                  :disabled="check"-->
                <!--                  placeholder="请选择课程"-->
                <!--                  dictCode="edu_dev_open.ve_jw_kecheng,KCMC,id"-->
                <!--                  v-model="queryParam.kcid"-->
                <!--                ></j-dict-select-tag>-->
                <a-input v-model="queryParam.kcmc" placeholder="请输入课程名称"></a-input>
              </a-form-item>
            </a-col>

            <a-col :md="5" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索"
                            style="margin-bottom: 0"></edu-button><edu-button type="7" @click="searchReset"
                                                                              icon="delete" title="清除"
                                                                              style="margin-bottom: 0"></edu-button> -->
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
<!--    <div class="table-operator">-->
<!--      <a-button @click="add" type="primary" icon="plus">新增</a-button>-->

<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_qingkao')">导出</a-button>-->
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
<!--    </div>-->

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
<!--        >项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

      <a-table
        ref="table"
        size="middle"
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
          <edu-label-button type="2" title="录入" @click="writein(record)"></edu-label-button>
          <a-divider type="vertical" />
          <edu-label-button type="3" title="导入" @click="putin(record)"></edu-label-button>
        </span>

        <span slot="place" slot-scope="text, record">
          <span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
        </span>
      </a-table>
    </div>

    <ve-jw-cj-bk-putin-modal ref="modalForm" @ok="modalFormOk"></ve-jw-cj-bk-putin-modal>
    <ve-jw-cj-bk-putin-write ref="writeForm" @ok="modalFormOk"></ve-jw-cj-bk-putin-write>
  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/KwglMixin'

import JDictSelectTag from '@/components/dict/JDictSelectTag'

import { getAction } from '@/api/common/manage'
import VeJwCjBkPutinModal from './modules/VeJwCjQkPutinModal'
import VeJwCjBkPutinWrite from './modules/VeJwCjQkPutinWrite'
import { EduUtils } from '@/mixins/EduUtils'

export default {
  name: 'VeJwCjQkPutin',
  mixins: [EduListMixin,EduUtils],
  components: { VeJwCjBkPutinModal, VeJwCjBkPutinWrite },
  data() {
    return {
      description: 've_jw_bukao管理页面',
      // eduurl: 'http://159.75.200.65:4010',
      // 表头
      columns: [
        {
          title: '课程名称',
          align: 'center',
          dataIndex: 'kcmc',
        },
        {
          title: '课程号',
          align: 'center',
          dataIndex: 'kch',
        },
        {
          title: '教研组',
          align: 'center',
          // dataIndex: 'falid',
          dataIndex: 'jyzidName',
        },
        {
          title: '考试分数',
          align: 'center',
          dataIndex: 'ksfs',
        },

        // {
        //   title: '专业组',
        //   align: 'center',
        //   dataIndex: 'kcidDictText',
        // },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxzy/jwKecheng/list',
        delete: '/jxzy/jwKecheng/delete',
        deleteBatch: '/jxzy/jwKecheng/deleteBatch',
        exportXlsUrl: '/jxzy/jwKecheng/exportXls',
        importExcelUrl: 'jxzy/jwKecheng/importExcel',
        isexit: '/kwgl/veJwQingkao/queryByKcid',
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
  created() {
    this.getCampus()
  },
  methods: {
    initDictConfig() {},

    putin: function (record) {
      //判断是否存在对应补考
      getAction(this.url.isexit, { kcid: record.id }).then((res) => {
        if (res.success) {
          this.$refs.modalForm.edit(record.ksfs,res.result)
          console.log(res.result);
          this.$refs.modalForm.title = '导入'
          this.$refs.modalForm.disableSubmit = false
        } else {
          this.$message.warning(res.message)
          return
        }
      })
    },

    writein: function (record) {
      const that = this
      //判断是否存在对应补考
      getAction(this.url.isexit, { kcid: record.id }).then((res) => {
        if (res.success) {
          console.log(res.success)
          console.log(res.result)
          that.$refs.writeForm.show(record.ksfs, res.result)
          that.$refs.writeForm.title = '录入'
          that.$refs.writeForm.disableSubmit = false
        } else {
          this.$message.warning(res.message)
          return
        }
      })
    },
    add: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.flag = true
    },
  },
}
</script>
<style lang="less" scoped>

</style>