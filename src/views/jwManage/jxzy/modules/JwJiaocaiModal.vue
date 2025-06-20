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
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="教材代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jcdm', validatorRules.jcdm]" placeholder="请输入教材代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="教材名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jcmc', validatorRules.jcmc]" placeholder="请输入教材名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="教材类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['jclb', validatorRules.jclb]" placeholder="请选择教材类别">
                <a-select-option value=""> 请选择</a-select-option>
                <a-select-option :value="1"> 校本教材</a-select-option>
                <a-select-option :value="2"> 通用教材</a-select-option>
              </a-select>

            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="适用课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <JSelectKeCen v-decorator="['kcid', validatorRules.kcid]" :trigger-change="true" placeholder="请选择课程"></JSelectKeCen>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="ISBN" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['isbn', validatorRules.isbn]" placeholder="请输入ISBN"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="出版时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
				<!-- <a-year-picker placeholder="请输入出版时间" v-decorator="['publishtime', validatorRules.publishtime]"/> -->
				<DatePickByCN
				   v-model="model.publishtime"
				   mode="year"
				  placeholder="请选择出版时间"  />
				/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="出版社" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['cbs', validatorRules.cbs]" placeholder="请输入出版社"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['jg', validatorRules.jg]" placeholder="请输入价格" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="第一作者" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dyzz', validatorRules.dyzz]" placeholder="请输入第一作者"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="其他作者" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['qtzz', validatorRules.qtzz]" placeholder="请输入其他作者"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="版次" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['bc', validatorRules.bc]" placeholder="请输入版次"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="印次" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['yc', validatorRules.yc]" placeholder="请输入印次"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="包装" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['packaging', validatorRules.packaging]" placeholder="请输入包装"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="出版号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['cbh', validatorRules.cbh]" placeholder="请输入出版号"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="页数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['pages', validatorRules.pages]"
                placeholder="请输入页数"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="字数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['words', validatorRules.words]"
                placeholder="请输入字数"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="练习册" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['sfylxc', validatorRules.sfylxc]" :default-value="0">
                <a-radio :value="1"> 有 </a-radio>
                <a-radio :value="0"> 无 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教参教辅" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['sfyjcjf', validatorRules.sfyjcjf]" :default-value="0">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="0"> 否 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教参教辅" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['sfyjcjf', validatorRules.sfyjcjf]" :default-value="0">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="0"> 否 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
		  <a-col :md="12" :sm="24">
		    <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
		      <a-radio-group v-decorator="['status', validatorRules.status]" :default-value="0">
		        <a-radio :value="1"> 启用 </a-radio>
		        <a-radio :value="0"> 禁用 </a-radio>
		      </a-radio-group>
		    </a-form-item>
		  </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="内容简介" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea
                v-decorator="['nrjj', validatorRules.nrjj]"
                placeholder="请输入内容简介"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <jw-jiaocai-select-course ref="selectForm" @ok="modalFormOk"></jw-jiaocai-select-course>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JSelectKeCen from '@/components/kwglbiz/JSelectKeCen'
import JwJiaocaiSelectCourse from './JwJiaocaiSelectCourse'

export default {
  name: 'JwJiaocaiModal',
  components: { JwJiaocaiSelectCourse,JSelectKeCen },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: '70%',
      visible: false,
      model: {},
	  open: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      validatorRules: {
        jcdm: {
          rules: [{ required: true, message: '请输入教材代码!' }],
        },
        jcmc: {
          rules: [{ required: true, message: '请输入教材名称!' }],
        },
        jclb: {
          rules: [{ required: true, message: '请输入教材类别!' }],
        },
        cbh: {
          rules: [],
        },
        isbn: {
          rules: [{ required: true, message: '请输入ISBN!' }],
        },
        dyzz: {
          rules: [{ required: true, message: '请输入第一作者!' }],
        },
        qtzz: {
          rules: [],
        },
        bc: {
          rules: [],
        },
        yc: {
          rules: [],
        },
        jg: {
          rules: [],
        },
        cbs: {
          rules: [],
        },
        publishtime: {
          rules: [],
        },
        pages: {
          rules: [],
        },
        words: {
          rules: [],
        },
        folio: {
          rules: [],
        },
        packaging: {
          rules: [],
        },
        nrjj: {
          rules: [],
        },
        nrjjtid: {
          rules: [],
        },
        sfylxc: {
          rules: [],
        },
        sfyjcjf: {
          rules: [],
        },
        status: {
          rules: [{ required: true, message: '请输入状态!' }],
        },
        isdelete: {
          rules: [],
        },

        kcid: {
          rules: [{ required: true, message: '请选择适用课程!' }],
        },
      },
      url: {
        add: '/jxzy/jwJiaocai/add',
        edit: '/jxzy/jwJiaocai/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
	openChange(status) {
	  if (status) {
	    this.open = true;
	  } else {
	    this.open = false;
	  }
	},
	panelChange(value) {
	   this.model.publishtime=value ? value.format('YYYY') : '';;
	   this.open = false;
	},
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jcdm',
            'jcmc',
            'jclb',
            'cbh',
            'isbn',
            'dyzz',
            'qtzz',
            'bc',
            'yc',
            'jg',
            'cbs',
            'publishtime',
            'pages',
            'words',
            'folio',
            'packaging',
            'nrjjtid',
            'nrjj',
            'sfylxc',
            'sfyjcjf',
            'status',
            'isdelete',
            'createuserid',
            'createtime',
            'kcid',
            'terminalid'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.close()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'jcdm',
          'jcmc',
          'jclb',
          'cbh',
          'isbn',
          'dyzz',
          'qtzz',
          'bc',
          'yc',
          'jg',
          'cbs',
          'publishtime',
          'pages',
          'words',
          'folio',
          'packaging',
          'nrjjtid',
          'nrjjt',
          'sfylxc',
          'sfyjcjf',
          'status',
          'isdelete',
          'createuserid',
          'createtime',
          'kcid',
          'terminalid'
        )
      )
    },

    onSearchCourse() {
      this.$refs.selectForm.show()
    },

    modalFormOk(row, id) {
      console.log('当前选中课程id',row.kcmc)
      this.$refs.course.value = row.kcmc;

      this.form.setFieldsValue(pick({ kcid: id+'' }, 'kcid'))
    },
  },
}
</script>