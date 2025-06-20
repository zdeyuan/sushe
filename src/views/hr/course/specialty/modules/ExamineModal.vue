<template>
   <a-modal
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    okText='确定'
    cancel-text="取消"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible">
  <a-card :bordered="false" @submit="handleSubmit">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }">
      <a-form-item label="是否共享">
        <a-radio-group name="radioGroup" v-decorator="['isexam', validatorRules.isexam]">
          <a-radio :value="1">
            通过
          </a-radio>
          <a-radio :value="0">
            不通过
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="不通过原因">
        <a-textarea  style="width:554px;heigh:229px" placeholder="配置详情说明" :rows="4" v-decorator="['remark', validatorRules.remark]"/>
      </a-form-item>
      <a-form-item label="课程名称">
        <a-input style="width:400px;height: 34px;" placeholder="请输入课程名称"
          v-decorator.trim="['coursename', validatorRules.coursename]" 
        />
      </a-form-item>
      <a-form-item label="课程分类">
        <a-input style="width:400px;height: 34px;" placeholder="请输入课程名称"
          v-decorator.trim="['code', validatorRules.code]" 
        />
      </a-form-item>
      <a-form-item label="主讲教师">
        <a-input style="width:400px;height: 34px;" placeholder="请输入课程名称"
          v-decorator.trim="['teachername', validatorRules.teachername]" 
        />
      </a-form-item>
      <a-form-item label="最后更新时间">
        <div>2018-02-03 16:33:22</div>
      </a-form-item>
      <a-form-item label="课程简介">
        <div>1231231231</div>
      </a-form-item>
    </a-form>
  </a-card> 
  </a-modal>
</template>

<script>
  import '@/assets/less/usercolor.less'
  import { VueEditor } from 'vue2-editor';
  import pick from 'lodash.pick'
  // import produceIndex from "../produceIndex"
  export default {
    //审核
    name: 'ExamineModal',
    components: {
      VueEditor,
      // produceIndex
    },
    data () {
      return {
        title:"操作",
        width:800,
        visible: false,//modal开关
        disableSubmit: false,
        form:this.$form.createForm(this),
        fileList:[],
        treeData:[{
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
          ],
        },],
        indexStyle:0,
        majorData:[
          {
            name:'汽车专业',
            id:1
          },
          {
            name:'测试专业',
            id:2
          },
          {
            name:'轮机工程技术',
            id:3
          }],
        validatorRules:{
          coursename:{rules: [
                  { required: true, message: '请输入名称!' },
                  { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ]},
          teachername:{ rules: [{ required: true, message: '请输入标识!' }] },
          veCondition: { rules: [{ required: true, message: '请输入默认权重!' }] },
          unit: { rules: [{ required: true, message: '请输入计算单位!' }] },
        },
      }
    },
    methods: {
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.add();
        })
      },
      // examine (record) {
      //   console.log(record)
      //   this.visible=true
      //   this.$nextTick(()=>{
      //     this.$refs.realForm.examine(record);
      //   });
      // },
      examine (record) {
        console.log(record)
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'coursename','teachername','status'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.visible = false;
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      handleCancel () {
        this.close()
      },
      //添加
      handleSubmit(e) {
        console.log(e) 
      },
      handReturn(){
        this.indexStyle=0;
        this.produceNum=0
      },
      createSubmit(){

      },
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
  .drawer-footer{
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }


</style>