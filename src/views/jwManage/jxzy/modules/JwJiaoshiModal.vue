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
          <a-col :md="12" :sm="24">
            <a-form-item label="校区" >
<!--              <j-dict-select-tag-->
<!--                :disabled="check"-->
<!--                v-decorator="['campusid', validatorRules.campusid]"-->
<!--                placeholder="请选择校区"-->
<!--                dictCode="edu_dev.ve_jw_xiaoqu,XQMC,id"-->
<!--                :trigger-change="true"-->
<!--                @change="campusSelect"-->
<!--              ></j-dict-select-tag>-->
              <j-select-xiaoqu  :disabled="check"
                                v-decorator="['campusid', validatorRules.campusid]"
                                placeholder="请选择校区"  :trigger-change="true" @change="campusSelect"></j-select-xiaoqu>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教学楼" >
              <a-select v-decorator="['jzid', validatorRules.jzid]" >
                <a-select-option v-for="item in jzs" :key="item.id" :value="item.id" placeholder="请选择教学楼">
                  {{ item.jzwmc }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教室类型" >
              <j-dict-select-tag
                :disabled="check"
                v-decorator="['jslxdm', validatorRules.jslxdm]"
                placeholder="请选择教室类型"
                dictCode="jslxdm"
                :trigger-change="true"
              ></j-dict-select-tag>

<!--              <j-select-dict-kwgl :disabled="check"-->
<!--                                  v-decorator="['jslxdm', validatorRules.jslxdm]"   placeholder="请选择教室类型" :dictCode="'JWGL_JSLX'"  :trigger-change="true"></j-select-dict-kwgl>-->
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教室名称" >
              <a-input v-decorator="['jsmc', validatorRules.jsmc]" placeholder="请输入教室名称"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="实际容量" >
              <a-input-number
                v-decorator="['sjrl', validatorRules.sjrl]"
                placeholder="请输入实际容量"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="最大排课容量" >
              <a-input-number
                v-decorator="['zdpkrl', validatorRules.zdpkrl]"
                placeholder="请输入最大排课容量"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="网络状态" >
              <!-- <a-input-number
              v-decorator="['wlzt', validatorRules.wlzt]"
              placeholder="请输入网络状态：1=通，0=不通"
              style="width: 100%"
            /> -->
              <a-radio-group v-decorator="['wlzt', validatorRules.wlzt]" >
                <a-radio :value="1"> 启用 </a-radio>
                <a-radio :value="0"> 禁用 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="多媒体教室" >
              <a-radio-group v-decorator="['sfdmtjs', validatorRules.sfdmtjs]" >
                <a-radio :value="1"> 启用 </a-radio>
                <a-radio :value="0"> 禁用 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="考试可用" >
              <a-radio-group v-decorator="['isforexam', validatorRules.isforexam]" >
                <a-radio :value="1"> 启用 </a-radio>
                <a-radio :value="0"> 禁用 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="状态" >
              <a-radio-group v-decorator="['status']" >
                <a-radio :value="1"> 启用 </a-radio>
                <a-radio :value="0"> 禁用 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="备注" >
              <a-textarea style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { getAction } from '@/api/common/manage'
import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'
import JSelectDictKwgl from '@/components/kwglbiz/JSelectDictKwgl'

export default {
  name: 'JwJiaoshiModal',
  components: {
    JSelectDictKwgl,
    JSelectXiaoqu,
    JDictSelectTag,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 1200,
      visible: false,
      model: {},
      jzs: {},
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
        campusid: { rules: [{ required: true, message: '请选择校区!' }] },
        jzid: { rules: [{ required: true, message: '请选择教学楼!' }] },
        jsbh: { rules: [] },
        jsmc: { rules: [{ required: true, message: '请输入教室名称!' }] },
        jslxdm: { rules: [{ required: true, message: '请选择教师类型!' }] },
        sjrl: { rules: [{ required: true, message: '请输入实际容量!' }] },
        zdpkrl: { rules: [{ required: true, message: '请输入最大排课容量!' }] },
        wlzt: { rules: [] },
        sfdmtjs: { rules: [] },
        isforexam: { rules: [] },
        jsbztid: { rules: [] },
      },
      url: {
        add: '/jxzy/jwJiaoshi/add',
        edit: '/jxzy/jwJiaoshi/edit',
        getBuildingList: '/jxzy/jwJianzhu/list',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      if(record.campusid!=null){
        this.campusSelect(record.campusid);
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'campusid',
            'jzid',
            'jsbh',
            'jsmc',
            'jslxdm',
            'sjrl',
            'zdpkrl',
            'wlzt',
            'sfdmtjs',
            'isforexam',
            'jsbztid',
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
          'campusid',
          'jzid',
          'jsbh',
          'jsmc',
          'jslxdm',
          'sjrl',
          'zdpkrl',
          'wlzt',
          'sfdmtjs',
          'isforexam',
          'jsbztid',
          'status',
          'isdelete',
          'createuserid',
          'createtime',
          'terminalid'
        )
      )
    },

    campusSelect(value) {
      this.jzs =[];
      this.form.setFieldsValue(
        pick(
          {jzid:''},
          'jzid',
        )
      )
      if(value == null || value ==''){
        return;
      }
      console.log(value)
      getAction(this.url.getBuildingList, { campusid: value,pageSize:200 })
        .then((res) => {
          if (res.success) {
            this.jzs = res.result.records
            console.log(this.jzs)
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
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