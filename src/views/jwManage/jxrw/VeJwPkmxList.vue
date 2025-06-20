<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24"></a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_pkmx')">导出</a-button>-->
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
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete"/>-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->
    <a-row :gutter="24">

      <a-col :md="6" :sm="24">
      <!-- 左侧树形菜单 -->
      <div style="width: 100%">
<!--        <a-directory-tree multiple @select="onSelect" @expand="onExpand">-->
<!--          <a-tree-node key="0-0" title="2021-2022学年">-->
<!--            <a-tree-node key="0-0-0" title="上学期" is-leaf/>-->
<!--            <a-tree-node key="0-0-1" title="下学期" is-leaf/>-->
<!--          </a-tree-node>-->
<!--          <a-tree-node key="0-1" title="2020-2021学年 ">-->
<!--            <a-tree-node key="0-1-0" title="上学期 " is-leaf/>-->
<!--            <a-tree-node key="0-1-1" title="下学期 " is-leaf/>-->
<!--          </a-tree-node>-->
<!--          <a-tree-node key="0-2" title="2019-2020学年 ">-->
<!--            <a-tree-node key="0-2-0" title="上学期 " is-leaf/>-->
<!--            <a-tree-node key="0-2-1" title="下学期 " is-leaf/>-->
<!--          </a-tree-node>-->
<!--          <a-tree-node key="0-3" title="2018-2019学年 ">-->
<!--            <a-tree-node key="0-3-0" title="上学期 " is-leaf/>-->
<!--            <a-tree-node key="0-3-1" title="下学期 " is-leaf/>-->
<!--          </a-tree-node>-->
<!--        </a-directory-tree>-->
        <a-form-item >
          学期:<j-select-xueqi v-model="xueqi" style="margin-left: 10px;width: 70%" placeholder="请选择学期" @change="onSelect"></j-select-xueqi>
        </a-form-item>

      </div>
      </a-col>

      <a-col :md="18" :sm="24">
      <!-- table区域-begin -->
      <div style="width: 100%">
<!--        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--          <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
<!--          >项-->
<!--          <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--        </div>-->

<!--        :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
        <!--          :dataSource="testdata"-->
        <a-table
          ref="table"
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="testdata"
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
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

      </a-col>
    </a-row>

    <veJwPkmx-modal ref="modalForm" @ok="modalFormOk"></veJwPkmx-modal>
  </a-card>
</template>

<script>
  import '@/assets/scss/common.scss';
  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeJwPkmxModal from './modules/VeJwPkmxModal'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'

  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      slots: {
        icon: 'smile'
      },
      children: [
        { title: 'leaf', key: '0-0-0', slots: { icon: 'meh' } },
        { title: 'leaf', key: '0-0-1', scopedSlots: { icon: 'custom' } }
      ]
    }
  ]

  export default {
    name: 'VeJwPkmxList',
    mixins: [EduListMixin],
    components: {
      JSelectXueqi,
      VeJwPkmxModal
    },
    data() {
      return {
        xueqi:null,
        description: 've_jw_pkmx管理页面',
        // 表头
        columns: [
          {
            title: '教师名称',
            align: 'center',
            dataIndex: 'teachername'
          },
          {
            title: '工号',
            align: 'center',
            dataIndex: 'teacheruserid'
          },
          {
            title: '任课班级',
            align: 'center',
            dataIndex: 'xzbids'
          },

          {
            title: '任课课程',
            align: 'center',
            dataIndex: 'kcid_dictText'
          },
          {
            title: '周节数',
            align: 'center',
            dataIndex: 'weeklessonnum'
          },
          {
            title: '总周数',
            align: 'center',
            dataIndex: 'weeksum'
          },
          {
            title: '总节数',
            align: 'center',
            dataIndex: 'lessonsum'
          }
        ],
        url: {
          list: '/jxrw/veJwJxrw/rklist'
        },
        dictOptions: {},
        isorter: [],

        testdata: [
          {
            key: '1',
            teachername: '欧阳娜娜',
            teacheruserid: '002',
            xzbids: '高一三班',
            kcid_dictText: '音乐',
            weeklessonnum: '5',
            weeksum: '5',
            lessonsum: '5'
          },
          {
            key: '2',
            teachername: '盖伦',
            teacheruserid: '002',
            xzbids: '高二三班',
            kcid_dictText: '体育',
            weeklessonnum: '12',
            weeksum: '5',
            lessonsum: '13'
          },
          {
            key: '3',
            teachername: '王五',
            teacheruserid: '002',
            xzbids: '高二三班',
            kcid_dictText: '数学',
            weeklessonnum: '12',
            weeksum: '5',
            lessonsum: '13'
          },
          {
            key: '4',
            teachername: '李四',
            teacheruserid: '002',
            xzbids: '高二三班',
            kcid_dictText: '语文',
            weeklessonnum: '12',
            weeksum: '5',
            lessonsum: '13'
          }
        ],

        disableMixinCreated:true,
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
      onSelect(value) {
        console.log('selected', value)
      },
      // onSelect(selectedKeys, info) {
      //   console.log('selected', selectedKeys, info)
      // }
    }
  }
</script>
