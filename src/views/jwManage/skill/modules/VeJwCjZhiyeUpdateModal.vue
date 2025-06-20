<template>
  <!--@ok="handleOk"-->

  <!--cancelText="关闭"-->
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--        <j-image-upload text="上传" v-model="fileList" :isMultiple="true"></j-image-upload>-->
        <!--<a-form-item label="职业认证考试ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'zyksid', validatorRules.zyksid]" placeholder="请输入职业认证考试ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item label="职业认证考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag :trigger-change="true"  dictCode="edu_dev_open.ve_jw_ks_zhiye,name,id" v-decorator="[ 'zyksid', validatorRules.zyksid]"
                             placeholder="请输入职业认证考试" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xm', validatorRules.xm]" placeholder="请输入学生姓名"></a-input>
        </a-form-item>
        <div class="panel panel-primary2" style="background: #8cc8ff" >
          <h6 style="color: white">
            基本信息
          </h6>
        </div>

        <a-form-item label="准考证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'zkzh', validatorRules.zkzh]" placeholder="请输入准考证号"></a-input>
        </a-form-item>
        <a-form-item label="证书号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'zsh', validatorRules.zsh]" placeholder="请输入证书号"></a-input>
        </a-form-item>
        <!--<a-form-item label="院系ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'falid', validatorRules.falid]" placeholder="请输入院系ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="专业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'specid', validatorRules.specid]" placeholder="请输入专业ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="学制ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'xzid', validatorRules.xzid]" placeholder="请输入学制ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="年级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'gradeid', validatorRules.gradeid]" placeholder="请输入年级ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="行政班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'xzbid', validatorRules.xzbid]" placeholder="请输入行政班ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="学生ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请输入学生ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="学生用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'userid', validatorRules.userid]" placeholder="请输入学生用户ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input v-decorator="[ 'xh', validatorRules.xh]" placeholder="请输入学号"></a-input>-->
        <!--</a-form-item>-->

        <a-form-item label="理论成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'llcj', validatorRules.llcj]" placeholder="请输入理论成绩" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="实操成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'sccj', validatorRules.sccj]" placeholder="请输入实操成绩" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="最终成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kscj', validatorRules.kscj]" placeholder="请输入考试成绩" style="width: 100%"/>
        </a-form-item>
        <!--<a-form-item label="通过状态" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请输入是否及格（0=不及格，1=及格）" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通过状态">
          <template v-if="seen">
            <a-radio-group v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请选择状态">

            </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请选择状态">
              <a-radio value="0">
                不通过
              </a-radio>
              <a-radio value="1">
                通过
              </a-radio>
            </a-radio-group>
          </template>
        </a-form-item>
        <!--<a-form-item label="成绩录入人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'createuserid', validatorRules.createuserid]" placeholder="请输入成绩录入人ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="成绩录入日期时间（原日期时间合并）" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<j-date placeholder="请选择成绩录入日期时间（原日期时间合并）" v-decorator="[ 'cjlrrqsj', validatorRules.cjlrrqsj]" :trigger-change="true" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="状态（0=初始，1=已录入，2=已提交）" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入状态（0=初始，1=已录入，2=已提交）" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>-->
        <!--</a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'

  export default {
    name: "VeJwCjZhiyeModal",
    components: {
      JDate,
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
          zyksid: {rules: [
              {required: true, message: '请输入职业认证考试ID!'},
            ]},
          falid: {rules: [
            ]},
          specid: {rules: [
            ]},
          xzid: {rules: [
            ]},
          gradeid: {rules: [
            ]},
          xzbid: {rules: [
            ]},
          stuid: {rules: [
            ]},
          userid: {rules: [
            ]},
          xh: {rules: [
              {required: true, message: '请输入学号!'},
            ]},
          xm: {rules: [
            ]},
          zkzh: {rules: [
            ]},
          zsh: {rules: [
            ]},
          llcj: {rules: [
            ]},
          sccj: {rules: [
            ]},
          kscj: {rules: [
            ]},
          ispass: {rules: [
              {required: true, message: '请输入是否及格（0=不及格，1=及格）!'},
            ]},
          createuserid: {rules: [
            ]},
          cjlrrqsj: {rules: [
            ]},
          status: {rules: [
              {required: true, message: '请输入状态（0=初始，1=已录入，2=已提交）!'},
            ]},
          terminalid: {rules: [
              {required: true, message: '请输入终端ID!'},
            ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwCjZhiye/add",
          edit: "/edu-schedule/jingsaiProject/veJwCjZhiye/edit",
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
        if(record.ispass != null){
          record.ispass = ""+record.ispass;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zyksid','falid','specid','xzid','gradeid','xzbid','stuid','userid','xh','xm','zkzh','zsh','llcj','sccj','kscj','ispass','createuserid','cjlrrqsj','status','terminalid'))
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
        this.form.setFieldsValue(pick(row,'zyksid','falid','specid','xzid','gradeid','xzbid','stuid','userid','xh','xm','zkzh','zsh','llcj','sccj','kscj','ispass','createuserid','cjlrrqsj','status','terminalid'))
      },


    }
  }
</script>