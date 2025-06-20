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
        <a-form-item label="校区" >
          <j-select-xiaoqu :trigger-change="true" v-decorator="['campusId', validatorRules.campusId]"
                           placeholder="请选择校区"/>
          <!--          <j-dict-select-tag-->
          <!--            :disabled="check"-->
          <!--            v-decorator="['campusid', validatorRules.campusid]"-->
          <!--            placeholder="请选择校区"-->
          <!--            dictCode="edu_dev.ve_jw_xiaoqu,XQMC,id"-->
          <!--            :trigger-change="true"-->
          <!--            @change="campusSelect"-->
          <!--          ></j-dict-select-tag>-->
          <!--          <a-button @click="searchReset" icon="delete" style="margin-right: 8px; background: #f47920; color: white;float: right"-->
          <!--            >清除</a-button-->
          <!--          >-->
        </a-form-item>

        <a-form-item label="编号" >
          <a-input v-decorator="['jzwh', validatorRules.jzwh]" placeholder="请输入建筑物号"></a-input>
          <span style="float: right; color: gray">编号生成后不得修改</span>
        </a-form-item>
        <a-form-item label="名称" >
          <a-input v-decorator="['jzwmc', validatorRules.jzwmc]" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="用途" >
          <a-select v-decorator="['jzwyt', validatorRules.jzwyt]" placeholder="请选择用途">
            <a-select-option value=""> 请选择</a-select-option>
            <a-select-option :value="10"> 教学及辅助用房</a-select-option>
            <a-select-option :value="30"> 生活用房</a-select-option>
            <a-select-option :value="20"> 行政办公用房</a-select-option>
            <a-select-option :value="40"> 其他用房</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="状态" >
          <a-radio-group v-decorator="['status', validatorRules.status]">
            <a-radio :value="1"> 启用</a-radio>
            <a-radio :value="0"> 禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'

  export default {
    name: 'JwJianzhuModal',
    components: {
      JSelectXiaoqu,
      JDictSelectTag
    },
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
          campusId: { rules: [{ required: true, message: '请选择校区!' }] },
          jzwh: { rules: [{ required: true, message: '请输入编号!' }] },
          jzwmc: { rules: [{ required: true, message: '请输入名称!' }] },
          jzwyt: { rules: [{ required: true, message: '请选择用途!' }] },
          status: { rules: [{ required: true, message: '请选择状态' }] },
          isdelete: { rules: [] }
        },
        url: {
          add: '/jxzy/jwJianzhu/add',
          edit: '/jxzy/jwJianzhu/edit'
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

        // record.jzwyt = record.jzwyt == null ? null : record.jzwyt + ''
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(
            pick(
              this.model,
              'campusId',
              'jzwh',
              'jzwmc',
              'jzwyt',
              'status',
              'isdelete',
              'createuserid',
              'createtime',
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
			formData.campusId = formData.campusId
            httpAction(httpurl, formData, method)
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.$emit('ok');
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
            'campusId',
            'jzwh',
            'jzwmc',
            'jzwyt',
            'status',
            'isdelete',
            'createuserid',
            'createtime',
            'terminalid'
          )
        )
      }
    }
  }
</script>

<style scoped>
	::v-deep .ant-form-item{
		  display: flex;
	}
	
	::v-deep .ant-form-item-label{
		  width: 150px;
		  text-align: right;
	}
	
	::v-deep .ant-form-item-control{
		  width: 400px !important;
	}
</style>