<template>
  <div class="edit_form">
        <!-- 编辑页 -->
        <edu-form
          :title="textMap[dialogStatus]"
          @ok="viewType==='create'?createData():updateData()"
          @cancel="handelCancel"
        >
          <a-form-model
            ref="veStuSemesterDataForm"
            :rules="veStuSemesterRules"
            :model="veStuSemesterVo"
            labelAlign="right"
          >
                             <a-form-model-item label="学期id" prop="semesterId" required>
                                 <a-input v-model="veStuSemesterVo.semesterId" :maxLength="0" placeholder="请输入学期id" />
                               </a-form-model-item>
                            <a-form-model-item label="学生id" prop="stuId" required>
                                 <a-input v-model="veStuSemesterVo.stuId" :maxLength="0" placeholder="请输入学生id" />
                               </a-form-model-item>
                            <a-form-model-item label="注册状态;2未注册1已注册" prop="status" required>
                                 <a-input v-model="veStuSemesterVo.status" :maxLength="0" placeholder="请输入注册状态;2未注册1已注册" />
                               </a-form-model-item>
                            <a-form-model-item label="注册时间" prop="createTime" required>
								<DatePickByCN
								      v-model="veStuSemesterVo.createTime"
								      placeholder="请选择注册时间"
								    />
                               </a-form-model-item>
                            <a-form-model-item label="注册人" prop="createUseId" required>
                                 <a-input v-model="veStuSemesterVo.createUseId" :maxLength="0" placeholder="请输入注册人" />
                               </a-form-model-item>
                            <a-form-model-item label="撤销时间" prop="cancleTime" required>
								<DatePickByCN
								      v-model="veStuSemesterVo.cancleTime"
								      placeholder="请选择撤销时间"
								    />
                               </a-form-model-item>
                            <a-form-model-item label="撤销人" prop="cancleUserId" required>
                                 <a-input v-model="veStuSemesterVo.cancleUserId" :maxLength="0" placeholder="请输入撤销人" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuSemesterApi from "@/views/stuManage/xjManage/api/veStuSemesterApi";

export default {
  components: { },
  data() {
    const data = {
      veStuSemesterVo: this.resetveStuSemesterVo(),
      textMap: {
        update: "编辑-学期注册表",
        create: "新增-学期注册表"
      },
      dialogStatus: 'create',
      veStuSemesterRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuSemesterVo() {
      return {
             semesterId:'',// 学期id
                  stuId:'',// 学生id
                  status:'',// 注册状态;2未注册1已注册
                  createTime:'',// 注册时间
                  createUseId:'',// 注册人
                  cancleTime:'',// 撤销时间
                  cancleUserId:'',// 撤销人
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = "create"
      this.veStuSemesterVo = this.resetveStuSemesterVo();
      this.$nextTick(() => {
        this.$refs.veStuSemesterDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuSemesterApi.get(row.id).then((res) => {
          this.veStuSemesterVo = res.result
      });
      this.viewType = "update"
      this.$nextTick(() => {
        this.$refs.veStuSemesterDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuSemesterVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuSemesterDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuSemesterApi.add(subData).then(res => {
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
      this.$refs.veStuSemesterDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuSemesterApi.update(subData).then(() => {
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