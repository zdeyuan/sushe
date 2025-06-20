<template>
  <a-modal

    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <template slot="footer">
      <div style="text-align: center">
        <a-button type="primary" @click="print()" > 打印</a-button>
        <a-button @click="handleCancel"> 返回</a-button>
      </div>
    </template>

    <a-spin :spinning="confirmLoading">
      <a-form id="formDiv" :form="form">
        <!--未安装提示 -->
        <div v-html="lodopHtml" v-if="lodopHtml" class="noInstall-tip"></div>

        <!--<a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'zyksid', validatorRules.zyksid]" placeholder="请输入职业认证考试ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <div class="panel panel-primary1" style="background: #8cc8ff">
          <h6 style="color: white">
            职业认证信息
          </h6>
        </div>
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.zyksid_dictText}}</span>
<!--          <j-dict-select-tag dictCode="edu_dev_open.ve_jw_ks_zhiye,name,id" v-decorator="[ 'zyksid', validatorRules.zyksid]" placeholder="请输入职业认证考试" style="width: 100%"/>-->
        </a-form-item>

        <div class="panel panel-primary2" style="background: #8cc8ff" >
          <h6 style="color: white">
            学生信息
          </h6>
        </div>

        <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.xm}}</span>
<!--          <a-input v-decorator="[ 'xm', validatorRules.xm]" placeholder="请输入学生姓名"></a-input>-->
        </a-form-item>
        <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.xh}}</span>
<!--          <a-input v-decorator="[ 'xh', validatorRules.xh]" placeholder="请输入学号"></a-input>-->
        </a-form-item>
        <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.falidName}}</span>
<!--          <a-input-number v-decorator="[ 'falid', validatorRules.falid]" placeholder="请输入院系ID" style="width: 100%"/>-->
        </a-form-item>
        <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.specidName}}</span>
<!--          <a-input-number v-decorator="[ 'specid', validatorRules.specid]" placeholder="请输入专业ID" style="width: 100%"/>-->
        </a-form-item>

        <div class="panel panel-primary" style="background: #8cc8ff" >
          <h6 style="color: white">
            成绩信息
          </h6>
        </div>

        <a-form-item label="准考证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.zkzh}}</span>
<!--          <a-input v-decorator="[ 'zkzh', validatorRules.zkzh]" placeholder="请输入准考证号"></a-input>-->
        </a-form-item>
        <a-form-item label="证书号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.zsh}}</span>
<!--          <a-input v-decorator="[ 'zsh', validatorRules.zsh]" placeholder="请输入证书号"></a-input>-->
        </a-form-item>
        <a-form-item label="理论成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.llcj}}</span>
<!--          <a-input-number v-decorator="[ 'llcj', validatorRules.llcj]" placeholder="请输入理论成绩" style="width: 100%"/>-->
        </a-form-item>
        <a-form-item label="实操成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.sccj}}</span>
<!--          <a-input-number v-decorator="[ 'sccj', validatorRules.sccj]" placeholder="请输入实操成绩" style="width: 100%"/>-->
        </a-form-item>
        <a-form-item label="最终成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.kscj}}</span>
<!--          <a-input-number v-decorator="[ 'kscj', validatorRules.kscj]" placeholder="请输入考试成绩" style="width: 100%"/>-->
        </a-form-item>

        <!--<a-form-item label="通过状态" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请输入是否及格（0=不及格，1=及格）" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="通过状态">
          <span>{{model.ispass_dictText}}</span>
<!--          <template v-if="seen">-->
<!--            <a-radio-group v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请选择状态">-->

<!--            </a-radio-group>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <a-radio-group v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请选择状态">-->
<!--              <a-radio value="0">-->
<!--                不通过-->
<!--              </a-radio>-->
<!--              <a-radio value="1">-->
<!--                通过-->
<!--              </a-radio>-->
<!--            </a-radio-group>-->
<!--          </template>-->
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

<style scoped>
  #formDiv span{
    margin-left: 30px;
  }

  #formDiv .ant-form-item{
    padding-left: 60px;
  }
</style>
<script>

  import { httpAction,getAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import { getLodop } from '@/utils/LodopFuncs'

  export default {
    name: "VeJwCjZhiyeModal",
    components: {
      JDate,
    },
    data () {
      return {
        //插件对象
        LODOP: {},
        lodopHtml: '',
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
          getTemplate: "/edu-schedule/jingsaiProject/veJwZycjTemplate/queryByZyksId",
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
        this.form.setFieldsValue(pick(row,'zyksid','falid','specid','xzid','gradeid','xzbid','stuid','userid','xh','xm','zkzh','zsh','llcj','sccj','kscj','ispass','createuserid','cjlrrqsj','status','terminalid'))
      },
      //进行打印
      print(){
        let that = this;
        //检查是否安装
        this.CreateFullBill()
        //有安装才可以运行
        if (this.LODOP) {
          //获取打印代码
          let formData = {};
          formData.zyksid = this.model.zyksid;
          console.log(formData)
          getAction(this.url.getTemplate,formData).then((res)=>{
            if(res.success){
              console.log(res);
              let printCode = res.result.codetidText;
              if (!printCode) {
                that.$message.warning("模板获取失败");
                return
              }
              //内容替换
              printCode =  this.printCode(printCode);
              this.printModel(printCode);
            }else{
              that.$message.warning(res.message);
            }
          }).finally(() => {
          })

        }

      },
      //判断是否安装插件
      CreateFullBill() {
        //全局变量赋值
        //  let LODOP=this.LODOP;
        try {
          var res = getLodop()
          if (res.LODOP) {
            let LODOP = res.LODOP
            this.LODOP = LODOP
          }

          if (res.errmsg) {
            this.lodopHtml = res.errmsg
          }
          if (LODOP && LODOP.VERSION) {
            if (LODOP.CVERSION)
              this.$message.success(
                '当前有WEB打印服务C-Lodop可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')'
              )
            else this.$message.success('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
          }
        } catch (err) {
        }
      },
      //用文本框执行打印预览p
      printModel(code) {
        //MyData=document.getElementById('data01').value;	//打印前变量重读一下最新值
        let LODOP = this.LODOP

        eval(code)

        if (LODOP.CVERSION) CLODOP.On_Return = null
        LODOP.PREVIEW()
      },
      printCode(s){
        debugger
        s = s.replace(/%学生姓名%/g, this.model.xm)
        // s.replace(/%性别%/g, this.model.xm)
        s =  s.replace(/%职业考试名称%/g, this.model.zyksid_dictText)
        // s.replace(/%身份证号%/g, this.model.xm)
        s = s.replace(/%准考证号%/g, this.model.zkzh)
        s = s.replace(/%证件号%/g, this.model.zsh)
        return s;
      }

    }
  }
</script>