<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          title="毕业证编号生成规则表详情"
          :isShowBtnSure="false"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationByzbhRuleDataForm"
            labelAlign="right"
          >
                             <a-form-model-item label="规则名称" >
                        {{veStuGraduationByzbhRuleVo.name}}
                </a-form-model-item>
                            <a-form-model-item label="规则编码：year=年份（默认4位），zy=专业（默认按学生所属专业代码），bj=班级（默认按学生所属班级代码），number=流水号（默认4位），orgCode=固定机构编码" >
                        {{veStuGraduationByzbhRuleVo.code}}
                </a-form-model-item>
                            <a-form-model-item label="规则值根据code区分：year, number 表示数字位数, orgCode表示固定机构编码值" >
                        {{veStuGraduationByzbhRuleVo.value}}
                </a-form-model-item>
                            <a-form-model-item label="规则编码序号从小到大" >
                        {{veStuGraduationByzbhRuleVo.listSort}}
                </a-form-model-item>
                            <a-form-model-item label="是否启用1是0否" >
                        {{veStuGraduationByzbhRuleVo.status}}
                </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationByzbhRuleApi from "@/views/stuManage/biye/api/veStuGraduationByzbhRuleApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationByzbhRuleVo: {},
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuGraduationByzbhRuleVo =Object.assign({}, row)
  //    veStuGraduationByzbhRuleApi.get(row.id).then((res) => {
    //      this.veStuGraduationByzbhRuleVo = res.result
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