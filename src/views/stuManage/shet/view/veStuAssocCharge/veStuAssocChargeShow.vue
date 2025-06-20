<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团负责人详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocChargeDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" >
                        {{veStuAssocChargeVo.assocId}}
                </a-form-model-item>
                            <a-form-model-item label="社团负责人id" >
                        {{veStuAssocChargeVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="负责人用户姓名" >
                        {{veStuAssocChargeVo.stuName}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocChargeApi from "@/views/stuManage/shet/api/veStuAssocChargeApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocChargeVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocChargeVo =Object.assign({}, row)
  //    veStuAssocChargeApi.get(row.id).then((res) => {
    //      this.veStuAssocChargeVo = res.result
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
<style lang="less" scoped>

</style>