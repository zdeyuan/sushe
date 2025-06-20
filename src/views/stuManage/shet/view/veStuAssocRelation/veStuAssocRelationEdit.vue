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
            ref="veStuAssocRelationDataForm"
            :rules="veStuAssocRelationRules"
            :model="veStuAssocRelationVo"
            labelAlign="right"
          >
                             <a-form-model-item label="学号" prop="code" required>
                                 <a-input v-model="veStuAssocRelationVo.code" :maxLength="20" placeholder="请输入学号" />
                               </a-form-model-item>
                            <a-form-model-item label="学生id" prop="stuId" required>
                                 <a-input v-model="veStuAssocRelationVo.stuId" :maxLength="0" placeholder="请输入学生id" />
                               </a-form-model-item>
                            <a-form-model-item label="type" prop="type" required>
                                 <a-input v-model="veStuAssocRelationVo.type" :maxLength="0" placeholder="请输入type" />
                               </a-form-model-item>
                            <a-form-model-item label="1：普通成员，2：组长，3：主席" prop="role" required>
                                 <a-input v-model="veStuAssocRelationVo.role" :maxLength="0" placeholder="请输入1：普通成员，2：组长，3：主席" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocRelationApi from "@/views/stuManage/shet/api/veStuAssocRelationApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocRelationVo: this.resetveStuAssocRelationVo(),
      textMap: {
        update: "编辑-学生社团关联",
        create: "新增-学生社团关联"
      },
      dialogStatus: 'create',
      veStuAssocRelationRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocRelationVo() {
      return {
             code:'',// 学号
                  stuId:'',// 学生id
                  type:'',// type
                  role:'',// 1：普通成员，2：组长，3：主席
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocRelationVo = this.resetveStuAssocRelationVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocRelationDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocRelationApi.get(row.id).then((res) => {
          this.veStuAssocRelationVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocRelationDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocRelationVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocRelationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocRelationApi.add(subData).then(res => {
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
      this.$refs.veStuAssocRelationDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocRelationApi.update(subData).then(() => {
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