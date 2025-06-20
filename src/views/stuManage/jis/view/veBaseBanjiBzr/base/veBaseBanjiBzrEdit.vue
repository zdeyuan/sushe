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
            ref="veBaseBanjiBzrDataForm"
            :rules="veBaseBanjiBzrRules"
            :model="veBaseBanjiBzrVo"
            labelAlign="right"
          >
                             <a-form-model-item label="班级id" prop="bjid" required>
                                 <a-input v-model="veBaseBanjiBzrVo.bjid" :maxLength="0" placeholder="请输入班级id" />
                               </a-form-model-item>
                            <a-form-model-item label="班主任userId" prop="bzruserid" required>
                                 <a-input v-model="veBaseBanjiBzrVo.bzruserid" :maxLength="0" placeholder="请输入班主任userId" />
                               </a-form-model-item>
                            <a-form-model-item label="班主任姓名" prop="bzrusername" required>
                                 <a-input v-model="veBaseBanjiBzrVo.bzrusername" :maxLength="50" placeholder="请输入班主任姓名" />
                               </a-form-model-item>
                            <a-form-model-item label="设置时间" prop="createtime" required>
                                 <a-input v-model="veBaseBanjiBzrVo.createtime" :maxLength="0" placeholder="请输入设置时间" />
                               </a-form-model-item>
                            <a-form-model-item label="终端ID" prop="terminalid" required>
                                 <a-input v-model="veBaseBanjiBzrVo.terminalid" :maxLength="0" placeholder="请输入终端ID" />
                               </a-form-model-item>
                            <a-form-model-item label="是否当前" prop="iscurrent" required>
                                 <a-input v-model="veBaseBanjiBzrVo.iscurrent" :maxLength="0" placeholder="请输入是否当前" />
                               </a-form-model-item>
                            <a-form-model-item label="创建用户" prop="createuserid" required>
                                 <a-input v-model="veBaseBanjiBzrVo.createuserid" :maxLength="0" placeholder="请输入创建用户" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="startdate" required>
                                 <a-input v-model="veBaseBanjiBzrVo.startdate" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="enddate" required>
                                 <a-input v-model="veBaseBanjiBzrVo.enddate" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veBaseBanjiBzrApi from "@/views/stuManage/jis/api/veBaseBanjiBzrApi";

export default {
  components: { },
  data() {
    const data = {
      veBaseBanjiBzrVo: this.resetveBaseBanjiBzrVo(),
      textMap: {
        update: "编辑-班主任表",
        create: "新增-班主任表"
      },
      dialogStatus: 'create',
      veBaseBanjiBzrRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveBaseBanjiBzrVo() {
      return {
             bjid:'',// 班级id
                  bzruserid:'',// 班主任userId
                  bzrusername:'',// 班主任姓名
                  createtime:'',// 设置时间
                  terminalid:'',// 终端ID
                  iscurrent:'',// 是否当前
                  createuserid:'',// 创建用户
                  startdate:'',// 
                  enddate:'',// 
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veBaseBanjiBzrVo = this.resetveBaseBanjiBzrVo();
      this.$nextTick(() => {
        this.$refs.veBaseBanjiBzrDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veBaseBanjiBzrApi.get(row.id).then((res) => {
          this.veBaseBanjiBzrVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veBaseBanjiBzrDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veBaseBanjiBzrVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veBaseBanjiBzrDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veBaseBanjiBzrApi.add(subData).then(res => {
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
      this.$refs.veBaseBanjiBzrDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veBaseBanjiBzrApi.update(subData).then(() => {
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