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
            ref="veStuAssocDataForm"
            :rules="veStuAssocRules"
            :model="veStuAssocVo"
            labelAlign="right"
          >
                             <a-form-model-item label="社团类型 (模型协会、软件协会、旅游协会)" prop="type" required>
                                 <a-input v-model="veStuAssocVo.type" :maxLength="0" placeholder="请输入社团类型 (模型协会、软件协会、旅游协会)" />
                               </a-form-model-item>
                            <a-form-model-item label="社团名称" prop="name" required>
                                 <a-input v-model="veStuAssocVo.name" :maxLength="50" placeholder="请输入社团名称" />
                               </a-form-model-item>
                            <a-form-model-item label="社团编号" prop="code" required>
                                 <a-input v-model="veStuAssocVo.code" :maxLength="30" placeholder="请输入社团编号" />
                               </a-form-model-item>
                            <a-form-model-item label="成立目的" prop="clmd" required>
                                 <a-input v-model="veStuAssocVo.clmd" :maxLength="100" placeholder="请输入成立目的" />
                               </a-form-model-item>
                            <a-form-model-item label="主要活动形式" prop="zyhdxs" required>
                                 <a-input v-model="veStuAssocVo.zyhdxs" :maxLength="100" placeholder="请输入主要活动形式" />
                               </a-form-model-item>
                            <a-form-model-item label="创始人" prop="csr" required>
                                 <a-input v-model="veStuAssocVo.csr" :maxLength="30" placeholder="请输入创始人" />
                               </a-form-model-item>
                            <a-form-model-item label="批准部门" prop="pzbm" required>
                                 <a-input v-model="veStuAssocVo.pzbm" :maxLength="100" placeholder="请输入批准部门" />
                               </a-form-model-item>
                            <a-form-model-item label="社团性质" prop="stxz" required>
                                 <a-input v-model="veStuAssocVo.stxz" :maxLength="50" placeholder="请输入社团性质" />
                               </a-form-model-item>
                            <a-form-model-item label="人数" prop="rs" required>
                                 <a-input v-model="veStuAssocVo.rs" :maxLength="0" placeholder="请输入人数" />
                               </a-form-model-item>
                            <a-form-model-item label="当前负责人ID" prop="dqfzr" required>
                                 <a-input v-model="veStuAssocVo.dqfzr" :maxLength="32" placeholder="请输入当前负责人ID" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="dqfzrName" required>
                                 <a-input v-model="veStuAssocVo.dqfzrName" :maxLength="255" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="负责人电话" prop="fzrPhone" required>
                                 <a-input v-model="veStuAssocVo.fzrPhone" :maxLength="11" placeholder="请输入负责人电话" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuAssocApi from "@/views/stuManage/shet/api/veStuAssocApi";

export default {
  components: { },
  data() {
    const data = {
      veStuAssocVo: this.resetveStuAssocVo(),
      textMap: {
        update: "编辑-社团活动管理",
        create: "新增-社团活动管理"
      },
      dialogStatus: 'create',
      veStuAssocRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuAssocVo() {
      return {
             type:'',// 社团类型 (模型协会、软件协会、旅游协会)
                  name:'',// 社团名称
                  code:'',// 社团编号
                  clmd:'',// 成立目的
                  zyhdxs:'',// 主要活动形式
                  csr:'',// 创始人
                  pzbm:'',// 批准部门
                  stxz:'',// 社团性质
                  rs:'',// 人数
                  dqfzr:'',// 当前负责人ID
                  dqfzrName:'',// 
                  fzrPhone:'',// 负责人电话
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuAssocVo = this.resetveStuAssocVo();
      this.$nextTick(() => {
        this.$refs.veStuAssocDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuAssocApi.get(row.id).then((res) => {
          this.veStuAssocVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuAssocDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuAssocVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuAssocDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuAssocApi.add(subData).then(res => {
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
      this.$refs.veStuAssocDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuAssocApi.update(subData).then(() => {
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