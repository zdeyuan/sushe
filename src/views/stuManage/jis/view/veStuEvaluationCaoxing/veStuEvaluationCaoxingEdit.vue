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
            ref="veStuEvaluationCaoxingDataForm"
            :rules="veStuEvaluationCaoxingRules"
            :model="veStuEvaluationCaoxingVo"
            labelAlign="right"
          >
                             <a-form-model-item label="" prop="semesterId" required>
                                 <a-input v-model="veStuEvaluationCaoxingVo.semesterId" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="stuId" required>
                                 <a-input v-model="veStuEvaluationCaoxingVo.stuId" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="score" required>
                                 <a-input v-model="veStuEvaluationCaoxingVo.score" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuEvaluationCaoxingApi from "@/views/stuManage/jis/api/veStuEvaluationCaoxingApi";

export default {
  components: { },
  data() {
    const data = {
      veStuEvaluationCaoxingVo: this.resetveStuEvaluationCaoxingVo(),
      textMap: {
        update: "编辑-操行评分",
        create: "新增-操行评分"
      },
      dialogStatus: 'create',
      veStuEvaluationCaoxingRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuEvaluationCaoxingVo() {
      return {
             semesterId:'',// 
                  stuId:'',// 
                  score:'',// 
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuEvaluationCaoxingVo = this.resetveStuEvaluationCaoxingVo();
      this.$nextTick(() => {
        this.$refs.veStuEvaluationCaoxingDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuEvaluationCaoxingApi.get(row.id).then((res) => {
          this.veStuEvaluationCaoxingVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuEvaluationCaoxingDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuEvaluationCaoxingVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuEvaluationCaoxingDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuEvaluationCaoxingApi.add(subData).then(res => {
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
      this.$refs.veStuEvaluationCaoxingDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuEvaluationCaoxingApi.update(subData).then(() => {
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