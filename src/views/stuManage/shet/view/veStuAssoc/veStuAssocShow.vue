<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="社团活动管理详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团类型 (模型协会、软件协会、旅游协会)" >
                        {{veStuAssocVo.type}}
                </a-form-model-item>
                            <a-form-model-item label="社团名称" >
                        {{veStuAssocVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="社团编号" >
                        {{veStuAssocVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="成立目的" >
                        {{veStuAssocVo.clmd}}
                </a-form-model-item>
                            <a-form-model-item label="主要活动形式" >
                        {{veStuAssocVo.zyhdxs}}
                </a-form-model-item>
                            <a-form-model-item label="创始人" >
                        {{veStuAssocVo.csr}}
                </a-form-model-item>
                            <a-form-model-item label="批准部门" >
                        {{veStuAssocVo.pzbm}}
                </a-form-model-item>
                            <a-form-model-item label="社团性质" >
                        {{veStuAssocVo.stxz}}
                </a-form-model-item>
                            <a-form-model-item label="人数" >
                        {{veStuAssocVo.rs}}
                </a-form-model-item>
                            <a-form-model-item label="当前负责人ID" >
                        {{veStuAssocVo.dqfzr}}
                </a-form-model-item>
                            <a-form-model-item label="" >
                        {{veStuAssocVo.dqfzrName}}
                </a-form-model-item>
                            <a-form-model-item label="负责人电话" >
                        {{veStuAssocVo.fzrPhone}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocApi from "@/views/stuManage/shet/api/veStuAssocApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocVo =Object.assign({}, row)
  //    veStuAssocApi.get(row.id).then((res) => {
    //      this.veStuAssocVo = res.result
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