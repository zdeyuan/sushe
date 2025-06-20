<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 20:56:43
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-05 21:02:40
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="窗口详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqChuangkouDataForm" abelAlign="right">
        <a-form-model-item label="餐厅" prop="ctId">
          {{ veHqChuangkouVo.ctName }}
        </a-form-model-item>
        <a-form-model-item label="窗口名称" prop="name">
          {{ veHqChuangkouVo.name }}
        </a-form-model-item>
        <a-form-model-item label="合作者姓名" prop="hzzName">
          {{ veHqChuangkouVo.hzzName }}
        </a-form-model-item>
        <a-form-model-item label="窗口负责人" prop="fzrId">
          {{ veHqChuangkouVo.fzrName }}
        </a-form-model-item>
        <a-form-model-item label="窗口状态" prop="status">
          <edu-dict-text code="ctStatus" :value="veHqChuangkouVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="备注说明" prop="remark">
          {{ veHqChuangkouVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqChuangkouApi from '@/views/logistics/ct/api/veHqChuangkouApi';

export default {
  components: {},
  data() {
    const data = {
      veHqChuangkouVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veHqChuangkouVo = Object.assign({}, row);
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
