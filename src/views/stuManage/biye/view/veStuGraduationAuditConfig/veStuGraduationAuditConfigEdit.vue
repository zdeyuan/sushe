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
            ref="veStuGraduationAuditConfigDataForm"
            :rules="veStuGraduationAuditConfigRules"
            :model="veStuGraduationAuditConfigVo"
            labelAlign="right"
          >
                             <a-form-model-item label="是否需要班主任审核" prop="bzr" required>
                                 <a-input v-model="veStuGraduationAuditConfigVo.bzr" :maxLength="0" placeholder="请输入是否需要班主任审核" />
                               </a-form-model-item>
                            <a-form-model-item label="是否需要成绩审核" prop="cj" required>
                                 <a-input v-model="veStuGraduationAuditConfigVo.cj" :maxLength="0" placeholder="请输入是否需要成绩审核" />
                               </a-form-model-item>
                            <a-form-model-item label="是否需要财务审核" prop="cw" required>
                                 <a-input v-model="veStuGraduationAuditConfigVo.cw" :maxLength="0" placeholder="请输入是否需要财务审核" />
                               </a-form-model-item>
                            <a-form-model-item label="是否需要学生处审核" prop="xsc" required>
                                 <a-input v-model="veStuGraduationAuditConfigVo.xsc" :maxLength="0" placeholder="请输入是否需要学生处审核" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationAuditConfigApi from "@/views/stuManage/biye/api/veStuGraduationAuditConfigApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationAuditConfigVo: this.resetveStuGraduationAuditConfigVo(),
      textMap: {
        update: "编辑-毕业审核设置表",
        create: "新增-毕业审核设置表"
      },
      dialogStatus: 'create',
      veStuGraduationAuditConfigRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuGraduationAuditConfigVo() {
      return {
             bzr:'',// 是否需要班主任审核
                  cj:'',// 是否需要成绩审核
                  cw:'',// 是否需要财务审核
                  xsc:'',// 是否需要学生处审核
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuGraduationAuditConfigVo = this.resetveStuGraduationAuditConfigVo();
      this.$nextTick(() => {
        this.$refs.veStuGraduationAuditConfigDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuGraduationAuditConfigApi.get(row.id).then((res) => {
          this.veStuGraduationAuditConfigVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuGraduationAuditConfigDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuGraduationAuditConfigVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuGraduationAuditConfigDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuGraduationAuditConfigApi.add(subData).then(res => {
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
      this.$refs.veStuGraduationAuditConfigDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuGraduationAuditConfigApi.update(subData).then(() => {
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