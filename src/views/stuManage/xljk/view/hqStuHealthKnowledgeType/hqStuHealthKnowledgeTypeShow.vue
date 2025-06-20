<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="心理健康知识类型详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthKnowledgeTypeDataForm" labelAlign="right">
        <a-form-model-item label="类型名称">
          {{ hqStuHealthKnowledgeTypeVo.typeName }}
        </a-form-model-item>
        <a-form-model-item label="状态：0=禁用，1=启用">
          {{ hqStuHealthKnowledgeTypeVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthKnowledgeTypeApi from '../../api/hqStuHealthKnowledgeTypeApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthKnowledgeTypeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuHealthKnowledgeTypeVo = Object.assign({}, row);
      //    hqStuHealthKnowledgeTypeApi.get(row.id).then((res) => {
      //      this.hqStuHealthKnowledgeTypeVo = res.result
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
