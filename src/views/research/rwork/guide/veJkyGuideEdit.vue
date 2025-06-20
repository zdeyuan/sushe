<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" width="75%" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model
        ref="veJkyGuideDataForm"
        :rules="veJkyGuideRules"
        :model="veJkyGuideVo"
        labelAlign="right"
        :labelCol="{ span: 3 }"
        :wrapperCol="{ span: 21 }"
      >
        <a-form-model-item label="标题" prop="title" required>
          <a-input v-model="veJkyGuideVo.title" :maxLength="255" placeholder="请输入标题" />
        </a-form-model-item>
        <a-form-model-item label="内容" prop="textId">
          <ueditor ref="ueditor" style="width: 100%%;"></ueditor>
        </a-form-model-item>
        <a-form-model-item label="状态" prop="status">
          <edu-data v-model="veJkyGuideVo.status" stype="radio" code="statusFb" />
        </a-form-model-item>
        <a-form-model-item label="附件" prop="fileId">
          <uploadFiles ref="uploadFiles" serviceType="guide" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veJkyGuideApi from '@/api/research/rwork/veJkyGuideApi';
import ueditor from '@/components/kqManageComponent/ueditor';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: { ueditor, uploadFiles },
  data() {
    const data = {
      veJkyGuideVo: this.resetveJkyGuideVo(),
      textMap: {
        update: '编辑-研究指导',
        create: '新增-研究指导'
      },
      dialogStatus: 'create',
      veJkyGuideRules: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveJkyGuideVo() {
      return {
        status: 1,
        title: '', // 主题
        textId: '', // 内容
        fileId: '', // 附件id
        createTime: '' // 录入时间
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
      this.veJkyGuideVo = this.resetveJkyGuideVo();
      this.$nextTick(() => {
        this.$refs.veJkyGuideDataForm.clearValidate();
      });
    },
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veJkyGuideApi.get(row.id).then(res => {
        this.veJkyGuideVo = res.result;
        this.$refs.ueditor.setValue(res.result.textId);
        this.$refs.uploadFiles.setValue(res.result.id);
      });
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veJkyGuideDataForm.clearValidate();
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
      const tempData = Object.assign({}, this.veJkyGuideVo);
      tempData.textId = this.$refs.ueditor.getValue();
      tempData.fileIds = this.$refs.uploadFiles.getValue();
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veJkyGuideDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veJkyGuideApi.add(subData).then(res => {
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
      this.$refs.veJkyGuideDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veJkyGuideApi.update(subData).then(() => {
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
