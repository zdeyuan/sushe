<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="题目" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['question', validatorRules.question]" rows="4" placeholder="请输入题目" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="题目类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select @change="changeType" v-decorator="['typeid', validatorRules.typeid]" placeholder="请选择题目类型" style="width: 50%" disabled>
                <a-select-option :key="index" v-for="(item,index) in typeData" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <div v-if="model.typeid == 1 || model.typeid == 2">
            <a-col :span="24">
              <a-form-item label="选项" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-editable-table
                  ref="globalTable"
                  :dragSort="false"
                  rowNumber
                  actionButton
                  :maxHeight="240"
                  :loading="table1.loading"
                  :columns="table1.columns"
                  :dataSource="table1.dataSource"
                >

                  <template #action="props">
                    <my-action-button :rowEvent="props"/>
                  </template>

                </j-editable-table>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="正确答案" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['answer', validatorRules.answer]" placeholder="请输入正确答案"  ></a-input>
              </a-form-item>
            </a-col>
          </div>
          <a-col :span="24" v-if="model.typeid == 3">
            <a-form-item label="正确答案" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['answer', validatorRules.answer]" placeholder="请选择正确答案" style="width: 50%">
                <a-select-option value="1">正确</a-select-option>
                <a-select-option value="0">错误</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" v-if="model.typeid == 4 || model.typeid == 5">
            <a-form-item label="参考答案" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['answer', validatorRules.answer]" rows="4" placeholder="请输入参考答案" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="默认分数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['score', validatorRules.score]" placeholder="请输入默认分数" style="width: 50%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="难度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['complexity', validatorRules.complexity]" placeholder="请选择难度" style="width: 50%">
                <a-select-option :value="1">简单</a-select-option>
                <a-select-option :value="2">一般</a-select-option>
                <a-select-option :value="3">困难</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="题目解析" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['analysis', validatorRules.analysis]" rows="4" placeholder="请输入题目解析" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="所属课程目录" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['topicid', validatorRules.topicid]" placeholder="请选择所属课程目录" style="width: 50%">
                <a-select-option :key="index" v-for="(item,index) in topicData" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['status', validatorRules.status]" style="width: 100%">
                    <a-radio :value="1">启用</a-radio>
                    <a-radio :value="0">禁用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col v-if="showFlowSubmitButton" :span="24" style="text-align: center">
            <a-button @click="submitForm">提 交</a-button>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import {getExamTopicList,getExamTypeList,getExamQuestionInfoById} from '@/api/exam.js'
  import JFormContainer from '@/components/edu/JFormContainer'
  import { FormTypes } from '@/utils/JEditableTableUtil'
  import JEditableTable from '@comp/edu/JEditableTable'

  export default {
    name: 'VeExamQuestionForm',
    components: {
      JFormContainer,
      JEditableTable,
      'my-action-button': {
        props: { rowEvent: Object, allowEmpty: Boolean },
        methods: {
          confirmIsShow() {
            const { index, allValues: { inputValues } } = this.rowEvent
            let value = inputValues[index]
            return value.digits || value.pattern
          },
          handleLineAdd() {
            const { target } = this.rowEvent
            target.add()
          },
          handleLineDelete() {
            const { rowId, target } = this.rowEvent
            target.removeRows(rowId)
          },
          renderDeleteButton() {
            if (this.allowEmpty || this.rowEvent.index > 0) {
              if (this.confirmIsShow()) {
                return (
                  <a-popconfirm title="确定要删除吗？" onConfirm={this.handleLineDelete}>
                    <a-button icon="minus"/>
                  </a-popconfirm>
                )
              } else {
                return (
                  <a-button icon="minus" onClick={this.handleLineDelete}/>
                )
              }
            }
            return ''
          },
        },
        render() {
          return (
            <div>
              <a-button onClick={this.handleLineAdd} icon="plus"/>
              &nbsp;
              {this.renderDeleteButton()}
            </div>
          )
        }
      }
    },
    props: {
      //流程表单data
      formData: {
        type: Object,
        default: ()=>{},
        required: false
      },
      //表单模式：true流程表单 false普通表单
      formBpm: {
        type: Boolean,
        default: false,
        required: false
      },
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      },
      // 问题类型id
      typeid: {
        type: Number,
        default: 1,
        required: false
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        model: {},
        typeData:[],// 题目类型
        topicData:[],// 所属课程目录
        table1:{
          loading: false,
          dataSource: [],
          columns:[
            {
              title: '选项',
              key: 'options',
              width: '15%',
              type: FormTypes.input,
              validateRules: [
                { required: true, message: '选项不能为空' }
              ]
            },
            {
              title: '内容',
              key: 'content',
              width: '35%',
              type: FormTypes.input,
              validateRules: [
                { required: true, message: '内容不能为空' }
              ]
            },
            {
              title: '正确答案',
              key: 'isanswer',
              width: '30%',
              type: FormTypes.checkbox,
              customValue: [1, 0], // true ,false
              defaultChecked: false,
              validateRules: [
                { required: true, message: '不能为空' }
              ]
            },
            {
              title: '操作',
              key: 'action',
              width: '20%',
              slotName: 'action',
              type: FormTypes.slot
            }
          ],
        },
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
          typeid: {
            rules: [
              { required: true, message: '请输入问题类型id!'},
            ]
          },
          topicid: {
            rules: [
              { required: true, message: '请输入主题id!'},
            ]
          },
          question: {
            rules: [
              { required: true, message: '请输入问题内容!'},
            ]
          },
          answer: {
            rules: [
              { required: true, message: '请输入答案!'},
            ]
          },
          score: {
            rules: [
              { required: true, message: '请输入默认分数!'},
            ]
          },
          complexity: {
            rules: [
              { required: true, message: '请输入难易度：1=简单，2=一般，3=困难!'},
            ]
          },
          status: {
            rules: [
              { required: true, message: '请输入1启用0禁用!'},
            ]
          },
          adduser: {
            rules: [
              { required: true, message: '请输入用户Id!'},
            ]
          },
          addtime: {
            rules: [
              { required: true, message: '请输入时间!'},
            ]
          },
          terminalid: {
            rules: [
              { required: true, message: '请输入终端!'},
            ]
          },
        },
        url: {
          add: "/exam/veExamQuestion/add",
          edit: "/exam/veExamQuestion/edit",
          queryById: "/exam/veExamQuestion/info"
        }
      }
    },
    computed: {
      formDisabled(){
        if(this.formBpm===true){
          if(this.formData.disabled===false){
            return false
          }
          return true
        }
        return this.disabled
      },
      showFlowSubmitButton(){
        if(this.formBpm===true){
          if(this.formData.disabled===false){
            return true
          }
        }
        return false
      }
    },
    created () {
      this.init();
      //如果是流程中表单，则需要加载流程表单data
      this.showFlowData();
    },
    methods: {
      init(){
        getExamTopicList().then((res)=>{
          this.topicData = res.result
        })
        getExamTypeList().then((res)=>{
          this.typeData = res.result
        })
      },
      changeType(value){
      },
      add () {
        this.form.resetFields();
        this.model = {};
        this.model.typeid = this.typeid
        this.table1.dataSource = []
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'typeid','topicid','fileid','pid','question','score','complexity','status','adduser','addtime','terminalid','placeId','answer', 'analysis'))
        })
      },
      edit (record) {
        this.form.resetFields();
        this.table1.loading = true
            getExamQuestionInfoById(record.id, {}).then(res => {
              this.model = Object.assign({}, res.result)
              this.table1.dataSource = res.result.veExamQuestionOptionList
              this.table1.loading = false
              this.visible = true;
              this.$nextTick(() => {
                this.form.setFieldsValue(pick(this.model,'typeid','topicid','fileid','pid','question','score','complexity','status','adduser','addtime','terminalid','placeId','answer', 'analysis'))
              })
            })
        
      },
      //渲染流程表单数据
      showFlowData(){
        if(this.formBpm === true){
          let params = {id:this.formData.dataId};
          getAction(this.url.queryById,params).then((res)=>{
            if(res.success){
              this.edit (res.result);
            }
          });
        }
      },
      submitForm () {
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
            let formData = Object.assign(this.model, values)
            this.$refs.globalTable.getValues((error, values) => {
              // 错误数 = 0 则代表验证通过
              if (error === 0) {
                  this.$message.success('验证通过')
                  // 将通过后的数组提交到后台或自行进行其他处理
                  formData.veExamQuestionOptionList = values || []
                  httpAction(httpurl,formData,method).then((res)=>{
                    if(res.success){
                      that.$message.success(res.message);
                      that.$emit('ok');
                    }else{
                      that.$message.warning(res.message);
                    }
                  }).finally(() => {
                    that.confirmLoading = false;
                  })
              } else {
                  this.$message.error('验证未通过')
              }
          })
          }
         
        })
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'typeid','topicid','fileid','pid','question','score','complexity','status','adduser','addtime','terminalid','placeId','answer', 'analysis'))
      },
    },
    watch: {
      typeid(val) {
      },
      'table1.dataSource' (val) {
      }
    }
  }
</script>