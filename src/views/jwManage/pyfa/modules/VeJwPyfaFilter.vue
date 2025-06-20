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
          <a-col :md="8" :sm="24">
            <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-grade v-model="gradeid"> </j-select-grade>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-xueqi v-model="semid" ></j-select-xueqi>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="是否毕业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="isGraduate">
                <a-select-option value="0">否</a-select-option>
                <a-select-option value="1">是</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="是否有效" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="isAble">
                <a-select-option value="0">否</a-select-option>
                <a-select-option value="1">是</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

<!--          <a-col :md="8" :sm="24">-->
<!--            <a-form-item label="是否有效" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-select v-model="isAble">-->
<!--                <a-select-option value="0">否</a-select-option>-->
<!--                <a-select-option value="1">是</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

<!--          <a-col :md="8" :sm="24">-->
<!--            <a-form-item label="是否有效" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-select v-model="isAble">-->
<!--                <a-select-option value="0">否</a-select-option>-->
<!--                <a-select-option value="1">是</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          -->
<!--          <a-col :md="8" :sm="24">-->
<!--            <a-form-item label="是否有效" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-select v-model="isAble">-->
<!--                <a-select-option value="0">否</a-select-option>-->
<!--                <a-select-option value="1">是</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-textarea style="width: 100%" v-model="description" />-->
<!--            </a-form-item>-->
<!--          </a-col>-->

<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="创建者名称" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-input style="width: 100%" v-model="createBy" />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>
        <div style="text-align: center">
          <a-button @click="modalReset" type="primary" icon="reload">刷新</a-button>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import { EduListMixin } from '@/mixins/EduListMixin'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JwSelectPyfa from './JwSelectPyfa'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'

export default {
  name: 'VeJwPyfaFilter',
  components: { JSelectXueqi, JSelectTeacher, JwSelectPyfa, JSelectGrade },
  mixins: [EduListMixin],
  data() {
    return {
      form: this.$form.createForm(this),
      disableMixinCreated: true,
      gradeid: null,
      semid: null,
      isGraduate: null,
      isAble: null,
      description: null,
      createBy: null,

      title: '操作',
      width: 1200,
      visible: false,
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
    }
  },
  created() {},
  methods: {
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      //回送信息
      this.$emit('ok', this.gradeid, this.semid, this.isGraduate, this.isAble, this.description, this.createBy)
      this.close()
    },
    handleCancel() {
      this.close()
    },
    //清空表单
    modalReset() {
      this.gradeid=null
      this.semid=null
      this.isGraduate=null
      this.isAble=null
      this.description=null
      this.createBy=null
    },
  },
}
</script>