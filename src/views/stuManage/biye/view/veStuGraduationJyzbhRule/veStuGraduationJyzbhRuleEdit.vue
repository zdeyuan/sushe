<template>
  <div class="edit_form">
        <!-- 编辑页
               <a-row>
              <a-col :span="12"> </a-col>
              <a-col :span="12"> </a-col>
            </a-row>-->
        <edu-form
          :title="textMap[dialogStatus]"
          @ok="dialogStatus==='create'?createData():updateData()"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuGraduationJyzbhRuleDataForm"
            :rules="veStuGraduationJyzbhRuleRules"
            :model="veStuGraduationJyzbhRuleVo"
            labelAlign="right"
          >
                             <a-form-model-item label="规则名称" prop="name" required>
                                 <a-input v-model="veStuGraduationJyzbhRuleVo.name" :maxLength="20" placeholder="请输入规则名称" />
                               </a-form-model-item>
                            <a-form-model-item label="规则编码：year=年份（默认4位），zy=专业（默认按学生所属专业代码），bj=班级（默认按学生所属班级代码），number=流水号（默认4位）" prop="code" required>
                                 <a-input v-model="veStuGraduationJyzbhRuleVo.code" :maxLength="11" placeholder="请输入规则编码：year=年份（默认4位），zy=专业（默认按学生所属专业代码），bj=班级（默认按学生所属班级代码），number=流水号（默认4位）" />
                               </a-form-model-item>
                            <a-form-model-item label="位数" prop="digit" required>
                                 <a-input v-model="veStuGraduationJyzbhRuleVo.digit" :maxLength="0" placeholder="请输入位数" />
                               </a-form-model-item>
                            <a-form-model-item label="规则编码序号从小到大" prop="listSort" required>
                                 <a-input v-model="veStuGraduationJyzbhRuleVo.listSort" :maxLength="0" placeholder="请输入规则编码序号从小到大" />
                               </a-form-model-item>
                            <a-form-model-item label="是否启用1是0否" prop="status" required>
                                 <a-input v-model="veStuGraduationJyzbhRuleVo.status" :maxLength="0" placeholder="请输入是否启用1是0否" />
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
      veStuGraduationJyzbhRuleVo: this.resetveStuGraduationJyzbhRuleVo(),
      textMap: {
        update: "编辑-结业证生成规则表",
        create: "新增-结业证生成规则表"
      },
      dialogStatus: 'create',
      veStuGraduationJyzbhRuleRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuGraduationJyzbhRuleVo() {
      return {
             name:'',// 规则名称
                  code:'',// 规则编码：year=年份（默认4位），zy=专业（默认按学生所属专业代码），bj=班级（默认按学生所属班级代码），number=流水号（默认4位）
                  digit:'',// 位数
                  listSort:'',// 规则编码序号从小到大
                  status:'',// 是否启用1是0否
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuGraduationJyzbhRuleVo = this.resetveStuGraduationJyzbhRuleVo();
      this.$nextTick(() => {
        this.$refs.veStuGraduationJyzbhRuleDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuGraduationJyzbhRuleApi.get(row.id).then((res) => {
          this.veStuGraduationJyzbhRuleVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuGraduationJyzbhRuleDataForm.clearValidate();
      });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate){
       const tempData = Object.assign({}, this.veStuGraduationJyzbhRuleVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuGraduationJyzbhRuleDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuGraduationJyzbhRuleApi.add(subData).then(res => {
              this.$notification.success({
              message: "数据新增成功",
              description: '新增了一条数据'});
              this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veStuGraduationJyzbhRuleDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuGraduationJyzbhRuleApi.update(subData).then(() => {
              this.$notification.success({
              message: "数据修改成功",
              description: "修改了一条数据"});
             this.$emit('onOk');
          });
        }
      });
    },
  }
};
</script>
<style lang="less" scoped>

</style>