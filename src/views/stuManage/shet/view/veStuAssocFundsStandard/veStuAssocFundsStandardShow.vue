<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团缴费标准详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocFundsStandardDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="学期id" >
                        {{veStuAssocFundsStandardVo.semesterId}}
                </a-form-model-item>
                            <a-form-model-item label="缴费名称" >
                        {{veStuAssocFundsStandardVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="应缴费金额" >
                        {{veStuAssocFundsStandardVo.money}}
                </a-form-model-item>
                            <a-form-model-item label="创建时间" >
                        {{veStuAssocFundsStandardVo.addTime}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocFundsStandardApi from "@/views/stuManage/shet/api/veStuAssocFundsStandardApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocFundsStandardVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocFundsStandardVo =Object.assign({}, row)
  //    veStuAssocFundsStandardApi.get(row.id).then((res) => {
    //      this.veStuAssocFundsStandardVo = res.result
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