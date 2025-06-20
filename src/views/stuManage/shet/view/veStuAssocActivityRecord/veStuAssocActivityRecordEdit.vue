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
            ref="veStuAssocActivityRecordDataForm"
            :rules="veStuAssocActivityRecordRules"
            :model="veStuAssocActivityRecordVo"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" prop="assocId" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.assocId" :maxLength="0" placeholder="请输入社团id" />
                               </a-form-model-item>
                            <a-form-model-item label="活动id" prop="activityId" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.activityId" :maxLength="0" placeholder="请输入活动id" />
                               </a-form-model-item>
                            <a-form-model-item label="活动内容" prop="content" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.content" :maxLength="65535" placeholder="请输入活动内容" />
                               </a-form-model-item>
                            <a-form-model-item label="活动内容文件(视频内容等)" prop="fileId" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.fileId" :maxLength="0" placeholder="请输入活动内容文件(视频内容等)" />
                               </a-form-model-item>
                            <a-form-model-item label="审核状态 0=待审核 1=通过 2=不通过" prop="auditStatus" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.auditStatus" :maxLength="0" placeholder="请输入审核状态 0=待审核 1=通过 2=不通过" />
                               </a-form-model-item>
                            <a-form-model-item label="审核时间" prop="auditTime" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.auditTime" :maxLength="0" placeholder="请输入审核时间" />
                               </a-form-model-item>
                            <a-form-model-item label="添加时间" prop="addTime" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.addTime" :maxLength="0" placeholder="请输入添加时间" />
                               </a-form-model-item>
                            <a-form-model-item label="添加的学生的id" prop="addStuId" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.addStuId" :maxLength="32" placeholder="请输入添加的学生的id" />
                               </a-form-model-item>
                            <a-form-model-item label="添加的学生的id" prop="addStuName" required>
                                 <a-input v-model="veStuAssocActivityRecordVo.addStuName" :maxLength="32" placeholder="请输入添加的学生的id" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocActivityRecordApi from "@/views/stuManage/shet/api/veStuAssocActivityRecordApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocActivityRecordVo: this.resetveStuAssocActivityRecordVo(),
      textMap: {
        update: "编辑-社团活动记录",
        create: "新增-社团活动记录"
      },
      dialogStatus: 'create',
      veStuAssocActivityRecordRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocActivityRecordVo() {
      return {
             assocId:'',// 社团id
                  activityId:'',// 活动id
                  content:'',// 活动内容
                  fileId:'',// 活动内容文件(视频内容等)
                  auditStatus:'',// 审核状态 0=待审核 1=通过 2=不通过
                  auditTime:'',// 审核时间
                  addTime:'',// 添加时间
                  addStuId:'',// 添加的学生的id
                  addStuName:'',// 添加的学生的id
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocActivityRecordVo = this.resetveStuAssocActivityRecordVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityRecordDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocActivityRecordApi.get(row.id).then((res) => {
          this.veStuAssocActivityRecordVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityRecordDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocActivityRecordVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocActivityRecordDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocActivityRecordApi.add(subData).then(res => {
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
      this.$refs.veStuAssocActivityRecordDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocActivityRecordApi.update(subData).then(() => {
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