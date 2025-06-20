<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="设备资产报废详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcRetireDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产编号">
              {{ veSbzcZcRetireVo.assetCode }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="资产名称">
              {{ veSbzcZcRetireVo.assetName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="所属部门">
          {{ veSbzcZcRetireVo.deptOwn }}
        </a-form-model-item>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="报废申请人">
              {{ veSbzcZcRetireVo.retireUserId }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="批准人">
              {{ veSbzcZcRetireVo.checkUserId }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="报废日期">
          {{ veSbzcZcRetireVo.retireDate }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcZcRetireVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcRetireApi from '@/views/sbzc/fund/api/veSbzcZcRetireApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcZcRetireVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcRetireVo = Object.assign({}, row);
      //    veSbzcZcRetireApi.get(row.id).then((res) => {
      //      this.veSbzcZcRetireVo = res.result
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
