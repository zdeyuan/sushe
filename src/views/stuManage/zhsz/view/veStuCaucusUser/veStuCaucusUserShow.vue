<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="党团活动学生关联详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCaucusUserDataForm" labelAlign="right">
        <a-form-model-item label="学生Id">
          {{ veStuCaucusUserVo.stuId }}
        </a-form-model-item>
        <a-form-model-item label="活动Id">
          {{ veStuCaucusUserVo.cId }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCaucusUserApi from '../../api/veStuCaucusUserApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCaucusUserVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCaucusUserVo = Object.assign({}, row);
      //    veStuCaucusUserApi.get(row.id).then((res) => {
      //      this.veStuCaucusUserVo = res.result
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
