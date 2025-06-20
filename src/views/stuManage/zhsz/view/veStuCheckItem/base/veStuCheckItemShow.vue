<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="项目详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCheckItemDataForm" labelAlign="right">
        <a-form-model-item label="项目名称">
          {{ veStuCheckItemVo.name }}
        </a-form-model-item>
        <a-form-model-item label="开始时间">
          {{ veStuCheckItemVo.startTime }}
        </a-form-model-item>
        <a-form-model-item label="结束时间">
          {{ veStuCheckItemVo.endTime }}
        </a-form-model-item>
        <a-form-model-item label="状态（0：禁用，1：启用）">
          {{ veStuCheckItemVo.status }}
        </a-form-model-item>
        <a-form-model-item label="项目负责人">
          {{ veStuCheckItemVo.userId }}
        </a-form-model-item>
        <a-form-model-item label="">
          {{ veStuCheckItemVo.userName }}
        </a-form-model-item>
        <a-form-model-item label="是否删除（0：否，1：是）">
          {{ veStuCheckItemVo.isDelete }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCheckItemApi from '../../../api/veStuCheckItemApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCheckItemVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCheckItemVo = Object.assign({}, row);
      //    veStuCheckItemApi.get(row.id).then((res) => {
      //      this.veStuCheckItemVo = res.result
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
