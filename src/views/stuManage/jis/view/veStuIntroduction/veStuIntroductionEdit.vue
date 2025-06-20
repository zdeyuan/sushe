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
            ref="veStuIntroductionDataForm"
            :rules="veStuIntroductionRules"
            :model="veStuIntroductionVo"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" prop="stuId" required>
                                 <a-input v-model="veStuIntroductionVo.stuId" :maxLength="0" placeholder="请输入学生Id" />
                               </a-form-model-item>
                            <a-form-model-item label="自我介绍" prop="introduction" required>
                                 <a-input v-model="veStuIntroductionVo.introduction" :maxLength="65535" placeholder="请输入自我介绍" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuIntroductionApi from "@/views/stuManage/jis/api/veStuIntroductionApi";

export default {
  components: { },
  data() {
    const data = {
      veStuIntroductionVo: this.resetveStuIntroductionVo(),
      textMap: {
        update: "编辑-学生评价表",
        create: "新增-学生评价表"
      },
      dialogStatus: 'create',
      veStuIntroductionRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuIntroductionVo() {
      return {
             stuId:'',// 学生Id
                  introduction:'',// 自我介绍
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuIntroductionVo = this.resetveStuIntroductionVo();
      this.$nextTick(() => {
        this.$refs.veStuIntroductionDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuIntroductionApi.get(row.id).then((res) => {
          this.veStuIntroductionVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuIntroductionDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuIntroductionVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuIntroductionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuIntroductionApi.add(subData).then(res => {
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
      this.$refs.veStuIntroductionDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuIntroductionApi.update(subData).then(() => {
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