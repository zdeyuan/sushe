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
    <ve-hr-peixun-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></ve-hr-peixun-form>
  </j-modal>
</template>

<script>

import VeHrPeixunForm from './VeHrPeixunQueryForm'

export default {
  name: 'VeHrPeixunModal',
  components: {
    VeHrPeixunForm
  },
  data() {
    return {
      title: '',
      width: 896,
      visible: false,
      disableSubmit: false
    }
  },
  methods: {
    add() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.add()
      })
    },
    edit(record,extra={}) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.edit(record,extra)
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
    }
  }
}
</script>