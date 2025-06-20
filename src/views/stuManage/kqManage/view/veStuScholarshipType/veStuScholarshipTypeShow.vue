<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="奖学金类型详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuScholarshipTypeDataForm" labelAlign="right">
        <a-form-model-item label="名称">
          {{ veStuScholarshipTypeVo.title }}
        </a-form-model-item>
        <a-form-model-item label="代码，同一终端唯一">
          {{ veStuScholarshipTypeVo.code }}
        </a-form-model-item>
        <a-form-model-item label="状态;1启用2禁用">
          {{ veStuScholarshipTypeVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuScholarshipTypeApi from '../../api/veStuScholarshipTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuScholarshipTypeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuScholarshipTypeVo = Object.assign({}, row);
      //    veStuScholarshipTypeApi.get(row.id).then((res) => {
      //      this.veStuScholarshipTypeVo = res.result
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
