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
    <ve-hr-kaohe-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></ve-hr-kaohe-form>
  </j-modal>
</template>

<script>

import VeHrKaoheForm from './VeHrKaoheInfoForm'

export default {
  name: 'VeHrKaoheModal',
  components: {
    VeHrKaoheForm
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
    edit(record) {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.realForm.edit(record)
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