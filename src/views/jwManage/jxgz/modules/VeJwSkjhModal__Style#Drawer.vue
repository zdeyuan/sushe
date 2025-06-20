<template>
  <a-drawer
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="教学计划ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxjhid', validatorRules.jxjhid]" placeholder="请输入教学计划ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教学任务ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxrwid', validatorRules.jxrwid]" placeholder="请输入教学任务ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学期ID（教学任务表冗余）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期ID（教学任务表冗余）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教学班ID（教学任务表冗余）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxbid', validatorRules.jxbid]" placeholder="请输入教学班ID（教学任务表冗余）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程Id（教学任务表冗余）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程Id（教学任务表冗余）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="总学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'zxs', validatorRules.zxs]" placeholder="请输入总学时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="授课教师" :labelCol="labelCol" :wrapperCol="wrapperCol">

          <j-select-teacher  v-decorator="[ 'teacheruserid', validatorRules.teacheruserid]" placeholder="请选择授课教师"></j-select-teacher>

<!--          <a-input-number v-decorator="[ 'teacheruserid', validatorRules.teacheruserid]" placeholder="请输入授课教师userId" style="width: 100%"/>-->
        </a-form-item>
        <a-form-item label="完成状态 0制定中，1已完成" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'iscomplete', validatorRules.iscomplete]" placeholder="请输入完成状态 0制定中，1已完成" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="完成时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'completetime', validatorRules.completetime]" placeholder="请输入完成时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入创建时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端系统ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端系统ID" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'

  export default {
    name: "VeJwSkjhModal",
    components: {
      JSelectTeacher
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
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
        validatorRules: {
          jxjhid: {rules: [
            {required: true, message: '请输入教学计划ID!'},
          ]},
          jxrwid: {rules: [
            {required: true, message: '请输入教学任务ID!'},
          ]},
          semid: {rules: [
            {required: true, message: '请输入学期ID（教学任务表冗余）!'},
          ]},
          jxbid: {rules: [
            {required: true, message: '请输入教学班ID（教学任务表冗余）!'},
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程Id（教学任务表冗余）!'},
          ]},
          zxs: {rules: [
            {required: true, message: '请输入总学时!'},
          ]},
          teacheruserid: {rules: [
            {required: true, message: '请选择授课教师!'},
          ]},
          iscomplete: {rules: [
            {required: true, message: '请输入完成状态 0制定中，1已完成!'},
          ]},
          completetime: {rules: [
            {required: true, message: '请输入完成时间!'},
          ]},
          createtime: {rules: [
            {required: true, message: '请输入创建时间!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端系统ID!'},
          ]},
        },
        url: {
          add: "/jxgz/veJwSkjh/add",
          edit: "/jxgz/veJwSkjh/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'jxjhid','jxrwid','semid','jxbid','kcid','zxs','teacheruserid','iscomplete','completetime','createtime','terminalid'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }

        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'jxjhid','jxrwid','semid','jxbid','kcid','zxs','teacheruserid','iscomplete','completetime','createtime','terminalid'))
      }

    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>