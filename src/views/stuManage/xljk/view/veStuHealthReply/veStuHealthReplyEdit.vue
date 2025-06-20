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
            ref="veStuHealthReplyDataForm"
            :rules="veStuHealthReplyRules"
            :model="veStuHealthReplyVo"
            labelAlign="right"
          >
                             <a-form-model-item label="回复内容" prop="answer" required>
                                 <a-input v-model="veStuHealthReplyVo.answer" :maxLength="65535" placeholder="请输入回复内容" />
                               </a-form-model-item>
                            <a-form-model-item label="咨询内容Id" prop="aId" required>
                                 <a-input v-model="veStuHealthReplyVo.aId" :maxLength="0" placeholder="请输入咨询内容Id" />
                               </a-form-model-item>
                            <a-form-model-item label="回复人Id" prop="answerUserId" required>
                                 <a-input v-model="veStuHealthReplyVo.answerUserId" :maxLength="32" placeholder="请输入回复人Id" />
                               </a-form-model-item>
                            <a-form-model-item label="" prop="answerUserName" required>
                                 <a-input v-model="veStuHealthReplyVo.answerUserName" :maxLength="255" placeholder="请输入" />
                               </a-form-model-item>
                            <a-form-model-item label="回复时间" prop="answerTime" required>
                                 <a-input v-model="veStuHealthReplyVo.answerTime" :maxLength="0" placeholder="请输入回复时间" />
                               </a-form-model-item>
                      </a-form-model>
        </edu-form>
  </div>
</template>

<script>
import veStuHealthReplyApi from "../../api/veStuHealthReplyApi";

export default {
  components: { },
  data() {
    const data = {
      veStuHealthReplyVo: this.resetveStuHealthReplyVo(),
      textMap: {
        update: "编辑-保险理赔咨询回复表",
        create: "新增-保险理赔咨询回复表"
      },
      dialogStatus: 'create',
      veStuHealthReplyRules: {
      }
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuHealthReplyVo() {
      return {
             answer:'',// 回复内容
                  aId:'',// 咨询内容Id
                  answerUserId:'',// 回复人Id
                  answerUserName:'',// 
                  answerTime:'',// 回复时间
                  };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.dialogStatus = "create"
      this.veStuHealthReplyVo = this.resetveStuHealthReplyVo();
      this.$nextTick(() => {
        this.$refs.veStuHealthReplyDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veStuHealthReplyApi.get(row.id).then((res) => {
          this.veStuHealthReplyVo = res.result
      });
      this.dialogStatus = "update"
      this.$nextTick(() => {
        this.$refs.veStuHealthReplyDataForm.clearValidate();
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
       const tempData = Object.assign({}, this.veStuHealthReplyVo);
       return tempData
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuHealthReplyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if(subData == null){
            return;
          }
          veStuHealthReplyApi.add(subData).then(res => {
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
      this.$refs.veStuHealthReplyDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if(subData == null){
            return;
          }
          veStuHealthReplyApi.update(subData).then(() => {
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