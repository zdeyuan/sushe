<template>
  <a-card :bordered="false">
<!--    &lt;!&ndash; 查询区域 &ndash;&gt;-->
<!--    <div class="table-page-search-wrapper">-->
<!--      <div>-->
<!--        <a-form layout="inline">-->
<!--          <a-row :gutter="24">-->
<!--            <a-col :md="7" :sm="24">-->
<!--              <a-form-item v-model="queryParam.gradeid" label="年级">-->
<!--                <j-select-grade placeholder="请选择年级"></j-select-grade>-->
<!--              </a-form-item>-->
<!--            </a-col>-->
<!--            <a-col :md="7" :sm="24">-->
<!--              <a-form-item label="课程">-->
<!--                &lt;!&ndash;                <j-dict-select-tag&ndash;&gt;-->
<!--                &lt;!&ndash;                  :disabled="check"&ndash;&gt;-->
<!--                &lt;!&ndash;                  placeholder="请选择课程"&ndash;&gt;-->
<!--                &lt;!&ndash;                  dictCode="edu_dev_open.ve_jw_kecheng,KCMC,id"&ndash;&gt;-->
<!--                &lt;!&ndash;                  v-model="queryParam.kcid"&ndash;&gt;-->
<!--                &lt;!&ndash;                ></j-dict-select-tag>&ndash;&gt;-->

<!--                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>-->
<!--              </a-form-item>-->
<!--            </a-col>-->

<!--            <a-col :md="7" :sm="24">-->
<!--              <a-form-item label="状态">-->
<!--                <j-dict-select-tag-->
<!--                  :disabled="check"-->
<!--                  placeholder="请选择状态"-->
<!--                  dictCode="kwgl_qingkao_status"-->
<!--                  v-model="queryParam.status"-->
<!--                ></j-dict-select-tag>-->
<!--              </a-form-item>-->
<!--            </a-col>-->

<!--            <a-col :md="7" :sm="24">-->
<!--              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">-->
<!--                <a-button-->
<!--                  @click="searchReset"-->
<!--                  icon="delete"-->
<!--                  style="margin-right: 8px; background: #f47920; color: white"-->
<!--                >清除</a-button-->
<!--                >-->
<!--                <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>-->
<!--              </span>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--        </a-form>-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash; 查询区域-END &ndash;&gt;-->

<!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_chengji')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
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
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <veJwChengji-modal ref="modalForm" @ok="modalFormOk"></veJwChengji-modal>
  </a-card>
</template>

<script>

import { EduListMixin } from '@/mixins/EduListMixin'
  import VeJwChengjiModal from './modules/VeJwChengjiModal'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'

  export default {
    name: "VeJwChengjiList",
    mixins:[EduListMixin],
    components: {
      JSelectGrade,
      VeJwChengjiModal
    },
    data () {
      return {
        description: 've_jw_chengji管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'教学任务ID',
            align:"center",
            dataIndex: 'jxrwid'
          },
          {
            title:'考试形式ID（数据字典 1=考试，2=考查）',
            align:"center",
            dataIndex: 'ksxsid'
          },
          {
            title:'学制ID',
            align:"center",
            dataIndex: 'xzid'
          },
          {
            title:'是否有考试（1=有考试，0=无考试）',
            align:"center",
            dataIndex: 'hasexam'
          },
          {
            title:'考试ID',
            align:"center",
            dataIndex: 'ksid'
          },
          {
            title:'考试日期',
            align:"center",
            dataIndex: 'ksrq'
          },
          {
            title:'院系ID',
            align:"center",
            dataIndex: 'falid'
          },
          {
            title:'专业ID',
            align:"center",
            dataIndex: 'specid'
          },
          {
            title:'年级ID',
            align:"center",
            dataIndex: 'gradeid'
          },
          {
            title:'学期ID',
            align:"center",
            dataIndex: 'semid'
          },
          {
            title:'课程ID',
            align:"center",
            dataIndex: 'kcid'
          },
          {
            title:'学生ID',
            align:"center",
            dataIndex: 'stuid'
          },
          {
            title:'学生用户ID',
            align:"center",
            dataIndex: 'userid'
          },
          {
            title:'学号',
            align:"center",
            dataIndex: 'xh'
          },
          {
            title:'学生姓名',
            align:"center",
            dataIndex: 'xm'
          },
          {
            title:'行政班ID',
            align:"center",
            dataIndex: 'xzbid'
          },
          {
            title:'教学班ID',
            align:"center",
            dataIndex: 'jxbid'
          },
          {
            title:'考试日期（时间）',
            align:"center",
            dataIndex: 'ksrqsj'
          },
          {
            title:'平时成绩',
            align:"center",
            dataIndex: 'pscj'
          },
          {
            title:'分数类考试成绩',
            align:"center",
            dataIndex: 'fslkscj'
          },
          {
            title:'等级类考试成绩',
            align:"center",
            dataIndex: 'djlkscj'
          },
          {
            title:'课程成绩（根据教学任务设置的成绩比例计算出的最终成绩）',
            align:"center",
            dataIndex: 'kccj'
          },
          {
            title:'课程等级成绩码',
            align:"center",
            dataIndex: 'kcdjcjm'
          },
          {
            title:'及格分数（根据课程的考试分数*60%=及格分数）',
            align:"center",
            dataIndex: 'jgcj'
          },
          {
            title:'是否及格（1=及格，0=不及格，根据课程成绩，跟及格分数的比较，判断是否及格）',
            align:"center",
            dataIndex: 'sfjg'
          },
          {
            title:'任课教师ID',
            align:"center",
            dataIndex: 'teacherid'
          },
          {
            title:'任课教师工号',
            align:"center",
            dataIndex: 'rkjsgh'
          },
          {
            title:'成绩录入人ID',
            align:"center",
            dataIndex: 'recorduserid'
          },
          {
            title:'成绩录入人号',
            align:"center",
            dataIndex: 'cjlrrh'
          },
          {
            title:'成绩录入日期时间（原日期时间合并）',
            align:"center",
            dataIndex: 'cjlrrqsj',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'审核状态（0=待审核，1=通过，2=不通过）',
            align:"center",
            dataIndex: 'auditstatus'
          },
          {
            title:'审核人用户ID',
            align:"center",
            dataIndex: 'audituserid'
          },
          {
            title:'审核时间',
            align:"center",
            dataIndex: 'audittime'
          },
          {
            title:'审核不通过的原因',
            align:"center",
            dataIndex: 'audittid'
          },
          {
            title:'终端ID',
            align:"center",
            dataIndex: 'terminalid'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/kwgl/veJwChengji/list",
          delete: "/kwgl/veJwChengji/delete",
          deleteBatch: "/kwgl/veJwChengji/deleteBatch",
          exportXlsUrl: "/kwgl/veJwChengji/exportXls",
          importExcelUrl: "kwgl/veJwChengji/importExcel",
        },
        dictOptions:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
      }
    }
  }
</script>
<style lang="less" scoped>
  
</style>