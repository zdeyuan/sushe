<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veJkyMeetSummaryDataForm" :rules="veJkyMeetSummaryRules" :model="veJkyMeetSummaryVo" labelAlign="right">
        <a-form-model-item label="会议" prop="title">
          {{ meetPo.title }}
        </a-form-model-item>
        <a-form-model-item label="纪要标题" prop="title" required>
          <a-input v-model="veJkyMeetSummaryVo.title" :maxLength="100" placeholder="请输入主题" />
        </a-form-model-item>
        <a-form-model-item label="纪要内容" prop="content" required>
          <a-textarea v-model="veJkyMeetSummaryVo.content" :maxLength="300" placeholder="请输入纪要内容" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="纪要附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="summary" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetSummaryApi from '@/api/research/rwork/veJkyMeetSummaryApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { uploadFiles },
  data() {
    const data = {
      veJkyMeetSummaryVo: this.resetveJkyMeetSummaryVo(),
      textMap: {
        update: '编辑-会议纪要',
        create: '新增-会议纪要'
      },
      dialogStatus: 'create',
      veJkyMeetSummaryRules: {},
      meetPo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyMeetSummaryVo() {
      return {
        meetId: '', // 会议id
        content: '', // 纪要内容
        createUid: '', // 创建用户
        fileId: '', // 纪要附件id
        title: '' // 主题
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate(meetPo) {
      this.meetPo = meetPo;
      this.viewType = 'create';
      this.veJkyMeetSummaryVo = this.resetveJkyMeetSummaryVo();
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(meetPo, row) {
      this.meetPo = meetPo;
      veJkyMeetSummaryApi.get(row.id).then(res => {
        this.veJkyMeetSummaryVo = res.result;
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryDataForm.clearValidate();
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
    getSubData(isUpdate) {
      const tempData = Object.assign({}, this.veJkyMeetSummaryVo);
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      tempData.meetId = this.meetPo.id;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyMeetSummaryDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyMeetSummaryApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veJkyMeetSummaryDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyMeetSummaryApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: '修改了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
