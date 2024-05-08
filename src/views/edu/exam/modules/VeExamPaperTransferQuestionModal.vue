<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <ve-exam-paper-transfer ref="realForm" @ok="submitCallback" :disabled="disableSubmit" :typeid="typeid" :paperid="paperid"></ve-exam-paper-transfer>
  </j-modal>
</template>

<script>

  import VeExamPaperTransfer from './VeExamPaperTransfer'
  export default {
    name: 'VeExamPaperModal',
    components: {
      VeExamPaperTransfer
    },
    data () {
      return {
        title:'',
        width:800,
        visible: false,
        disableSubmit: false
      }
    },
    methods: {
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.getQuestionList();
        })
      },
      edit (record) {
        console.log('edit')
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.edit(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        console.log('handleOk')
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        console.log('submitCallback')
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>