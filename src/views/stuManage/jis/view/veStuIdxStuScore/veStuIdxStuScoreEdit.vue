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
            ref="veStuIdxStuScoreDataForm"
            :rules="veStuIdxStuScoreRules"
            :model="veStuIdxStuScoreVo"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" prop="stuId" required>
                                 <a-input v-model="veStuIdxStuScoreVo.stuId" :maxLength="0" placeholder="请输入学生Id" />
                               </a-form-model-item>
                            <a-form-model-item label="周期Id" prop="periodId" required>
                                 <a-input v-model="veStuIdxStuScoreVo.periodId" :maxLength="0" placeholder="请输入周期Id" />
                               </a-form-model-item>
                            <a-form-model-item label="指标Id" prop="idxId" required>
                                 <a-input v-model="veStuIdxStuScoreVo.idxId" :maxLength="0" placeholder="请输入指标Id" />
                               </a-form-model-item>
                            <a-form-model-item label="指标分值" prop="score" required>
                                 <a-input v-model="veStuIdxStuScoreVo.score" :maxLength="0" placeholder="请输入指标分值" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuIdxStuScoreApi from "@/views/stuManage/jis/api/veStuIdxStuScoreApi";

export default {
  components: { },
  data() {
    const data = {
      veStuIdxStuScoreVo: this.resetveStuIdxStuScoreVo(),
      textMap: {
        update: "编辑-评测结果明细表",
        create: "新增-评测结果明细表"
      },
      dialogStatus: 'create',
      veStuIdxStuScoreRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuIdxStuScoreVo() {
      return {
             stuId:'',// 学生Id
                  periodId:'',// 周期Id
                  idxId:'',// 指标Id
                  score:'',// 指标分值
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuIdxStuScoreVo = this.resetveStuIdxStuScoreVo();
      this.$nextTick(() => {
        this.$refs.veStuIdxStuScoreDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuIdxStuScoreApi.get(row.id).then((res) => {
          this.veStuIdxStuScoreVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuIdxStuScoreDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuIdxStuScoreVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuIdxStuScoreDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuIdxStuScoreApi.add(subData).then(res => {
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
      this.$refs.veStuIdxStuScoreDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuIdxStuScoreApi.update(subData).then(() => {
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