<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="结业证生成规则表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationJyzbhRuleDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="规则名称" >
                        {{veStuGraduationJyzbhRuleVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="规则编码：year=年份（默认4位），zy=专业（默认按学生所属专业代码），bj=班级（默认按学生所属班级代码），number=流水号（默认4位）" >
                        {{veStuGraduationJyzbhRuleVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="位数" >
                        {{veStuGraduationJyzbhRuleVo.digit}}
                </a-form-model-item>
                            <a-form-model-item label="规则编码序号从小到大" >
                        {{veStuGraduationJyzbhRuleVo.listSort}}
                </a-form-model-item>
                            <a-form-model-item label="是否启用1是0否" >
                        {{veStuGraduationJyzbhRuleVo.status}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationJyzbhRuleApi from "@/views/stuManage/biye/api/veStuGraduationJyzbhRuleApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationJyzbhRuleVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationJyzbhRuleVo =Object.assign({}, row)
  //    veStuGraduationJyzbhRuleApi.get(row.id).then((res) => {
    //      this.veStuGraduationJyzbhRuleVo = res.result
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