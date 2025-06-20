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
            ref="veStuAssocMemberDataForm"
            :rules="veStuAssocMemberRules"
            :model="veStuAssocMemberVo"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" prop="assocId" required>
                                 <a-input v-model="veStuAssocMemberVo.assocId" :maxLength="0" placeholder="请输入社团id" />
                               </a-form-model-item>
                            <a-form-model-item label="学生id" prop="stuId" required>
                                 <a-input v-model="veStuAssocMemberVo.stuId" :maxLength="0" placeholder="请输入学生id" />
                               </a-form-model-item>
                            <a-form-model-item label="成员角色id" prop="roleId" required>
                                 <a-input v-model="veStuAssocMemberVo.roleId" :maxLength="0" placeholder="请输入成员角色id" />
                               </a-form-model-item>
                            <a-form-model-item label="标签" prop="label" required>
                                 <a-input v-model="veStuAssocMemberVo.label" :maxLength="50" placeholder="请输入标签" />
                               </a-form-model-item>
                            <a-form-model-item label="入团审核状态  0=待审核  1=通过  2=不通过" prop="auditStatus" required>
                                 <a-input v-model="veStuAssocMemberVo.auditStatus" :maxLength="0" placeholder="请输入入团审核状态  0=待审核  1=通过  2=不通过" />
                               </a-form-model-item>
                            <a-form-model-item label="入团时间" prop="addTime" required>
								<DatePickByCN
								      v-model="veStuAssocMemberVo.addTime"
								      placeholder="请选择入团时间"
								    />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocMemberApi from "@/views/stuManage/shet/api/veStuAssocMemberApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocMemberVo: this.resetveStuAssocMemberVo(),
      textMap: {
        update: "编辑-社团成员",
        create: "新增-社团成员"
      },
      dialogStatus: 'create',
      veStuAssocMemberRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocMemberVo() {
      return {
             assocId:'',// 社团id
                  stuId:'',// 学生id
                  roleId:'',// 成员角色id
                  label:'',// 标签
                  auditStatus:'',// 入团审核状态  0=待审核  1=通过  2=不通过
                  addTime:'',// 入团时间
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocMemberVo = this.resetveStuAssocMemberVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocMemberDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocMemberApi.get(row.id).then((res) => {
          this.veStuAssocMemberVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocMemberDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocMemberVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocMemberDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocMemberApi.add(subData).then(res => {
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
      this.$refs.veStuAssocMemberDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocMemberApi.update(subData).then(() => {
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