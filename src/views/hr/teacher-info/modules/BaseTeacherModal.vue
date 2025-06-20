<!--
 * @since: 2021-03-17 16:42:54
 * @lastTime: 2021-03-23 17:27:43
 * @Description:
-->
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
    <base-teacher-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></base-teacher-form>
  </j-modal>
</template>

<script>

import baseTeacherForm from './BaseTeacherForm'

export default {
  name: 'baseTeacherModal',
  components: {
    baseTeacherForm
  },
  data() {
    return {
      title: '',
      width: 1200,
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
