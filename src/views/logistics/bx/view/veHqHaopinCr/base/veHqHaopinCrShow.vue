<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="低耗品出入库详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqHaopinCrDataForm" labelAlign="right">
        <a-form-model-item label="物品名称">
          {{ veHqHaopinCrVo.hqName }}
        </a-form-model-item>
        <a-form-model-item label="操作数量">
          {{ veHqHaopinCrVo.number }}
        </a-form-model-item>
        <a-form-model-item label="操作时间">
          {{ veHqHaopinCrVo.crTime }}
        </a-form-model-item>
        <a-form-model-item label="操作类型">
          {{ veHqHaopinCrVo.type == 1 ? '入库' : '领用' }}
        </a-form-model-item>
        <a-form-model-item label="领用人" v-if="veHqHaopinCrVo.applyUserName">
          {{ veHqHaopinCrVo.applyUserName }}
        </a-form-model-item>
        <a-form-model-item label="批准人">
          {{ veHqHaopinCrVo.pjUserName }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veHqHaopinCrVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqHaopinCrApi from '@/views/logistics/bx/api/veHqHaopinCrApi';

export default {
  components: {},
  data() {
    const data = {
      veHqHaopinCrVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veHqHaopinCrVo = Object.assign({}, row);
      //    veHqHaopinCrApi.get(row.id).then((res) => {
      //      this.veHqHaopinCrVo = res.result
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
