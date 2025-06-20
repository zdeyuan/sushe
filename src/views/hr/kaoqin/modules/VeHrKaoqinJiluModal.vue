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
    <ve-hr-kaoqin-jilu-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></ve-hr-kaoqin-jilu-form>
  </j-modal>
</template>

<script>

import VeHrKaoqinJiluForm from './VeHrKaoqinJiluForm'

export default {
  name: 'VeHrKaoqinJiluModal',
  components: {
    VeHrKaoqinJiluForm
  },
  data() {
    return {
      title: '',
      width: 800,
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