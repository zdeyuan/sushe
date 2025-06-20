<template>
  <a-card :bordered="false">

    <!-- 查询区域-END -->
    <!-- 操作按钮区域 -->
    <div class="table-operator" style="margin: 10px 0;">
	  <a-button type="primary" @click="searchQuery" icon="sync" style="margin-right: 10px;">刷新</a-button>	

      <!--      <a-button @click="searchQuery" type="primary" icon="reload">刷新</a-button>-->
      <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->

    </div>
    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        bordered
        :scroll="{ x: 1800 }"
        rowKey="id"
        :columns="columns"
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
      </a-table>
    </div>

    <veJwKaoshi-modal ref="modalForm" @ok="modalFormOk"></veJwKaoshi-modal>
    <veJwKaoshi-daoru-list ref="daoruModalForm" @ok="modalFormOk"></veJwKaoshi-daoru-list>
  </a-card>
</template>

<script>

  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { EduUtils } from '@/mixins/EduUtils'
  import { getAction, httpAction, getActionForBase, getActionGradeForBase } from '@/api/common/manage'
  import VeJwKaoshiModal from './modules/VeJwKaoshiModal'
  import VeJwKaoshiDaoruList from './VeJwKaoshiDaoruList'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'

  export default {
    name: 'VeJwKaoshiList',
    mixins: [EduListMixin, EduUtils],
    components: {
      JSelectBanjiByZy,
      JSelectZyByZyb,
      JSelectZyb,
      JSelectXueqi,
      JSelectXiaoqu,
      JSelectJiaoxueKecheng,
      VeJwKaoshiModal,
      'veJwKaoshi-daoru-list': VeJwKaoshiDaoruList
    },
    data() {
      return {
        showImport: false,
        modelUrl: '/static/excelModel/kaoshi_model.xlsx',
        jzs: [],
        jss: [],
        description: 've_jw_kaoshi管理页面',
        gradeKey: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        // 表头
        columns: [
          {
            title: '课程名称',
            align: 'center',
            dataIndex: 'kcidDictText'
          },
          {
            title: '考试时间',
            align: 'center',
            dataIndex: 'ksrqsj',
            scopedSlots: { customRender: 'ksrqsj' }
          },
          {
            title: '考试地点',
            dataIndex: 'place',
            align: 'center',
            scopedSlots: { customRender: 'place' }
          },
		  {
		    title: '考试人数',
		    align: 'center',
		    width: 100,
		    dataIndex: 'number'
		  },
          {
            title: '考试形式',
            align: 'center',
            dataIndex: 'ksxsmDictText'
          },
          {
            title: '考试方式',
            align: 'center',
            dataIndex: 'ksfsmDictText'
          },
          {
            title: '考试性质',
            align: 'center',
            dataIndex: 'ksxzm'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            width: 120,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/kwgl/veJwKaoshi/list',
          delete: '/kwgl/veJwKaoshi/delete',
          deleteBatch: '/kwgl/veJwKaoshi/deleteBatch',
          exportXlsUrl: '/kwgl/veJwKaoshi/exportXls',
          importExcelUrl: 'kwgl/veJwKaoshi/importExcel',
          updateStatusBatch: '/kwgl/veJwKaoshi/updateStatusBatch',
          changePublish: '/kwgl/veJwKaoshi/changePublishById',

          getBuildingList: '/jxzy/jwJianzhu/list',
          getClassroomList: '/jxzy/jwJiaoshi/list'
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
    created() {
      console.log('========================================================================')
      console.log('teslt')
      console.log(window.localStorage.getItem('userId'))
    },
	mounted(){
	  this.searchQuery();
	},
    methods: {
      initDictConfig() {
      },
      daoruModel: function() {
        console.log('进入导入')
        this.$refs.daoruModalForm.show()
        this.$refs.daoruModalForm.title = '导入'

        this.$refs.daoruModalForm.disableSubmit = false
      },

      publish(record) {
        if (!this.url.changePublish) {
          this.$message.error('请设置url.changePublish属性!')
          return
        }
        var that = this
        this.$confirm({
          title: '取消发布',
          content: '是否取消发布此清考信息?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function() {
            that.loading = true
            getAction(that.url.changePublish, { id: record.id, status: 1 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          }
        })
      },
      importExcel() {
        const that = this
        if (document.getElementById('inputFile').files == null || document.getElementById('inputFile').files.length == 0) {
          that.$message.warning('未选择文件')
          return
        }
        let formData = new FormData()
        let fileObj = document.getElementById('inputFile').files[0]
        formData.append('file', fileObj)
        that.confirmLoading = true
        let httpurl = ''
        let method = ''
        httpurl += this.url.importExcelUrl
        method = 'post'
        httpAction(httpurl, formData, method).then((res) => {
          if (res.success) {
            that.$message.success(res.message)
            that.$emit('ok')
            that.close()
          } else {
            that.$message.warning(res.message)
          }
        }).finally(() => {
          that.confirmLoading = false
        })
      },
      dispublish(record) {
        if (!this.url.changePublish) {
          this.$message.error('请设置url.changePublish属性!')
          return
        }
        var that = this
        this.$confirm({
          title: '取消发布',
          content: '是否取消发布此清考信息?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function() {
            that.loading = true
            getAction(that.url.changePublish, { id: record.id, status: 0 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          }
        })
      },
      //批量禁用
      batchDisable: function() {
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
            onOk: function() {
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
            }
          })
        }
      },
      //批量启用
      batchAble: function() {
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
            onOk: function() {
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
            }
          })
        }
      },
      zybChange(code) {
        if (this.$refs.zyByZyb != null) {
          this.$refs.zyByZyb.initDictData(code)
        }
      },
      zyChange(code) {
        if (this.$refs.banjiByZy != null) {
          this.$refs.banjiByZy.initDictData(code)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
	::v-deep .ant-table-thead>tr>th {
		background: #66C3FD;
		color: #FFFFFF;
	}
	
	::v-deep .ant-form-item{
		  display: flex;
	}
</style>
