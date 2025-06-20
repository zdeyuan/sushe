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
        <a-row :gutter="24">
          <a-form-item label="教材名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['jcmc', validatorRules.jcmc]" disabled="true"></a-input>
          </a-form-item>

          <a-form-item label="选择仓库" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <!-- <j-dict-select-tag
              :disabled="check"
              placeholder="请选择"
              v-model="cangkus"
              :trigger-change="true"
              :v-model="cangkus"
            ></j-dict-select-tag> -->
            <a-select v-decorator="['ckid', validatorRules.ckid]">
              <a-select-option v-for="item in cangkus" :key="item.id" :value="item.id">
                {{ item.ckmc }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="选择班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-select-banji v-decorator="['bjid', validatorRules.bjid]"></j-select-banji>
          </a-form-item>

          <a-form-item label="出库数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number v-decorator="['num', validatorRules.num]" placeholder="请输出库数量" style="width: 100%" />
          </a-form-item>

          <a-form-item label="出库时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-date
              :disabled="check"
              placeholder="请选择出库时间"
              v-decorator="['time', validatorRules.time]"
              :show-time="true"
              date-format="YYYY-MM-DD HH:mm:ss"
              :trigger-change="true"
              v-model="time"
              style="width: 100%"
            />
          </a-form-item>

          <a-form-item label="供应商" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="flag">
            <j-dict-select-tag
              :disabled="check"
			  style="width:300px"
              v-decorator="['supplierid', validatorRules.supplierid]"
              placeholder="请选择"
              dictCode="edu_dev.ve_jw_jiaocai_supplier,name,id"
              :trigger-change="true"
            ></j-dict-select-tag>
          </a-form-item>

          <a-form-item label="经办人" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['adduser', validatorRules.adduser]"></a-input>
          </a-form-item>

          <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea v-decorator="['memo', validatorRules.memo]" />
          </a-form-item>
        </a-row>
      </a-form>

      <jw-select-class ref="selectForm" @ok="modalFormOk"></jw-select-class>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JwSelectClass from './JwSelectClass'
import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
import {postAction } from '@/api/common/manage'
export default {
  name: 'JwJiaocaiPutinModal',
  components: {
    JSelectBanji,
    JwSelectClass,
  },
  data() {
    return {
      flag: false,
      time: '',
      cangkus: {},
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
          rules: [],
        },
        ckid: {
          rules: [{ required: true, message: '请选择仓库!' }],
        },
        num: {
          rules: [{ required: true, message: '请输入入库数量!' }],
        },
        bjid: {
          rules: [{ required: true, message: '请选择班级！' }],
        },
        memo: {
          rules: [],
        },
        adduserid: {
          rules: [],
        },
        time: {
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

  methods: {
    add() {
      this.edit({})
    },
    edit(record, cangkus) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true;
	  this.getCangku();
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(this.model, 'id', 'jcmc', 'ckid', 'num', 'addtime', 'bjid','supplierid', 'adduser', 'memo')
        )
      })
    },
	getCangku(){
		postAction('/jxzy/jwCangku/all',{})
		  .then((res) => {
		    if (res.success) {
		      this.cangkus = res.result
		    } else {
		      this.$message.warning(res.message)
		    }
		  })
	},
    onSearchClass() {
      this.$refs.selectForm.show()
    },
    modalFormOk(row, id) {
      console.log('当前选中班级id', id)
      //this.jcid=id

      this.form.setFieldsValue(pick({ bjid: id }, 'bjid'))
      this.$refs.class.value = row.name
      console.log('--------------'+row.name)
    },

    changeBoolean(e) {
      if (e.target.value == 0) {
        this.flag = false
      } else if (e.target.value == 1) {
        this.flag = true
      }
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
          //没有关联订单
          if (!that.flag) that.confirmLoading = true
          let kucunurl = '/jxzy/jwJiaocaiKucun/putout'
          let logurl = '/jxzy/jwJiaocaiLog/add'
          let method = 'post'

          let formData = Object.assign(this.model, values)
          console.log('表单提交数据', formData)
          httpAction(
            kucunurl,
            {
              jcid: that.model.id,
              ckid: that.model.ckid,
              ckid: that.model.ckid,
              num: that.model.num,
              time: that.model.time,
              bjid: that.model.bjid
            },
            method
          ).then((res) => {
            if (res.success) {
              //log表中插入数据
              httpAction(
                logurl,
                {
                  jcid: that.model.id,
                  ckid: that.model.ckid,
                  ckid: that.model.ckid,
                  type: 2,
                  num: that.model.num,
                  addusername: that.model.adduser,
                  time: that.time,
                  adduser: that.model.adduser,
                  memo: that.model.memo,
                  bjid: that.model.bjid,
                },
                method
              ).then((res) => {
                if (res.success) {
                  that.$message.success('出库成功')
                  that.$emit('ok')
                  that.confirmLoading = false
                  that.close()
                } else {
                  that.$message.warning(res.message)
                }
              })
            } else {
              that.$message.warning(res.message)
              that.confirmLoading = false
            }
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
  },
}
</script>