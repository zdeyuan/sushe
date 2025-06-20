<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 17:42:55
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-21 21:02:30
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="文体获奖详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuLiteraryAwardDataForm" labelAlign="right">
        <a-form-model-item label="获奖项目">
          {{ veStuLiteraryAwardVo.itemName }}
        </a-form-model-item>
        <a-form-model-item label="项目类型">
          <edu-dict-text code="jllb2" :value="veStuLiteraryAwardVo.itemType"></edu-dict-text>
        </a-form-model-item>

        <a-form-model-item label="获奖等级">
          <edu-dict-text code="awardLevel" :value="veStuLiteraryAwardVo.grade"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="获奖者">
          {{ veStuLiteraryAwardVo.winnerName }}
        </a-form-model-item>
        <a-form-model-item label="审核人">
          {{ veStuLiteraryAwardVo.auditUserName }}
        </a-form-model-item>
        <a-form-model-item label="审核时间">
          {{ veStuLiteraryAwardVo.auditTime }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veStuLiteraryAwardVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuLiteraryAwardApi from '../../../api/veStuLiteraryAwardApi';

export default {
  components: {},
  data() {
    const data = {
      veStuLiteraryAwardVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuLiteraryAwardVo = Object.assign({}, row);
      //    veStuLiteraryAwardApi.get(row.id).then((res) => {
      //      this.veStuLiteraryAwardVo = res.result
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
