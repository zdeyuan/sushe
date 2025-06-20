<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="课程名称">
              <a-input placeholder="请输入课程名称" v-model="queryParam.kcmc"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="专业部">
              <j-select-zyb v-model="queryParam.falid" placeholder="请选择专业部" @input="zybChange"></j-select-zyb>
              <!-- <a-input placeholder="请输入开课专业ID" v-model="queryParam.specid"></a-input> -->
<!--              <a-select v-model="queryParam.specid">-->
<!--                <a-select-option v-for="item in specs" :key="item.id" :value="item.id">-->
<!--                  {{ item.zymc }}-->
<!--                </a-select-option>-->
<!--              </a-select>-->
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="专业">
              <j-select-zy-by-zyb ref="zyByZyb"  v-model="queryParam.specs" placeholder="请选择专业" ></j-select-zy-by-zyb>
              <!-- <a-input placeholder="请输入开课专业ID" v-model="queryParam.specid"></a-input> -->
<!--              <a-select v-model="queryParam.specid">-->
<!--                <a-select-option v-for="item in specs" :key="item.id" :value="item.id">-->
<!--                  {{ item.zymc }}-->
<!--                </a-select-option>-->
<!--              </a-select>-->
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <j-dict-select-tag v-model="queryParam.status" placeholder="请选择状态" dict-code="enable_state" />
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">			  
			  <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			  <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
		
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button @click="batchAble" type="primary" icon="check-circle" style="margin-right: 10px;">启用</a-button>
	  <a-button @click="batchDisable" type="danger" icon="stop" style="margin-right: 10px;">禁用</a-button>	
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
	  <a-button @click="doExportFn" type="primary"  style="margin-right: 10px;">导出</a-button>	
	   <a-button  type="primary" style="margin-right: 10px;" @click="isShowImport=!isShowImport" >批量导入</a-button>	
     
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

        <span slot="action" slot-scope="text, record">
          <!-- <edu-label-button @click="handleEdit(record)" type="3" title="编辑"></edu-label-button>
          <a-divider type="vertical" />
          <edu-delete-button @click="handleDelete(record.id)" type="4" title="删除"></edu-delete-button> -->
		  
		  <a @click="handleEdit(record)" >编辑</a>
		  <a-divider type="vertical"/>
		  <a @click="handleDelete(record.id)" >删除</a>
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>
      </a-table>
    </div>
	<edu-form title="导入" v-if="isShowImport" width="40%" top="200px" @ok="doImportFn(false)" @cancel="doImportFn()">
	  <div>
	    <a-form-model labelAlign="right">
	      <a-form-model-item label="附近">
	        <uploadFiles
	          :showFiles="false"
	          one
			   :url="importUrl"
	          :getParams="doImport"
	          serviceType="upload"
	          :showMsg="false"
	          @upload="doImportFn"
	          uploadBtnClass="success"
	          uploadBtnName="选择文件"
	          style="display: inline-block;"
	        />
	      </a-form-model-item>
	      <a-form-model-item label="说明" prop="hqUserId" required>
	        <span>请按模板填写好要导入的数据</span>
	        <a class="down-btn" @click="exportModel" >模板下载</a>
	      </a-form-model-item>
	    </a-form-model>
	  </div>
	</edu-form>
    <jwKecheng-modal ref="modalForm" @ok="modalFormOk"></jwKecheng-modal>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
import { EduListMixin } from '@/mixins/KwglMixin'
import { getAction } from '@/api/common/manage'
import { formatDate } from '@/utils/util'
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
import JwKechengModal from './modules/JwKechengModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
import { EduUtils } from '@/mixins/EduUtils'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'

export default {
  name: 'JwKechengList',
  mixins: [EduListMixin,EduUtils],
  components: {
    JSelectZyByZyb,
    JSelectZyb,
    JDictSelectTag,
    JwKechengModal,
	uploadFiles
  },
  data() {
    return {
      description: '教务课程信息管理页面',
      // eduurl: 'http://192.168.0.13:4010',
      // id: '09d5e1e7f9b049008eee645c783a1d67',
      // 表头
	  importUrl:'/edu-schedule/veScheduleExcel/importExcel',
	  isShowImport:false,
      columns: [
        {
          key: 'rowIndex',
          title: '课程号',
          align: 'center',
          dataIndex: 'kch',
          // customRender:function (t,r,index) {
          //   return parseInt(index)+1;
          // }
        },
        {
          title: '课程名称',
          align: 'center',
          dataIndex: 'kcmc',
        },
        {
          title: '课程性质',
          align: 'center',
          dataIndex: 'kcxz_dictText',
        },
        // {
        //   title:'课程英文名',
        //   align:"center",
        //   dataIndex: 'kcywm'
        // },
        // {
        //   title:'课程别名',
        //   align:"center",
        //   dataIndex: 'kcbm'
        // },
        // {
        //   title:'课程介绍（大文本字段ID）',
        //   align:"center",
        //   dataIndex: 'kcjstid'
        // },
        {
          title:'专业组',
          align:"center",
          dataIndex: 'falidName'
        },
        {
          title:'专业',
          align:"center",
          dataIndex: 'specidName'
        },
        // {
        //   title:'开课单位',
        //   align:"center",
        //   dataIndex: 'kkdw'
        // },
        // {
        //   // title: '专业组',
        //   title:'教研组',
        //   align: 'center',
        //   dataIndex: 'jyzidName',
        // },

        {
          title: '考试分数',
          align: 'center',
          dataIndex: 'ksfs',
        },
        {
          title: '总学分',
          align: 'center',
          dataIndex: 'xf',
        },
        {
          title: '总学时',
          align: 'center',
          dataIndex: 'zxs',
        },
        {
          title: '理论学时',
          align: 'center',
          dataIndex: 'llxs',
        },
        {
          title: '实践学时',
          align: 'center',
          dataIndex: 'sjxs',
        },
        {
          title: '其它学时',
          align: 'center',
          dataIndex: 'qtxs',
        },
        // {
        //   title:'参考书目（大文本ID）',
        //   align:"center",
        //   dataIndex: 'cksmtid'
        // },
        // {
        //   title:'考试形式：字典值ID',
        //   align:"center",
        //   dataIndex: 'ksxs'
        // },
        // {
        //   title:'授课形式：字典值ID',
        //   align:"center",
        //   dataIndex: 'skfsm'
        // },
        // {
        //   title:'课程费用',
        //   align:"center",
        //   dataIndex: 'kcfy'
        // },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status_dictText',
        },
        // {
        //   title:'是否删除（1=已删除，0=未删除）',
        //   align:"center",
        //   dataIndex: 'isdelete'
        // },
        // {
        //   title:'创建人ID',
        //   align:"center",
        //   dataIndex: 'createuserid'
        // },
        // {
        //   title:'创建时间',
        //   align:"center",
        //   dataIndex: 'createtime'
        // },
        // {
        //   title:'审核状态（0=待审核，1=通过，2=不通过）',
        //   align:"center",
        //   dataIndex: 'auditstatus'
        // },
        // {
        //   title:'审核人ID',
        //   align:"center",
        //   dataIndex: 'audituserid'
        // },
        // {
        //   title:'审核时间',
        //   align:"center",
        //   dataIndex: 'audittime',
        //   customRender:function (text) {
        //     return !text?"":(text.length>10?text.substr(0,10):text)
        //   }
        // },
        // {
        //   title:'审核备注',
        //   align:"center",
        //   dataIndex: 'audittid'
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
	  exportConfig:{
	    url: '/jxzy/jwKecheng/kechengExport',
	    name: '《课程信息表导出》'
	  },
      url: {
        list: '/jxzy/jwKecheng/list',
        delete: '/jxzy/jwKecheng/delete',
        deleteBatch: '/jxzy/jwKecheng/deleteBatch',
        exportXlsUrl: '/jxzy/jwKecheng/exportXls',
        importExcelUrl: 'jxzy/jwKecheng/importExcel',
        updateStatusBatch: '/jxzy/jwKecheng/updateStatusBatch',
      },
      dictOptions: {},
      superFieldList: [],
      isorter: [],
	  searchInfo: {
	  	pageNo: 1,
	  	pageSize: 10,
	  	gh: '', //状态
	  	xm: '', //年级
	  }
    }
  },

  created() {
    // this.getDeps()
  },

  methods: {
    //时间格式化工具类
    simpleDateFormat(millisecond, format) {
      return formatDate(millisecond, format)
    },
	doImport(){
		return {
		  temp: [
		    '课程号（代码）',
		    '课程名称',
		    '课程英文名',
		    '课程别名',
		    '课程介绍',
		    '开课专业部',
		    '开课专业',
		    '课程性质',
		    '学分',
		    '总学时',
		    '理论学时',
		    '实践学时',
		    '其它学时',
		    '考试分数',
		    '参考书目',
		    '考试形式',
		    '授课形式',
		    '课程性质',
		    '课程费用',
			'状态(1启用0禁用)'
		  ],
		  tempName: '课程基本信息',
		  implName: 'jwKechengServiceImpl.importExcel',
		  }
	},
	doExportFn() {
		let _this=this;
		this.$confirm({
			title: '提示',
			content: '确定要导出' + _this.exportConfig.name + '吗?',
				okText: '确认',
				cancelText:'取消',
			onOk() {
				 _this.doExportFnReal();
			},
			onCancel() {},
		});
	},
	getParams() {
	  const params = this.searchInfo;
	  return params;
	},
	doExportFnReal() {
	  const config = {
	    name: '导出',
	    nameTime: true
	  };
	  Object.assign(config, this.exportConfig);
	  if (!config.url) {
	    return;
	  }
	  if (config.nameTime) {
	    config.name += this.$date.format() + '.xlsx';
	  }
	  //数据加载
	  let reqData = {};
	  /* 如果是自己的 */
	  // reqData[this.sizeName] = 100000;
	  // reqData[this.pageName] = 1;
	  // if (this.params) {
	  //   Object.assign(reqData, this.params);
	  // }
	  if (this.getParams) {
	    Object.assign(reqData, this.getParams());
	  }
	  reqData.sorts = {
		  column: 'd.id',
		  asc: false
	  };
	  this.$http.exportExcel(config.url, reqData, 'post', {
	    name: config.name
	  });
	},
	doImportFn(type) {
	  this.isShowImport = false;
	  if (!type) {
	    return;
	  }
	  this.$message.success('导入成功');
	},
    //批量禁用
    batchDisable: function () {
      if (!this.url.updateStatusBatch) {
        this.$message.error('请设置url.updateStatusBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认禁用',
          content: '是否禁用选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.updateStatusBatch, { ids: ids, status: 0 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          },
        })
      }
    },
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
      }
    },
	//导出模板
	exportModel() {
		const temp = this.doImport();
		this.$http.exportExcel('/edu-schedule/veScheduleExcel/exportTemp',temp, 'post', { name:  temp.tempName + '导入模板.xlsx' });
	},
    //批量启用
    batchAble: function () {
      if (!this.url.updateStatusBatch) {
        this.$message.error('请设置url.updateStatusBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认启用',
          content: '是否启用选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.updateStatusBatch, { ids: ids, status: 1 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          },
        })
      }
    },

    // getDeps() {
    //   var getSpecUrl = this.eduurl + '/common/veCommon/querySpecialtyListByFalid'
    //   getAction(getSpecUrl, { id: '001' })
    //     .then((res) => {
    //       if (res.success) {
    //         this.specs = res.result
    //         console.log(this.specs)
    //       } else {
    //         this.$message.warning(res.message)
    //       }
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },
  },
}
</script>
<style scoped>
	/* ::v-deep .ant-form-item-control{
		  width: 200px ;
	} */
</style>