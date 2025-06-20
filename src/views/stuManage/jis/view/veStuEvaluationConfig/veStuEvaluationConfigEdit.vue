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
            ref="veStuEvaluationConfigDataForm"
            :rules="veStuEvaluationConfigRules"
            :model="veStuEvaluationConfigVo"
            labelAlign="right"
          >
                             <a-form-model-item label="配置项名称" prop="name" required>
                                 <a-input v-model="veStuEvaluationConfigVo.name" :maxLength="200" placeholder="请输入配置项名称" />
                               </a-form-model-item>
                            <a-form-model-item label="配置项代码" prop="code" required>
                                 <a-input v-model="veStuEvaluationConfigVo.code" :maxLength="30" placeholder="请输入配置项代码" />
                               </a-form-model-item>
                            <a-form-model-item label="排序" prop="listSort" required>
                                 <a-input v-model="veStuEvaluationConfigVo.listSort" :maxLength="0" placeholder="请输入排序" />
                               </a-form-model-item>
                            <a-form-model-item label="状态（0：禁用，1：启用）" prop="status" required>
                                 <a-input v-model="veStuEvaluationConfigVo.status" :maxLength="0" placeholder="请输入状态（0：禁用，1：启用）" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuEvaluationConfigApi from "@/views/stuManage/jis/api/veStuEvaluationConfigApi";

export default {
  components: { },
  data() {
    const data = {
      veStuEvaluationConfigVo: this.resetveStuEvaluationConfigVo(),
      textMap: {
        update: "编辑-学生评价配置表",
        create: "新增-学生评价配置表"
      },
      dialogStatus: 'create',
      veStuEvaluationConfigRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuEvaluationConfigVo() {
      return {
             name:'',// 配置项名称
                  code:'',// 配置项代码
                  listSort:'',// 排序
                  status:'',// 状态（0：禁用，1：启用）
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuEvaluationConfigVo = this.resetveStuEvaluationConfigVo();
      this.$nextTick(() => {
        this.$refs.veStuEvaluationConfigDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuEvaluationConfigApi.get(row.id).then((res) => {
          this.veStuEvaluationConfigVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuEvaluationConfigDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuEvaluationConfigVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuEvaluationConfigDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuEvaluationConfigApi.add(subData).then(res => {
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
      this.$refs.veStuEvaluationConfigDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuEvaluationConfigApi.update(subData).then(() => {
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