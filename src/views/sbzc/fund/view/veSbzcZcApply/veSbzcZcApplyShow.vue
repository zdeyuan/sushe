<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="设备资产借领详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcZcApplyDataForm" labelAlign="right">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="资产编号">
              {{ veSbzcZcApplyVo.assetCode }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="资产名称">
              {{ veSbzcZcApplyVo.assetName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="所属部门">
              {{ veSbzcZcApplyVo.deptOwn }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="借领性质">
              <edu-dict-text code="applyFor" :value="veSbzcZcApplyVo.applyFor"></edu-dict-text>
              <!--                            {{veSbzcZcApplyVo.applyFor}}-->
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="借领人">
              {{ veSbzcZcApplyVo.applyUserName }}
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="批准人">
              {{ veSbzcZcApplyVo.checkUserName }}
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="借领时间">
          {{ veSbzcZcApplyVo.applyTime }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcZcApplyVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcZcApplyApi from '@/views/sbzc/fund/api/veSbzcZcApplyApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcZcApplyVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcZcApplyVo = Object.assign({}, row);
      //    veSbzcZcApplyApi.get(row.id).then((res) => {
      //      this.veSbzcZcApplyVo = res.result
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
