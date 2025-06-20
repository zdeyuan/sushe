<template>
  <a-card :bordered="false" :title="ss">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
           <a-form-item label="专业组" >
				 <a-select v-decorator="['jyzid', validatorRules.jyzid]" @change="zyzSelect"  placeholder="请选择专业组">
				   <a-select-option v-for="item in deps" :key="item.id" :value="item.id">
					 {{ item.yxmc }}
				   </a-select-option>
				 </a-select>
			</a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="学期" >
             <j-select-xueqi placeholder="请选择学期" v-model="validatorRules.semid"></j-select-xueqi>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="课程" >
             <a-select v-decorator="['kcid', validatorRules.kcid]"  placeholder="请选择专业组">
               <a-select-option v-for="item in kcList" :key="item.id" :value="item.id">
             		 {{ item.yxmc }}
               </a-select-option>
             </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="专业部" >
              <a-select v-decorator="['falid', validatorRules.depId]" @change="depSelect"  placeholder="请选择专业组">
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
			  <a-form-item label="班级"  >
			  <a-select v-decorator="['bjId', validatorRules.bjId]" placeholder="请选择专业">
			    <a-select-option v-for="item in bjList" :key="item.id" :value="item.id">
			      {{ item.zymc }}
			    </a-select-option>
			  </a-select>
			  </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="授课教师" >
             <JSelectTeacher placeholder="请选择授课教师" v-model="validatorRules.bzrUserId"></JSelectTeacher>
            </a-form-item>
          </a-col>
		  <a-col :md="12" :sm="24">
		    <a-form-item label="使用教材" >
		      <JSelectJiaoCai placeholder="请选择使用教材" v-model="validatorRules.jcid_dictId"></JSelectJiaoCai>
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
           </a-form-item>

            <!--            <span style="color: gray"></span>-->
          </a-col>


         <a-col :md="12" :sm="24">
           <a-form-item label="核心课程" >
             <edu-data v-model="validatorRules.sfhxkc" stype="radio" code="shifou" />
           </a-form-item>
         </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="课程属性" >
              <edu-data v-model="validatorRules.ksxsid" stype="select" code="shifou" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="考试形式" >
              <j-dict-select-tag placeholder="请选择考试形式" dictCode="jw_ksxsm" v-model="validatorRules.ksxsm"></j-dict-select-tag>
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
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacherUserId'
  import JSelectJiaoCai from '@/components/kwglbiz/JSelectJiaocai'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import { getAction, getActionForBase } from '@/api/common/manage'
  export default {
    name: 'JwKechengModal',
    components: {
		JSelectTeacher,
		JSelectJiaoCai,
		JSelectXueqi
    },
    data() {
      return {
        form: this.$form.createForm(this),
        title: '操作',
        width: 1200,
        visible: false,
        deps: [],
		kcList:[],
		bjList:[],
        specs: {},
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
	  zyzSelect(val){
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
	  },
      depSelect(value) {
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