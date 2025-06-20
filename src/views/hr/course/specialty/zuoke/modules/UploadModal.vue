<template>
   <a-modal
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    okText='确定'
    cancel-text="返回"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible">
  <a-card :bordered="false" @submit="handleSubmit" >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" class="locationItem">
      <a-form-item label="所属节点">
        <a-select   v-decorator="['name', validatorRules.name]" placeholder="第一节">
          <a-select-option v-for="(item,index) in panelData" :key="index.id" :value="item.name">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="课程封面" style="">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture"
          :default-file-list="fileList"
          @change="handleChangeImg"
        >
          <a-button> <a-icon type="upload" /> 选择文件 </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="资源名称">
        <a-input style="width:400px;height: 34px;" placeholder="请输入资源名称"
          v-decorator.trim="['Resourcename', validatorRules.Resourcename]" 
        />
      </a-form-item>
      <a-form-item label="应用类型">
        <a-select   v-decorator="['type', validatorRules.type]" placeholder="应用类型">
          <a-select-option v-for="(item,index) in typeData" :key="index.id" :value="item.type">{{item.type}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="资源分类">
        <a-input style="width:400px;height: 34px;" placeholder="请输入资源分类"
          v-decorator.trim="['classification', validatorRules.classification]" 
        />
      </a-form-item>
      <a-form-item label="注意事项" style="color:#999999;">
        <div>上传须知</div>
        <div style="width:400px">1.支持web网页大文件上传，最大不能超过2G</div>
        <div>2.水系统目前支持以下的系统格式文档：</div>
        <div style="width:400px">文档类：doc，docx，pdf，xls，xlsx，ppt，pptx，wps</div>
        <div>图形/图像类：jpg，png，jpeg</div>
        <div>音视频类：mp3，wav，wma</div>
        <div>视频类：wmv，wma，asf，flv，mpg，avi，rm，rmvb，mp4，mp3</div>
        <div>动画类：swf</div> 
        <div>其他：zip，rar</div> 
        <div style="width:410px;line-height: 20px;">需要转换的格式有文档类、视频类、动画类、其他的格式不需要转
          换。如果平台没有启用转换功能，则视频只支持的文件扩展名只允
          许map4格式并且编码格式必须是H.264</div> 
      </a-form-item>
    </a-form>
  </a-card> 
  </a-modal>
</template>

<script>
  import '@/assets/less/usercolor.less'
  export default {
    //添加
    name: 'UploadModal',
    components: {
     
    },
    data () {
      return {
        queryParam:{

        },
        title:"操作",
        width:1100,
        visible: false,
        disableSubmit: false,
        form:this.$form.createForm(this),
        fileList:[],
        indexStyle:0,
        panelData:[
          {
            name:'石心疯第一节',
            id:1
          },{
            name:'石心疯第一节',
            id:1
          },],
        typeData:[{
          id:1,
          type:'电子教材'
        },{
          id:1,
          type:'实训指导书'
        },],  
        validatorRules:{
          name:{rules: [
                  { required: true, message: '请输入节点!' },
                ]},
          Resourcename:{ rules: [{ required: true, message: '请输入资源名称!' }] },
          type: { rules: [{ required: true, message: '请输入应用类型!' }] },
          classification: { rules: [{ required: true, message: '请输入资源分类!' }] },
        },
      }
    },
    mounted() {
    },
    methods: {
      handleChange(targetKeys, direction, moveKeys) {
        console.log(targetKeys, direction, moveKeys);
        this.targetKeys = targetKeys;
      },
      addResources() {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.addResources();
        })
      },
      examine (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.examine(record);
        });
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
        // this.$refs.realForm.submitForm();
         const form = this.form;
          form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('form 表单内容: ', values);
          form.resetFields();
          this.visible = false;
        });
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
      handleChangeImg(item){
        console.log(item)
        // console.log(item.fileList[0].response.url)
        // this.coverid = item.fileList[0].response.url
        // console.log(this.coverid)
      },
      createSubmit(){

      },
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
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