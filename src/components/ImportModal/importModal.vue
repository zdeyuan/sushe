<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <import-modal-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></import-modal-form>
  </j-modal>
</template>

<script>
import importModalForm from './importModalForm'

export default {
  name: 'HqHrChengfaModal',
  components: {
    importModalForm,
  },
  data() {
    return {
      title: '',
      width: 896,
      visible: false,
      disableSubmit: false,
    }
  },
  methods: {
    import(info) {
      this.$nextTick(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.realForm.edit(info)
        })
      })
    },
    
    add() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.add()
      })
    },
    edit(record, extra = {}) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.edit(record, extra)
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      this.$refs.realForm.submitForm()
    },
    submitCallback() {
      this.$emit('ok')
      this.visible = false
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>