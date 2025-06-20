<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="学生社团信息详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuAssocInfoDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="社团logo" >
                        {{veStuAssocInfoVo.logo}}
                </a-form-model-item>
                            <a-form-model-item label="社团名称" >
                        {{veStuAssocInfoVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="社团介绍" >
                        {{veStuAssocInfoVo.intro}}
                </a-form-model-item>
                            <a-form-model-item label="社团状态 1=启用 0=禁用" >
                        {{veStuAssocInfoVo.status}}
                </a-form-model-item>
                            <a-form-model-item label="创建时间" >
                        {{veStuAssocInfoVo.addTime}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocInfoApi from "@/views/stuManage/shet/api/veStuAssocInfoApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocInfoVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuAssocInfoVo =Object.assign({}, row)
  //    veStuAssocInfoApi.get(row.id).then((res) => {
    //      this.veStuAssocInfoVo = res.result
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