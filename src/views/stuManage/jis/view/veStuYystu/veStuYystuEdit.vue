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
            ref="veStuYystuDataForm"
            :rules="veStuYystuRules"
            :model="veStuYystuVo"
            labelAlign="right"
          >
                             <a-form-model-item label="" prop="stuId" required>
                                 <a-input v-model="veStuYystuVo.stuId" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="yyId" required>
                                 <a-input v-model="veStuYystuVo.yyId" :maxLength="0" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="预约开始时间" prop="yystartTime" required>
								<DatePickByCN
								      v-model="veStuYystuVo.yystartTime"
								      placeholder="请选择预约开始时间"/>
                               </a-form-model-item>
                            <a-form-model-item label="预约结束时间" prop="yyendTime" required>
								<DatePickByCN
								      v-model="veStuYystuVo.yyendTime"
								      placeholder="请选择预约结束时间"/>
                               </a-form-model-item>
                            <a-form-model-item label="" prop="yyReason" required>
                                 <a-input v-model="veStuYystuVo.yyReason" :maxLength="255" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="提交的预约是否审核成功(1通过，0不通过，2.未审核)" prop="yyauthStatus" required>
                                 <a-input v-model="veStuYystuVo.yyauthStatus" :maxLength="0" placeholder="请输入提交的预约是否审核成功(1通过，0不通过，2.未审核)" />
                               </a-form-model-item>
                            <a-form-model-item label="审核不成果的原因" prop="yyauthReason" required>
                                 <a-input v-model="veStuYystuVo.yyauthReason" :maxLength="255" placeholder="请输入审核不成果的原因" />
                               </a-form-model-item>
                            <a-form-model-item label="常规时间预约" prop="currentTime" required>
								<DatePickByCN
								      v-model="veStuYystuVo.currentTime"
								      placeholder="请选择常规时间预约"  />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuYystuApi from "@/views/stuManage/jis/api/veStuYystuApi";

export default {
  components: { },
  data() {
    const data = {
      veStuYystuVo: this.resetveStuYystuVo(),
      textMap: {
        update: "编辑-预约与学生关联表",
        create: "新增-预约与学生关联表"
      },
      dialogStatus: 'create',
      veStuYystuRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuYystuVo() {
      return {
             stuId:'',// 
                  yyId:'',// 
                  yystartTime:'',// 预约开始时间
                  yyendTime:'',// 预约结束时间
                  yyReason:'',// 
                  yyauthStatus:'',// 提交的预约是否审核成功(1通过，0不通过，2.未审核)
                  yyauthReason:'',// 审核不成果的原因
                  currentTime:'',// 常规时间预约
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuYystuVo = this.resetveStuYystuVo();
      this.$nextTick(() => {
        this.$refs.veStuYystuDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuYystuApi.get(row.id).then((res) => {
          this.veStuYystuVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuYystuDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuYystuVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuYystuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuYystuApi.add(subData).then(res => {
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
      this.$refs.veStuYystuDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuYystuApi.update(subData).then(() => {
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