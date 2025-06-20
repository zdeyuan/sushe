<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团活动类型详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocActivityTypeDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="活动类型名称" >
                        {{veStuAssocActivityTypeVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="状态 1=启用  0=禁用" >
                        {{veStuAssocActivityTypeVo.status}}
                </a-form-model-item>
                            <a-form-model-item label="添加时间" >
                        {{veStuAssocActivityTypeVo.addTime}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityTypeApi from "@/views/stuManage/shet/api/veStuAssocActivityTypeApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityTypeVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocActivityTypeVo =Object.assign({}, row)
  //    veStuAssocActivityTypeApi.get(row.id).then((res) => {
    //      this.veStuAssocActivityTypeVo = res.result
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