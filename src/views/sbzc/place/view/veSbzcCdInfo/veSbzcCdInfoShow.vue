<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="场地详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veSbzcCdInfoDataForm" labelAlign="right">
        <a-form-model-item label="场地编号">
          {{ veSbzcCdInfoVo.code }}
        </a-form-model-item>
        <a-form-model-item label="名称">
          {{ veSbzcCdInfoVo.name }}
        </a-form-model-item>
        <a-form-model-item label="场地类型">
          {{ veSbzcCdInfoVo.cateId }}
        </a-form-model-item>
        <a-form-model-item label="所属校区">
          {{ veSbzcCdInfoVo.xqh }}
        </a-form-model-item>
        <a-form-model-item label="占地面积">
          {{ veSbzcCdInfoVo.area }}
        </a-form-model-item>
        <a-form-model-item label="地址">
          {{ veSbzcCdInfoVo.address }}
        </a-form-model-item>
        <a-form-model-item label="备注">
          {{ veSbzcCdInfoVo.remark }}
        </a-form-model-item>
        <a-form-model-item label="负责人">
          {{ veSbzcCdInfoVo.responseUserId }}
        </a-form-model-item>
        <a-form-model-item label="负责人">
          {{ veSbzcCdInfoVo.responseUserName }}
        </a-form-model-item>
        <a-form-model-item label="是否可借用（1可以，0不可以）">
          {{ veSbzcCdInfoVo.isAppliable }}
        </a-form-model-item>
        <a-form-model-item label="删除标识0未删除，1删除">
          {{ veSbzcCdInfoVo.isDelete }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veSbzcCdInfoApi from '@/views/sbzc/place/api/veSbzcCdInfoApi';

export default {
  components: {},
  data() {
    const data = {
      veSbzcCdInfoVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veSbzcCdInfoVo = Object.assign({}, res.result);
      //    veSbzcCdInfoApi.get(row.id).then((res) => {
      //      this.veSbzcCdInfoVo = res.result
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
