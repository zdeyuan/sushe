<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <template slot="footer">
      <div style="text-align: center">
        <a-button @click="handleCancel" style="background: #5c6065;color: white"> 返回</a-button>
      </div>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="班级名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.bjmc }}
        </a-form-item>
        <a-form-item label="教师名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.addusername }}
        </a-form-item>
        <a-form-item label="公告标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.title }}
        </a-form-item>
        <a-form-item label="公告内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.contenttidText }}
        </a-form-item>
		<a-form-item label="审核状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
					<edu-dict-text code="auditStatus" :value="model.verifystatus"></edu-dict-text>
		</a-form-item>
        <!-- <div v-if="model.verifyusername">
			<a-form-item label="审核人" :labelCol="labelCol" :wrapperCol="wrapperCol">
						{{ model.verifyusername }}
			  </a-form-item>
			  <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
						{{ model.verifytime }}
			  </a-form-item>
			  <a-form-item label="审核状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
						<edu-dict-text code="auditStatus" :value="model.verifystatus"></edu-dict-text>
			</a-form-item>
			  <a-form-item label="审核说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
						{{ model.verifytidText }}
			  </a-form-item>
		</div> -->

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
    name: "VeJwBjggModal",
    components: {
      JDate,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"查看我的班级公告",
        width:800,
        visible: false,
        roleDisabled: false,
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
        },
        url: {
          add: "/jxgz/veJwBjgg/add",
          edit: "/jxgz/veJwBjgg/edit",
        }
      }
    },
    created () {
    },
    methods: {
      select(record) {
        console.log('select', record)
        this.visible = true
        this.queryParam.jsgh = record.id
        this.searchQuery()
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        //编辑页面禁止修改角色编码
        if(this.model.id){
          this.roleDisabled = true;
        }else{
          this.roleDisabled = false;
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bjid','bjmc','addtime','title','contenttidText','adduser','addusername','verifyuser','verifyusername','verifytime','verifystatus','verifytid','terminalid'))
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
        this.form.setFieldsValue(pick(row,'bjid','bjmc','addtime','title','contenttidText','adduser','addusername','verifyuser','verifyusername','verifytime','verifystatus','verifytid','terminalid'))
      },


    }
  }
</script>