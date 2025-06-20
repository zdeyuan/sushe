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

        <a-form-item label="免缓缺记录ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'freeid', validatorRules.freeid]" placeholder="请输入免缓缺记录ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ksid', validatorRules.ksid]" placeholder="请输入考试ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请输入学生ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="成绩类型ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cjlxid', validatorRules.cjlxid]" placeholder="请输入成绩类型ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="成绩类型名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'cjlxname', validatorRules.cjlxname]" placeholder="请输入成绩类型名称"></a-input>
        </a-form-item>
        <a-form-item label="成绩所占百分比" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ratio', validatorRules.ratio]" placeholder="请输入成绩所占百分比" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="分数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'score', validatorRules.score]" placeholder="请输入分数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="最终成绩（根据成绩百分比，计算的最终成绩）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'finalscore', validatorRules.finalscore]" placeholder="请输入最终成绩（根据成绩百分比，计算的最终成绩）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>
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

  export default {
    name: "VeJwCjFreeXsModal",
    components: {
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
          freeid: {rules: [
            {required: true, message: '请输入免缓缺记录ID!'},
          ]},
          ksid: {rules: [
            {required: true, message: '请输入考试ID!'},
          ]},
          stuid: {rules: [
            {required: true, message: '请输入学生ID!'},
          ]},
          cjlxid: {rules: [
          ]},
          cjlxname: {rules: [
          ]},
          ratio: {rules: [
          ]},
          score: {rules: [
          ]},
          finalscore: {rules: [
            {required: true, message: '请输入最终成绩（根据成绩百分比，计算的最终成绩）!'},
          ]},
          terminalid: {rules: [
          ]},
        },
        url: {
          add: "/kwgl/veJwCjFreeXs/add",
          edit: "/kwgl/veJwCjFreeXs/edit",
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
          this.form.setFieldsValue(pick(this.model,'freeid','ksid','stuid','cjlxid','cjlxname','ratio','score','finalscore','terminalid'))
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
        this.form.setFieldsValue(pick(row,'freeid','ksid','stuid','cjlxid','cjlxname','ratio','score','finalscore','terminalid'))
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