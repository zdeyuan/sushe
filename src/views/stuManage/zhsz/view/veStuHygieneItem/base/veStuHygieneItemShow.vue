<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="项目详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneItemDataForm" labelAlign="right">
        <a-form-model-item label="项目名称">
          {{ veStuHygieneItemVo.name }}
        </a-form-model-item>
        <a-form-model-item label="开始时间">
          {{ veStuHygieneItemVo.startTime }}
        </a-form-model-item>
        <a-form-model-item label="结束时间">
          {{ veStuHygieneItemVo.endTime }}
        </a-form-model-item>
        <a-form-model-item label="状态（0：禁用，1：启用）">
          {{ veStuHygieneItemVo.status }}
        </a-form-model-item>
        <a-form-model-item label="项目负责人">
          {{ veStuHygieneItemVo.userId }}
        </a-form-model-item>
        <a-form-model-item label="">
          {{ veStuHygieneItemVo.userName }}
        </a-form-model-item>
        <a-form-model-item label="是否删除（0：否，1：是）">
          {{ veStuHygieneItemVo.isDelete }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneItemApi from '../../../api/veStuHygieneItemApi';

export default {
  components: {},
  data() {
    const data = {
      veStuHygieneItemVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuHygieneItemVo = Object.assign({}, row);
      //    veStuHygieneItemApi.get(row.id).then((res) => {
      //      this.veStuHygieneItemVo = res.result
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
