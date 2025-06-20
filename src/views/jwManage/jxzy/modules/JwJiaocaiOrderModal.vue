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
        <a-form-item label="订单id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="editFlag">
          <a-input v-decorator="['orderid', validatorRules.orderid]" disabled="true"></a-input>
        </a-form-item>

        <a-form-item label="教材名称"  :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <j-dict-select-tag
            :disabled="check"
            v-decorator="['jcid', validatorRules.jcid]"
            placeholder="请选择"
            dictCode="edu_dev.ve_jw_jiaocai,jcmc,id"
            :trigger-change="true"
          ></j-dict-select-tag> -->
          <j-select-jiaocai :trigger-change="true" v-decorator="['jcid', validatorRules.jcid]" placeholder="请选择教材"></j-select-jiaocai>
<!--          <a-input-search v-model="jcid" ref="material"  v-decorator="['jcid', validatorRules.jcid]" readOnly unselectable="on" @search="onSearchMaterial">-->
<!--            <a-button slot="enterButton" :disabled="disabled">请选择教材</a-button>-->
<!--          </a-input-search>-->
        </a-form-item>

        <!-- <a-form-item label="仓库Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['ckid', validatorRules.ckid]" placeholder="请输入仓库Id" style="width: 100%" />
        </a-form-item> -->

        <a-form-item label="采购数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['num', validatorRules.num]" placeholder="请输入采购数量" style="width: 100%" />
        </a-form-item>

        <a-form-item label="采购价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="['price', validatorRules.price]"
            placeholder="请输入采购价格"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item label="供应商" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <JSelectGoyinshang trigger-change="true" style="width:500px" v-decorator="['supplierid', validatorRules.supplierid]" placeholder="请选择供应商"></JSelectGoyinshang>
        </a-form-item>

        <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contact', validatorRules.contact]" placeholder="请输入联系人"></a-input>
        </a-form-item>

        <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['contacttel', validatorRules.contacttel]" placeholder="请输入联系电话"></a-input>
        </a-form-item>
        <a-form-item label="采购对象" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['buyobj', validatorRules.buyobj]" placeholder="请输入采购对象"></a-input>
        </a-form-item>
        <a-form-item label="采购备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['memo', validatorRules.memo]" placeholder="请输入采购备注"></a-textarea>
        </a-form-item>

        <a-form-item label="订单时间" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="editFlag">
          <a-input v-decorator="['dateFormate', validatorRules.dateFormate]" style="width: 100%" disabled="true" />
        </a-form-item>

        <a-form-item label="是否入库" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="editFlag"
          >>
          <a-radio-group v-decorator="['status', validatorRules.status]" :default-value="0">
            <a-radio :value="1"> 是 </a-radio>
            <a-radio :value="0"> 否 </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>

    <jw-jiaocai-order-select-jc ref="selectForm" @ok="modalFormOk"></jw-jiaocai-order-select-jc>

    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JwJiaocaiOrderSelectJc from './JwJiaocaiOrderSelectJc'
import JSelectJiaocai from '@/components/kwglbiz/JSelectJiaocai'
import JSelectGoyinshang from '@/components/kwglbiz/JSelectGoyinshang'

export default {
  name: 'JwJiaocaiOrderModal',
  components: {
    JSelectJiaocai,
	JSelectGoyinshang,
    JwJiaocaiOrderSelectJc
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: '70%',
      editFlag: false,
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
        jcid: {
          rules: [{ required: true, message: '请选择教材!' }],
        },
        price: {
          rules: [{ required: true, message: '请输入采购价格!' }],
        },
        num: {
          rules: [{ required: true, message: '请输入采购数量!' }],
        },
        buyobj: {
          rules: [],
        },
        contact: {
          rules: [],
        },
        contacttel: {
          rules: [],
        },
        memo: {
          rules: [],
        },
        adduserid: {
          rules: [],
        },
        addtime: {
          rules: [],
        },
        supplierid: {
          rules: [],
        },
      },
      url: {
        add: '/jxzy/jwJiaocaiOrder/add',
        edit: '/jxzy/jwJiaocaiOrder/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      if(record.jcid!=null){
        record.jcid+='';
      }
	  if(record.supplierid!=null){
	    record.supplierid+='';
	  }
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'orderid',
            'jcid',
            'ckid',
            'price',
            'num',
            'buyobj',
            'contact',
            'contacttel',
            'memo',
            'adduserid',
            'addtime',
            'status',
            'terminalid',
            'supplierid',
            'dateFormate'
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
          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
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
          'orderid',
          'jcid',
          'ckid',
          'price',
          'num',
          'buyobj',
          'contact',
          'contacttel',
          'memo',
          'adduserid',
          'addtime',
          'status',
          'terminalid',
          'supplierid'
        )
      )
    },

    onSearchMaterial(){
       this.$refs.selectForm.show()
    },
    modalFormOk(row, id) {

        console.log("当前选中教材id", id)
        //this.jcid=id

        this.form.setFieldsValue(
        pick(
          {jcid:id},
          'jcid',
        )
      )
        this.$refs.material.value=row.jcmc

      }
  },
}
</script>