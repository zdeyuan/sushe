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
            ref="veStuCaucusUserDataForm"
            :rules="veStuCaucusUserRules"
            :model="veStuCaucusUserVo"
            labelAlign="right"
          >
                             <a-form-model-item label="学生Id" prop="stuId" required>
                                 <a-input v-model="veStuCaucusUserVo.stuId" :maxLength="0" placeholder="请输入学生Id" />
                               </a-form-model-item>
                            <a-form-model-item label="活动Id" prop="cId" required>
                                 <a-input v-model="veStuCaucusUserVo.cId" :maxLength="0" placeholder="请输入活动Id" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuCaucusUserApi from "../../api/veStuCaucusUserApi";

export default {
  components: { },
  data() {
    const data = {
      veStuCaucusUserVo: this.resetveStuCaucusUserVo(),
      textMap: {
        update: "编辑-党团活动学生关联表",
        create: "新增-党团活动学生关联表"
      },
      dialogStatus: 'create',
      veStuCaucusUserRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuCaucusUserVo() {
      return {
             stuId:'',// 学生Id
                  cId:'',// 活动Id
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuCaucusUserVo = this.resetveStuCaucusUserVo();
      this.$nextTick(() => {
        this.$refs.veStuCaucusUserDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuCaucusUserApi.get(row.id).then((res) => {
          this.veStuCaucusUserVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuCaucusUserDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuCaucusUserVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuCaucusUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuCaucusUserApi.add(subData).then(res => {
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
      this.$refs.veStuCaucusUserDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuCaucusUserApi.update(subData).then(() => {
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