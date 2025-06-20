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
            ref="veStuAssocChargeDataForm"
            :rules="veStuAssocChargeRules"
            :model="veStuAssocChargeVo"
            labelAlign="right"
          >
                             <a-form-model-item label="社团id" prop="assocId" required>
                                 <a-input v-model="veStuAssocChargeVo.assocId" :maxLength="0" placeholder="请输入社团id" />
                               </a-form-model-item>
                            <a-form-model-item label="社团负责人id" prop="stuId" required>
                                 <a-input v-model="veStuAssocChargeVo.stuId" :maxLength="0" placeholder="请输入社团负责人id" />
                               </a-form-model-item>
                            <a-form-model-item label="负责人用户姓名" prop="stuName" required>
                                 <a-input v-model="veStuAssocChargeVo.stuName" :maxLength="50" placeholder="请输入负责人用户姓名" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocChargeApi from "@/views/stuManage/shet/api/veStuAssocChargeApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocChargeVo: this.resetveStuAssocChargeVo(),
      textMap: {
        update: "编辑-社团负责人",
        create: "新增-社团负责人"
      },
      dialogStatus: 'create',
      veStuAssocChargeRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocChargeVo() {
      return {
             assocId:'',// 社团id
                  stuId:'',// 社团负责人id
                  stuName:'',// 负责人用户姓名
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocChargeVo = this.resetveStuAssocChargeVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocChargeDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocChargeApi.get(row.id).then((res) => {
          this.veStuAssocChargeVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocChargeDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocChargeVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocChargeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocChargeApi.add(subData).then(res => {
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
      this.$refs.veStuAssocChargeDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocChargeApi.update(subData).then(() => {
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