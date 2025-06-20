<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-col :md="24" :sm="24">
          <div style="height: 40px; background-color: #66c3fe; color: white; padding: 10px; margin-bottom: 15px">
            <span>考试信息</span>
          </div>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="学期">
            <a-input v-model="info.semidName" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="教学班">
            <a-input v-model="info.bjidName" style="width: 100%" />
<!--            <a-input v-model="jxbid" style="width: 100%" />-->
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="课程">
            <a-input v-model="info.kcidDictText" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-date v-model="info.ksrq" date-format="YYYY-MM-DD HH:mm:ss" />
          </a-form-item>
        </a-col>
		<a-col :md="24" :sm="24">
		  <a-form-item label="考试时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
		    {{info.ksrqsj}}
		  </a-form-item>
		</a-col>
      </a-form>
      <a-form :form="form">
        <!-- table区域-begin -->

        <div>
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; color: white; padding: 10px">
              <span>学生列表共（{{ dataSource.length }}）学生</span>
            </div>
          </a-col>

          <a-table
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
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
              <a @click="writein(record)">录入</a>
              <a-divider type="vertical" />
              <a @click="putin(record)">导入</a>
            </span>

            <!-- <span slot="place" slot-scope="text, record">
              <span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
            </span> -->
            <span slot="score" slot-scope="text, record">
              <a-input-number v-model="record.kccj" />
            </span>
            <span slot="ispass" slot-scope="text, record">
              <a-radio-group v-model="record.sfjg">
                <a-radio :value="1"> 及格 </a-radio>
                <a-radio :value="0"> 不及格 </a-radio>
              </a-radio-group>
            </span>
          </a-table>
        </div>
      </a-form>
      <div style="text-align: center">
        <a-button type="primary" @click="handleChange" icon="search">提交</a-button>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/edu/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { postAction, downFile, putAction } from '@/api/common/manage'
import { EduListMixin } from '@/mixins/EduListMixin'

export default {
  name: 'VeJwCjPutinModal',
  mixins: [EduListMixin],
  components: {
    JDate,
    JDictSelectTag,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      disableMixinCreated: true,
      title: '操作',
      width: 800,
      info: {},
      ksfs: null,
      visible: false,
      bkid: null,
      kcmc: null,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {},
      // 表头
      columns: [
        {
          title: '序号',
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
          title: '成绩',
          align: 'center',
          scopedSlots: { customRender: 'score' },
        },
        {
          title: '通过状态',
          align: 'center',
          scopedSlots: { customRender: 'ispass' },
        },
      ],
      url: {
        list: '/kwgl/veJwChengji/lrlist',
        delete: '/kwgl/veJwChengji/delete',
        deleteBatch: '/kwgl/veJwChengji/deleteBatch',
        updateCjBatch: '/kwgl/veJwChengji/updateCjBatch',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  created() {},
  methods: {
    initDictConfig() {},
    add() {
      this.edit({})
    },
    show(record) {
	  console.log(record,'record??????')
      this.info = record
      this.visible = true
      this.queryParam.kcid = record.kcid
      this.queryParam.ksid = record.id
      this.searchQuery()

      this.targetModel = {}
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      // const that = this
      // // 触发表单验证
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     that.confirmLoading = true
      //     let httpurl = ''
      //     let method = ''
      //     if (!this.model.id) {
      //       httpurl += this.url.add
      //       method = 'post'
      //     } else {
      //       httpurl += this.url.edit
      //       method = 'put'
      //     }
      //     let formData = Object.assign(this.model, values)
      //     console.log('表单提交数据', formData)
      //     httpAction(httpurl, formData, method)
      //       .then((res) => {
      //         if (res.success) {
      //           that.$message.success(res.message)
      //           that.$emit('ok')
      //         } else {
      //           that.$message.warning(res.message)
      //         }
      //       })
      //       .finally(() => {
      //         that.confirmLoading = false
      //         that.close()
      //       })
      //   }
      // })

      this.$emit('close')
      this.visible = false
    },

    //提交修改
    handleChange() {
      console.log(this.url.updateCjBatch,this.dataSource)
      putAction(this.url.updateCjBatch, this.dataSource).then((res) => {
        if (res.success) {
          this.$message.success(res.message)
          this.$emit('close')
          this.visible = false
        } else {
          this.$message.warning(res.message)
        }
      })
    },
    handleCancel() {
      this.close()
    },
    // popupCallback(row) {
    //   this.form.setFieldsValue(
    //     pick(
    //       row,
    //       'jxrwid',
    //       'ksxsid',
    //       'xzid',
    //       'hasexam',
    //       'ksid',
    //       'ksidDictText',
    //       'ksrq',
    //       'falid',
    //       'specid',
    //       'gradeid',
    //       'semid',
    //       'kcid',
    //       'stuid',
    //       'userid',
    //       'xh',
    //       'xm',
    //       'xzbid',
    //       'jxbid',
    //       'ksrqsj',
    //       'pscj',
    //       'fslkscj',
    //       'djlkscj',
    //       'kccj',
    //       'kcdjcjm',
    //       'jgcj',
    //       'sfjg',
    //       'teacherid',
    //       'rkjsgh',
    //       'recorduserid',
    //       'cjlrrh',
    //       'cjlrrqsj',
    //       'auditstatus',
    //       'audituserid',
    //       'audittime',
    //       'audittid',
    //       'terminalid'
    //     )
    //   )
    // },

    // putout(fileName) {
    //   if (!fileName || typeof fileName != 'string') {
    //     fileName = this.kcmc + '-补考成绩信息'
    //   }
    //   let param = {
    //     bkid: this.bkid,
    //   }
    //   console.log('导出参数', param)
    //   downFile(this.url.exportXls, param).then((data) => {
    //     if (!data) {
    //       this.$message.warning('文件下载失败')
    //       return
    //     }
    //     if (typeof window.navigator.msSaveBlob !== 'undefined') {
    //       window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName + '.xls')
    //     } else {
    //       let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
    //       let link = document.createElement('a')
    //       link.style.display = 'none'
    //       link.href = url
    //       link.setAttribute('download', fileName + '.xls')
    //       document.body.appendChild(link)
    //       link.click()
    //       document.body.removeChild(link) //下载完成移除元素
    //       window.URL.revokeObjectURL(url) //释放掉blob对象
    //     }
    //   })
    // },
  },
}
</script>