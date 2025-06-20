<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="指标基本表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuIdxDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="分值设置类型 0：无分值或一级默认分值，1：加分，2：减分,3：加减分值" >
                        {{veStuIdxVo.type}}
                </a-form-model-item>
                            <a-form-model-item label="指标代码" >
                        {{veStuIdxVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="指标名称" >
                        {{veStuIdxVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="父级id" >
                        {{veStuIdxVo.pid}}
                </a-form-model-item>
                            <a-form-model-item label="规则说明" >
                        {{veStuIdxVo.description}}
                </a-form-model-item>
                            <a-form-model-item label="状态（0：启用，1:禁用）" >
                        {{veStuIdxVo.status}}
                </a-form-model-item>
                            <a-form-model-item label="路径" >
                        {{veStuIdxVo.path}}
                </a-form-model-item>
                            <a-form-model-item label="排序" >
                        {{veStuIdxVo.listSort}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuIdxApi from "@/views/stuManage/jis/api/veStuIdxApi";

export default {
  components: { },
  data() {
    const data = {
      veStuIdxVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuIdxVo =Object.assign({}, row)
  //    veStuIdxApi.get(row.id).then((res) => {
    //      this.veStuIdxVo = res.result
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