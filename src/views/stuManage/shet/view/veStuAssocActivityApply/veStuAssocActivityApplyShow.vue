<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团活动申请详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocActivityApplyDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="活动id" >
                        {{veStuAssocActivityApplyVo.activityId}}
                </a-form-model-item>
                            <a-form-model-item label="学生id" >
                        {{veStuAssocActivityApplyVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="审核状态 0=待审核  1=通过 2=不通过" >
                        {{veStuAssocActivityApplyVo.auditStatus}}
                </a-form-model-item>
                            <a-form-model-item label="审核时间" >
                        {{veStuAssocActivityApplyVo.auditTime}}
                </a-form-model-item>
                            <a-form-model-item label="申请时间" >
                        {{veStuAssocActivityApplyVo.addTime}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityApplyApi from "@/views/stuManage/shet/api/veStuAssocActivityApplyApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityApplyVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocActivityApplyVo =Object.assign({}, row)
  //    veStuAssocActivityApplyApi.get(row.id).then((res) => {
    //      this.veStuAssocActivityApplyVo = res.result
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