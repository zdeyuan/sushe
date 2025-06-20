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
            ref="veStuGraduationXuhaoDataForm"
            :rules="veStuGraduationXuhaoRules"
            :model="veStuGraduationXuhaoVo"
            labelAlign="right"
          >
                             <a-form-model-item label="byz =>毕业证编号，jyz=>结业证编号" prop="category" required>
                                 <a-input v-model="veStuGraduationXuhaoVo.category" :maxLength="45" placeholder="请输入byz =>毕业证编号，jyz=>结业证编号" />
                               </a-form-model-item>
                            <a-form-model-item label="结束学业年份" prop="year" required>
                                 <a-input v-model="veStuGraduationXuhaoVo.year" :maxLength="4" placeholder="请输入结束学业年份" />
                               </a-form-model-item>
                            <a-form-model-item label="专业ID" prop="specId" required>
                                 <a-input v-model="veStuGraduationXuhaoVo.specId" :maxLength="0" placeholder="请输入专业ID" />
                               </a-form-model-item>
                            <a-form-model-item label="最大序号" prop="maxNumber" required>
                                 <a-input v-model="veStuGraduationXuhaoVo.maxNumber" :maxLength="0" placeholder="请输入最大序号" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuGraduationXuhaoApi from "@/views/stuManage/biye/api/veStuGraduationXuhaoApi";

export default {
  components: { },
  data() {
    const data = {
      veStuGraduationXuhaoVo: this.resetveStuGraduationXuhaoVo(),
      textMap: {
        update: "编辑-毕业证结业证流水号表",
        create: "新增-毕业证结业证流水号表"
      },
      dialogStatus: 'create',
      veStuGraduationXuhaoRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuGraduationXuhaoVo() {
      return {
             category:'',// byz =>毕业证编号，jyz=>结业证编号
                  year:'',// 结束学业年份
                  specId:'',// 专业ID
                  maxNumber:'',// 最大序号
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuGraduationXuhaoVo = this.resetveStuGraduationXuhaoVo();
      this.$nextTick(() => {
        this.$refs.veStuGraduationXuhaoDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuGraduationXuhaoApi.get(row.id).then((res) => {
          this.veStuGraduationXuhaoVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuGraduationXuhaoDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuGraduationXuhaoVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuGraduationXuhaoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuGraduationXuhaoApi.add(subData).then(res => {
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
      this.$refs.veStuGraduationXuhaoDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuGraduationXuhaoApi.update(subData).then(() => {
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