<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline" :form="form">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <!-- <j-dict-select-tag
                  placeholder="请选择校区"
                  dictCode="edu_dev_open.ve_jw_xiaoqu,XQMC,id"
                  v-model="queryParam.campusid"
                  @change="campusSelect"
                ></j-dict-select-tag> -->
                <a-select v-model="queryParam.gradeid" placeholder="请选择年级">
                  <a-select-option v-for="item in grades" :key="item.id" :value="item.id">
                    {{ item.njmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-model="queryParam.semid" placeholder="请选择学期">
                  <a-select-option v-for="item in semesters" :key="item.id" :value="item.id">
                    {{ item.xqmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24" >
              <a-form-item label="学制">
                <a-select v-model="queryParam.xzid" :disabled="check" placeholder="请选择学制">
                  <a-select-option v-for="item in etypes" :key="item.id" :value="item.id">
                    {{ item.xzmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>


            <a-col :md="7" :sm="24" >
              <a-form-item label="班级" :labelCol="labelCol":wrapperCol="wrapperCol">
                <j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业" v-model="queryParam.jxbid" ></j-select-banji-by-zy>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="学生姓名" :labelCol="labelCol":wrapperCol="wrapperCol">
                <a-input v-model="queryParam.xm" placeholder="请输入学生姓名"/>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24" >
              <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
                <!--                <a-input-search-->
                <!--                  v-model="queryParam.jcid"-->
                <!--                  ref="course"-->
                <!--                  readOnly-->
                <!--                  unselectable="on"-->
                <!--                  @search="onSearchCourse"-->
                <!--                >-->
                <!--                  <a-button slot="enterButton" :disabled="disabled">选择</a-button>-->
                <!--                </a-input-search>-->
              </a-form-item>
            </a-col>

			<a-col :md="10" :sm="24">
			  <a-form-item label="专业部-专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
			    <!-- <j-dict-select-tag
			    type="list"
			    v-decorator="['specid', validatorRules.specid]"
			    :trigger-change="true"
			    dictCode="edu_dev_open.ve_jw_xiaoqu,XQMC,id"
			  /> -->
			  <div style="display: flex; margin-top: 5px;">
			    <a-select @change="depSelect" v-model="queryParam.falid" placeholder="请选择专业部">
			      <a-select-option :value="undefined">请选择</a-select-option>
			      <a-select-option v-for="item in deps" :key="item.id" :value="item.id">
			        {{ item.yxmc }}
			      </a-select-option>
			    </a-select>
				<a-select style="margin-left: 10px;" v-model="queryParam.specid" placeholder="请选择专业" @change="zyChange">
				  <a-select-option :value="undefined">请选择</a-select-option>
				  <a-select-option v-for="item in specs" :key="item.id" :value="item.id">
				    {{ item.zymc }}
				  </a-select-option>
				</a-select>
				</div>
			  </a-form-item>
			</a-col>
			
            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
<!--                <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>-->
<!--                <a-button-->
<!--                  @click="searchReset"-->
<!--                  icon="delete"-->
<!--                  style="margin-right: 8px; margin-left: 8px; background: #f47920; color: white"-->
<!--                >清除</a-button-->
<!--                >-->
                 <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
				 <edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button> -->
				 
				 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
                <!--                <a-button type="primary" @click="generateBkListByCondition" icon="search"-->
                <!--                >根据当前条件生成清考名单</a-button-->
                <!--                >-->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="margin: 10px 0;">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->

<!--      <a-button type="primary" icon="download" @click="handleExportXls('清考学生')">导出</a-button>-->
<!--      <a-button @click="searchQuery" type="primary" icon="sync">刷新</a-button>-->
      <a-button @click="handleExportXls('清考学生')" type="primary" icon="check-circle" style="margin-right: 10px;">导出</a-button>
      <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
      <!-- <edu-button type="4" icon="download" @click="handleExportXls('清考学生')" title="导出"></edu-button>
      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
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
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDelConfirm">
            <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction"  type="4" title="删除"></edu-batch-delete-button>
          </a-menu-item>
        </a-menu>
        <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
        </edu-button>
      </a-dropdown>
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

        <span slot="qkks" slot-scope="text, record">
<!--          <span v-if="record.qkid!=0">已安排</span>-->
<!--          <span v-if="record.qkid==0">未安排</span>-->
           <edu-label v-if="record.qkid!=0" title="已安排" type="3"></edu-label>
           <edu-label v-if="record.qkid==0" title="未安排" type="5"></edu-label>
        </span>
      </a-table>
    </div>

    <veJwQkXuesheng-modal ref="modalForm" @ok="modalFormOk"></veJwQkXuesheng-modal>
  </a-card>
</template>

<script>
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import {EduUtils} from '@/mixins/EduUtils'
import VeJwQkXueshengModal from './modules/VeJwQkXueshengModal'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

export default {
  name: 'VeJwQkXueshengList',
  mixins: [EduListMixin,EduUtils],
  components: {
    VeJwQkXueshengModal,JSelectBanjiByZy,JSelectJiaoxueKecheng
  },
  data() {
    return {
      description: 've_jw_qk_xuesheng管理页面',
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
          title: '课程',
          align: 'center',
          dataIndex: 'kcidDictText',
        },
        {
          title: '年级',
          align: 'center',
          dataIndex: 'gradeidName',
        },
        {
          title: '学期',
          align: 'center',
          dataIndex: 'semidName',
        },

        {
          title: '补考成绩',
          align: 'center',
          dataIndex: 'cjbkidName',
        },
        {
          title: '院系',
          align: 'center',
          dataIndex: 'falidName',
        },
        {
          title: '专业',
          align: 'center',
          dataIndex: 'specidName',
        },
        {
          title: '清考考试',
          align: 'center',
          scopedSlots: { customRender: 'qkks' },
        },
      ],
      url: {
        list: '/kwgl/veJwQkXuesheng/list',
        delete: '/kwgl/veJwQkXuesheng/delete',
        deleteBatch: '/kwgl/veJwQkXuesheng/deleteBatch',
        exportXlsUrl: '/kwgl/veJwQkXuesheng/exportXls',
        importExcelUrl: 'kwgl/veJwQkXuesheng/importExcel',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  created() {
    this.getDepartment()
    this.getGrades()
    this.getSemesters()
    this.getEduTypes()
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    zyChange(){
      if (this.$refs.banjiByZy != null) {
        this.$refs.banjiByZy.initDictData(this.queryParam.specid);
      }
    },
    initDictConfig() {},
  },
}
</script>
<style lang="less" scoped>

</style>