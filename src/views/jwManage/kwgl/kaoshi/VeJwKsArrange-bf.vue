<template>
  <div :gutter="10" class="ksxx">
    <!-- 左侧查询 -->
    <a-col v-show="showLeft" class="query" :md="8" :sm="24">
        <!-- 按钮操作区域 -->

      <a-card :bordered="false">
        <div class="row">
          <div style=" padding-left: 16px; height: 100%; margin-top: 5px">
            <div class="title">
              <span>学期</span>
            </div>
            <div style="display: flex;padding-top: 10px;">
              <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid" style="width: 300px" @input="updateQueryParam"></j-select-xueqi>
            </div>
          </div>
        </div>

        <div class="row">
          <div style="padding-left: 16px; height: 100%; margin-top: 5px">
            <div class="title">
              <span>课程名称</span>
            </div>
            <div style="display: flex;padding-top: 10px; width: 100%;">
              <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid" style="width: 300px" @input="updateQueryParam"></j-select-jiaoxue-kecheng>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- 按钮操作区域 -->
          <div style="padding-left: 16px; height: 100%; margin-top: 5px">
            <div class="title">
              <span>行政班</span>
            </div>
            <div style="display: flex;padding-top: 10px;">
              <a-table
                size="middle"
                rowKey="id"
                :scroll="{y:400}"
                :columns="xzb.columns"
                :dataSource="xzb.data"
                :pagination="false"
                :loading="xzbLoading"
                @change="handleTableChange"
                :rowSelection="{ fixed: false, selectedRowKeys: xzbId, onChange: onSelectChangeXzb, type: 'radio', columnWidth: 30}"
              >
                <span slot="action" slot-scope="text, record">
                  <a-button type="dashed" size="small" class="cb-btn" @click="handleChaiban(record)">拆班</a-button>
                  <a-divider type="vertical"/>
                  <a-button type="dashed" size="small" @click="handleEdit(record)">确认</a-button>
                </span>

              </a-table>
            </div>
          </div>
        </div>
      </a-card>
    </a-col>

    <!-- 右侧考试信息 -->
    <a-col :md="showLeft ? 16:24" :sm="24" >
      <div style="display: block;z-index: 300;margin:20px 0 0 -5px;position: absolute;font-size: 25px;color:#1890FF" @click="showLeft=!showLeft">
        <img :src="showLeft ? '/images/menuIcon/zk.png':'/images/menuIcon/sq.png'" style="width: 30px">
      </div>
      <a-card :bordered="false">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <div>
            <a-form layout="inline">
              <a-row :gutter="24">
                <a-col :md="8" :sm="24">
                  <a-form-item :label="showLeft ? '' : '考试日期'" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <j-date
                      placeholder="请选择考试日期"
                      style="width: 100%;margin-left: 10px;"
                      v-model="queryParam.ksrq"
                      :trigger-change="true"
                      :show-time="true"
                      date-format="YYYY-MM-DD"
                    />
                  </a-form-item>
                </a-col>

                <a-col :md="8" :sm="24">
                  <a-form-item :label="showLeft ? '' : '考试时间'" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <j-date
                      placeholder="请选择考试时间"
                      style="width: 100%"
                      v-model="queryParam.ksrqsj"
                      :trigger-change="true"
                      :show-time="true"
                      date-format="YYYY-MM-DD HH:mm"
                    />
                  </a-form-item>
                </a-col>

                <!-- <a-col :md="8" :sm="24">
                  <a-form-item label="考试方式">
                    <j-dict-select-tag  placeholder="请选择考试方式" dictCode="jw_ksfsm" v-model="queryParam.ksfsm"></j-dict-select-tag>
                  </a-form-item>
                </a-col>
				
                <a-col :md="8" :sm="24">
                  <a-form-item label="考试形式">
                    <j-dict-select-tag placeholder="请选择考试形式" dictCode="jw_ksxsm" v-model="queryParam.ksxsm"></j-dict-select-tag>
                  </a-form-item>
                </a-col> -->
				
                <a-col :md="8" :sm="24">
                  <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
					<!-- <a-button @click="searchQuery" type="primary" icon="plus" style="margin-right: 10px;">搜索</a-button>
					 <a-button @click="searchReset" type="primary" icon="plus" >清除</a-button>	 -->
					 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
					 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
               <!--     <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
					<edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button> -->
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </div>
        <!-- 查询区域-END -->
        <!-- table区域-begin -->
        <div>
          <!--          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
          <!--            <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
          <!--            <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
          <!--            >项-->
          <!--            <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
          <!--          </div>-->

          <!--          :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
          <a-table
            ref="table"
            size="middle"
            rowKey="id"
            :scroll="{x:1800}"
            :columns="columns"
            :dataSource="showDataSource"
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
              <edu-label-button type="2" @click="handleDetail(record)" title="详情"></edu-label-button>
              <a-divider type="vertical"/>
              <edu-label-button type="4" @click="publish(record)" title="打印"></edu-label-button>
            </span>

            <span slot="place" slot-scope="text, record">
              <span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
            </span>
          </a-table>
        </div>
        <veJwKaoshi-modal ref="modalForm" @ok="modalFormOk"></veJwKaoshi-modal>
      </a-card>
    </a-col>

    <veJwAnPaiKaoshi-model ref="modalForm" @ok="modalFormOk"></veJwAnPaiKaoshi-model>
  </div>
</template>

<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { getAction } from '@/api/common/manage'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import veJwAnPaiKaoshiModel from './modules/VeJwAnPaiKaoshiModel'

  export default {
    name: 'VeJwKsArrange',
    mixins: [EduListMixin],
    components: { JSelectJiaoxueKecheng, JSelectXueqi, veJwAnPaiKaoshiModel },
    data() {
      return {
        xzbLoading: false,
        // 拆班信息列表
        cbDataList: [],
        // 查询条件
        queryParam: {
          // 学期
          semid: "",
          // 课程
          kcid: "",
        },
        // 选择的数据
        xzbId: [],
        // 行政班数据
        xzb: {
          // 展示列
          columns: [
            {
              title: '班级',
              dataIndex: 'xzbmc',
              align: 'center',
              width: 120,
            },
            {
              title: '操作',
              dataIndex: 'action',
              align: 'center',
              width: 100,
              scopedSlots: { customRender: 'action' }
            },
          ],
          // 展示数据
          data: [],
        },
        showLeft: true,
        description: 've_jw_kaoshi管理页面',
        // 表头
        columns: [
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            fixed:'left',
            width: 120,
            scopedSlots: { customRender: 'action' }
          },
          {
            title: '状态',
            width: 60,
            align: 'center',
            dataIndex: 'statusDictText'
          },

          {
            title: '考试科目',
            align: 'center',
            dataIndex: 'kcidDictText'
          },
          {
            title: '班级',
            align: 'center',
            dataIndex: 'bjidName'
          },
          {
            title: '监考老师',
            align: 'center',
            dataIndex: 'jiankaoName'
          },

          {
            title: '考试时间',
            align: 'center',
            dataIndex: 'ksrqsj'
          },

          {
            title: '考试地点',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'place' }
          },
          {
            title: '考试形式',
            align: 'center',
            width: 120,
            dataIndex: 'ksxsmDictText'
          },
          {
            title: '考试方式',
            align: 'center',
            width: 120,
            dataIndex: 'ksfsmDictText'
          }
        ],
        url: {
          list: '/kwgl/veJwKaoshi/cb/list',
          delete: '/kwgl/veJwKaoshi/delete',
          deleteBatch: '/kwgl/veJwKaoshi/deleteBatch',
          exportXlsUrl: '/kwgl/veJwKaoshi/exportXls',
          importExcelUrl: 'kwgl/veJwKaoshi/importExcel',
          updateStatusBatch: '/kwgl/veJwKaoshi/updateStatusBatch',
          changePublish: '/kwgl/veJwKaoshi/changePublishById',
          // 获取行政班列表
          getXzbList: '/jxrw/veJwJxrw/xzbs',
          // 获取拆班列表
          cbList: '/kwgl/veJwKaoshi/cb/list',
        },
        dictOptions: {},
        isorter: [],
        disableMixinCreated:true
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    mounted(){
      this.searchQuery();
	  this.searchReset();
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
        return
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
      // 选择行政班
      onSelectChangeXzb(xzbId){
        let that = this;
        this.xzbid = xzbId;
        this.queryParam.bjid = xzbId[0];
        this.searchQuery();
      },
      // 更新查询条件后
      updateQueryParam(){
        if(this.queryParam.semid && this.queryParam.kcid){
          // todo 执行查询行政班列表
          this.getXzbList();
        } else {
          this.xzb.data = [];
        }
      },
      // 获取行政班列表信息
      getXzbList(){
        getAction(this.url.getXzbList, this.queryParam).then((res)=>{
          if(res.success){
            this.xzb.data = res.result.records;
          }
          // 如果请求失败
          else {
            this.xzb.data = [];
          }
        })
      },
      // 确认
      handleEdit(record){
        this.$refs.modalForm.add(record);
        this.$refs.modalForm.title = '新增';
        this.$refs.modalForm.isAdd = true;
      },
      handleChaiban(record){
        this.$refs.modalForm.add(record);
        this.$refs.modalForm.title = '新增';
        this.$refs.modalForm.isAdd = false;
      }
    }
  }
</script>
<style scoped lang="less">
  .ksxx>.ant-col{
    height: 735px;
    background-color: #fff;
  }
  .query{
    background: #fff;

    .title{
      border-bottom: 2px solid rgb(175,201,234);
      padding: 10px 10px;
      color: #888;
      font-weight: bold;
      font-size: 16px;
    }

    .cb-btn:hover{
      border-color: #00D09D;
      color: #00D09D;
    }
  }
  .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
    background-color: #66C3FD !important;
  }
</style>