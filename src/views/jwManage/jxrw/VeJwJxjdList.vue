<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
           <a-col :xl="7" :lg="9" :md="10" :sm="24">
          <a-form-item label="学期">
            <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid"></j-select-xueqi>
          </a-form-item>
        </a-col>



          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
<!--              searchQuery-->
              <a-button type="primary"  icon="search">查询</a-button>
              <a-button type="primary" @click="queryParam.semid = null" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <a-row :gutter="24">
      <a-col :md="24" :sm="24">
      <!-- table区域-begin -->
      <div style="width: 100%">
        <a-table
          ref="table"
          size="middle"
          bordered
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
            title: '教师',
            align: 'center',
            dataIndex: 'teacher'
          },
          {
            title: '课程',
            align: 'center',
            dataIndex: 'kc'
          },
          {
            title: '已完成课时',
            align: 'center',
            dataIndex: 'ywcks'
          },

          {
            title: '总课时',
            align: 'center',
            dataIndex: 'zks'
          },
          {
            title: '进度',
            align: 'center',
            dataIndex: 'jd'
          }
        ],
        url: {
          list: '/jxrw/veJwJxrw/rklist'
        },
        dictOptions: {},
        isorter: [],
        testdata: [],
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
