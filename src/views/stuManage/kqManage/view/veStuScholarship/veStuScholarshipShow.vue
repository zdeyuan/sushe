<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="奖学金信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuScholarshipDataForm" labelAlign="right">
        <a-form-model-item label="奖学金类型">
          {{ veStuScholarshipVo.typeName }}
        </a-form-model-item>
        <a-form-model-item label="获得时间">
          {{ veStuScholarshipVo.actionTime }}
        </a-form-model-item>
        <a-form-model-item label="描述">
          {{ veStuScholarshipVo.content }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuScholarshipApi from '../../api/veStuScholarshipApi';

export default {
  components: {},
  data() {
    const data = {
      veStuScholarshipVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuScholarshipVo = Object.assign({}, row);
      //    veStuScholarshipApi.get(row.id).then((res) => {
      //      this.veStuScholarshipVo = res.result
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
