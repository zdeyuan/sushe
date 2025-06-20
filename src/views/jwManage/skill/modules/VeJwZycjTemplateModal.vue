<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--未安装提示 -->
        <div v-html="lodopHtml" v-if="lodopHtml" class="noInstall-tip"></div>

        <!--<a-form-item label="职业认证考试" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'zyksid', validatorRules.zyksid]" placeholder="请输入职业考试ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item label="职业认证考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
			   <a-select v-decorator="[ 'zyksid', validatorRules.zyksid]"  placeholder="请选择职业认证考试" >
			     <a-select-option v-for="item in zyksList" :key="item.id" :value="item.id">{{
			       item.name
			     }}</a-select-option>
			   </a-select>
        </a-form-item>
        <a-form-item label="模板名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入模板名称"></a-input>
        </a-form-item>
        <a-form-item  style="padding-left:20.3%;" label=""  :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-button size="small" type="primary"  @click="modelDesign" > 模板设计 </a-button>
          <a-button size="small" style="margin-left: 8px" @click="modelPriview"> 打印预览 </a-button>
        </a-form-item>

        <!--<a-form-item label="图片ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'fileid', validatorRules.fileid]" placeholder="请输入图片ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
<!--        <a-form-item label="打印代码 大文本ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'codetid', validatorRules.codetid]" placeholder="请输入打印代码 大文本ID" style="width: 100%"/>-->
<!--        </a-form-item>-->
        <a-form-item label="打印代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="[ 'codetidText', validatorRules.codetid]" placeholder="请输入打印代码" style="width: 100%;height: 231px;"/>
          <div style="font-size:10px;line-height: 20px;">
            支持数据：职业考试名称、学生姓名、性别、身份证号、准考证号、证件号，<br>模板示例：%学生姓名%
          </div>
        </a-form-item>
        <!--<a-form-item label="状态(0=禁用,1=启用)" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入状态(0=禁用,1=启用)" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-radio-group v-decorator="['status', validatorRules.status]" placeholder="请选择状态">
            <a-radio value="0">
              禁用
            </a-radio>
            <a-radio value="1">
              启用
            </a-radio>
          </a-radio-group>
<!--          <template v-if="seen">-->
<!--            <a-radio-group v-decorator="['status', validatorRules.status]" placeholder="请选择状态">-->

<!--            </a-radio-group>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--            <a-radio-group v-decorator="['status', validatorRules.status]" placeholder="请选择状态">-->
<!--              <a-radio value="0">-->
<!--                禁用-->
<!--              </a-radio>-->
<!--              <a-radio value="1">-->
<!--                启用-->
<!--              </a-radio>-->
<!--            </a-radio-group>-->
<!--          </template>-->
        </a-form-item>
        <!--<a-form-item label="模板类型(zycj=职业认证成绩)" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input v-decorator="[ 'type', validatorRules.type]" placeholder="请输入模板类型(zycj=职业认证成绩)"></a-input>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入创建时间" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="创建用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'createuserid', validatorRules.createuserid]" placeholder="请输入创建用户ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="终端系统ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端系统ID" style="width: 100%"/>-->
        <!--</a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { getLodop } from '@/utils/LodopFuncs'
  import {
  	getAction
  } from '@/api/common/manage'
  export default {
    name: "VeJwZycjTemplateModal",
    components: {
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
		zyksList:[],
        confirmLoading: false,
        validatorRules: {
          zyksid: {rules: [
			  {required: true, message: '请选择职业认证考试!'},
          ]},
          name: {rules: [
            {required: true, message: '请输入模板名称!'},
          ]},
          fileid: {rules: [
          ]},
          codetid: {rules: [
          ]},
          status: {rules: [
			  {required: true, message: '请选择状态!'},
          ]},
          type: {rules: [
          ]},
          createtime: {rules: [
            {required: true, message: '请输入创建时间!'},
          ]},
          createuserid: {rules: [
            {required: true, message: '请输入创建用户ID!'},
          ]},
          terminalid: {rules: [
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwZycjTemplate/add",
          edit: "/edu-schedule/jingsaiProject/veJwZycjTemplate/edit",
        }
      }
    },
    created () {
		this.getZyrz();
    },
    methods: {
      add () {
        this.edit({});
      },
	  getZyrz(){
	  	getAction('/edu-schedule/jingsaiProject/veJwKsZhiye/select').then(
	  	res => {
	  		this.zyksList = []
	  		if (res.code == 200) {
	  			this.zyksList=res.result;
	  		}
	  	
	  	}).catch(err => {
	  		this.$message.warning("获取年级失败");
	  	})
	  },
      edit (record) {
        if(record.status != null){
          record.status = ""+record.status;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'zyksid','name','fileid','codetid','codetidText','status','type','createtime','createuserid','terminalid'))
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
            this.model.createuserid = window.localStorage.getItem('userId');
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
        this.form.setFieldsValue(pick(row,'zyksid','name','fileid','codetid','codetidText','status','type','createtime','createuserid','terminalid'))
      },
      // 打印设计
      modelDesign() {
        //检查是否安装
        this.CreateFullBill()
        //  this.getLodopHtml();
        //有安装才可以运行

        if (this.LODOP) {
          //设计模板
          this.designModel()
        }
      },
      //打印预览
      modelPriview() {
        //检查是否安装
        this.CreateFullBill()
        //有安装才可以运行
        if (this.LODOP) {
          //预览模板
          this.previewModel()
        }
      },
      //判断是否安装插件
      CreateFullBill() {
        debugger
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
      //根据文本框代码执行打印、结束后并返回代码
      designModel: function() {
        debugger
        // LODOP=getLodop();
        let LODOP = this.LODOP
        // eval(document.getElementById('S1').value)
        // if (LODOP.CVERSION)
        //   CLODOP.On_Return = function (TaskID, Value) {
        //     document.getElementById('S1').value = Value
        //   }
        // document.getElementById('S1').value= LODOP.PRINT_DESIGN()
        /**
         eval(document.getElementById('S1').value);
         if (LODOP.CVERSION) CLODOP.On_Return=function(TaskID,Value){document.getElementById('S1').value=Value;};
         LODOP.PRINT_DESIGN();
         this.entityObj.code="";
         this.entityObj.code=document.getElementById('S1').value;
         */
        if (LODOP.CVERSION) {
          CLODOP.On_Return = (TaskID, value) => {
            // this.entityObj.code = value
            // eval(this.entityObj.code)

            let param = {}
            param.codetidText = value
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(param, 'codetidText'))
            })
          }
        }
        let codetidText = this.form.getFieldValue('codetidText');
        console.log('model.codetidText', this.model.codetidText)
        console.log('getFieldValue("codetidText")', this.form.getFieldValue('codetidText'))
        eval(codetidText)
        LODOP.PRINT_DESIGN()

      },
      //用文本框执行打印预览p
      previewModel() {
        //MyData=document.getElementById('data01').value;	//打印前变量重读一下最新值
        let LODOP = this.LODOP

        let codetidText = this.form.getFieldValue('codetidText');
        eval(codetidText)

        if (LODOP.CVERSION) CLODOP.On_Return = null
        LODOP.PREVIEW()
      },

    }
  }
</script>