<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-form-item label="姓名/学号">
              <a-input placeholder="请输入姓名或学号" v-model="queryParam.xm"></a-input>
            </a-form-item>
            <a-form-item label="职业认证">
              <j-dict-select-tag
                v-model="queryParam.zyksid"
                placeholder="请选择"
                dictCode="edu_dev_open.ve_jw_ks_zhiye,name,id"
              ></j-dict-select-tag>
            </a-form-item>

            <a-form-item label="年级">
              <!--              <j-dict-select-tag-->
              <!--                v-model="queryParam.gradeid"-->
              <!--                placeholder="请选择"-->
              <!--                dictCode="gradeid"-->
              <!--              ></j-dict-select-tag>-->
              <j-select-grade  placeholder="请选择年级" v-model="queryParam.gradeid"></j-select-grade>
            </a-form-item>

            <a-form-item label="专业部">
              <!--              <j-dict-select-tag v-model="queryParam.falid" placeholder="请选择" dictCode="falid"></j-dict-select-tag>-->
              <j-select-zyb  v-model="queryParam.falid" placeholder="请选择专业部" @input="zybChange"></j-select-zyb>
            </a-form-item>

            <a-form-item label="专业">
              <j-select-zy-by-zyb ref="zyByZyb" placeholder="请先选择专业部" v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
              <!--              <j-dict-select-tag v-model="queryParam.specid" placeholder="请先选择专业部" dictCode="specid"></j-dict-select-tag>-->
            </a-form-item>

            <a-form-item label="班级">
              <j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业" v-model="queryParam.xzbid"></j-select-banji-by-zy>
              <!--              <a-select v-model="queryParam.xzbid">-->
              <!--                <a-select-option v-for="item in classes" :key="item.id" :value="item.id">-->
              <!--                  {{ item.name }}-->
              <!--                </a-select-option>-->
              <!--              </a-select>-->
            </a-form-item>

            <span  class="table-page-search-submitButtons">
             <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
             <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" >
      <!--<a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>-->
      <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button>

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDelConfirm">
            <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction"  type="4" title="删除"></edu-batch-delete-button>
          </a-menu-item>
        </a-menu>
        <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
        </edu-button>
      </a-dropdown> -->
	  
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <edu-label-button type="2" @click="handleDetail(record)" title="查看"></edu-label-button>

          <!--<a @click="handleDetail(record)">统计</a>-->
<!--          <a-divider type="vertical" />-->
<!--          <a-divider type="vertical" />-->
          <!--<a-dropdown>-->
          <!--<a class="ant-dropdown-link">-->
          <!--更多 <a-icon type="down"/>-->
          <!--</a>-->
          <!--<a-menu slot="overlay">-->
          <!--<a-menu-item>-->
          <!--<a href="javascript:;" @click="handleDetail(record)">详情</a>-->
          <!--</a-menu-item>-->

          <!--<a-menu-item>-->
          <!--<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
          <!--<a>删除</a>-->
          <!--</a-popconfirm>-->
          <!--</a-menu-item>-->
          <!--</a-menu>-->
          <!--</a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <ve-jw-cj-zhiye-printing-modal ref="modalForm" @ok="modalFormOk"></ve-jw-cj-zhiye-printing-modal>
  </a-card>
</template>

<script>
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import { EduUtils } from '@/mixins/EduUtils'
import { getAction } from '@/api/common/manage'
import VeJwCjZhiyePrintingModal from './modules/VeJwCjZhiyePrintingModal'
import { formatDate } from '@/utils/util'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'

export default {
  name: 'EduOrderTicketList',
  mixins: [EduListMixin, EduUtils],
  components: {
    JSelectBanjiByZy,
    JSelectZyByZyb,
    JSelectZyb,
    JSelectGrade,
    VeJwCjZhiyePrintingModal,
  },
  data() {
    return {
      description: 've_jw_cj_zhiye管理页面',
      classes: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '学号',
          align: 'center',
          dataIndex: 'xh',
        },
        {
          title: '职业认证名称',
          align: 'center',
          dataIndex: 'zyksid_dictText',
        },
        {
          title: '准考证号',
          align: 'center',
          dataIndex: 'zkzh',
        },
        {
          title: '证书号',
          align: 'center',
          dataIndex: 'zsh',
        },
        {
          title: '理论成绩',
          align: 'center',
          dataIndex: 'llcj',
        },
        {
          title: '实操成绩',
          align: 'center',
          dataIndex: 'sccj',
        },
        {
          title: '考试成绩',
          align: 'center',
          dataIndex: 'kscj',
        },
        {
          title: '通过状态',
          align: 'center',
          dataIndex: 'ispass_dictText',
        },
        {
          title: '年级',
          align: 'center',
          dataIndex: 'gradeidName',
        },
        {
          title: '专业部',
          align: 'center',
          dataIndex: 'falidName',
        },
        {
          title: '专业',
          align: 'center',
          dataIndex: 'specidName',
        },

        // {
        //   title:'学制ID',
        //   align:"center",
        //   dataIndex: 'xzid'
        // },

        {
          title: '行政班名称',
          align: 'center',
          dataIndex: 'xzbidName',
        },
        // {
        //   title:'学生ID',
        //   align:"center",
        //   dataIndex: 'stuid'
        // },
        // {
        //   title:'学生用户ID',
        //   align:"center",
        //   dataIndex: 'userid'
        // },
        // {
        //   title:'成绩录入人ID',
        //   align:"center",
        //   dataIndex: 'createuserid'
        // },
        // {
        //   title:'成绩录入日期时间（原日期时间合并）',
        //   align:"center",
        //   dataIndex: 'cjlrrqsj',
        //   customRender:function (text) {
        //     return !text?"":(text.length>10?text.substr(0,10):text)
        //   }
        // },
        // {
        //   title:'状态（0=初始，1=已录入，2=已提交）',
        //   align:"center",
        //   dataIndex: 'status'
        // },
        // {
        //   title:'终端ID',
        //   align:"center",
        //   dataIndex: 'terminalid'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/edu-schedule/jingsaiProject/veJwCjZhiye/list',
        delete: '/edu-schedule/jingsaiProject/veJwCjZhiye/delete',
        deleteBatch: '/edu-schedule/jingsaiProject/veJwCjZhiye/deleteBatch',
        exportXlsUrl: '/edu-schedule/jingsaiProject/veJwCjZhiye/exportXls',
        importExcelUrl: 'jingsaiProject/veJwCjZhiye/importExcel',
        //bjlist: '/jxzy/edu-teach/teach/veBaseBanji/list',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  created() {
    this.getClass()
  },
  methods: {
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
      }
    },
    zyChange(code){
      if (this.$refs.zyByZyb != null) {
        this.$refs.banjiByZy.initDictData(code)
      }
    },
  },
  handleEdit: function (record) {
    this.$refs.modalForm.edit(record)
    this.$refs.modalForm.title = '查看职业认证考试成绩'
    this.$refs.modalForm.disableSubmit = false
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
  		cancelText:'取消',
  		onOk() {
  			let ids = ''
  			for (let i = 0; i < then.selectedRowKeys.length; i++) {
  				if (i == 0) {
  					ids += then.selectedRowKeys[i]
  				} else {
  					ids += ',' + then.selectedRowKeys[i]
  				}
  			}
  				console.log(then.$http,'then.$http?????????')
  			 then.$http.delete(then.$http.baseServer + '/edu-schedule/jingsaiProject/veJwCjZhiye/deleteBatch?ids=' + ids,{}).then(res => {
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
</script>

<style scoped>

</style>