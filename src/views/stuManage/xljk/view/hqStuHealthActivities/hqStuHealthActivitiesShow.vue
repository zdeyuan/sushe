<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="心理健康活动详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="hqStuHealthActivitiesDataForm" labelAlign="right">
        <a-form-model-item label="活动标题">
          {{ hqStuHealthActivitiesVo.title }}
        </a-form-model-item>
        <a-form-model-item label="活动情况内容">
          {{ hqStuHealthActivitiesVo.content }}
        </a-form-model-item>
        <a-form-model-item label="排序">
          {{ hqStuHealthActivitiesVo.listNum }}
        </a-form-model-item>
        <a-form-model-item label="学号">
          {{ hqStuHealthActivitiesVo.code }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ hqStuHealthActivitiesVo.userId }}
        </a-form-model-item>
        <a-form-model-item label="状态：0=禁用，1=启用">
          {{ hqStuHealthActivitiesVo.status }}
        </a-form-model-item>
        <a-form-model-item label="姓名">
          {{ hqStuHealthActivitiesVo.name }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import hqStuHealthActivitiesApi from '../../api/hqStuHealthActivitiesApi';

export default {
  components: {},
  data() {
    const data = {
      hqStuHealthActivitiesVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.hqStuHealthActivitiesVo = Object.assign({}, row);
      //    hqStuHealthActivitiesApi.get(row.id).then((res) => {
      //      this.hqStuHealthActivitiesVo = res.result
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
