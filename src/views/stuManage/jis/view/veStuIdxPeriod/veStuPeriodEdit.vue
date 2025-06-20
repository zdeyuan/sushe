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
            ref="veStuPeriodDataForm"
            :rules="veStuPeriodRules"
            :model="veStuPeriodVo"
            labelAlign="right"
          >
                             <a-form-model-item label="1=>学期, 2=>学年" prop="type" required>
                                 <a-input v-model="veStuPeriodVo.type" :maxLength="0" placeholder="请输入1=>学期, 2=>学年" />
                               </a-form-model-item>
                            <a-form-model-item label="学期ID或学年" prop="value" required>
                                 <a-input v-model="veStuPeriodVo.value" :maxLength="0" placeholder="请输入学期ID或学年" />
                               </a-form-model-item>
                            <a-form-model-item label="是否当前周期，0：不是，1：是" prop="current" required>
                                 <a-input v-model="veStuPeriodVo.current" :maxLength="0" placeholder="请输入是否当前周期，0：不是，1：是" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuPeriodApi from "@/views/stuManage/jis/api/veStuPeriodApi";

export default {
  components: { },
  data() {
    const data = {
      veStuPeriodVo: this.resetveStuPeriodVo(),
      textMap: {
        update: "编辑-评测周期设置表",
        create: "新增-评测周期设置表"
      },
      dialogStatus: 'create',
      veStuPeriodRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuPeriodVo() {
      return {
             type:'',// 1=>学期, 2=>学年
                  value:'',// 学期ID或学年
                  current:'',// 是否当前周期，0：不是，1：是
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuPeriodVo = this.resetveStuPeriodVo();
      this.$nextTick(() => {
        this.$refs.veStuPeriodDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuPeriodApi.get(row.id).then((res) => {
          this.veStuPeriodVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuPeriodDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuPeriodVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuPeriodDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuPeriodApi.add(subData).then(res => {
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
      this.$refs.veStuPeriodDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuPeriodApi.update(subData).then(() => {
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