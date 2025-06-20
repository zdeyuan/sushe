<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="教材代码">
              <a-input v-model="queryParam.jcid" placeholder="请输入教材代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材名称">
              <a-input v-model="queryParam.jcmc" placeholder="请输入教材名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="第一作者">
              <a-input v-model="queryParam.dyzz"  placeholder="请输入第一作者"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="出版社">
              <a-input v-model="queryParam.cbs"  placeholder="请输入出版社"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="ISBN">
              <a-input v-model="queryParam.isbn"  placeholder="请输入ISBN"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
            <a-form-item label="适用课程" :labelCol="labelCol">
              <!-- <j-dict-select-tag
                :disabled="check"
                v-decorator="['kcid', validatorRules.kcid]"
                placeholder="请选择"
                dictCode="edu_dev.ve_jw_kecheng,KCMC,id"
                :trigger-change="true"
              ></j-dict-select-tag> -->
              <j-select-jiaoxue-kecheng multi="true" :trigger-change="true" placeholder="请选择课程" v-model="queryParam.kcids"></j-select-jiaoxue-kecheng>

<!--              <a-input-search-->
<!--                v-model="queryParam.kcids"-->
<!--                ref="kcids"-->
<!--                v-decorator="['kcids']"-->
<!--                readOnly-->
<!--                unselectable="on"-->
<!--                @search="onSearchCourse"-->
<!--              >-->
<!--                <a-button slot="enterButton" :disabled="disabled">选择</a-button>-->
<!--              </a-input-search>-->
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
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
    <!-- 操作按钮区域 -->
<!--    <div class="table-operator">-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete" />-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px">-->
<!--          批量操作-->
<!--          <a-icon type="down" />-->
<!--        </a-button>-->
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
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
		  <a @click="handleDetail(record)" >详情</a>
		  <a-divider type="vertical"/>
		  <a @click="handleDelete(record.id)">删除</a>
          <!-- <a-dropdown>
            <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
		  -->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jw-jiaocai-kucun-select-course ref="selectForm" @ok="modalFormOk"></jw-jiaocai-kucun-select-course>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
import { EduListMixin } from '@/mixins/EduListMixin'
import { getAction } from '@/api/common/manage'
import { formatDate } from '@/utils/util'
import JwJiaocaiKucunSelectCourse from './modules/JwJiaocaiKucunSelectCourse.vue'
import JSelectJiaocai from '@/components/kwglbiz/JSelectJiaocai'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

export default {
  name: 'JwJiaocaiList',
  mixins: [EduListMixin],
  components: {
    JSelectJiaoxueKecheng,
    JSelectJiaocai,
    JwJiaocaiKucunSelectCourse,
  },
  data() {
    return {
      description: '库存管理',
      // 表头
      columns: [
        // {
        //   title: '#',
        //   dataIndex: '',
        //   key:'rowIndex',
        //   width:60,
        //   align:"center",
        //   customRender:function (t,r,index) {
        //     return parseInt(index)+1;
        //   }
        // },
        {
          title: 'id',
          align: 'center',
          dataIndex: 'id',
        },
        {
          title: '教材名称',
          align: 'center',
          dataIndex: 'jcmc',
        },
        {
          title: '出版社',
          align: 'center',
          dataIndex: 'cbs',
        },
        {
          title: '库存',
          align: 'center',
          dataIndex: 'number',
        },
      ],
      url: {
        list: '/jxzy/jwJiaocai/list',
        delete: '/jxzy/jwJiaocai/delete',
        deleteBatch: '/jxzy/jwJiaocai/deleteBatch',
        exportXlsUrl: '/jxzy/jwJiaocai/exportXls',
        importExcelUrl: 'jxzy/jwJiaocai/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
      isorter: [],
    }
  },
  methods: {
    onSearchCourse() {
      this.$refs.selectForm.show()
    },

    modalFormOk(data) {
      var ids = ''
      this.$refs.kcids.value = ''
      this.queryParam.kcids = ''
      console.log('当前选中课程id', data)

      for (var a = 0; a < data.length; a++) {
        ids += data[a].id + ','
      }
      this.$refs.kcids.value = ids
      this.queryParam.kcids = ids
    },
  },
}
</script>


