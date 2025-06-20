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
            ref="veStuAssocActivityApplyDataForm"
            :rules="veStuAssocActivityApplyRules"
            :model="veStuAssocActivityApplyVo"
            labelAlign="right"
          >
                             <a-form-model-item label="活动id" prop="activityId" required>
                                 <a-input v-model="veStuAssocActivityApplyVo.activityId" :maxLength="0" placeholder="请输入活动id" />
                               </a-form-model-item>
                            <a-form-model-item label="学生id" prop="stuId" required>
                                 <a-input v-model="veStuAssocActivityApplyVo.stuId" :maxLength="0" placeholder="请输入学生id" />
                               </a-form-model-item>
                            <a-form-model-item label="审核状态 0=待审核  1=通过 2=不通过" prop="auditStatus" required>
                                 <a-input v-model="veStuAssocActivityApplyVo.auditStatus" :maxLength="0" placeholder="请输入审核状态 0=待审核  1=通过 2=不通过" />
                               </a-form-model-item>
                            <a-form-model-item label="审核时间" prop="auditTime" required>
								<DatePickByCN  v-model="veStuAssocActivityApplyVo.auditTime"  placeholder="请选择审核时间"/>
                               </a-form-model-item>
                            <a-form-model-item label="申请时间" prop="addTime" required>
								<DatePickByCN  v-model="veStuAssocActivityApplyVo.addTime"  placeholder="请选择申请时间"/>
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityApplyApi from "@/views/stuManage/shet/api/veStuAssocActivityApplyApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityApplyVo: this.resetveStuAssocActivityApplyVo(),
      textMap: {
        update: "编辑-社团活动申请",
        create: "新增-社团活动申请"
      },
      dialogStatus: 'create',
      veStuAssocActivityApplyRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocActivityApplyVo() {
      return {
             activityId:'',// 活动id
                  stuId:'',// 学生id
                  auditStatus:'',// 审核状态 0=待审核  1=通过 2=不通过
                  auditTime:'',// 审核时间
                  addTime:'',// 申请时间
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocActivityApplyVo = this.resetveStuAssocActivityApplyVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityApplyDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocActivityApplyApi.get(row.id).then((res) => {
          this.veStuAssocActivityApplyVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityApplyDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocActivityApplyVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocActivityApplyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocActivityApplyApi.add(subData).then(res => {
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
      this.$refs.veStuAssocActivityApplyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocActivityApplyApi.update(subData).then(() => {
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