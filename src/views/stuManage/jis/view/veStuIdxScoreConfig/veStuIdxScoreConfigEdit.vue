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
            ref="veStuIdxScoreConfigDataForm"
            :rules="veStuIdxScoreConfigRules"
            :model="veStuIdxScoreConfigVo"
            labelAlign="right"
          >
                             <a-form-model-item label="指标ID" prop="idxId" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.idxId" :maxLength="0" placeholder="请输入指标ID" />
                               </a-form-model-item>
                            <a-form-model-item label="指标名称" prop="name" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.name" :maxLength="255" placeholder="请输入指标名称" />
                               </a-form-model-item>
                            <a-form-model-item label="指标类型名称" prop="attrName" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.attrName" :maxLength="255" placeholder="请输入指标类型名称" />
                               </a-form-model-item>
                            <a-form-model-item label="指标类型" prop="attribute" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.attribute" :maxLength="50" placeholder="请输入指标类型" />
                               </a-form-model-item>
                            <a-form-model-item label="指标加分" prop="addScore" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.addScore" :maxLength="0" placeholder="请输入指标加分" />
                               </a-form-model-item>
                            <a-form-model-item label="指标减分" prop="minusScore" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.minusScore" :maxLength="0" placeholder="请输入指标减分" />
                               </a-form-model-item>
                            <a-form-model-item label="加分单位类型" prop="addType" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.addType" :maxLength="0" placeholder="请输入加分单位类型" />
                               </a-form-model-item>
                            <a-form-model-item label="减分单位类型" prop="minType" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.minType" :maxLength="0" placeholder="请输入减分单位类型" />
                               </a-form-model-item>
                            <a-form-model-item label="分值单位" prop="addUnit" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.addUnit" :maxLength="50" placeholder="请输入分值单位" />
                               </a-form-model-item>
                            <a-form-model-item label="减分单位" prop="minUnit" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.minUnit" :maxLength="50" placeholder="请输入减分单位" />
                               </a-form-model-item>
                            <a-form-model-item label="排序" prop="listSort" required>
                                 <a-input v-model="veStuIdxScoreConfigVo.listSort" :maxLength="0" placeholder="请输入排序" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuIdxScoreConfigApi from "@/views/stuManage/jis/api/veStuIdxScoreConfigApi";

export default {
  components: { },
  data() {
    const data = {
      veStuIdxScoreConfigVo: this.resetveStuIdxScoreConfigVo(),
      textMap: {
        update: "编辑-指标加减分设置表",
        create: "新增-指标加减分设置表"
      },
      dialogStatus: 'create',
      veStuIdxScoreConfigRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuIdxScoreConfigVo() {
      return {
             idxId:'',// 指标ID
                  name:'',// 指标名称
                  attrName:'',// 指标类型名称
                  attribute:'',// 指标类型
                  addScore:'',// 指标加分
                  minusScore:'',// 指标减分
                  addType:'',// 加分单位类型
                  minType:'',// 减分单位类型
                  addUnit:'',// 分值单位
                  minUnit:'',// 减分单位
                  listSort:'',// 排序
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuIdxScoreConfigVo = this.resetveStuIdxScoreConfigVo();
      this.$nextTick(() => {
        this.$refs.veStuIdxScoreConfigDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuIdxScoreConfigApi.get(row.id).then((res) => {
          this.veStuIdxScoreConfigVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuIdxScoreConfigDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuIdxScoreConfigVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuIdxScoreConfigDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuIdxScoreConfigApi.add(subData).then(res => {
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
      this.$refs.veStuIdxScoreConfigDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuIdxScoreConfigApi.update(subData).then(() => {
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