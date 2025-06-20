<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团标签详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocLabelDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="名称" >
                        {{veStuAssocLabelVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="创建时间" >
                        {{veStuAssocLabelVo.addTime}}
                </a-form-model-item>
                            <a-form-model-item label="状态  1=启用 0=禁用" >
                        {{veStuAssocLabelVo.status}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocLabelApi from "@/views/stuManage/shet/api/veStuAssocLabelApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocLabelVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocLabelVo =Object.assign({}, row)
  //    veStuAssocLabelApi.get(row.id).then((res) => {
    //      this.veStuAssocLabelVo = res.result
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