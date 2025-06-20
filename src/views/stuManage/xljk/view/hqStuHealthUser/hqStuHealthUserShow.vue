<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="心理健康个人记录详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthUserDataForm" labelAlign="right">
        <a-form-model-item label="姓名">
          {{ hqStuHealthUserVo.name }}
        </a-form-model-item>
        <a-form-model-item label="学号">
          {{ hqStuHealthUserVo.code }}
        </a-form-model-item>
        <a-form-model-item label="用户Id">
          {{ hqStuHealthUserVo.userId }}
        </a-form-model-item>
        <a-form-model-item label="标题">
          {{ hqStuHealthUserVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          {{ hqStuHealthUserVo.content }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthUserApi from '../../api/hqStuHealthUserApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthUserVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuHealthUserVo = Object.assign({}, row);
      //    hqStuHealthUserApi.get(row.id).then((res) => {
      //      this.hqStuHealthUserVo = res.result
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
