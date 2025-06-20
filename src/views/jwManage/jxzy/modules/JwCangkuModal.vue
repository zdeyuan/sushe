<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="仓库名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入仓库名称"></a-input>
        </a-form-item>
        <a-form-item label="仓库位置" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'location', validatorRules.location]" placeholder="请输入仓库位置"></a-input>
        </a-form-item>
        <a-form-item label="校区" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <a-input-number v-decorator="[ 'campusid', validatorRules.campusid]" placeholder="请选择校区" style="width: 100%"/> -->
<!--          <j-dict-select-tag-->
<!--                :disabled="check"-->
<!--                v-decorator="['campusid', validatorRules.campusid]"-->
<!--                placeholder="请选择校区"-->
<!--                dictCode="edu_dev.ve_jw_xiaoqu,XQMC,id"-->
<!--                :trigger-change="true"-->
<!--              ></j-dict-select-tag>-->

          <j-select-xiaoqu  :disabled="check"
                            v-decorator="['campusid', validatorRules.campusid]"
                            placeholder="请选择校区" :trigger-change="true"></j-select-xiaoqu>
        </a-form-item>
        <!--        <a-form-item label="添加时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入添加时间" style="width: 100%"/>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="添加人Id" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input-number v-decorator="[ 'createuserid', validatorRules.createuserid]" placeholder="请输入添加人Id" style="width: 100%"/>-->
        <!--        </a-form-item>-->
        <!--        <a-form-item label="终端Id" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端Id" style="width: 100%"/>-->
        <!--        </a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'

  export default {
    name: 'JwCangkuModal',
    components: { JSelectXiaoqu },
    data() {
      return {
        form: this.$form.createForm(this),
        title: '操作',
        width: 800,
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        confirmLoading: false,
        validatorRules: {
          name: {
            rules: [
              { required: true, message: '请输入仓库名称!' }
            ]
          },
          location: {
            rules: [
              { required: true, message: '请输入仓库位置!' }
            ]
          },
          campusid: {
            rules: [
              { required: true, message: '请输入校区Id!' }
            ]
          },
          createtime: {
            rules: [
              { required: true, message: '请输入添加时间!' }
            ]
          },
          createuserid: {
            rules: [
              { required: true, message: '请输入添加人Id!' }
            ]
          },
          terminalid: {
            rules: [
              { required: true, message: '请输入终端Id!' }
            ]
          }
        },
        url: {
          add: '/jxzy/jwCangku/add',
          edit: '/jxzy/jwCangku/edit'
        }
      }
    },
    created() {
    },
    methods: {
      add() {
        this.edit({})
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'name', 'location', 'campusid', 'createtime', 'createuserid', 'terminalid'))
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
          }

        })
      },
      handleCancel() {
        this.close()
      },
      popupCallback(row) {
        this.form.setFieldsValue(pick(row, 'name', 'location', 'campusid', 'createtime', 'createuserid', 'terminalid'))
      }


    }
  }
</script>