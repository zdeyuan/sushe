<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="心理健康知识详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthKnowledgeDataForm" labelAlign="right">
        <a-form-model-item label="类型Id">
          {{ hqStuHealthKnowledgeVo.typeId }}
        </a-form-model-item>
        <a-form-model-item label="标题">
          {{ hqStuHealthKnowledgeVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          {{ hqStuHealthKnowledgeVo.content }}
        </a-form-model-item>
        <a-form-model-item label="">
          {{ hqStuHealthKnowledgeVo.listNum }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ hqStuHealthKnowledgeVo.userId }}
        </a-form-model-item>
        <a-form-model-item label="">
          {{ hqStuHealthKnowledgeVo.userName }}
        </a-form-model-item>
        <a-form-model-item label="状态：0=禁用，1=启用">
          {{ hqStuHealthKnowledgeVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthKnowledgeApi from '../../api/hqStuHealthKnowledgeApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthKnowledgeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuHealthKnowledgeVo = Object.assign({}, row);
      //    hqStuHealthKnowledgeApi.get(row.id).then((res) => {
      //      this.hqStuHealthKnowledgeVo = res.result
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
