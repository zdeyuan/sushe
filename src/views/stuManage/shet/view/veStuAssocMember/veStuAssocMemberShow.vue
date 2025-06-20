<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团成员详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocMemberDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" >
                        {{veStuAssocMemberVo.assocId}}
                </a-form-model-item>
                            <a-form-model-item label="学生id" >
                        {{veStuAssocMemberVo.stuId}}
                </a-form-model-item>
                            <a-form-model-item label="成员角色id" >
                        {{veStuAssocMemberVo.roleId}}
                </a-form-model-item>
                            <a-form-model-item label="标签" >
                        {{veStuAssocMemberVo.label}}
                </a-form-model-item>
                            <a-form-model-item label="入团审核状态  0=待审核  1=通过  2=不通过" >
                        {{veStuAssocMemberVo.auditStatus}}
                </a-form-model-item>
                            <a-form-model-item label="入团时间" >
                        {{veStuAssocMemberVo.addTime}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocMemberApi from "@/views/stuManage/shet/api/veStuAssocMemberApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocMemberVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocMemberVo =Object.assign({}, row)
  //    veStuAssocMemberApi.get(row.id).then((res) => {
    //      this.veStuAssocMemberVo = res.result
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