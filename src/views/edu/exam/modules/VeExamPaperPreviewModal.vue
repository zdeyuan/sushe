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
    <ve-exam-paper-preview-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></ve-exam-paper-preview-form>
  </j-modal>
</template>

<script>

  import VeExamPaperPreviewForm from './VeExamPaperPreviewForm'
  export default {
    name: 'VeExamPaperPreviewModal',
    components: {
      VeExamPaperPreviewForm
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
          this.$refs.realForm.add();
        })
      },
      preview (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.initPaper(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>