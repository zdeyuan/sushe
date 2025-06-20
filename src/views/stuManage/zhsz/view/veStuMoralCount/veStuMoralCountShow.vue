<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="德育统计详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuMoralCountDataForm" labelAlign="right">
        <a-form-model-item label="">
          {{ veStuMoralCountVo.semId }}
        </a-form-model-item>
        <a-form-model-item label="班级id">
          {{ veStuMoralCountVo.bjId }}
        </a-form-model-item>
        <a-form-model-item label="班级名称">
          {{ veStuMoralCountVo.bjName }}
        </a-form-model-item>
        <a-form-model-item label="班级编码">
          {{ veStuMoralCountVo.bjCode }}
        </a-form-model-item>
        <a-form-model-item label="班级德育总分">
          {{ veStuMoralCountVo.dyscore }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuMoralCountApi from '../../api/veStuMoralCountApi';

export default {
  components: {},
  data() {
    const data = {
      veStuMoralCountVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuMoralCountVo = Object.assign({}, row);
      //    veStuMoralCountApi.get(row.id).then((res) => {
      //      this.veStuMoralCountVo = res.result
      // });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>
<style lang="less" scoped></style>
