<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
			<a-col :md="7" :sm="24" style="">
			  <a-form-item  label="年级">
			    <j-select-grade placeholder="请选择年级" v-model="queryParam.gradeid" @input="zybChange"></j-select-grade>
			  </a-form-item>
			</a-col>
            <a-col :md="7" :sm="24" style="">
              <a-form-item  label="专业部">
                <j-select-zyb placeholder="请选择专业部" v-model="queryParam.falid" @input="zybChange"></j-select-zyb>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24" style="">
              <a-form-item  label="专业">
                <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
              </a-form-item>
            </a-col>


            <a-col :md="7" :sm="24" style="">
              <a-form-item  label="学期">
                <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid"></j-select-xueqi>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
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
    <div class="table-operator">
<!--      <a-button type="primary" @click="searchQuery" icon="sync">刷新</a-button>-->
      <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
    </div>
    <!-- table区域-begin -->
    <div>
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
          <edu-label-button type="3" title="按班录入" @click="writein(record)"></edu-label-button>
          <a-divider type="vertical"/>
          <edu-label-button type="2" title="导入" @click="putin(record)"></edu-label-button>
		  <a-divider type="vertical"/>
		  <edu-label-button type="2" title="导出" @click="putout(record)"></edu-label-button>
        </span>

        <span slot="place" slot-scope="text, record">
          <span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
        </span>
      </a-table>
    </div>

    <ve-jw-cj-putin-write ref="writeForm" @ok="modalFormOk"></ve-jw-cj-putin-write>
    <ve-jw-cj-putin-modal ref="modalForm" @ok="modalFormOk"></ve-jw-cj-putin-modal>
  </a-card>
</template>

<script>

  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import {EduUtils} from '@/mixins/EduUtils'
  import VeJwCjPutinModal from './modules/VeJwCjPutinModal'
  import VeJwCjPutinWrite from './modules/VeJwCjPutinWrite'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import { postAction, downFile } from '@/api/common/manage'
  export default {
    name: 'VeJwCjPutin',
    mixins: [EduListMixin,EduUtils],
    components: {
      JSelectBanjiByZy,
      JSelectXueqi,
      JSelectZyByZyb,
      JSelectZyb,
      JSelectGrade,
      JSelectJiaoxueKecheng,
      VeJwCjPutinModal,
      VeJwCjPutinWrite
    },
    data() {
      return {
        description: 've_jw_kaoshi管理页面',
        // 表头
        columns: [
          // {
          //   title: '状态',
          //   align: 'center',
          //   dataIndex: 'statusDictText'
          // },
          // {
          //   title: '发布状态',
          //   align: 'center',
          //   dataIndex: 'ispublishDictText'
          // },
          {
            title: '班级',
            align: 'center',
            dataIndex: 'bjidName'
          },
          {
            title: '年级',
            align: 'center',
            dataIndex: 'gradeidName'
          },
          {
            title: '学期',
            align: 'center',
            dataIndex: 'semidName'
          },
          {
            title: '专业',
            align: 'center',
            dataIndex: 'specidName'
          },
          {
            title: '课程',
            align: 'center',
            dataIndex: 'kcidDictText'
          },

          {
            title: '考试时间',
            align: 'center',
            dataIndex: 'ksrqsj'
          },

          {
            title: '考试形式',
            align: 'center',
            dataIndex: 'ksxsmDictText'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: 160,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/kwgl/veJwKaoshi/lrlist',
          delete: '/kwgl/veJwKaoshi/delete',
          deleteBatch: '/kwgl/veJwKaoshi/deleteBatch',
          exportXlsUrl: '/kwgl/veJwKaoshi/exportXls',
		  exportXls: '/kwgl/veJwChengji/exportXlsKaoshi',
          importExcelUrl: 'kwgl/veJwKaoshi/importExcel',
          isexit: '/kwgl/veJwKaoshi/queryByKcid'
        },
        dictOptions: {},
        isorter: []
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
      putin: function(record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '导入'
        this.$refs.modalForm.disableSubmit = false
      },
      writein: function(record) {
        this.$refs.writeForm.show(record)
        this.$refs.writeForm.title = '录入'
        this.$refs.writeForm.disableSubmit = false
      },
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
	  putout(row) {
		  this.loading=true;
	    let fileName =row.bjidName+ '-成绩信息'
	    let param = {
		  xzbid:row.bjid,
	    }
	    downFile(this.url.exportXls, param).then((data) => {
			this.loading=false;
	      if (!data || data.size === 0) {
	        this.$message.warning("文件下载失败")
	        return
	      }
	      if (typeof window.navigator.msSaveBlob !== 'undefined') {
	        window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName + '.xls')
	      } else {
	        let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
	        let link = document.createElement('a')
	        link.style.display = 'none'
	        link.href = url
	        link.setAttribute('download', fileName + '.xls')
	        document.body.appendChild(link)
	        link.click()
	        document.body.removeChild(link) //下载完成移除元素
	        window.URL.revokeObjectURL(url) //释放掉blob对象
	      }
	    })
	  }
    }
  }
</script>
<style lang="less" scoped>
  
</style>