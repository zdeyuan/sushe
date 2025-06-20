<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22 22:03:31
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-03 22:39:13
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="评测结果明细表详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuIdxStuScoreDataForm" labelAlign="right">
        <a-form-model-item label="指标分值">
          {{ veStuIdxStuScoreVo.score }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuIdxStuScoreApi from '@/views/stuManage/jis/api/veStuIdxStuScoreApi';

export default {
  components: {},
  data() {
    const data = {
      veStuIdxStuScoreVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuIdxStuScoreVo = Object.assign({}, row);
      //    veStuIdxStuScoreApi.get(row.id).then((res) => {
      //      this.veStuIdxStuScoreVo = res.result
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
