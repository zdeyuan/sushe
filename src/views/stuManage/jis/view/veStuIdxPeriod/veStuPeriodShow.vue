<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="评测周期设置表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuPeriodDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="1=>学期, 2=>学年" >
                        {{veStuPeriodVo.type}}
                </a-form-model-item>
                            <a-form-model-item label="学期ID或学年" >
                        {{veStuPeriodVo.value}}
                </a-form-model-item>
                            <a-form-model-item label="是否当前周期，0：不是，1：是" >
                        {{veStuPeriodVo.current}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuPeriodApi from "@/views/stuManage/jis/api/veStuPeriodApi";

export default {
  components: { },
  data() {
    const data = {
      veStuPeriodVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuPeriodVo =Object.assign({}, row)
  //    veStuPeriodApi.get(row.id).then((res) => {
    //      this.veStuPeriodVo = res.result
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