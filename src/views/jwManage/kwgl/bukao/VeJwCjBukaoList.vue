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
              <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业"
                                      v-model="queryParam.jxbid"></j-select-banji-by-zy>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-model="queryParam.xm" placeholder="请输入学生姓名"/>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
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
            <a-col :md="24" :sm="24">
              <span style="float: left; overflow: hidden; margin: 10px 0" class="table-page-search-submitButtons">
				<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
                <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
				<edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button>
                <edu-button type="4" @click="generateBkListByCondition" icon="search" title="根据当前条件生成补考名单"
                ></edu-button> -->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->
    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button type="primary" style="background:rgb(0,187,221);border: rgb(0,187,221);" @click="addSelectToBkList" icon="plus">批量加入补考名单</a-button>-->
      <!-- <edu-button @click="addSelectToBkList" type="primary" icon="plus" title="批量加入补考名单"></edu-button>
      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
	  <a-button @click="generateBkListByCondition" type="primary" icon="plus" style="margin-right: 10px;">根据当前条件生成补考名单</a-button>
	  <a-button @click="addSelectToBkList" type="primary" icon="plus" style="margin-right: 10px;">批量加入补考名单</a-button>
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
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
<!--          <a @click="addToBkList(record)" v-if="record.isJoinBk == 0">加入补考名单</a>-->
<!--          <span v-if="record.isJoinBk == 1">已加入补考名单</span>-->

		  <a-button  v-if="record.isJoinBk == 0" @click="addToBkList(record)" type="primary" icon="plus" style="margin-right: 10px;">加入补考名单</a-button>
		  <!-- <a-button v-if="record.isJoinBk == 1" type="primary" icon="plus" style="margin-right: 10px;">已加入补考名单</a-button> -->
          <!-- <edu-label-button v-if="record.isJoinBk == 0" type="3" @click="addToBkList(record)" title="加入补考名单"></edu-label-button> -->
          <edu-label type="4" v-if="record.isJoinBk == 1" title="已加入补考名单"></edu-label>
<!--          <span style="color: #fc9d50;font-family: Microsoft YaHei;text-decoration: underline;font-size: 18px;font-weight: bold;" v-if="record.isJoinBk == 1">已加入补考名单</span>-->
        </span>
      </a-table>
    </div>

    <jw-jiaocai-select-course ref="selectForm" @ok="modalFormOk"></jw-jiaocai-select-course>
    <div class="loading" v-if="isSpinShow">
      <a-spin style="width: 200px"/>
    </div>
  </a-card>
</template>

<script>

  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { EduUtils } from '@/mixins/EduUtils'
  // import VeJwCjBukaoModal from './modules/VeJwCjBukaoModal'
  import { getAction } from '@/api/common/manage'
  import { postAction } from '@/api/common/manage'
  import JwJiaocaiSelectCourse from '@/views/jwManage/jxzy/modules/JwJiaocaiSelectCourse'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'

  export default {
    name: 'VeJwCjBukaoList',
    mixins: [EduListMixin, EduUtils],
    components: {
      JSelectBanjiByZy,
      JSelectBanji,
      JSelectJiaoxueKecheng,
      JwJiaocaiSelectCourse
    },
    data() {
      return {
        description: 've_jw_cj_bukao管理页面',
        validatorRules: {},

        grades: [],
        semesters: [],
        deps: [],
        etypes: [],
        specs: [],
        isSpinShow: false,
        // 表头
        columns: [
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
            title: '学生',
            align: 'center',
            dataIndex: 'xm'
          },
          {
            title: '学号',
            align: 'center',
            dataIndex: 'xh'
          },
          {
            title: '课程',
            align: 'center',
            dataIndex: 'kcidDictText'
          },

          {
            title: '成绩',
            align: 'center',
            dataIndex: 'kccj'
          },
          {
            title: '是否及格',
            align: 'center',
            dataIndex: 'sfjgDictText'
          },
          {
            title: '考试日期',
            align: 'center',
            dataIndex: 'ksrq'
          },

          {
            title: '专业',
            align: 'center',
            dataIndex: 'specidName'
          },

          {
            title: '成绩录入日期时间',
            align: 'center',
            dataIndex: 'cjlrrqsj',
            customRender: function(text) {
              return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
            }
          },

          {
            title: '状态',
            align: 'center',
            dataIndex: 'auditstatusDictText'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/kwgl/veJwChengji/list',
          delete: '/kwgl/veJwChengji/delete',
          addById: '/kwgl/veJwBkXuesheng/addById',
          addByIds: '/kwgl/veJwBkXuesheng/addByIds',
          deleteBatch: '/kwgl/veJwChengji/deleteBatch',
          exportXlsUrl: '/kwgl/veJwChengji/exportXls',
          importExcelUrl: 'kwgl/veJwChengji/importExcel',
          generateBkListByCondition: '/kwgl/veJwBkXuesheng/generateBkListByCondition'
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
      this.getDepartment()
      this.getGrades()
      this.getSemesters()
      this.getEduTypes()
    },
    methods: {
      initDictConfig() {
      },
      zyChange() {
        if (this.$refs.banjiByZy != null) {
          this.$refs.banjiByZy.initDictData(this.queryParam.specid)
        }
      },
      addToBkList(record) {
        var that = this
        this.$confirm({
          title: '加入补考清单',
          content: '确定要将此学生加入补考清单?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function() {
            postAction(that.url.addById, {
              id: record.id })
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
      },
      addSelectToBkList() {
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
            title: '批量加入补考名单',
            content: '确定要将选择的'+this.selectedRowKeys.length+'名学生加入补考清单?',
			okText: '确认',
			cancelText:'取消',
            onOk: function() {
              postAction(that.url.addByIds, {
                ids: ids
              })
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
      generateBkListByCondition() {
        var that = this
        this.$confirm({
          title: '提示',
          content: '根据当前查询条件，将不及格的学员全部生成补考名单?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function() {
            that.isSpinShow = true
            var params = that.getQueryParams() //查询条件
            console.log(params)
            postAction(that.url.generateBkListByCondition, params)
              .then((res) => {
                if (res.success) {
                  that.isSpinShow = false
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.isSpinShow = false
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          }
        })
      },
      onSearchCourse() {
        this.$refs.selectForm.show()
      },
      modalFormOk(row, id) {
        console.log('当前选中课程id', id)
        this.$refs.course.value = row.kcmc
        this.queryParam.kcid = id
      }
    }
  }
</script>
<style lang="less" >
  .loading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    color: #fff;
    width: 100%;
    height: 100%;
  }
</style>