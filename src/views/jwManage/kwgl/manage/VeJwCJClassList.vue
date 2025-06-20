<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <!--todo  打印功能未添加 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="年级">
              <j-select-grade  v-model="queryParam.gradeId" placeholder="请选择年级" ></j-select-grade>
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="专业部">
              <j-select-zyb v-model="queryParam.falid" placeholder="请选择专业部" @input="zybChange" ></j-select-zyb>
            </a-form-item>
          </a-col>
		  <a-col :xl="7" :lg="7" :md="8" :sm="24">
		    <a-form-item label="专业">
		      <j-select-zy-by-zyb ref="zyByZyb"  v-model="queryParam.specId" placeholder="请选择专业" @input="zyChange" style="width: 50%"></j-select-zy-by-zyb>
		    </a-form-item>
		  </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="班级">
              <j-select-banji-by-zy ref="banjiByZy"  v-model="queryParam.id" placeholder="请选择班级" ></j-select-banji-by-zy>
            </a-form-item>
          </a-col>
<!--          <a-col :xl="5" :lg="7" :md="8" :sm="24">-->
<!--            <a-form-item label="">-->
<!--              <j-select-zy-by-zyb ref="zyByZyb"  v-model="queryParam.specId" placeholder="请选择专业" @input="zyChange"></j-select-zy-by-zyb>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-col :xl="5" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
               <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索"
                           style="margin-bottom: 0"></edu-button>
						   <edu-button type="7" @click="searchReset"
                                                                             icon="delete" title="清除"
                                                                             style="margin-bottom: 0"></edu-button> -->
				<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>	
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

<!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
    <div class="table-operator">
		 <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
<!--      <a-button style="background-color: #4cffb4;color:white;" icon="printer">批量打印</a-button>-->
<!--      <a-button @click="searchQuery" type="primary" icon="reload">刷新</a-button>-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_cj_change')">导出</a-button>-->
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
	  <!-- <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	 -->
      <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
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
        :dataSource="dataSource"
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
<!--          <a @click="" style="color:#00ff3c; ">打印</a>-->
<!--          <a-divider type="vertical" />-->
<!--          <a @click="">预览</a>-->
<!--          <a @click="audit(record)">审核</a>-->

<!--          <a-divider type="vertical" />-->
<!--          <a-divider type="vertical" />-->
          <edu-label-button type="1" @click="detail(record)" title="查看"></edu-label-button>
        </span>
      </a-table>
    </div>
    <ve-jw-cj-class-modal ref="modalForm"></ve-jw-cj-class-modal>
  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'

import { getAction,getActionForBase } from '@/api/common/manage'
import { postAction } from '@/api/common/manage'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import VeJwCjClassModal from './modules/VeJwCjClassModal'
export default {
  name: 'VeJwCjClassList',
  mixins: [EduListMixin],
  components: { VeJwCjClassModal, JSelectZyByZyb, JSelectZyb, JSelectGrade, JSelectBanjiByZy },
  data() {
    return {
      description: 've_jw_cj_change管理页面',
      // disableMixinCreated: true,
      // 表头
      columns: [
        {
          title: '所属专业部',
          align: 'center',
          dataIndex: 'yxmc',
        },
        {
          title: '所属专业',
          align: 'center',
          dataIndex: 'specName',
        },

        {
          title: '所属班级',
          align: 'center',
          dataIndex: 'xzbmc',
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        //list: '/jxzy/edu-teach/teach/veBaseBanji/list',
        // bjlist: '/jxzy/edu-teach/teach/veBaseBanji/list',
        list:'/common/veCommon/queryBanJiPageList',
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
    // this.loadBjData()
    // //初始化字典配置 在自己页面定义
    // this.initDictConfig()
    // this.targetModel = {}
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
    audit(record) {
      this.$refs.auditForm.edit(record)
      this.$refs.modalForm.title = '审核（' + record.xm + '）成绩信息'
      this.$refs.auditForm.disableSubmit = false
    },
    detail(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看（' + record.xzbmc + '）考试成绩'
      this.$refs.modalForm.disableSubmit = true
    },
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.ipagination.current = 1
      }
      var params = this.getQueryParams()//查询条件
      this.loading = true
      getActionForBase(this.url.list, params).then((res) => {
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.dataSource = res.result.list || res.result
          // this.getDataInfo()
          // this.changeData()
          // console.log(this.showItemObj)
          if (res.result.total) {
            this.ipagination.total = res.result.total
          }
          //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
    loadBjData(arg) {
      if (!this.url.bjlist) {
        this.$message.error('请设置url.bjlist!')
        return
      }

      postAction(this.url.bjlist).then((res) => {
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          this.dataSource = res.result.list || res.result
          if (res.result.total) {
            this.ipagination.total = res.result.total
          }
          console.log(this.dataSource)
          //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },
  },
}
</script>
<style lang="less" scoped>

</style>