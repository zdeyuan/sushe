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
            ref="veStuGraduationYyxsDataForm"
            :rules="veStuGraduationYyxsRules"
            :model="veStuGraduationYyxsVo"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" prop="stuId" required>
                                 <a-input v-model="veStuGraduationYyxsVo.stuId" :maxLength="0" placeholder="请输入学生Id" />
                               </a-form-model-item>
                            <a-form-model-item label="备注" prop="remark" required>
                                 <a-input v-model="veStuGraduationYyxsVo.remark" :maxLength="500" placeholder="请输入备注" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationYyxsApi from "@/views/stuManage/biye/api/veStuGraduationYyxsApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationYyxsVo: this.resetveStuGraduationYyxsVo(),
      textMap: {
        update: "编辑-优秀毕业生信息",
        create: "新增-优秀毕业生信息"
      },
      dialogStatus: 'create',
      veStuGraduationYyxsRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuGraduationYyxsVo() {
      return {
             stuId:'',// 学生Id
                  remark:'',// 备注
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuGraduationYyxsVo = this.resetveStuGraduationYyxsVo();
      this.$nextTick(() => {
        this.$refs.veStuGraduationYyxsDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuGraduationYyxsApi.get(row.id).then((res) => {
          this.veStuGraduationYyxsVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuGraduationYyxsDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuGraduationYyxsVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuGraduationYyxsDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuGraduationYyxsApi.add(subData).then(res => {
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
      this.$refs.veStuGraduationYyxsDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuGraduationYyxsApi.update(subData).then(() => {
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