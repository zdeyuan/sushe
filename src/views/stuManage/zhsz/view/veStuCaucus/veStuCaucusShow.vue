<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="党团活动记录详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCaucusDataForm" labelAlign="right">
        <a-form-model-item label="活动标题">
          {{ veStuCaucusVo.title }}
        </a-form-model-item>
        <a-form-model-item label="开始时间">
          {{ veStuCaucusVo.startTime }}
        </a-form-model-item>
        <a-form-model-item label="结束时间">
          {{ veStuCaucusVo.endTime }}
        </a-form-model-item>
        <a-form-model-item label="级别（市、县区、学校）">
          {{ veStuCaucusVo.grade }}
        </a-form-model-item>
        <a-form-model-item label="组织机构">
          {{ veStuCaucusVo.organization }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCaucusApi from '../../api/veStuCaucusApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCaucusVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCaucusVo = Object.assign({}, row);
      //    veStuCaucusApi.get(row.id).then((res) => {
      //      this.veStuCaucusVo = res.result
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
