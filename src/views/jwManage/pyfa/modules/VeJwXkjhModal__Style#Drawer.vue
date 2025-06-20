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

        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="创建日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建日期" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人"></a-input>
        </a-form-item>
        <a-form-item label="更新日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新日期" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="所属部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sysOrgCode', validatorRules.sysOrgCode]" placeholder="请输入所属部门"></a-input>
        </a-form-item>
        <a-form-item label="课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程计划教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'teachers', validatorRules.teachers]" placeholder="请输入课程计划教师"></a-input>
        </a-form-item>
        <a-form-item label="课程性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ksxzm', validatorRules.ksxzm]" placeholder="请输入课程性质" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kslx', validatorRules.kslx]" placeholder="请输入考试类型" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="成绩类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cjlx', validatorRules.cjlx]" placeholder="请输入成绩类型" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学分" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'score', validatorRules.score]" placeholder="请输入学分" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="总学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'zxs', validatorRules.zxs]" placeholder="请输入总学时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="理论学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'llxs', validatorRules.llxs]" placeholder="请输入理论学时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="实验实训学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'sjxs', validatorRules.sjxs]" placeholder="请输入实验实训学时"></a-input>
        </a-form-item>
        <a-form-item label="上课教师数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jssl', validatorRules.jssl]" placeholder="请输入上课教师数量" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="合格分数线" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'hgfsx', validatorRules.hgfsx]" placeholder="请输入合格分数线" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="优秀分数线 " :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'yxfsx', validatorRules.yxfsx]" placeholder="请输入优秀分数线 " style="width: 100%"/>
        </a-form-item>
        <a-form-item label="预计开学日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择预计开学日期" v-decorator="[ 'beginTime', validatorRules.beginTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="预计结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择预计结束日期" v-decorator="[ 'endTime', validatorRules.endTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="预计周数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'weeks', validatorRules.weeks]" placeholder="请输入预计周数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="周课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'zks', validatorRules.zks]" placeholder="请输入周课时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教室类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jslx', validatorRules.jslx]" placeholder="请输入教室类型" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程计划教室" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'jhjs', validatorRules.jhjs]" placeholder="请输入课程计划教室"></a-input>
        </a-form-item>
        <a-form-item label="是否合班" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'isMerge', validatorRules.isMerge]" placeholder="请输入是否合班"></a-input>
        </a-form-item>
        <a-form-item label="单双周" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'dsz', validatorRules.dsz]" placeholder="请输入单双周" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="指定周" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'zdz', validatorRules.zdz]" placeholder="请输入指定周"></a-input>
        </a-form-item>
        <a-form-item label="培养方案ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'pyfaId', validatorRules.pyfaId]" placeholder="请输入培养方案ID" style="width: 100%"/>
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
  import JDate from '@/components/edu/JDate'

  export default {
    name: "VeJwXkjhModal",
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
          createBy: {rules: [
          ]},
          createTime: {rules: [
          ]},
          updateBy: {rules: [
          ]},
          updateTime: {rules: [
          ]},
          sysOrgCode: {rules: [
          ]},
          kcid: {rules: [
          ]},
          teachers: {rules: [
          ]},
          ksxzm: {rules: [
          ]},
          kslx: {rules: [
          ]},
          cjlx: {rules: [
          ]},
          score: {rules: [
          ]},
          zxs: {rules: [
          ]},
          llxs: {rules: [
          ]},
          sjxs: {rules: [
          ]},
          jssl: {rules: [
          ]},
          hgfsx: {rules: [
          ]},
          yxfsx: {rules: [
          ]},
          beginTime: {rules: [
          ]},
          endTime: {rules: [
          ]},
          weeks: {rules: [
          ]},
          zks: {rules: [
          ]},
          jslx: {rules: [
          ]},
          jhjs: {rules: [
          ]},
          isMerge: {rules: [
          ]},
          dsz: {rules: [
          ]},
          zdz: {rules: [
          ]},
          pyfaId: {rules: [
          ]},
        },
        url: {
          add: "/jxgz/veJwXkjh/add",
          edit: "/jxgz/veJwXkjh/edit",
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
          this.form.setFieldsValue(pick(this.model,'createBy','createTime','updateBy','updateTime','sysOrgCode','kcid','teachers','ksxzm','kslx','cjlx','score','zxs','llxs','sjxs','jssl','hgfsx','yxfsx','beginTime','endTime','weeks','zks','jslx','jhjs','isMerge','dsz','zdz','pyfaId'))
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
        this.form.setFieldsValue(pick(row,'createBy','createTime','updateBy','updateTime','sysOrgCode','kcid','teachers','ksxzm','kslx','cjlx','score','zxs','llxs','sjxs','jssl','hgfsx','yxfsx','beginTime','endTime','weeks','zks','jslx','jhjs','isMerge','dsz','zdz','pyfaId'))
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