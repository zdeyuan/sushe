<template>
  <a-card :bordered="false" :title="ss">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="课程号" >
              <a-input v-decorator="['kch', validatorRules.kch]" placeholder="请输入课程号"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="课程名称" >
              <a-input v-decorator="['kcmc', validatorRules.kcmc]" placeholder="请输入课程名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="课程英文名" >
              <a-input v-decorator="['kcywm', validatorRules.kcywm]" placeholder="请输入课程英文名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="课程别名" >
              <a-input v-decorator="['kcbm', validatorRules.kcbm]" placeholder="请输入课程别名"></a-input>
            </a-form-item>
          </a-col>

          <!-- <a-col :md="12" :sm="24">
            <a-form-item label="开课院系ID" >
              <a-input-number
                v-decorator="['falid', validatorRules.falid]"
                placeholder="请输入开课院系ID"
                style="width: 100%"
              />
            </a-form-item>
          </a-col> -->

          <!--          <a-col :md="12" :sm="24">-->
          <!--            <a-form-item label="专业组" >-->
          <!--              <a-select v-decorator="['specid', validatorRules.specid]">-->
          <!--                <a-select-option v-for="item in specs" :key="item.id" :value="item.id">-->
          <!--                  {{ item.zymc }}-->
          <!--                </a-select-option>-->
          <!--              </a-select>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->

          <a-col :md="12" :sm="24">
            <a-form-item label="专业部" >
              <!-- <j-dict-select-tag
                type="list"
                v-decorator="['specid', validatorRules.specid]"
                :trigger-change="true"
                dictCode="edu_dev.ve_jw_xiaoqu,XQMC,id"
              /> -->
              <a-select v-decorator="['falid', validatorRules.falid]" @change="depSelect"  placeholder="请选择专业组">
<!--                <a-select-option value="">请选择专业组</a-select-option>-->
                <a-select-option v-for="item in deps" :key="item.id" :value="item.id">
                  {{ item.yxmc }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="专业"  >
              <a-select v-decorator="['specid', validatorRules.specid]" placeholder="请选择专业">
                <a-select-option v-for="item in specs" :key="item.id" :value="item.id">
                  {{ item.zymc }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>


          <a-col :md="12" :sm="24" >
            <a-form-item label="课程性质" >
<!--              <j-dict-select-tag-->
<!--                type="list"-->
<!--                v-decorator="['kcxz', validatorRules.kcxz]"-->
<!--                :trigger-change="true"-->
<!--                dictCode="course_type"-->
<!--                placeholder="请选择课程性质"-->
<!--              />-->
              <j-dict-select-tag
                v-decorator="['kcxz', validatorRules.kcxz]"
                :trigger-change="true"
                placeholder="请选择课程性质"
                dictCode="course_type"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>

<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="授课方式" >-->
<!--              <j-dict-select-tag-->
<!--                type="list"-->
<!--                v-decorator="['skfsm', validatorRules.skfsm]"-->
<!--                :trigger-change="true"-->
<!--                dictCode="course_type"-->
<!--                placeholder="请选择授课方式"-->
<!--              />-->
<!--            </a-form-item>-->
<!--          </a-col>-->


<!--          <a-col :md="12" :sm="24" style="margin-right: 100px">-->
<!--            <a-form-item label="考试形式" >-->
<!--              <a-select v-decorator="['ksxs', validatorRules.ksxs]">-->
<!--                <a-select-option value="">请选择</a-select-option>-->
<!--                <a-select-option :value="1">考试</a-select-option>-->
<!--                <a-select-option :value="2">考查</a-select-option>-->
<!--              </a-select>-->
<!--            </a-form-item>-->
<!--          </a-col>-->

          <a-col :md="12" :sm="24">
            <a-form-item label="考试分数" >
              <a-input-number
                v-decorator="['ksfs', validatorRules.ksfs]"
                placeholder="请输入考试分数"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <!-- <a-form-item label="开课单位" >
            <a-input v-decorator="['kkdw', validatorRules.kkdw]" placeholder="请输入开课单位"></a-input>
          </a-form-item>
          <a-form-item label="所属教研组ID" >
            <a-input-number
              v-decorator="['jyzid', validatorRules.jyzid]"
              placeholder="请输入所属教研组ID"
              style="width: 100%"
            />
          </a-form-item> -->
          <a-col :md="24" :sm="24">
            <a-form-item label="总学分" >
              <a-input-number v-decorator="['xf', validatorRules.xf]" placeholder="请输入总学分" max="100"
                              style="width: 200px;"/>
              <span style="text-align: center">&nbsp;学分不能超过100分</span>
            </a-form-item>

            <!--            <span style="color: gray"></span>-->
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="总学时" >
              <a-input-number
                v-decorator="['zxs', validatorRules.zxs]"
                placeholder="请输入总学时"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="理论学时" >
              <a-input-number
                v-decorator="['llxs', validatorRules.llxs]"
                placeholder="请输入理论学时"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="实践学时" >
              <a-input-number
                v-decorator="['sjxs', validatorRules.sjxs]"
                placeholder="请输入实践学时"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="其它学时" >
              <a-input-number
                v-decorator="['qtxs', validatorRules.qtxs]"
                placeholder="请输入其它学时"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>

          <!-- <a-form-item label="参考书目（大文本ID）" >
            <a-input-number
              v-decorator="['cksmtid', validatorRules.cksmtid]"
              placeholder="请输入参考书目（大文本ID）"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="考试形式：字典值ID" >
            <a-input-number
              v-decorator="['ksxs', validatorRules.ksxs]"
              placeholder="请输入考试形式：字典值ID"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="授课形式：字典值ID" >
            <a-input-number
              v-decorator="['skfsm', validatorRules.skfsm]"
              placeholder="请输入授课形式：字典值ID"
              style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="课程性质：字典值ID" >
            <a-input-number
              v-decorator="['kcxz', validatorRules.kcxz]"
              placeholder="请输入课程性质：字典值ID"
              style="width: 100%"
            />
          </a-form-item>
           -->
          <a-col :md="12" :sm="24">
            <a-form-item label="课程费用" >
              <a-input-number
                v-decorator="['kcfy', validatorRules.kcfy]"
                placeholder="请输入课程费用"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="状态" >
              <a-radio-group v-decorator="['status']">
                <a-radio :value="1"> 启用</a-radio>
                <a-radio :value="0"> 禁用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="课程介绍" >
              <a-textarea
                v-decorator="['kcjstidText', validatorRules.kcjstid]"
                placeholder="请输入课程介绍"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <div style="text-align: center">
			<a-button class="search-button btn-style btn" type="primary" style="margin-right: 26px" @click="handleOk"> 确定 </a-button>
			<a-button class="search-button btn-style btn-cancle" @click="reset"> 重置 </a-button>
          <!-- <edu-caozuo-button @click="handleOk" type="primary" style="margin-right: 26px" title="确定"></edu-caozuo-button> -->
          <!-- <edu-caozuo-button @click="reset" type="5" title="重置"></edu-caozuo-button> -->
        </div>
      </a-form>
    </a-spin>
  </a-card>
</template>

<script>
  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { getAction, getActionForBase } from '@/api/common/manage'
  import ATextarea from 'ant-design-vue/es/input/TextArea'
  import EduCaozuoButton from '@/components/edu/button/EduCaozuoButton'

  export default {
    name: 'JwKechengModal',
    components: {
      EduCaozuoButton,
      ATextarea,
      JDate,
      JDictSelectTag
    },
    data() {
      return {
        form: this.$form.createForm(this),
        title: '操作',
        width: 1200,
        visible: false,
        deps: {},
        specs: {},
        eduurl: window._CONFIG['domianBaseURL'],
        id: '09d5e1e7f9b049008eee645c783a1d67',
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        confirmLoading: false,
        validatorRules: {
          kch: { rules: [{ required: true, message: '请输入课程号（代码）!' }] },
          kcmc: { rules: [{ required: true, message: '请输入课程名称!' }] },
          kcywm: { rules: [] },
          kcbm: { rules: [] },
          kcjstid: { rules: [] },
          falid: { rules: [{ required: true, message: '请选择专业组!' }] },
          specid: { rules: [{ required: true, message: '请选择专业!' }] },
          kkdw: { rules: [] },
          jyzid: { rules: [] },
          xf: { rules: [{ required: true, message: '请输入总学分!' }] },
          zxs: { rules: [{ required: true, message: '请输入总学时!' }] },
          llxs: { rules: [] },
          sjxs: { rules: [] },
          qtxs: { rules: [] },
          ksfs: { rules: [{ required: true, message: '请输入考试分数!' }] },
          cksmtid: { rules: [] },
          ksxs: { rules: [{ required: true, message: '请输入考试形式：字典值ID!' }] },
          skfsm: { rules: [{ required: true, message: '请输入授课形式：字典值ID!' }] },
          kcxz: { rules: [{ required: true, message: '请选择课程性质' }] },
          kcfy: { rules: [] },
          status: { rules: [] },
          isdelete: { rules: [] },
          createuserid: { rules: [{ required: true, message: '请输入创建人ID!' }] },
          createtime: { rules: [{ required: true, message: '请输入创建时间!' }] },
          auditstatus: { rules: [] },
          audituserid: { rules: [] },
          audittime: { rules: [] },
          audittid: { rules: [] },
          terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] }
        },
        url: {
          add: '/jxzy/jwKecheng/add',
          edit: '/jxzy/jwKecheng/edit'
        }
      }
    },
    created() {
      this.getDepartment()
    },

    methods: {
      add() {
        this.edit({})
      },
      reset(){
        this.form.resetFields()
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue(
            pick(
              this.model,
              'kch',
              'kcmc',
              'kcywm',
              'kcbm',
              'kcjstid',
              'falid',
              'specid',
              'kkdw',
              'jyzid',
              'xf',
              'zxs',
              'llxs',
              'sjxs',
              'qtxs',
              'ksfs',
              'cksmtid',
              'ksxs',
              'skfsm',
              'kcxz',
              'kcfy',
              'status',
              'isdelete',
              'createuserid',
              'createtime',
              'auditstatus',
              'audituserid',
              'audittime',
              'audittid',
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
                  that.$emit('ok');
                  that.add();
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
            'kch',
            'kcmc',
            'kcywm',
            'kcbm',
            'kcjstid',
            'falid',
            'specid',
            'kkdw',
            'jyzid',
            'xf',
            'zxs',
            'llxs',
            'sjxs',
            'qtxs',
            'ksfs',
            'cksmtid',
            'ksxs',
            'skfsm',
            'kcxz',
            'kcfy',
            'status',
            'isdelete',
            'createuserid',
            'createtime',
            'auditstatus',
            'audituserid',
            'audittime',
            'audittid',
            'terminalid'
          )
        )
      },

      getDepartment() {
        getActionForBase('/common/veCommon/queryFacultyList', { id: this.id })
          .then((res) => {
            if (res.success) {
              this.deps = res.result
              console.log('------------------------')
              console.log(this.deps)
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
      },

      depSelect(value) {
        console.log(value)
        var getSpecUrl = '/common/veCommon/querySpecialtyListByFalId'
        getActionForBase(getSpecUrl, { falId: value, id: this.id })
          .then((res) => {
            if (res.success) {
              this.specs = res.result
              console.log(this.specs)
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
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
	/deep/ .ant-form-item-control-wrapper{
		flex:1;
	}
	::v-deep .ant-form-item-control{
		  width: 100%;
	}
</style>