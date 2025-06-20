<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="班主任表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veBaseBanjiBzrDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="班级id" >
                        {{veBaseBanjiBzrVo.bjid}}
                </a-form-model-item>
                            <a-form-model-item label="班主任userId" >
                        {{veBaseBanjiBzrVo.bzruserid}}
                </a-form-model-item>
                            <a-form-model-item label="班主任姓名" >
                        {{veBaseBanjiBzrVo.bzrusername}}
                </a-form-model-item>
                            <a-form-model-item label="设置时间" >
                        {{veBaseBanjiBzrVo.createtime}}
                </a-form-model-item>
                            <a-form-model-item label="终端ID" >
                        {{veBaseBanjiBzrVo.terminalid}}
                </a-form-model-item>
                            <a-form-model-item label="是否当前" >
                        {{veBaseBanjiBzrVo.iscurrent}}
                </a-form-model-item>
                            <a-form-model-item label="创建用户" >
                        {{veBaseBanjiBzrVo.createuserid}}
                </a-form-model-item>
                            <a-form-model-item label="" >
                        {{veBaseBanjiBzrVo.startdate}}
                </a-form-model-item>
                            <a-form-model-item label="" >
                        {{veBaseBanjiBzrVo.enddate}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veBaseBanjiBzrApi from "@/views/stuManage/jis/api/veBaseBanjiBzrApi";

export default {
  components: { },
  data() {
    const data = {
      veBaseBanjiBzrVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veBaseBanjiBzrVo =Object.assign({}, row)
  //    veBaseBanjiBzrApi.get(row.id).then((res) => {
    //      this.veBaseBanjiBzrVo = res.result
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