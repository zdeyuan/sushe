<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团缴费详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocFundsDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团缴费标准id" >
                        {{veStuAssocFundsVo.standardId}}
                </a-form-model-item>
                            <a-form-model-item label="社团id" >
                        {{veStuAssocFundsVo.assocId}}
                </a-form-model-item>
                            <a-form-model-item label="学生id" >
                        {{veStuAssocFundsVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="缴费时间" >
                        {{veStuAssocFundsVo.addTime}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocFundsApi from "@/views/stuManage/shet/api/veStuAssocFundsApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocFundsVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocFundsVo =Object.assign({}, row)
  //    veStuAssocFundsApi.get(row.id).then((res) => {
    //      this.veStuAssocFundsVo = res.result
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